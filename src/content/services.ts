import type { ServicesContent } from "./types";

/**
 * The Services section. Each service lists its related case studies
 * automatically: a project names the services it proves in its `services`
 * field (src/content/projects/).
 * Source of truth: CV (EN/FR, 2026) and public GitHub repositories.
 */
export const services: ServicesContent = {
  heading: {
    index: "02",
    eyebrow: { en: "Services", fr: "Services" },
    title: {
      en: "From the model *to the product around it.*",
      fr: "Du modèle *au produit qui l’entoure.*",
    },
    intro: {
      en: "A model is only useful once it’s part of a system people can rely on. I work across the whole of it: the model, the API around it, the data underneath, the automation that feeds it and the interface on top.",
      fr: "Un modèle n’est utile qu’une fois intégré à un système fiable. Je travaille sur l’ensemble : le modèle, l’API qui l’entoure, les données en dessous, l’automatisation qui l’alimente et l’interface au-dessus.",
    },
  },

  related: { en: "Related case studies", fr: "Études de cas associées" },

  items: [
    {
      id: "ai-llm-systems",
      title: { en: "AI / LLM Systems", fr: "Systèmes IA / LLM" },
      description: {
        en: "LLM integrations, structured extraction, NLP, model inference and intelligent applications.",
        fr: "Intégrations LLM, extraction structurée, NLP, inférence de modèles et applications intelligentes.",
      },
      capabilities: [
        { en: "LLM integration & tool use", fr: "Intégration LLM & tool use" },
        { en: "Structured extraction", fr: "Extraction structurée" },
        { en: "Multilingual NLP, including Darija", fr: "NLP multilingue, darija compris" },
        { en: "Fine-tuning & distillation", fr: "Fine-tuning & distillation" },
        { en: "Model evaluation", fr: "Évaluation de modèles" },
      ],
    },
    {
      id: "ai-automation",
      title: { en: "AI Automation", fr: "Automatisation IA" },
      description: {
        en: "Business workflows, lead processing, message automation, APIs, n8n and intelligent routing.",
        fr: "Workflows métier, traitement de leads, automatisation des messages, API, n8n et routage intelligent.",
      },
      capabilities: [
        { en: "Lead processing", fr: "Traitement de leads" },
        { en: "Messaging channels & webhooks", fr: "Canaux de messagerie & webhooks" },
        { en: "n8n workflows", fr: "Workflows n8n" },
        { en: "Intelligent routing", fr: "Routage intelligent" },
        { en: "Idempotent, debounced pipelines", fr: "Pipelines idempotents et temporisés" },
      ],
    },
    {
      id: "backend-apis",
      title: { en: "Backend & APIs", fr: "Backend & API" },
      description: {
        en: "FastAPI, Flask, REST APIs, databases, authentication and scalable services.",
        fr: "FastAPI, Flask, API REST, bases de données, authentification et services scalables.",
      },
      capabilities: [
        { en: "FastAPI & Flask", fr: "FastAPI & Flask" },
        { en: "PostgreSQL & MySQL data models", fr: "Modèles de données PostgreSQL & MySQL" },
        { en: "JWT & role-based access", fr: "JWT & accès par rôles" },
        { en: "Model-serving APIs", fr: "API de model serving" },
        { en: "Docker & Nginx", fr: "Docker & Nginx" },
      ],
    },
    {
      id: "intelligent-web-apps",
      title: { en: "Intelligent Web Applications", fr: "Applications web intelligentes" },
      description: {
        en: "React and TypeScript interfaces connected to real backend systems: dashboards, internal tools and AI-powered features.",
        fr: "Interfaces React et TypeScript connectées à de vrais systèmes backend : tableaux de bord, outils internes et fonctionnalités dopées à l’IA.",
      },
      capabilities: [
        { en: "React & TypeScript", fr: "React & TypeScript" },
        { en: "Dashboards & admin panels", fr: "Tableaux de bord & back-offices" },
        { en: "Role-based interfaces", fr: "Interfaces par rôles" },
        { en: "Real-time updates", fr: "Mises à jour en temps réel" },
        { en: "Interfaces for ML models", fr: "Interfaces pour modèles ML" },
      ],
    },
  ],
};
