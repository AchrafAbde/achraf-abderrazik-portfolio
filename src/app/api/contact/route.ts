import { NextResponse } from "next/server";

import { site } from "@/content/site";
import {
  formatInquiry,
  validateContact,
  type ContactApiResponse,
  type ContactPayload,
} from "@/lib/contact";

/**
 * Receives project inquiries from the contact form.
 *
 * Delivery options (set in Netlify → Project configuration → Environment variables):
 * 1. CONTACT_WEBHOOK_URL — forward inquiries as JSON to a webhook, e.g. an
 *    n8n Webhook node that routes them to your CRM, inbox or Slack.
 *    Optional CONTACT_WEBHOOK_SECRET is sent as the `x-webhook-secret` header.
 * 2. RESEND_API_KEY — send inquiries by email through Resend.
 *    CONTACT_TO_EMAIL (defaults to the email in site.ts) and
 *    CONTACT_FROM_EMAIL (a sender on a domain verified in Resend).
 *
 * With neither configured the route answers 503 and the form falls back to
 * opening the visitor's email app.
 */

const MAX_BODY_BYTES = 20_000;

function json(body: ContactApiResponse, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "bad_request" }, 413);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const result = validateContact(body);
  if (!result.ok) {
    return json({ ok: false, error: "validation", errors: result.errors }, 400);
  }

  // Honeypot filled in: pretend everything worked and drop the message.
  if (result.data.website) {
    return json({ ok: true });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();

  try {
    if (webhookUrl) {
      await deliverToWebhook(webhookUrl, result.data);
      return json({ ok: true });
    }

    if (resendKey) {
      const to = process.env.CONTACT_TO_EMAIL?.trim() || site.contact.email.trim();
      if (!to) return json({ ok: false, error: "not_configured" }, 503);
      await deliverWithResend(resendKey, to, result.data);
      return json({ ok: true });
    }
  } catch (error) {
    console.error("[contact] Delivery failed:", error);
    return json({ ok: false, error: "delivery_failed" }, 502);
  }

  return json({ ok: false, error: "not_configured" }, 503);
}

async function deliverToWebhook(url: string, data: ContactPayload) {
  const secret = process.env.CONTACT_WEBHOOK_SECRET?.trim();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(secret ? { "x-webhook-secret": secret } : {}),
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      company: data.company,
      services: data.services,
      message: data.message,
      locale: data.locale,
      source: "portfolio-contact-form",
      submittedAt: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded with ${response.status}`);
  }
}

async function deliverWithResend(apiKey: string, to: string, data: ContactPayload) {
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New project inquiry from ${data.name} (${data.locale.toUpperCase()})`,
      text: `New project inquiry, sent from the ${data.locale.toUpperCase()} site\n\n${formatInquiry(data)}`,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Resend responded with ${response.status}: ${await response.text()}`);
  }
}
