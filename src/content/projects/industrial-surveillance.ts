import type { SecondaryProject } from "../types";

// Source: GitHub README (written in French: "Système de Surveillance Industrielle").
export const industrialSurveillance: SecondaryProject = {
  slug: "industrial-surveillance",
  caseStudy: false,
  title: { en: "Industrial Surveillance System", fr: "Système de surveillance industrielle" },
  kind: "project",
  badge: { en: "Full-stack project", fr: "Projet full-stack" },
  category: { en: "Real-time monitoring · AI", fr: "Supervision en temps réel · IA" },
  description: {
    en: "Real-time monitoring of industrial machines with AI-based anomaly detection, live alerts and multi-level user access.",
    fr: "Surveillance en temps réel de machines industrielles, avec détection d’anomalies par IA, alertes en direct et accès utilisateurs à plusieurs niveaux.",
  },
  highlights: [
    { en: "Real-time machine & sensor monitoring", fr: "Surveillance des machines & capteurs en temps réel" },
    { en: "AI-based anomaly detection", fr: "Détection d’anomalies par IA" },
    { en: "Live alerts over WebSockets", fr: "Alertes en direct via WebSockets" },
    { en: "Role-based user access", fr: "Accès utilisateurs par rôles" },
  ],
  technologies: ["React", "Material UI", "Socket.IO", "Flask", "Flask-SocketIO", "SQLAlchemy", "JWT"],
  links: { github: "https://github.com/AchrafAbde/surveillance-industrielle" },
};
