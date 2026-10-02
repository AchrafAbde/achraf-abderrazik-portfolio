import type { CaseStudyProject } from "../types";

// Sources: CV (EN/FR) — Projects; README trendradar (~179,000 tweets, connectors, Streamlit).
export const trendradar: CaseStudyProject = {
  slug: "trendradar",
  caseStudy: true,
  featured: true,
  title: "TrendRadar",
  kind: "academic",
  badge: { en: "Academic · Team of 4", fr: "Académique · Équipe de 4" },
  category: { en: "Machine learning · Online learning", fr: "Machine learning · Apprentissage en ligne" },
  year: 2026,

  subtitle: { en: "Early detection of viral trends", fr: "Détection précoce de tendances virales" },
  summary: {
    en: "A machine-learning system that predicts which keywords will go viral, from their very first minutes of activity.",
    fr: "Un système de machine learning qui prédit quels mots-clés deviendront viraux, dès leurs toutes premières minutes d’activité.",
  },

  facts: [
    { label: { en: "Context", fr: "Contexte" }, value: { en: "Team project · 4 members", fr: "Projet d’équipe · 4 personnes" } },
    { label: { en: "Year", fr: "Année" }, value: "2026" },
    { label: { en: "Models", fr: "Modèles" }, value: "XGBoost · River ARF" },
    { label: { en: "Learning", fr: "Apprentissage" }, value: { en: "Offline + online", fr: "Hors ligne + en ligne" } },
  ],

  metrics: [
    {
      id: "roc-auc",
      value: { en: "0.921", fr: "0,921" },
      label: { en: "ROC-AUC", fr: "ROC-AUC" },
      detail: { en: "XGBoost", fr: "XGBoost" },
      meaning: {
        en: "How well the model ranks keywords that went viral above those that didn’t. 0.5 is chance; 1.0 is perfect.",
        fr: "Capacité du modèle à classer les mots-clés devenus viraux au-dessus des autres. 0,5 correspond au hasard ; 1,0 à la perfection.",
      },
      count: { to: 0.921, decimals: 3 },
    },
    {
      id: "signal",
      value: "15 min",
      label: { en: "Early signal", fr: "Signal précoce" },
      detail: { en: "Input window", fr: "Fenêtre d’entrée" },
      meaning: {
        en: "All the model sees: a keyword’s first 15 minutes of activity.",
        fr: "Tout ce que voit le modèle : les 15 premières minutes d’activité d’un mot-clé.",
      },
    },
    {
      id: "horizon",
      value: "12 h",
      label: { en: "Prediction horizon", fr: "Horizon de prédiction" },
      detail: { en: "Virality predicted", fr: "Viralité prédite" },
      meaning: {
        en: "What it predicts: the keyword’s virality over the next 12 hours.",
        fr: "Ce qu’il prédit : la viralité du mot-clé sur les 12 heures suivantes.",
      },
    },
    {
      id: "tweets",
      value: { en: "~179k", fr: "~179 k" },
      label: { en: "Tweets", fr: "Tweets" },
      detail: { en: "Training data", fr: "Données d’entraînement" },
      meaning: {
        en: "Tweets the XGBoost model was trained on.",
        fr: "Tweets sur lesquels le modèle XGBoost a été entraîné.",
      },
    },
  ],
  cardMetrics: ["signal", "horizon"],

  context: {
    en: "A team project from the AI & Data Science curriculum focused on predictive modelling and online learning. TrendRadar watches the first minutes of a keyword’s activity on social platforms and estimates how viral it will become.",
    fr: "Un projet d’équipe du cursus IA & Data Science, centré sur la modélisation prédictive et l’apprentissage en ligne. TrendRadar observe les premières minutes d’activité d’un mot-clé sur les réseaux sociaux et estime à quel point il deviendra viral.",
  },
  problem: {
    en: "By the time a trend is obviously viral, it’s too late to act on it. And social media behaviour keeps shifting, so a model trained once slowly goes stale.",
    fr: "Quand une tendance est manifestement virale, il est trop tard pour agir. Et les comportements sur les réseaux sociaux évoluent sans cesse : un modèle entraîné une seule fois devient peu à peu obsolète.",
  },

  architecture: {
    caption: {
      en: "From the first minutes of activity to a prediction that keeps learning.",
      fr: "Des premières minutes d’activité à une prédiction qui continue d’apprendre.",
    },
    compact: [
      { en: "Early activity", fr: "Activité précoce" },
      { en: "Features", fr: "Variables" },
      "XGBoost",
      { en: "Prediction", fr: "Prédiction" },
      { en: "Online learning", fr: "Apprentissage en ligne" },
    ],
    stages: [
      {
        nodes: [
          {
            kicker: "Sources",
            title: { en: "Social connectors", fr: "Connecteurs sociaux" },
            detail: "Bluesky · Mastodon",
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Window", fr: "Fenêtre" },
            title: { en: "First 15 minutes", fr: "15 premières minutes" },
            detail: { en: "Early activity signal", fr: "Signal d’activité précoce" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Features", fr: "Variables" },
            title: { en: "Extraction + normalisation", fr: "Extraction + normalisation" },
          },
        ],
      },
      {
        nodes: [
          {
            kicker: { en: "Model", fr: "Modèle" },
            title: "XGBoost",
            detail: { en: "Tuned with Optuna", fr: "Optimisé avec Optuna" },
            metric: { en: "ROC-AUC 0.921", fr: "ROC-AUC 0,921" },
            emphasis: true,
          },
        ],
      },
      { nodes: [{ kicker: { en: "Output", fr: "Sortie" }, title: { en: "12-hour virality", fr: "Viralité à 12 h" } }] },
      {
        nodes: [
          { kicker: { en: "Online", fr: "En ligne" }, title: "River Adaptive Random Forest" },
          { kicker: { en: "Drift", fr: "Dérive" }, title: { en: "Concept-drift detection", fr: "Détection de dérive conceptuelle" } },
        ],
      },
    ],
  },

  // Team scope only: the README, CV and LinkedIn don't document an individual task split.
  team: {
    en: "Team project (4 members) focused on early viral-trend prediction from social-media activity, combining XGBoost, feature engineering, hyperparameter optimisation, and online learning with concept-drift detection.",
    fr: "Projet d’équipe (4 personnes) consacré à la détection précoce de tendances virales à partir de signaux des réseaux sociaux, combinant XGBoost, ingénierie des variables, optimisation des hyperparamètres et apprentissage en ligne avec détection de dérive.",
  },

  decisions: [
    {
      title: { en: "Predict from the earliest signal", fr: "Prédire dès le premier signal" },
      body: {
        en: "Predictions come from the opening minutes of activity, so they arrive while a trend is still early enough to act on.",
        fr: "Les prédictions s’appuient sur les premières minutes d’activité : elles arrivent quand la tendance est encore assez précoce pour agir.",
      },
    },
    {
      title: { en: "Gradient-boosted trees, tuned with Optuna", fr: "Des arbres boostés, optimisés avec Optuna" },
      body: {
        en: "XGBoost handles the offline prediction; Optuna searches hyperparameters and feature configurations.",
        fr: "XGBoost assure la prédiction hors ligne ; Optuna explore les hyperparamètres et les configurations de variables.",
      },
    },
    {
      title: { en: "Keep learning from new data", fr: "Continuer d’apprendre des nouvelles données" },
      body: {
        en: "A River Adaptive Random Forest learns online from new data and detects concept drift when patterns change.",
        fr: "Un River Adaptive Random Forest apprend en ligne à partir des nouvelles données et détecte la dérive conceptuelle quand les schémas changent.",
      },
    },
    {
      title: { en: "Pluggable data connectors", fr: "Des connecteurs de données modulaires" },
      body: {
        en: "Bluesky and Mastodon connectors are built on a shared base connector, keeping data collection separate from the models.",
        fr: "Les connecteurs Bluesky et Mastodon reposent sur un connecteur de base commun, ce qui sépare la collecte de données des modèles.",
      },
    },
  ],

  results: [
    {
      en: "Virality predicted from a keyword’s opening minutes, while the trend is still early",
      fr: "Viralité prédite dès les premières minutes d’un mot-clé, quand la tendance est encore naissante",
    },
    {
      en: "An online model that adapts as social media behaviour shifts",
      fr: "Un modèle en ligne qui s’adapte à l’évolution des comportements sur les réseaux sociaux",
    },
    { en: "A Streamlit application on top of the models", fr: "Une application Streamlit au-dessus des modèles" },
  ],

  technologies: ["Python", "XGBoost", "scikit-learn", "Optuna", "River", "pandas", "NumPy", "Streamlit"],
  tags: [
    "Machine learning",
    { en: "Online learning", fr: "Apprentissage en ligne" },
    { en: "Concept drift", fr: "Dérive conceptuelle" },
    "XGBoost",
    { en: "Social media", fr: "Réseaux sociaux" },
  ],
  links: { github: "https://github.com/AchrafAbderrazik/trendradar" },

  seo: {
    description: {
      en: "Case study: predicting a keyword’s 12-hour virality from its first 15 minutes, with XGBoost on ~179,000 tweets (ROC-AUC 0.921) and online learning with drift detection.",
      fr: "Étude de cas : prédire la viralité d’un mot-clé à 12 h à partir de ses 15 premières minutes, avec XGBoost sur ~179 000 tweets (ROC-AUC 0,921) et un apprentissage en ligne avec détection de dérive.",
    },
  },
};
