"use client";

import { useEffect, useState } from "react";

import { CheckIcon, CopyIcon } from "../ui/icons";

type CopyEmailProps = {
  email: string;
  labels: { copy: string; copied: string; copiedStatus: string };
};

/** Email address with a one-click copy button. */
export function CopyEmail({ email, labels }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="flex items-center gap-3">
      <a
        href={`mailto:${email}`}
        className="min-w-0 truncate text-lead font-medium text-fg transition-colors hover:text-accent"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? labels.copied : labels.copy}
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-colors hover:border-tint/25 hover:text-fg"
      >
        {copied ? <CheckIcon size={16} className="text-accent" /> : <CopyIcon size={16} />}
      </button>
      <span role="status" className="sr-only">
        {copied ? labels.copiedStatus : ""}
      </span>
    </div>
  );
}
