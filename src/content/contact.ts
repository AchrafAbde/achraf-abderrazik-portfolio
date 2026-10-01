import type { ContactContent } from "./types";

/**
 * The Contact section and the project inquiry form.
 * Your email address and links are in src/content/site.ts.
 */
export const contact: ContactContent = {
  heading: {
    index: "05",
    eyebrow: { en: "Contact", fr: "Contact" },
    title: { en: "Have a system *you want to build?*", fr: "Vous avez un système *à construire ?*" },
    intro: {
      en: "Tell me what you’re trying to build, automate or improve. I’ll come back with clear next steps.",
      fr: "Dites-moi ce que vous voulez construire, automatiser ou améliorer. Je reviens vers vous avec des prochaines étapes claires.",
    },
  },

  nextSteps: {
    title: { en: "What happens next", fr: "La suite" },
    steps: [
      {
        en: "I read your message and reply with questions or first thoughts.",
        fr: "Je lis votre message et je vous réponds avec des questions ou de premières pistes.",
      },
      {
        en: "We go through the problem, your data and your constraints on a short call.",
        fr: "Nous faisons le point sur le problème, vos données et vos contraintes lors d’un court appel.",
      },
      {
        en: "You get a clear plan: scope, architecture, timeline and cost.",
        fr: "Vous recevez un plan clair : périmètre, architecture, calendrier et coût.",
      },
    ],
  },

  direct: {
    title: { en: "Prefer to reach out directly?", fr: "Vous préférez me contacter directement ?" },
    bookCall: { en: "Book a call", fr: "Réserver un appel" },
    copy: { en: "Copy email address", fr: "Copier l’adresse e-mail" },
    copied: { en: "Email address copied", fr: "Adresse e-mail copiée" },
    copiedStatus: { en: "Email address copied to clipboard", fr: "Adresse e-mail copiée dans le presse-papiers" },
  },

  form: {
    label: { en: "Project inquiry", fr: "Demande de projet" },
    name: { en: "Name", fr: "Nom" },
    email: { en: "Email", fr: "E-mail" },
    company: { en: "Company", fr: "Entreprise" },
    optional: { en: "Optional", fr: "Facultatif" },
    topics: {
      legend: { en: "What is it about?", fr: "De quoi s’agit-il ?" },
      optional: { en: "(optional)", fr: "(facultatif)" },
      // `value` is what the form sends (your webhook receives it as is).
      options: [
        { value: "AI / LLM system", label: { en: "AI / LLM system", fr: "Système IA / LLM" } },
        { value: "AI automation", label: { en: "AI automation", fr: "Automatisation IA" } },
        { value: "Backend / API", label: { en: "Backend / API", fr: "Backend / API" } },
        { value: "Web application", label: { en: "Web application", fr: "Application web" } },
        { value: "Not sure yet", label: { en: "Not sure yet", fr: "Je ne sais pas encore" } },
      ],
    },
    message: {
      label: { en: "Project details", fr: "Détails du projet" },
      placeholder: {
        en: "What are you trying to build, automate or improve? Which data, tools or systems are involved today?",
        fr: "Que voulez-vous construire, automatiser ou améliorer ? Quels données, outils ou systèmes sont concernés aujourd’hui ?",
      },
    },
    honeypot: { en: "Website", fr: "Site web" },
    privacy: {
      en: "Your details are only used to reply to your inquiry.",
      fr: "Vos informations servent uniquement à répondre à votre demande.",
    },
    submit: { en: "Send message", fr: "Envoyer le message" },
    sending: { en: "Sending…", fr: "Envoi…" },
    errors: {
      name: { en: "Please enter your name.", fr: "Veuillez indiquer votre nom." },
      email: { en: "Please enter a valid email address.", fr: "Veuillez saisir une adresse e-mail valide." },
      companyTooLong: {
        en: "Please keep this under {max} characters.",
        fr: "Merci de rester sous les {max} caractères.",
      },
      messageTooShort: {
        en: "Please add a few more details (at least {min} characters).",
        fr: "Ajoutez quelques détails (au moins {min} caractères).",
      },
      messageTooLong: {
        en: "Please keep your message under {max} characters.",
        fr: "Merci de limiter votre message à {max} caractères.",
      },
    },
    success: {
      title: { en: "Thank you, {name}.", fr: "Merci, {name}." },
      body: {
        en: "Your message is on its way. I’ll get back to you at the email address you provided.",
        fr: "Votre message est bien parti. Je vous répondrai à l’adresse e-mail indiquée.",
      },
      again: { en: "Send another message", fr: "Envoyer un autre message" },
    },
    failure: {
      unavailable: {
        en: "Online sending isn’t available right now.",
        fr: "L’envoi en ligne n’est pas disponible pour le moment.",
      },
      failed: { en: "Your message couldn’t be sent.", fr: "Votre message n’a pas pu être envoyé." },
      fallback: {
        en: "Your details are saved below, so you can send them by email in one click.",
        fr: "Vos informations sont conservées : vous pouvez les envoyer par e-mail en un clic.",
      },
      retry: { en: "Please try again in a few minutes.", fr: "Veuillez réessayer dans quelques minutes." },
      sendByEmail: { en: "Send by email instead", fr: "Envoyer par e-mail" },
    },
    // The email prepared when online sending fails. Labels include their colon.
    mailto: {
      subject: { en: "Project inquiry from {name}", fr: "Demande de projet de {name}" },
      name: { en: "Name:", fr: "Nom :" },
      email: { en: "Email:", fr: "E-mail :" },
      company: { en: "Company:", fr: "Entreprise :" },
      topics: { en: "Interested in:", fr: "Besoins :" },
    },
  },
};
