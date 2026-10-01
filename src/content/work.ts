import type { WorkContent } from "./types";

/**
 * The "Selected work" section and the headline numbers above it.
 * The projects themselves live in src/content/projects/.
 */
export const work: WorkContent = {
  heading: {
    index: "01",
    eyebrow: { en: "Selected work", fr: "Sélection de projets" },
    title: { en: "Systems, built *end to end.*", fr: "Des systèmes, *de bout en bout.*" },
    intro: {
      en: "From a production LLM pipeline to distilled NLP models and replicated inference APIs. Every project is labelled for what it is: internship work, or academic projects.",
      fr: "D’un pipeline LLM en production à des modèles NLP distillés et des API d’inférence répliquées. Chaque projet est présenté pour ce qu’il est : un stage ou un projet académique.",
    },
  },

  // The strip under the hero: the strongest documented numbers, one per
  // project. Keep these out of the projects' `cardMetrics`.
  headline: {
    title: { en: "Documented results", fr: "Résultats documentés" },
    note: {
      en: "Each number links to the case study behind it.",
      fr: "Chaque chiffre renvoie à l’étude de cas correspondante.",
    },
    items: [
      {
        project: "safe-invest",
        metric: "accuracy",
        label: { en: "LLM extraction accuracy", fr: "Exactitude d’extraction LLM" },
        detail: {
          en: "French, English and Darija · 96 annotated messages",
          fr: "Français, anglais et darija · 96 messages annotés",
        },
      },
      {
        project: "aman",
        metric: "student",
        label: { en: "Macro F1, distilled student", fr: "Macro F1, élève distillé" },
        detail: {
          en: "Teachers: XLM-R 0.623 → Darija 0.815",
          fr: "Enseignants : XLM-R 0,623 → darija 0,815",
        },
      },
      {
        project: "trendradar",
        metric: "roc-auc",
        label: { en: "ROC-AUC", fr: "ROC-AUC" },
        detail: { en: "Early viral-trend detection", fr: "Détection précoce de tendances virales" },
      },
    ],
  },

  // Smaller projects, under the case studies.
  more: {
    eyebrow: { en: "Also built", fr: "Autres projets" },
    title: {
      en: "Full-stack and academic projects, from my GitHub.",
      fr: "Projets full-stack et académiques, issus de mon GitHub.",
    },
    allRepositories: { en: "All repositories", fr: "Tous les dépôts" },
  },
};
