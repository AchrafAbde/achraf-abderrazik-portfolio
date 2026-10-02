import type { HeroContent } from "./types";

/** The first screen of the homepage. */
export const hero: HeroContent = {
  // The large tagline. The page's main heading (h1) is your name and role, from site.ts.
  headline: {
    en: ["I build", "*intelligent systems*", "from model to", "*production*."],
    fr: ["Je construis des", "*systèmes intelligents*", "du modèle à la", "*production*."],
  },

  intro: {
    en: "Machine learning, LLMs, automation and backend engineering for products and businesses that need more than another prototype.",
    fr: "Machine learning, LLM, automatisation et ingénierie backend pour les produits et les entreprises qui ont besoin de plus qu’un énième prototype.",
  },

  // The primary button is site.navigation.cta.
  secondaryCta: { label: { en: "View selected work", fr: "Voir les projets" }, href: "/#work" },

  stack: {
    label: { en: "Core stack", fr: "Stack principale" },
    // Rendered in uppercase; `keepCase` opts out (so "LLMs" doesn't become "LLMS").
    items: [
      { label: "Python" },
      { label: "LLMs", keepCase: true },
      { label: "NLP" },
      { label: "FastAPI" },
      { label: "React" },
      { label: "Docker" },
      { label: "PostgreSQL" },
    ],
  },
};
