import type { CaseStudyProject } from "../types";

// Source: CV (EN/FR) — Projects, Distributed Model Serving Service. No public repository.
export const distributedModelServing: CaseStudyProject = {
  slug: "distributed-model-serving",
  caseStudy: true,
  featured: true,
  // The French CV's own title for the project.
  title: { en: "Distributed Model Serving", fr: "Service de Model Serving distribué" },
  kind: "academic",
  badge: { en: "Academic · Team of 5", fr: "Académique · Équipe de 5" },
  category: { en: "MLOps · Distributed systems", fr: "MLOps · Systèmes distribués" },
  year: 2026,
  services: ["backend-apis"],

  subtitle: { en: "Replicated inference API", fr: "API d’inférence répliquée" },
  summary: {
    en: "A scalable inference API: a FastAPI model service replicated behind an Nginx gateway, with a versioned model registry.",
    fr: "Une API d’inférence scalable : un service de modèle FastAPI répliqué derrière une passerelle Nginx, avec un registre de modèles versionné.",
  },

  facts: [
    {
      label: { en: "Context", fr: "Contexte" },
      value: { en: "Distributed Systems module · 5 members", fr: "Module Systèmes Distribués · 5 personnes" },
    },
    { label: { en: "Year", fr: "Année" }, value: "2026" },
    { label: { en: "Deployment", fr: "Déploiement" }, value: "Docker Compose" },
  ],

  metrics: [
    {
      id: "valid",
      value: { en: "100%", fr: "100 %" },
      label: { en: "Valid responses", fr: "Réponses valides" },
      detail: { en: "100 requests · concurrency 20", fr: "100 requêtes · concurrence 20" },
      meaning: {
        en: "Every request in the documented load test returned a valid response: 100 requests, 20 at a time.",
        fr: "Chaque requête du test de charge documenté a reçu une réponse valide : 100 requêtes, 20 à la fois.",
      },
      count: { to: 100, suffix: { en: "%", fr: " %" } },
    },
    {
      id: "replicas",
      value: "2",
      label: { en: "FastAPI replicas", fr: "Répliques FastAPI" },
      detail: { en: "Behind one gateway", fr: "Derrière une passerelle" },
      meaning: {
        en: "Identical copies of the model service, with Nginx as the single entry point in front of them.",
        fr: "Des copies identiques du service de modèle, avec Nginx comme point d’entrée unique devant elles.",
      },
      count: { to: 2 },
    },
  ],
  cardMetrics: ["valid", "replicas"],

  context: {
    en: "A five-person team project for the Distributed Systems module: turning a trained machine-learning model into an inference service designed to scale horizontally.",
    fr: "Un projet d’équipe de cinq personnes pour le module Systèmes Distribués : transformer un modèle de machine learning entraîné en un service d’inférence conçu pour monter en charge horizontalement.",
  },
  problem: {
    en: "A single inference server is both a bottleneck and a single point of failure. The goal: an API that scales by adding instances, with every model version tracked.",
    fr: "Un serveur d’inférence unique est à la fois un goulot d’étranglement et un point de défaillance unique. L’objectif : une API qui monte en charge en ajoutant des instances, avec chaque version de modèle suivie.",
  },

  architecture: {
    caption: {
      en: "Two FastAPI replicas behind an Nginx gateway, orchestrated with Docker Compose.",
      fr: "Deux répliques FastAPI derrière une passerelle Nginx, orchestrées avec Docker Compose.",
    },
    compact: ["Client", "Nginx", "FastAPI ×2", { en: "Model registry", fr: "Registre de modèles" }],
    stages: [
      { nodes: [{ kicker: "Client", title: { en: "Inference requests", fr: "Requêtes d’inférence" } }] },
      {
        nodes: [
          {
            kicker: { en: "Gateway", fr: "Passerelle" },
            title: "Nginx",
            detail: { en: "Single entry point", fr: "Point d’entrée unique" },
            emphasis: true,
          },
        ],
      },
      {
        nodes: [
          { kicker: "Service", title: "FastAPI · instance 1" },
          { kicker: "Service", title: "FastAPI · instance 2" },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Registry", fr: "Registre" },
            title: { en: "Versioned models", fr: "Modèles versionnés" },
            detail: { en: "Model registry", fr: "Registre de modèles" },
          },
        ],
      },
    ],
  },

  // Team scope only: the CV and LinkedIn don't document an individual task split.
  team: {
    en: "Team project (5 members) focused on scalable model inference, with a FastAPI service replicated across two instances behind an Nginx gateway, Docker Compose deployment and a versioned model registry.",
    fr: "Projet d’équipe (5 personnes) consacré à une API d’inférence scalable, avec un service FastAPI répliqué sur deux instances derrière une passerelle Nginx, un déploiement Docker Compose et un registre de modèles versionné.",
  },

  decisions: [
    {
      title: { en: "Scale out, not up", fr: "Monter en charge horizontalement" },
      body: {
        en: "The FastAPI service runs as identical replicas, so capacity grows by adding instances rather than a bigger server.",
        fr: "Le service FastAPI tourne en répliques identiques : la capacité augmente en ajoutant des instances plutôt qu’avec un serveur plus puissant.",
      },
    },
    {
      title: { en: "One gateway", fr: "Une seule passerelle" },
      body: {
        en: "Nginx is the single entry point; clients never address a replica directly.",
        fr: "Nginx est le point d’entrée unique ; les clients ne s’adressent jamais directement à une réplique.",
      },
    },
    {
      title: { en: "Versioned models", fr: "Des modèles versionnés" },
      body: {
        en: "A model registry versions every model the service can load.",
        fr: "Un registre de modèles versionne chaque modèle que le service peut charger.",
      },
    },
    {
      title: { en: "Reproducible deployment", fr: "Un déploiement reproductible" },
      body: {
        en: "Docker Compose defines the gateway and the replicas as one reproducible stack.",
        fr: "Docker Compose définit la passerelle et les répliques comme une seule pile reproductible.",
      },
    },
  ],

  results: [
    {
      en: "A complete serving stack, from gateway to model registry, reproducible with Docker Compose",
      fr: "Une pile de serving complète, de la passerelle au registre de modèles, reproductible avec Docker Compose",
    },
    {
      en: "Load-tested under concurrent requests, with the results documented",
      fr: "Testée en charge sous requêtes concurrentes, avec des résultats documentés",
    },
  ],

  technologies: ["Python", "FastAPI", "Nginx", "Docker Compose", "scikit-learn"],
  tags: [
    "MLOps",
    "Model serving",
    { en: "Distributed systems", fr: "Systèmes distribués" },
    "FastAPI",
    "Nginx",
  ],

  seo: {
    description: {
      en: "Case study: a model-serving API with two FastAPI replicas behind an Nginx gateway and a versioned model registry: 100% valid responses at 100 requests, concurrency 20.",
      fr: "Étude de cas : une API de model serving avec deux répliques FastAPI derrière une passerelle Nginx et un registre de modèles versionné : 100 % de réponses valides à 100 requêtes, concurrence 20.",
    },
  },
};
