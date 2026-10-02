import type { SiteContent } from "./types";

/**
 * Who you are and how to reach you: name, contact details, social links,
 * portrait, navigation and search-engine text.
 * Source of truth: CV (EN/FR, 2026), LinkedIn and GitHub profile.
 */
export const site: SiteContent = {
  name: "Achraf Abderrazik",

  role: { en: "AI/ML Engineer", fr: "Ingénieur IA/ML" },

  positioning: [
    { en: "AI / ML Engineer", fr: "Ingénieur IA / ML" },
    { en: "AI Automation", fr: "Automatisation IA" },
    { en: "Backend & Intelligent Systems", fr: "Backend & systèmes intelligents" },
  ],

  availability: {
    open: true,
    label: { en: "Available for new projects", fr: "Disponible pour de nouveaux projets" },
  },

  location: { en: "Marrakech, Morocco", fr: "Marrakech, Maroc" },
  address: { city: "Marrakech", country: "MA" },
  coordinates: { en: "31.63° N · 7.98° W", fr: "31,63° N · 7,98° O" },

  contact: {
    // Source: CV header.
    email: "achraf.abderrazik@yahoo.fr",
    bookingUrl: "",
  },

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/achraf-abderrazik/" },
    { label: "GitHub", href: "https://github.com/AchrafAbderrazik" },
  ],

  // A tall photo is shown as a horizontal band: the second `position` value
  // moves your face up or down in the frame.
  portrait: {
    src: "/achraf-portrait.png",
    alt: { en: "Portrait of Achraf Abderrazik", fr: "Portrait d’Achraf Abderrazik" },
    position: "50% 45%",
  },

  seo: {
    title: {
      en: "Achraf Abderrazik — AI/ML Engineer · AI Automation · Backend",
      fr: "Achraf Abderrazik — Ingénieur IA/ML · Automatisation IA · Backend",
    },
    // Search results and social cards: keep under ~160 characters.
    description: {
      en: "AI/ML engineer building intelligent systems from model to production: LLM applications, NLP, AI automation, backend APIs and deployment. Based in Marrakech.",
      fr: "Ingénieur IA/ML, je construis des systèmes intelligents du modèle à la production : applications LLM, NLP, automatisation IA et API backend. Basé à Marrakech.",
    },
    keywords: {
      en: [
        "Achraf Abderrazik",
        "AI engineer",
        "machine learning engineer",
        "LLM applications",
        "AI automation",
        "NLP",
        "Moroccan Darija NLP",
        "backend engineer",
        "FastAPI",
        "Claude API",
        "Marrakech",
        "Morocco",
      ],
      fr: [
        "Achraf Abderrazik",
        "ingénieur IA",
        "ingénieur machine learning",
        "applications LLM",
        "automatisation IA",
        "NLP",
        "NLP darija",
        "ingénieur backend",
        "FastAPI",
        "Claude API",
        "Marrakech",
        "Maroc",
      ],
    },
    // The image shown when the site is shared on LinkedIn, X, Slack…
    shareHeadline: {
      en: ["I build *intelligent systems*", "from model to *production.*"],
      fr: ["Je construis des", "*systèmes intelligents*", "du modèle à la *production.*"],
    },
  },

  navigation: {
    main: [
      { label: { en: "Work", fr: "Projets" }, href: "/#work" },
      { label: { en: "Services", fr: "Services" }, href: "/#services" },
      { label: { en: "About", fr: "À propos" }, href: "/#about" },
      { label: { en: "Stack", fr: "Stack" }, href: "/#stack" },
    ],
    contact: { label: { en: "Contact", fr: "Contact" }, href: "/#contact" },
    cta: { label: { en: "Start a project", fr: "Lancer un projet" }, href: "/#contact" },
  },

  footer: {
    description: {
      en: "AI/ML Engineer building intelligent systems from model to production: LLM applications, AI automation and backend APIs.",
      fr: "Ingénieur IA/ML, je construis des systèmes intelligents du modèle à la production : applications LLM, automatisation IA et API backend.",
    },
  },
};
