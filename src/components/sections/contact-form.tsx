"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ReactNode,
} from "react";

import type { Locale } from "@/content/i18n";
import type { ContactTopic } from "@/content/types";
import { cn } from "@/lib/cn";
import {
  formatInquiry,
  limits,
  validateContact,
  type ContactApiResponse,
  type ContactErrorCode,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
} from "@/lib/contact";
import type { Content } from "@/lib/content";
import { fill } from "@/lib/i18n";

import { Button, ButtonLink } from "../ui/button";
import { CheckIcon, MailIcon, SendIcon } from "../ui/icons";

type FormCopy = Content["contact"]["form"];

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; name: string }
  | { state: "error"; reason: "unavailable" | "failed"; inquiry: ContactPayload };

const fieldOrder: ContactField[] = ["name", "email", "company", "services", "message"];

export function ContactForm({ locale, email, copy }: { locale: Locale; email: string | null; copy: FormCopy }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const isSubmitting = status.state === "submitting";

  // Sending disables the submit button, which drops keyboard focus. Move it to
  // the outcome instead, so it is read out and Tab continues from there; and
  // back to the first field after "Send another message".
  const previousState = useRef(status.state);
  useEffect(() => {
    if (status.state === "success" || status.state === "error") {
      resultRef.current?.focus();
    } else if (status.state === "idle" && previousState.current === "success") {
      formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus();
    }
    previousState.current = status.state;
  }, [status.state]);

  const message = (code: ContactErrorCode | undefined) => {
    if (!code) return undefined;
    const templates: Record<ContactErrorCode, string> = {
      name: copy.errors.name,
      email: copy.errors.email,
      companyTooLong: fill(copy.errors.companyTooLong, { max: limits.company.max }),
      messageTooShort: fill(copy.errors.messageTooShort, { min: limits.message.min }),
      messageTooLong: fill(copy.errors.messageTooLong, { max: limits.message.max }),
    };
    return templates[code];
  };

  function focusFirstError(fieldErrors: ContactErrors) {
    const first = fieldOrder.find((field) => fieldErrors[field]);
    if (!first) return;
    formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const result = validateContact({
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      services: formData.getAll("services"),
      message: formData.get("message"),
      locale,
      website: formData.get("website"),
    });

    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const body = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (response.ok && body?.ok) {
        form.reset();
        setStatus({ state: "success", name: result.data.name });
        return;
      }

      if (body && !body.ok && body.error === "validation") {
        setErrors(body.errors);
        setStatus({ state: "idle" });
        focusFirstError(body.errors);
        return;
      }

      setStatus({
        state: "error",
        reason: body && !body.ok && body.error === "not_configured" ? "unavailable" : "failed",
        inquiry: result.data,
      });
    } catch {
      setStatus({ state: "error", reason: "failed", inquiry: result.data });
    }
  }

  if (status.state === "success") {
    const firstName = status.name.split(/\s+/)[0] ?? status.name;
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        className="flex min-h-[28rem] flex-col items-start justify-center rounded-2xl border border-line bg-canvas/60 p-6 outline-none sm:p-10"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-ink">
          <CheckIcon size={22} strokeWidth={2.2} />
        </span>
        <h3 className="mt-8 text-h3 font-medium text-fg">{fill(copy.success.title, { name: firstName })}</h3>
        <p className="mt-4 max-w-md text-lead text-fg-muted">{copy.success.body}</p>
        <Button variant="secondary" className="mt-10" onClick={() => setStatus({ state: "idle" })}>
          {copy.success.again}
        </Button>
      </div>
    );
  }

  const topicLabel = (value: ContactTopic) =>
    copy.topics.options.find((option) => option.value === value)?.label ?? value;

  const mailtoHref =
    email && status.state === "error"
      ? `mailto:${email}?subject=${encodeURIComponent(
          fill(copy.mailto.subject, { name: status.inquiry.name }),
        )}&body=${encodeURIComponent(
          formatInquiry(
            { ...status.inquiry, services: status.inquiry.services.map(topicLabel) as ContactTopic[] },
            copy.mailto,
          ),
        )}`
      : email
        ? `mailto:${email}`
        : null;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label={copy.label}
      className="rounded-2xl border border-line bg-canvas/60 p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label={copy.name}
          name="name"
          autoComplete="name"
          required
          maxLength={limits.name.max}
          error={message(errors.name)}
        />
        <TextField
          label={copy.email}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={limits.email.max}
          error={message(errors.email)}
        />
      </div>

      <div className="mt-5">
        <TextField
          label={copy.company}
          name="company"
          autoComplete="organization"
          optional={copy.optional}
          maxLength={limits.company.max}
          error={message(errors.company)}
        />
      </div>

      <fieldset className="mt-7">
        <legend className="text-sm font-medium text-fg">
          {copy.topics.legend} <span className="font-normal text-fg-subtle">{copy.topics.optional}</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {copy.topics.options.map((option) => (
            <label key={option.value} className="group relative inline-flex cursor-pointer">
              <input type="checkbox" name="services" value={option.value} className="peer sr-only" />
              <span
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg-muted",
                  "transition-[background-color,border-color,color] duration-300",
                  "group-hover:border-white/25 group-hover:text-fg",
                  "peer-checked:border-accent/50 peer-checked:bg-accent/10 peer-checked:text-fg",
                  "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                )}
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-fg-subtle transition-colors group-has-checked:bg-accent"
                />
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7">
        <TextArea
          label={copy.message.label}
          name="message"
          required
          rows={6}
          maxLength={limits.message.max}
          placeholder={copy.message.placeholder}
          error={message(errors.message)}
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech, tempting for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          {copy.honeypot}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.state === "error" ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          className="mt-7 rounded-xl border border-danger/30 bg-danger/[0.06] p-4 text-sm leading-relaxed outline-none"
        >
          <p className="font-medium text-fg">
            {status.reason === "unavailable" ? copy.failure.unavailable : copy.failure.failed}
          </p>
          <p className="mt-1 text-fg-muted">{mailtoHref ? copy.failure.fallback : copy.failure.retry}</p>
          {mailtoHref ? (
            <ButtonLink
              href={mailtoHref}
              variant="secondary"
              size="sm"
              className="mt-4"
              icon={<MailIcon size={15} />}
            >
              {copy.failure.sendByEmail}
            </ButtonLink>
          ) : null}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-fg-subtle sm:max-w-[16rem]">{copy.privacy}</p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          icon={isSubmitting ? <Spinner /> : <SendIcon size={17} />}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? copy.sending : copy.submit}
        </Button>
      </div>
    </form>
  );
}

/* ---- Fields --------------------------------------------------------------- */

const controlClasses =
  "w-full rounded-xl border bg-surface/60 px-4 text-base text-fg placeholder:text-fg-subtle " +
  "transition-[border-color,box-shadow,background-color] duration-300 " +
  "hover:border-white/20 focus:bg-surface focus:outline-none focus-visible:outline-none " +
  "focus:border-accent/60 focus:ring-4 focus:ring-accent/10";

type FieldShellProps = {
  id: string;
  label: string;
  /** The "Optional" hint, when the field is optional. */
  optional?: string;
  error?: string;
  children: ReactNode;
};

function FieldShell({ id, label, optional, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-fg">
        {label}
        {optional ? <span className="font-normal text-fg-subtle">{optional}</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = Omit<ComponentPropsWithoutRef<"input">, "id"> & {
  label: string;
  name: string;
  optional?: string;
  error?: string;
};

function TextField({ label, optional, error, className, ...props }: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} optional={optional} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses, "h-12", error ? "border-danger/60" : "border-line-strong", className)}
        {...props}
      />
    </FieldShell>
  );
}

type TextAreaProps = Omit<ComponentPropsWithoutRef<"textarea">, "id"> & {
  label: string;
  name: string;
  optional?: string;
  error?: string;
};

function TextArea({ label, optional, error, className, ...props }: TextAreaProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} optional={optional} error={error}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          controlClasses,
          "min-h-36 resize-y py-3 leading-relaxed",
          error ? "border-danger/60" : "border-line-strong",
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin-ring rounded-full border-2 border-canvas/25 border-t-canvas"
    />
  );
}
