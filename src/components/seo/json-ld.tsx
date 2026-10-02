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
 * The person the site represents. Only facts from the content files, all shown
 * on the site: no ratings, reviews or invented claims.
 */
function person(content: Content) {
  const { site, about, services, stack } = content;
  const email = site.contact.email.trim();
  // Profiles that belong to this person only (site.ts → socials).
  const sameAs = site.socials.map((social) => social.href).filter(Boolean);

  return {
    "@type": "Person",
    "@id": personId(),
    name: site.name,
    jobTitle: site.role,
    description: site.seo.description,
    // The site's root: the same address in every language.
    url: absoluteUrl("/"),
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
}

/** On every page: the website and the person behind it. */
export function JsonLd({ content }: { content: Content }) {
  const { site } = content;

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": websiteId(),
            url: absoluteUrl("/"),
            name: site.name,
            description: site.seo.description,
            inLanguage: ["en", "fr"],
            publisher: { "@id": personId() },
          },
          person(content),
        ],
      }}
    />
  );
}

/**
 * Homepage only. It is the profile page of the person the whole site is about
 * (Google's ProfilePage: a page focused on one person affiliated with the site).
 */
export function ProfilePageJsonLd({ content }: { content: Content }) {
  const { locale, site } = content;
  const url = absoluteUrl(localizeHref(locale, "/"));

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: site.seo.title,
        inLanguage: locale,
        isPartOf: { "@id": websiteId() },
        mainEntity: person(content),
        hasPart: content.caseStudies.map((study) => ({
          "@type": "CreativeWork",
          name: caseStudyName(content, study),
          url: absoluteUrl(localizeHref(locale, `/work/${study.slug}`)),
        })),
      }}
    />
  );
}

export function CaseStudyJsonLd({ content, study }: { content: Content; study: CaseStudy }) {
  const url = absoluteUrl(localizeHref(content.locale, `/work/${study.slug}`));
  const repository = study.links?.github;

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
        keywords: [...study.technologies, ...(study.tags ?? [])].join(", "),
        isPartOf: { "@id": websiteId() },
        // The public source code the case study is about, when there is one.
        ...(repository
          ? { about: { "@type": "SoftwareSourceCode", name: study.title, codeRepository: repository } }
          : {}),
      }}
    />
  );
}
