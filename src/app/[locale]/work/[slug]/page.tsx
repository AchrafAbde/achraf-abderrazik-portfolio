import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView } from "@/components/case-study/case-study-view";
import { PageTransition } from "@/components/motion/page-transition";
import { CaseStudyJsonLd } from "@/components/seo/json-ld";
import { defaultLocale } from "@/content/i18n";
import { getCaseStudy, getContent, getGithubProfile, getNextCaseStudy } from "@/lib/content";
import { fill, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

/** Every case study, once per language (the layout generates the languages). Other slugs are a 404. */
export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : defaultLocale;
  return getContent(locale).caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale: param, slug } = await params;
  const locale = isLocale(param) ? param : defaultLocale;
  const content = getContent(locale);
  const study = getCaseStudy(locale, slug);
  if (!study) return {};

  return pageMetadata(content, {
    path: `/work/${study.slug}`,
    title: fill(content.ui.caseStudy.metaTitle, { title: study.title, subtitle: study.subtitle }),
    description: study.seo.description,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale: param, slug } = await params;
  const locale = isLocale(param) ? param : defaultLocale;
  const content = getContent(locale);
  const study = getCaseStudy(locale, slug);
  if (!study) notFound();

  return (
    <PageTransition>
      <CaseStudyView
        content={content}
        study={study}
        next={getNextCaseStudy(locale, study.slug)}
        githubProfile={getGithubProfile()}
      />
      <CaseStudyJsonLd content={content} study={study} />
    </PageTransition>
  );
}
