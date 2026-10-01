import type { CaseStudy, Content } from "@/lib/content";
import { fill, localizeHref } from "@/lib/i18n";
import { hasPortrait } from "@/lib/portrait";
import { absoluteUrl } from "@/lib/site-url";

/** Serialises structured data safely for a <script> tag. */
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Language-independent ids: the same person and website in every language. */
export const personId = () => `${absoluteUrl("/")}#person`;
const websiteId = () => `${absoluteUrl("/")}#website`;

/** "AMAN: Toxic speech detection…", with the language's punctuation. */
const caseStudyName = (content: Content, study: CaseStudy) =>
  fill(content.ui.caseStudy.metaTitle, { title: study.title, subtitle: study.subtitle });

/**
 * Site-wide structured data: the website, the profile page and the person.
 * Only facts from the content files: no ratings, reviews or invented claims.
 */
export function JsonLd({ content }: { content: Content }) {
  const { locale, site, about, services, stack } = content;
  const url = absoluteUrl(localizeHref(locale, "/"));
  const email = site.contact.email.trim();
  const sameAs = site.socials.map((social) => social.href).filter(Boolean);
  const title = `${site.name} — ${site.positioning.join(" · ")}`;

  const person = {
    "@type": "Person",
    "@id": personId(),
    name: site.name,
    jobTitle: site.role,
    description: site.seo.description,
    url,
    ...(hasPortrait() ? { image: absoluteUrl(site.portrait.src) } : {}),
    ...(email ? { email: `mailto:${email}` } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    affiliation: {
      "@type": "EducationalOrganization",
      name: about.education.school,
      alternateName: about.education.acronym,
    },
    knowsLanguage: about.languages,
    knowsAbout: [
      ...services.items.map((service) => service.title),
      ...stack.groups.flatMap((group) => group.items),
    ],
    makesOffer: services.items.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId(),
        url: absoluteUrl("/"),
        name: site.name,
        alternateName: title,
        description: site.seo.description,
        inLanguage: ["en", "fr"],
        publisher: { "@id": personId() },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: title,
        inLanguage: locale,
        isPartOf: { "@id": websiteId() },
        mainEntity: { "@id": personId() },
        hasPart: content.caseStudies.map((study) => ({
          "@type": "CreativeWork",
          name: caseStudyName(content, study),
          url: absoluteUrl(localizeHref(locale, `/work/${study.slug}`)),
        })),
      },
      person,
    ],
  };

  return <StructuredData data={data} />;
}

export function CaseStudyJsonLd({ content, study }: { content: Content; study: CaseStudy }) {
  const url = absoluteUrl(localizeHref(content.locale, `/work/${study.slug}`));
  const links = [study.links?.github, study.links?.demo].filter((href): href is string => Boolean(href));

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": `${url}#case-study`,
        url,
        name: caseStudyName(content, study),
        headline: study.title,
        description: study.seo.description,
        abstract: study.summary,
        genre: study.category,
        inLanguage: content.locale,
        ...(study.year ? { dateCreated: String(study.year) } : {}),
        // Team projects credit him as a contributor, not as the sole author.
        ...(study.contribution
          ? { author: { "@id": personId() }, creator: { "@id": personId() } }
          : { contributor: { "@id": personId() } }),
        ...(study.team ? { comment: study.team } : {}),
        keywords: [...study.technologies, ...(study.tags ?? [])].join(", "),
        isPartOf: { "@id": websiteId() },
        ...(links.length > 0 ? { sameAs: links } : {}),
      }}
    />
  );
}
