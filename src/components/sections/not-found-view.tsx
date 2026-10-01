import type { Content } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";

import { ButtonLink } from "../ui/button";
import { Container } from "../ui/container";
import { ArrowRightIcon } from "../ui/icons";
import { Inline } from "../ui/inline";

export function NotFoundView({ content }: { content: Content }) {
  const copy = content.ui.notFound;
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-32 pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
      />
      <Container>
        <p className="font-mono text-eyebrow text-fg-subtle uppercase">{copy.eyebrow}</p>
        <h1 className="mt-6 max-w-3xl text-h2 font-medium text-fg">
          <Inline text={copy.title} />
        </h1>
        <p className="mt-6 max-w-xl text-lead text-fg-muted">{copy.text}</p>
        <ButtonLink
          href={localizeHref(content.locale, "/")}
          size="lg"
          className="mt-10"
          icon={<ArrowRightIcon size={18} />}
        >
          {copy.back}
        </ButtonLink>
      </Container>
    </section>
  );
}
