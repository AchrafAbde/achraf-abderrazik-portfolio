import { defaultLocale, type Locale } from "@/content/i18n";
import type { ContactTopic } from "@/content/types";

import { isLocale } from "./i18n";

/**
 * Contact form schema, shared by the client form and the API route so both
 * validate exactly the same way. Errors are codes: the form shows them in the
 * visitor's language (messages in src/content/contact.ts).
 */

/** The values the form can submit, whatever the language it's shown in. */
export const contactTopics: readonly ContactTopic[] = [
  "AI / LLM system",
  "AI automation",
  "Backend / API",
  "Web application",
  "Not sure yet",
];

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  services: ContactTopic[];
  message: string;
  /** The language the visitor used, so you know which one to reply in. */
  locale: Locale;
  /** Honeypot field. Real visitors never fill it in. */
  website: string;
};

export type ContactField = "name" | "email" | "company" | "services" | "message";

export type ContactErrorCode = "name" | "email" | "companyTooLong" | "messageTooShort" | "messageTooLong";

export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

export type ContactResult = { ok: true; data: ContactPayload } | { ok: false; errors: ContactErrors };

export const limits = {
  name: { min: 2, max: 100 },
  company: { max: 120 },
  message: { min: 20, max: 5000 },
  email: { max: 254 },
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isTopic(value: unknown): value is ContactTopic {
  return typeof value === "string" && (contactTopics as readonly string[]).includes(value);
}

export function validateContact(input: unknown): ContactResult {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;

  const data: ContactPayload = {
    name: asString(source.name),
    email: asString(source.email).toLowerCase(),
    company: asString(source.company),
    services: Array.isArray(source.services) ? Array.from(new Set(source.services.filter(isTopic))) : [],
    message: asString(source.message),
    locale: isLocale(source.locale) ? source.locale : defaultLocale,
    website: asString(source.website),
  };

  const errors: ContactErrors = {};

  if (data.name.length < limits.name.min || data.name.length > limits.name.max) {
    errors.name = "name";
  }
  if (!emailPattern.test(data.email) || data.email.length > limits.email.max) {
    errors.email = "email";
  }
  if (data.company.length > limits.company.max) {
    errors.company = "companyTooLong";
  }
  if (data.message.length < limits.message.min) {
    errors.message = "messageTooShort";
  } else if (data.message.length > limits.message.max) {
    errors.message = "messageTooLong";
  }

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}

/** Field labels for the plain-text inquiry, with their colon ("Name:", "Nom :"). */
export type InquiryLabels = { name: string; email: string; company: string; topics: string };

const englishLabels: InquiryLabels = {
  name: "Name:",
  email: "Email:",
  company: "Company:",
  topics: "Interested in:",
};

/** Plain-text version of an inquiry, used for emails and the mailto fallback. */
export function formatInquiry(
  data: Pick<ContactPayload, "name" | "email" | "company" | "services" | "message">,
  labels: InquiryLabels = englishLabels,
) {
  return [
    `${labels.name} ${data.name}`,
    `${labels.email} ${data.email}`,
    data.company ? `${labels.company} ${data.company}` : null,
    data.services.length > 0 ? `${labels.topics} ${data.services.join(", ")}` : null,
    "",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export type ContactApiResponse =
  | { ok: true }
  | { ok: false; error: "validation"; errors: ContactErrors }
  | { ok: false; error: "not_configured" | "delivery_failed" | "bad_request" };
