import type { SecondaryProject } from "../types";

// Source: GitHub README and code (EF Core with SQL Server).
export const carRentalSystem: SecondaryProject = {
  slug: "car-rental-system",
  caseStudy: false,
  title: "Car Rental Management System",
  kind: "academic",
  badge: { en: "Academic project", fr: "Projet académique" },
  category: { en: "Web application · .NET", fr: "Application web · .NET" },
  description: {
    en: "A layered .NET solution: an ASP.NET Core MVC web app for customers and a Windows Forms desktop app for administration, on an Entity Framework Core data layer.",
    fr: "Une solution .NET en couches : une application web ASP.NET Core MVC pour les clients et une application de bureau Windows Forms pour l’administration, sur une couche de données Entity Framework Core.",
  },
  highlights: [
    { en: "Authentication & customer profiles", fr: "Authentification & profils clients" },
    { en: "Vehicles, reservations & payments", fr: "Véhicules, réservations & paiements" },
    { en: "Rental history & maintenance alerts", fr: "Historique de location & alertes de maintenance" },
    { en: "Administration dashboard", fr: "Tableau de bord d’administration" },
  ],
  technologies: ["C#", "ASP.NET Core MVC", "Entity Framework Core", "SQL Server", "Windows Forms"],
  links: { github: "https://github.com/AchrafAbderrazik/car-rental-system" },
};
