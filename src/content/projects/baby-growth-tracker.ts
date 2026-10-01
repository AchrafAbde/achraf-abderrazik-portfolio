import type { SecondaryProject } from "../types";

// Source: GitHub README.
export const babyGrowthTracker: SecondaryProject = {
  slug: "baby-growth-tracker",
  caseStudy: false,
  title: "Baby Growth Tracker",
  kind: "academic",
  badge: { en: "Academic project", fr: "Projet académique" },
  category: { en: "Mobile application", fr: "Application mobile" },
  description: {
    en: "A mobile app with a REST back end for tracking a baby’s growth, milestones, nutrition, vaccinations and appointments.",
    fr: "Une application mobile avec un back-end REST pour suivre la croissance d’un bébé, ses étapes de développement, son alimentation, ses vaccins et ses rendez-vous.",
  },
  highlights: [
    { en: "React Native / Expo mobile app", fr: "Application mobile React Native / Expo" },
    { en: "Laravel REST API", fr: "API REST Laravel" },
    { en: "User authentication", fr: "Authentification des utilisateurs" },
    { en: "Growth, vaccination & appointment tracking", fr: "Suivi de la croissance, des vaccins & des rendez-vous" },
  ],
  technologies: ["React Native", "Expo", "Laravel", "PHP", "MySQL"],
  links: { github: "https://github.com/AchrafAbde/baby-growth-tracker" },
};
