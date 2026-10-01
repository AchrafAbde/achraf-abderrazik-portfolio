import type { StackContent } from "./types";

/**
 * The Stack section. Only list a technology if it appears in your CV or a
 * public repository. Technology names stay the same in every language.
 */
export const stack: StackContent = {
  heading: {
    index: "04",
    eyebrow: { en: "Stack", fr: "Stack" },
    title: { en: "Tools I build with, *layer by layer.*", fr: "Mes outils, *couche par couche.*" },
    intro: {
      en: "Grouped by where they sit in a system, from the model down to the infrastructure. Everything listed appears in my CV or public repositories.",
      fr: "Regroupés selon leur place dans un système, du modèle jusqu’à l’infrastructure. Tout ce qui figure ici apparaît dans mon CV ou mes dépôts publics.",
    },
  },

  groups: [
    {
      id: "ai-ml",
      label: { en: "AI / ML", fr: "IA / ML" },
      items: ["Python", "PyTorch", "Hugging Face Transformers", "scikit-learn", "XGBoost", "River", "Optuna"],
    },
    {
      id: "llm-automation",
      label: { en: "LLM / Automation", fr: "LLM / Automatisation" },
      items: [
        "Claude API",
        { en: "Tool use & structured outputs", fr: "Tool use & sorties structurées" },
        "Prompt engineering",
        "Embeddings",
        "n8n",
        "Webhooks",
      ],
    },
    {
      id: "backend",
      label: { en: "Backend", fr: "Backend" },
      items: [
        "FastAPI",
        "Flask",
        "Node.js / Express",
        "ASP.NET Core",
        "Laravel",
        { en: "REST APIs", fr: "API REST" },
        "JWT",
        "WebSockets",
      ],
    },
    {
      id: "frontend",
      label: { en: "Frontend", fr: "Frontend" },
      items: ["React", "TypeScript", "JavaScript", "Angular", "React Native", "Streamlit"],
    },
    {
      id: "data",
      label: { en: "Data", fr: "Données" },
      items: ["PostgreSQL", "MySQL", "SQL Server", "SQLite", "TimescaleDB", "Supabase", "pandas", "NumPy"],
    },
    {
      id: "infrastructure",
      label: { en: "Infrastructure", fr: "Infrastructure" },
      items: ["Docker", "Docker Compose", "Nginx", "Linux", "Git / GitHub", "Hugging Face Spaces"],
    },
  ],

  // Source: CV — Technical skills.
  footnote: {
    languagesLabel: { en: "Languages", fr: "Langages" },
    languages: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C#", "C/C++", "PHP"],
    methodsLabel: { en: "Methods", fr: "Méthodes" },
    methods: ["UML", "Scrum / Agile", { en: "Relational modelling", fr: "Modélisation relationnelle" }],
  },
};
