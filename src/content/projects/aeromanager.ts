import type { CaseStudyProject } from "../types";

// Source: CV (EN/FR) — Professional experience, ONDA (AeroManager project).
// The CV and LinkedIn describe it as an institutional web platform.
export const aeromanager: CaseStudyProject = {
  slug: "aeromanager",
  caseStudy: true,
  featured: true,
  title: "AeroManager",
  kind: "internship",
  badge: { en: "Internship · ONDA", fr: "Stage · ONDA" },
  category: { en: "Web platform · Backend", fr: "Plateforme web · Backend" },
  year: 2025,
  services: ["backend-apis", "intelligent-web-apps"],

  subtitle: { en: "Institutional web platform", fr: "Plateforme web institutionnelle" },
  summary: {
    en: "Flights, hotels, transport, recruitment and public tenders, brought together in one platform for Morocco’s national airports authority.",
    fr: "Vols, hôtels, transports, emploi et appels d’offres, réunis dans une seule plateforme pour l’Office National Des Aéroports.",
  },

  facts: [
    { label: { en: "Organisation", fr: "Organisation" }, value: "ONDA · Office National Des Aéroports" },
    {
      label: { en: "Role", fr: "Rôle" },
      value: {
        en: "Software Engineering Intern · Sole developer",
        fr: "Stagiaire développement logiciel · Seul développeur",
      },
    },
    {
      label: { en: "Timeline", fr: "Période" },
      value: { en: "July – August 2025 · 1 month", fr: "Juillet – août 2025 · 1 mois" },
    },
  ],

  note: {
    en: "An internship project, not ONDA’s public website. Internal screens and data are not shown here.",
    fr: "Un projet de stage, et non le site public de l’ONDA. Les écrans et données internes ne sont pas présentés ici.",
  },

  metrics: [
    {
      id: "interfaces",
      value: "11",
      label: { en: "Interfaces", fr: "Interfaces" },
      detail: { en: "Sole developer", fr: "Seul développeur" },
      meaning: {
        en: "Screens built as the only developer, across the platform’s five domains.",
        fr: "Écrans développés en tant que seul développeur, sur les cinq domaines de la plateforme.",
      },
      count: { to: 11 },
    },
    {
      id: "use-cases",
      value: "20",
      label: { en: "Use cases", fr: "Cas d’utilisation" },
      detail: { en: "UML analysis", fr: "Analyse UML" },
      meaning: {
        en: "Identified in the UML analysis. Each one is covered by role-based access control.",
        fr: "Identifiés lors de l’analyse UML. Chacun est couvert par le contrôle d’accès par rôles.",
      },
      count: { to: 20 },
    },
    {
      id: "access-levels",
      value: "3",
      label: { en: "Access levels", fr: "Niveaux d’accès" },
      detail: { en: "Role-based", fr: "Par rôles" },
      meaning: {
        en: "Permission tiers that set what each kind of user can see and do.",
        fr: "Niveaux de permissions qui définissent ce que chaque type d’utilisateur peut voir et faire.",
      },
      count: { to: 3 },
    },
    {
      id: "airports",
      value: "25",
      label: { en: "Airports in scope", fr: "Aéroports couverts" },
      meaning: { en: "The airports the platform covers.", fr: "Les aéroports couverts par la plateforme." },
      count: { to: 25 },
    },
  ],
  cardMetrics: ["interfaces", "airports"],

  context: {
    en: "During a one-month software engineering internship at ONDA, Morocco’s national airports authority, I was the sole developer of AeroManager, an institutional web platform built for the authority.",
    fr: "Pendant un stage d’un mois en développement logiciel à l’ONDA, l’Office National Des Aéroports, j’ai été le seul développeur d’AeroManager, une plateforme web institutionnelle conçue pour l’Office.",
  },
  problem: {
    en: "Five business domains, several kinds of users and one shared platform: every screen needed clear data, and every action the right permissions.",
    fr: "Cinq domaines métier, plusieurs types d’utilisateurs et une seule plateforme partagée : chaque écran devait présenter des données claires, et chaque action les bonnes permissions.",
  },

  architecture: {
    caption: {
      en: "Decoupled architecture: single-page app, REST API, ORM and relational database.",
      fr: "Architecture découplée : application monopage, API REST, ORM et base de données relationnelle.",
    },
    compact: [
      { en: "React SPA", fr: "SPA React" },
      { en: "Flask API", fr: "API Flask" },
      "JWT · RBAC",
      "SQLAlchemy",
      "MySQL",
    ],
    stages: [
      { nodes: [{ kicker: "Client", title: { en: "React SPA", fr: "SPA React" }, detail: "Vite" }] },
      {
        nodes: [
          {
            kicker: "API",
            title: { en: "Flask REST API", fr: "API REST Flask" },
            detail: {
              en: "Flights · Hotels · Transport · Recruitment · Tenders",
              fr: "Vols · Hôtels · Transports · Emploi · Appels d’offres",
            },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Security", fr: "Sécurité" },
            title: { en: "JWT + role-based access", fr: "JWT + accès par rôles" },
            detail: { en: "Stateless sessions", fr: "Sessions sans état" },
            emphasis: true,
          },
        ],
      },
      { nodes: [{ kicker: "ORM", title: "SQLAlchemy" }] },
      { nodes: [{ kicker: { en: "Data", fr: "Données" }, title: "MySQL" }] },
    ],
  },

  contribution: {
    en: "Sole developer: the complete UML analysis, the decoupled architecture, every interface, the REST API, stateless JWT authentication, role-based access control and the administration dashboard.",
    fr: "Seul développeur : l’analyse UML complète, l’architecture découplée, toutes les interfaces, l’API REST, l’authentification JWT sans état, le contrôle d’accès par rôles et le tableau de bord d’administration.",
  },

  decisions: [
    {
      title: { en: "Decoupled front and back end", fr: "Un front et un back découplés" },
      body: {
        en: "A React (Vite) single-page app consumes a Flask REST API, so the interface and the business logic can evolve independently.",
        fr: "Une application monopage React (Vite) consomme une API REST Flask : l’interface et la logique métier évoluent indépendamment.",
      },
    },
    {
      title: { en: "Stateless authentication", fr: "Une authentification sans état" },
      body: {
        en: "JWT tokens carry the session, so the API keeps no server-side session state.",
        fr: "Les jetons JWT portent la session : l’API ne conserve aucun état de session côté serveur.",
      },
    },
    {
      title: { en: "Role-based access across every use case", fr: "Un accès par rôles sur chaque cas d’utilisation" },
      body: {
        en: "Access rules are defined per role and applied to every use case identified in the UML analysis.",
        fr: "Les règles d’accès sont définies par rôle et appliquées à chaque cas d’utilisation identifié lors de l’analyse UML.",
      },
    },
    {
      title: { en: "One relational model", fr: "Un seul modèle relationnel" },
      body: {
        en: "SQLAlchemy maps the five business domains onto MySQL.",
        fr: "SQLAlchemy relie les cinq domaines métier à MySQL.",
      },
    },
  ],

  results: [
    { en: "Five business domains served by one REST API", fr: "Cinq domaines métier servis par une seule API REST" },
    { en: "Every use case gated by the user’s role", fr: "Chaque cas d’utilisation contrôlé selon le rôle de l’utilisateur" },
    {
      en: "Administration dashboard and complete UML analysis delivered",
      fr: "Tableau de bord d’administration et analyse UML complète livrés",
    },
  ],

  technologies: ["React", "Vite", "Flask", "SQLAlchemy", "MySQL", "JWT", "UML"],
  tags: [
    { en: "Web platform", fr: "Plateforme web" },
    { en: "REST API", fr: "API REST" },
    { en: "Role-based access", fr: "Accès par rôles" },
    "React",
    "Flask",
  ],

  seo: {
    description: {
      en: "Case study: AeroManager, an institutional web platform built as sole developer during an internship at ONDA, with React, a Flask REST API, JWT and role-based access control.",
      fr: "Étude de cas : AeroManager, une plateforme web institutionnelle développée seul pendant un stage à l’ONDA, avec React, une API REST Flask, JWT et un contrôle d’accès par rôles.",
    },
  },
};
