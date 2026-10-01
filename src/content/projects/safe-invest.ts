import type { CaseStudyProject } from "../types";

// Source: CV (EN/FR) — Professional experience, Safe Invest Property.
export const safeInvest: CaseStudyProject = {
  slug: "safe-invest",
  caseStudy: true,
  featured: true,
  title: "Safe Invest AI Lead Automation",
  shortTitle: "Safe Invest",
  kind: "real-world",
  badge: { en: "Real-world · Internship", fr: "Projet réel · Stage" },
  category: { en: "AI automation · LLM", fr: "Automatisation IA · LLM" },
  year: 2026,
  services: ["ai-llm-systems", "ai-automation"],

  subtitle: { en: "Multilingual LLM lead pipeline", fr: "Pipeline LLM multilingue de leads" },
  summary: {
    en: "Messages prospects send on WhatsApp, Instagram or Messenger, in French, English or Darija, are turned into structured CRM leads automatically.",
    fr: "Les messages que les prospects envoient sur WhatsApp, Instagram ou Messenger, en français, en anglais ou en darija, deviennent automatiquement des leads CRM structurés.",
  },

  facts: [
    { label: { en: "Organisation", fr: "Organisation" }, value: "Safe Invest Property · Marrakech" },
    {
      label: { en: "Role", fr: "Rôle" },
      value: { en: "AI Engineering Intern · Sole developer", fr: "Stagiaire ingénierie IA · Seul développeur" },
    },
    {
      label: { en: "Timeline", fr: "Période" },
      value: { en: "July – August 2026 · 9 weeks", fr: "Juillet – août 2026 · 9 semaines" },
    },
    {
      label: { en: "Languages", fr: "Langues" },
      value: { en: "French · English · Darija", fr: "Français · anglais · darija" },
    },
  ],

  note: {
    en: "Built during an internship. The agency’s code, data and conversations are confidential and not shown here.",
    fr: "Réalisé pendant un stage. Le code, les données et les conversations de l’agence sont confidentiels et ne sont pas présentés ici.",
  },

  metrics: [
    {
      id: "accuracy",
      value: { en: "98%", fr: "98 %" },
      label: { en: "Extraction accuracy", fr: "Exactitude d’extraction" },
      detail: { en: "96 annotated messages", fr: "96 messages annotés" },
      meaning: {
        en: "How often the extracted lead data matched the annotated reference, measured on 96 messages in French, English and Darija.",
        fr: "Taux de concordance entre les données de lead extraites et la référence annotée, mesuré sur 96 messages en français, en anglais et en darija.",
      },
      count: { to: 98, suffix: { en: "%", fr: " %" } },
    },
    {
      id: "llm-calls",
      value: "≈4×",
      label: { en: "Fewer LLM calls", fr: "Moins d’appels LLM" },
      detail: { en: "Message-burst debouncing", fr: "Temporisation des rafales" },
      meaning: {
        en: "The drop in LLM call volume once messages sent in quick succession were grouped before extraction.",
        fr: "La baisse du volume d’appels LLM une fois les messages envoyés en rafale regroupés avant l’extraction.",
      },
      count: { to: 4, prefix: "≈", suffix: "×" },
    },
    {
      id: "scenarios",
      value: "13/14",
      label: { en: "End-to-end scenarios", fr: "Scénarios de bout en bout" },
      detail: { en: "Validated", fr: "Validés" },
      meaning: {
        en: "Full runs from incoming message to CRM lead, validated after voice-note transcription and lead↔property matching were added.",
        fr: "Parcours complets, du message entrant au lead CRM, validés après l’ajout de la transcription vocale et du matching prospect↔bien.",
      },
    },
    {
      id: "fields",
      value: "9",
      label: { en: "CRM fields per lead", fr: "Champs CRM par lead" },
      detail: { en: "3 computed in code", fr: "Dont 3 calculés en code" },
      meaning: {
        en: "The fields in each CRM record built from a conversation. 3 of them are computed in code rather than by the model.",
        fr: "Les champs de chaque fiche CRM créée à partir d’une conversation. 3 d’entre eux sont calculés en code plutôt que par le modèle.",
      },
      count: { to: 9 },
    },
  ],
  cardMetrics: ["llm-calls", "scenarios"],

  context: {
    en: "Safe Invest Property is a real-estate agency in Marrakech whose prospects write in through WhatsApp, Instagram and Messenger, in French, English and Moroccan Darija. During a 9-week internship I was the sole developer of the system that turns those conversations into CRM leads.",
    fr: "Safe Invest Property est une agence immobilière de Marrakech dont les prospects écrivent via WhatsApp, Instagram et Messenger, en français, en anglais et en darija marocain. Pendant un stage de 9 semaines, j’ai été le seul développeur du système qui transforme ces conversations en leads CRM.",
  },
  problem: {
    en: "Inquiries arrive as free-form conversations: several short messages in a row, voice notes, three languages. Each one has to become a complete, consistent lead record, without creating duplicates when a platform delivers the same webhook twice.",
    fr: "Les demandes arrivent sous forme de conversations libres : plusieurs messages courts d’affilée, des notes vocales, trois langues. Chacune doit devenir une fiche de lead complète et cohérente, sans créer de doublon lorsqu’une plateforme livre deux fois le même webhook.",
  },

  architecture: {
    caption: {
      en: "From three messaging channels to a structured, matched CRM lead.",
      fr: "De trois canaux de messagerie à un lead CRM structuré et associé à un bien.",
    },
    compact: ["Messages", { en: "Debounce", fr: "Temporisation" }, "Claude", "PostgreSQL", { en: "CRM lead", fr: "Lead CRM" }],
    stages: [
      {
        nodes: [
          {
            kicker: { en: "Channels", fr: "Canaux" },
            title: "WhatsApp · Instagram · Messenger",
            detail: { en: "Inbound webhooks", fr: "Webhooks entrants" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Intake", fr: "Réception" },
            title: { en: "Idempotent ingestion", fr: "Ingestion idempotente" },
            detail: {
              en: "Duplicate webhooks absorbed by DB constraints",
              fr: "Doublons de webhooks absorbés par les contraintes de la base",
            },
          },
          {
            kicker: { en: "Buffer", fr: "Tampon" },
            title: { en: "Burst debouncing", fr: "Temporisation des rafales" },
            detail: { en: "One LLM call per burst", fr: "Un appel LLM par rafale" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Voice", fr: "Voix" },
            title: { en: "Voice-note transcription", fr: "Transcription des notes vocales" },
            detail: { en: "Audio to text", fr: "De l’audio au texte" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: "LLM",
            title: { en: "Structured extraction", fr: "Extraction structurée" },
            detail: { en: "Claude API · forced tool use", fr: "API Claude · tool use forcé" },
            metric: { en: "98% accuracy", fr: "98 % d’exactitude" },
            emphasis: true,
          },
          {
            kicker: "Code",
            title: { en: "Deterministic fields", fr: "Champs déterministes" },
            detail: { en: "Computed, not generated", fr: "Calculés, non générés" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Data", fr: "Données" },
            title: "PostgreSQL",
            detail: { en: "5-table schema", fr: "Schéma à 5 tables" },
          },
        ],
      },
      {
        nodes: [
          { kicker: { en: "Match", fr: "Matching" }, title: { en: "Lead ↔ property matching", fr: "Matching prospect ↔ bien" } },
          {
            kicker: { en: "Output", fr: "Sortie" },
            title: { en: "Structured CRM lead", fr: "Lead CRM structuré" },
            emphasis: true,
          },
        ],
      },
    ],
  },

  contribution: {
    en: "Sole developer, end to end: pipeline architecture, the PostgreSQL data model, LLM extraction and its evaluation, voice-note transcription, the lead-to-property matching engine and the production deployment.",
    fr: "Seul développeur, de bout en bout : architecture du pipeline, modèle de données PostgreSQL, extraction LLM et son évaluation, transcription des notes vocales, moteur de matching prospect↔bien et mise en production.",
  },

  decisions: [
    {
      title: { en: "Structured output, not free text", fr: "Une sortie structurée, pas du texte libre" },
      body: {
        en: "The LLM returns each lead through a forced tool call with a fixed schema, so every response maps straight onto CRM fields instead of being parsed out of prose.",
        fr: "Le LLM renvoie chaque lead via un appel d’outil forcé au schéma fixe : chaque réponse correspond directement aux champs du CRM, au lieu d’être extraite d’un texte en prose.",
      },
    },
    {
      title: { en: "Deterministic logic stays in code", fr: "La logique déterministe reste dans le code" },
      body: {
        en: "Fields that follow fixed rules are computed in code rather than generated by the model, which removes a whole class of errors by design.",
        fr: "Les champs qui suivent des règles fixes sont calculés en code plutôt que générés par le modèle, ce qui supprime une classe d’erreurs par conception.",
      },
    },
    {
      title: { en: "Idempotency in the database", fr: "L’idempotence dans la base de données" },
      body: {
        en: "Constraints in the 5-table PostgreSQL schema absorb duplicate webhook deliveries, so a repeated delivery doesn’t create a second lead.",
        fr: "Les contraintes du schéma PostgreSQL à 5 tables absorbent les livraisons de webhooks en double : une livraison répétée ne crée pas de second lead.",
      },
    },
    {
      title: { en: "Debounce message bursts", fr: "Temporiser les rafales de messages" },
      body: {
        en: "Prospects often send several short messages in a row. They are grouped before extraction, so a burst costs one LLM call instead of one per message.",
        fr: "Les prospects envoient souvent plusieurs messages courts d’affilée. Ils sont regroupés avant l’extraction : une rafale coûte un seul appel LLM, au lieu d’un par message.",
      },
    },
  ],

  results: [
    {
      en: "Deployed to production: conversations from three messaging channels become CRM leads automatically",
      fr: "Déployé en production : les conversations de trois canaux de messagerie deviennent automatiquement des leads CRM",
    },
    {
      en: "One pipeline for French, English and Moroccan Darija",
      fr: "Un seul pipeline pour le français, l’anglais et le darija marocain",
    },
    {
      en: "Voice notes transcribed and leads matched to the agency’s properties",
      fr: "Notes vocales transcrites et leads associés aux biens de l’agence",
    },
    {
      en: "Duplicate webhook deliveries absorbed in production by idempotency constraints",
      fr: "Livraisons de webhooks en double absorbées en production par des contraintes d’idempotence",
    },
  ],

  technologies: [
    "Claude API",
    { en: "Structured outputs", fr: "Sorties structurées" },
    "PostgreSQL",
    "Webhooks",
    "WhatsApp · Instagram · Messenger",
  ],
  tags: ["LLM", "NLP", "Claude API", { en: "Lead automation", fr: "Automatisation de leads" }, "Darija"],

  seo: {
    description: {
      en: "Case study: a multilingual LLM pipeline turning WhatsApp, Instagram and Messenger messages into CRM leads, with 98% extraction accuracy in French, English and Darija.",
      fr: "Étude de cas : un pipeline LLM multilingue qui transforme les messages WhatsApp, Instagram et Messenger en leads CRM, avec 98 % d’exactitude d’extraction en français, anglais et darija.",
    },
  },
};
