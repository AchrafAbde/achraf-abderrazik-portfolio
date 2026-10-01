import type { CaseStudyProject } from "../types";

// Sources: CV (EN/FR) — Projects (0.623, 4.2×, 4×, ~160k, FastAPI + Docker);
// README aman-toxic-speech-detection (Darija teacher 0.815, student 0.895, Streamlit).
// The CV reports 4.2× / 4× against "the teacher" without naming which one:
// never attribute them to a specific teacher.
export const aman: CaseStudyProject = {
  slug: "aman",
  caseStudy: true,
  featured: true,
  title: "AMAN",
  kind: "academic",
  badge: { en: "Academic · Team of 4", fr: "Académique · Équipe de 4" },
  category: { en: "NLP · Deep learning", fr: "NLP · Apprentissage profond" },
  year: 2026,
  services: ["ai-llm-systems"],

  subtitle: { en: "Toxic speech detection in Moroccan Darija", fr: "Détection de discours toxiques en darija marocain" },
  summary: {
    en: "A multi-label NLP system that detects toxic speech in Moroccan Darija, with a large teacher model distilled into a compact, faster student.",
    fr: "Un système NLP multi-label qui détecte les discours toxiques en darija marocain, avec un grand modèle enseignant distillé en un élève compact et plus rapide.",
  },

  facts: [
    {
      label: { en: "Context", fr: "Contexte" },
      value: { en: "Supervised team project · 4 members", fr: "Projet d’équipe encadré · 4 personnes" },
    },
    { label: { en: "Year", fr: "Année" }, value: "2026" },
    { label: { en: "Language", fr: "Langue" }, value: { en: "Moroccan Darija", fr: "Darija marocain" } },
    { label: { en: "Task", fr: "Tâche" }, value: { en: "Multi-label classification", fr: "Classification multi-label" } },
  ],

  metrics: [
    {
      id: "xlmr-teacher",
      value: { en: "0.623", fr: "0,623" },
      label: { en: "XLM-R teacher", fr: "Enseignant XLM-R" },
      detail: { en: "Macro F1", fr: "Macro F1" },
      meaning: {
        en: "The starting point: a multilingual XLM-RoBERTa fine-tuned on the comment corpus.",
        fr: "Le point de départ : un XLM-RoBERTa multilingue fine-tuné sur le corpus de commentaires.",
      },
      count: { to: 0.623, decimals: 3 },
    },
    {
      id: "darija-teacher",
      value: { en: "0.815", fr: "0,815" },
      label: { en: "Darija teacher", fr: "Enseignant darija" },
      detail: { en: "Macro F1", fr: "Macro F1" },
      meaning: {
        en: "A second teacher, trained for Darija, then distilled into the student.",
        fr: "Un second enseignant, entraîné pour le darija, puis distillé dans l’élève.",
      },
      count: { to: 0.815, decimals: 3 },
    },
    {
      id: "student",
      value: { en: "0.895", fr: "0,895" },
      label: { en: "DistilBERT student", fr: "Élève DistilBERT" },
      detail: { en: "Macro F1", fr: "Macro F1" },
      meaning: {
        en: "The final, compact model, distilled from the Darija teacher.",
        fr: "Le modèle final et compact, distillé à partir de l’enseignant darija.",
      },
      count: { to: 0.895, decimals: 3 },
    },
    {
      id: "smaller",
      value: { en: "4.2×", fr: "4,2×" },
      label: { en: "Smaller model", fr: "Modèle plus léger" },
      detail: { en: "Student vs. teacher", fr: "Élève vs enseignant" },
      meaning: {
        en: "Reported size of the DistilBERT student, compared with its teacher.",
        fr: "Taille rapportée de l’élève DistilBERT, comparée à celle de son enseignant.",
      },
    },
    {
      id: "faster",
      value: "4×",
      label: { en: "Faster model", fr: "Modèle plus rapide" },
      detail: { en: "Student vs. teacher", fr: "Élève vs enseignant" },
      meaning: {
        en: "Reported speed of the DistilBERT student, compared with its teacher.",
        fr: "Vitesse rapportée de l’élève DistilBERT, comparée à celle de son enseignant.",
      },
    },
    {
      id: "corpus",
      value: { en: "~160k", fr: "~160 k" },
      label: { en: "Comments", fr: "Commentaires" },
      detail: { en: "Teacher training data", fr: "Données d’entraînement de l’enseignant" },
      meaning: {
        en: "Comments the XLM-RoBERTa teacher was fine-tuned on.",
        fr: "Commentaires sur lesquels l’enseignant XLM-RoBERTa a été fine-tuné.",
      },
    },
  ],
  cardMetrics: ["smaller", "faster"],
  progression: {
    title: { en: "Macro F1, model by model", fr: "Macro F1, modèle par modèle" },
    note: {
      en: "Macro F1 averages the F1 score of every toxicity label, so rare labels count as much as frequent ones.",
      fr: "Le Macro F1 fait la moyenne du score F1 de chaque étiquette de toxicité : les étiquettes rares comptent autant que les fréquentes.",
    },
    steps: ["xlmr-teacher", "darija-teacher", "student"],
    max: 1,
  },

  context: {
    en: "Moroccan Darija is a dialect with no native dataset for this task. AMAN is a supervised team project from the AI & Data Science curriculum that treats toxic-speech detection as a multi-label problem: one comment can be toxic in several ways at once.",
    fr: "Le darija marocain est un dialecte sans jeu de données natif pour cette tâche. AMAN est un projet d’équipe encadré du cursus IA & Data Science qui traite la détection de discours toxiques comme un problème multi-label : un même commentaire peut être toxique de plusieurs façons à la fois.",
  },
  problem: {
    en: "A large multilingual transformer is a natural starting point, but it is slow and heavy to serve. The goal: accurate multi-label detection in Darija with a model small and fast enough to deploy.",
    fr: "Un grand transformer multilingue est un point de départ naturel, mais il est lent et lourd à servir. L’objectif : une détection multi-label précise en darija, avec un modèle assez léger et rapide pour être déployé.",
  },

  architecture: {
    caption: {
      en: "Teacher–student pipeline, from a multilingual model to a deployable classifier.",
      fr: "Pipeline enseignant–élève, d’un modèle multilingue à un classifieur déployable.",
    },
    compact: [
      "XLM-R",
      { en: "Darija teacher", fr: "Enseignant darija" },
      "Distillation",
      "DistilBERT",
      { en: "Inference", fr: "Inférence" },
    ],
    stages: [
      {
        nodes: [
          {
            kicker: { en: "Data", fr: "Données" },
            title: { en: "Comment corpus", fr: "Corpus de commentaires" },
            detail: { en: "Teacher training data", fr: "Données d’entraînement de l’enseignant" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Teacher", fr: "Enseignant" },
            title: "XLM-RoBERTa",
            detail: { en: "Multilingual, fine-tuned", fr: "Multilingue, fine-tuné" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Teacher", fr: "Enseignant" },
            title: { en: "Darija teacher", fr: "Enseignant darija" },
            detail: { en: "Trained for Darija", fr: "Entraîné pour le darija" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Transfer", fr: "Transfert" },
            title: { en: "Knowledge distillation", fr: "Distillation des connaissances" },
            detail: { en: "Teacher → student", fr: "Enseignant → élève" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Student", fr: "Élève" },
            title: "DistilBERT",
            detail: { en: "Compact and faster", fr: "Compact et plus rapide" },
            metric: { en: "Macro F1 0.895", fr: "Macro F1 0,895" },
            emphasis: true,
          },
        ],
      },
      {
        nodes: [
          { kicker: { en: "Serving", fr: "Service" }, title: "FastAPI + Docker" },
          { kicker: { en: "App", fr: "Interface" }, title: { en: "Streamlit inference", fr: "Inférence Streamlit" } },
        ],
      },
    ],
  },

  // Team scope only: the README, CV and LinkedIn don't document an individual task split.
  team: {
    en: "Team project (4 members) focused on Moroccan Darija toxic-speech detection using transformer fine-tuning, knowledge distillation and an inference application. The work progressed from XLM-RoBERTa and a Darija teacher to a distilled DistilBERT student.",
    fr: "Projet d’équipe (4 personnes) consacré à la détection de discours toxiques en darija marocain, avec fine-tuning de Transformers, distillation de connaissances et application d’inférence. Le projet va de XLM-RoBERTa et d’un enseignant darija à un élève DistilBERT distillé.",
  },

  decisions: [
    {
      title: { en: "Start from a multilingual model", fr: "Partir d’un modèle multilingue" },
      body: {
        en: "The first teacher is a multilingual XLM-RoBERTa, fine-tuned on the comment corpus.",
        fr: "Le premier enseignant est un XLM-RoBERTa multilingue, fine-tuné sur le corpus de commentaires.",
      },
    },
    {
      title: { en: "A Darija-focused teacher", fr: "Un enseignant dédié au darija" },
      body: {
        en: "Before distillation, a second teacher trained for Darija improved on the initial multilingual one.",
        fr: "Avant la distillation, un second enseignant entraîné pour le darija a amélioré les résultats du premier, multilingue.",
      },
    },
    {
      title: { en: "Teacher–student distillation", fr: "Distillation enseignant–élève" },
      body: {
        en: "The Darija teacher’s knowledge is distilled into a compact DistilBERT student.",
        fr: "Les connaissances de l’enseignant darija sont distillées dans un élève DistilBERT compact.",
      },
    },
    {
      title: { en: "Multi-label output", fr: "Une sortie multi-label" },
      body: {
        en: "Each comment can carry several labels at once, rather than a single toxic / not-toxic verdict.",
        fr: "Chaque commentaire peut porter plusieurs étiquettes à la fois, plutôt qu’un simple verdict toxique / non toxique.",
      },
    },
  ],

  results: [
    {
      en: "Macro F1 improved at every step, from the first teacher to the distilled student",
      fr: "Le Macro F1 progresse à chaque étape, du premier enseignant à l’élève distillé",
    },
    {
      en: "DistilBERT student — reported as 4.2× smaller and 4× faster than its teacher",
      fr: "Élève DistilBERT — rapporté comme 4,2× plus léger et 4× plus rapide que son enseignant",
    },
    {
      en: "Served through FastAPI and Docker, with a Streamlit inference app",
      fr: "Servi via FastAPI et Docker, avec une application d’inférence Streamlit",
    },
  ],

  technologies: ["Python", "PyTorch", "Hugging Face Transformers", "scikit-learn", "FastAPI", "Docker", "Streamlit"],
  tags: [
    "NLP",
    "Darija",
    { en: "Knowledge distillation", fr: "Distillation des connaissances" },
    { en: "Multi-label classification", fr: "Classification multi-label" },
    "Transformers",
  ],
  links: { github: "https://github.com/AchrafAbde/aman-toxic-speech-detection" },

  seo: {
    description: {
      en: "Case study: multi-label toxic speech detection in Moroccan Darija. Macro F1: XLM-R teacher 0.623, Darija teacher 0.815, distilled DistilBERT student 0.895.",
      fr: "Étude de cas : détection multi-label de discours toxiques en darija marocain. Macro F1 : enseignant XLM-R 0,623, enseignant darija 0,815, élève DistilBERT distillé 0,895.",
    },
  },
};
