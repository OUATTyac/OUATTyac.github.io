import { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: "proj-neuroscia",
    title: "NeuroscIA",
    subtitle: {
      fr: "Plateforme IA & EEG d'Apprentissage Adaptatif & Mesure de la Charge Cognitive",
      en: "AI & EEG Adaptive Learning & Cognitive Load Monitoring Platform"
    },
    tagline: "Brain-Computer Interface and Generative AI for Personalized Education in Africa",
    category: "ai_neuro",
    status: "active",
    period: "2024 - Present",
    description: {
      fr: "NeuroscIA est un système d'apprentissage adaptatif combinant la capture de signaux EEG 14 canaux, l'analyse spectrale en temps réel de la puissance alpha/thêta pariéto-occipital et des algorithmes de Machine Learning pour ajuster dynamiquement la difficulté des exercices et prévenir la fatigue attentionnelle.",
      en: "NeuroscIA is an adaptive learning framework combining 14-channel EEG signal processing, real-time parieto-occipital alpha/theta spectral power feedback, and ML algorithms to dynamically adjust educational content difficulty and prevent cognitive overload."
    },
    architecture: [
      "EEG Acquisition Layer (Emotiv / Cyton BCI 14-channel)",
      "MNE-Python Real-time Preprocessing (Bandpass filter 0.5-45Hz, ICA Artifact removal)",
      "Feature Extraction Engine (PSD Alpha 8-12Hz, Theta 4-8Hz, Engagement Index)",
      "ML Classifier (LightGBM & CNN-LSTM for Cognitive State Classification)",
      "FastAPI & React Web Interface with Adaptive Content Generation"
    ],
    keyFeatures: {
      fr: [
        "Classification en temps réel des états de fatigue et de concentration",
        "Ajustement automatique du rythme des cours et des quiz",
        "Visualisation des cartes topographiques EEG pour les chercheurs",
        "Tableau de bord de suivi de la mémoire de travail visuospatiale"
      ],
      en: [
        "Real-time classification of mental fatigue and optimal focus states",
        "Automatic pacing and difficulty adaptation for educational tasks",
        "Topographic EEG map visualizer for cognitive researchers",
        "Visuospatial working memory tracking analytics dashboard"
      ]
    },
    technologies: ["Python", "MNE-Python", "PyTorch", "FastAPI", "React", "Tailwind CSS", "Scikit-Learn"],
    githubUrl: "https://github.com/ouattyac95/neuroscia-eeg-adaptive",
    videoUrl: "https://www.youtube.com/watch?v=demo-neuroscia",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-agrikora",
    title: "AGRIKORA",
    subtitle: {
      fr: "Assistant IA & Plateforme d'Agriculture de Précision pour Cooperatives Ouest-Africaines",
      en: "Precision Agriculture AI Assistant for West African Cooperatives"
    },
    tagline: "Machine Learning, Weather API & Automated Advisory for Smallholder Farmers",
    category: "agri_tech",
    status: "completed",
    period: "2025",
    description: {
      fr: "Développé lors du Hackathon 2025, AGRIKORA est une solution d'IA pour l'agriculture de précision en Afrique de l'Ouest. Il intègre des modèles de prédiction de rendement par Machine Learning, des API météorologiques en temps réel, un chatbot d'assistance agricole et un générateur de rapports PDF pour les coopératives.",
      en: "Developed for the 2025 Hackathon, AGRIKORA is a precision agriculture AI solution tailored for West Africa. It features yield prediction ML models, live weather API integrations, an interactive agricultural chatbot, and automated PDF report generation."
    },
    architecture: [
      "Flask REST API Backend (Python, Scikit-learn, Pandas)",
      "Regression ML Models (Yield Prediction, Soil Anomaly Detection)",
      "Next.js / React Frontend with Tailwind CSS & Mobile-First Design",
      "PDF Generation Engine (ReportLab) for Cooperative Audit Summaries",
      "Deployment on Render & Vercel Cloud Infrastructures"
    ],
    keyFeatures: {
      fr: [
        "Prédiction du rendement des cultures (cacao, anacarde, maïs) par ML",
        "Détection précoce d'anomalies de précipitations et maladies végétales",
        "Chatbot conversationnel en langues locales pour conseils aux planteurs",
        "Génération automatique de bulletins de santé de la coopérative"
      ],
      en: [
        "Crop yield prediction models (cocoa, cashew, maize) using regression ML",
        "Early warning system for rainfall anomalies and crop diseases",
        "Interactive conversational assistant providing tailored agronomic advice",
        "Automated PDF cooperative health & yield summary report generator"
      ]
    },
    technologies: ["Python", "Flask", "Scikit-learn", "Next.js", "TailwindCSS", "Render", "Vercel"],
    githubUrl: "https://github.com/ouattyac95/agrikora-ai-agri",
    demoUrl: "https://agrikora.vercel.app",
    devpostUrl: "https://devpost.com/software/agrikora",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-jobpilotai",
    title: "JobpilotAI",
    subtitle: {
      fr: "Assistant IA Full-Stack pour Entrepreneurs et Artisans Africains",
      en: "Full-Stack AI Assistant for African Artisans & Entrepreneurs"
    },
    tagline: "Automating Business Invoicing, Marketing & Customer Workflows with Gemini API",
    category: "ai_neuro",
    status: "completed",
    period: "2025",
    description: {
      fr: "Application web full-stack conçue pour moderniser et automatiser les tâches administratives (devis, factures, relances) et marketing (publicités, slogans, posts réseaux sociaux) des artisans et TPME en Afrique.",
      en: "Full-stack web application designed to automate business workflows (invoices, estimates, reminders) and digital marketing generation for informal sector artisans and SMEs in Africa."
    },
    architecture: [
      "Frontend: Flutter / Dart cross-platform mobile & web client",
      "Backend: Python FastAPI microservice architecture",
      "LLM Integration: Google Gemini 1.5 API for advice & marketing copywriting",
      "Database & Auth: Firebase Auth & Firestore Document Database",
      "Document Generation: ReportLab for instant PDF invoice rendering"
    ],
    keyFeatures: {
      fr: [
        "Génération instantanée de devis et factures pro conformes aux devises locales",
        "Chatbot conseiller en stratégie commerciale basé sur Gemini API",
        "Création automatique de slogans et visuels marketing pour WhatsApp & Facebook",
        "Exportation PDF haute définition et envoi direct aux clients"
      ],
      en: [
        "Instant creation of professional invoices and estimates in local currencies",
        "Gemini API powered business advisor chatbot",
        "Automated marketing copy & social media post generation for artisans",
        "One-click high-resolution PDF download and client messaging"
      ]
    },
    technologies: ["Python", "FastAPI", "Flutter", "Google Gemini API", "Firebase", "Render"],
    githubUrl: "https://github.com/ouattyac95/jobpilot-ai",
    devpostUrl: "https://devpost.com/software/jobpilotai",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-neuromatch",
    title: "Visual Cortex Neural Dynamics",
    subtitle: {
      fr: "Analyse Computationnelle de 50 000+ Neurones du Cortex Visuel de la Souris",
      en: "Computational Analysis of 50,000+ Mouse Visual Cortex Neurons"
    },
    tagline: "Neuromatch Academy Intensive Project in Encoding/Decoding GLMs",
    category: "comp_neuro",
    status: "completed",
    period: "2025",
    description: {
      fr: "Projet de recherche intensif de 128 heures (Neuromatch Academy 2025) analysant l'activité de plus de 50 000 neurones enregistrés par microscopie biphotonique. Modélisation GLM de l'encodage et du décodage des stimuli visuels.",
      en: "Intensive 128-hour computational neuroscience research project (Neuromatch Academy 2025) analyzing 50,000+ two-photon calcium imaging neural recordings to fit encoding/decoding GLMs."
    },
    architecture: [
      "Large-scale Two-Photon Calcium Imaging Neural Dataset (Allen Brain Observatory)",
      "Supervised & Unsupervised Dimensionality Reduction (PCA, t-SNE, UMAP)",
      "Generalized Linear Models (Poisson GLMs with ElasticNet regularization)",
      "Receptive Field & Functional Specialization Mapping across visual areas V1 & aHV"
    ],
    keyFeatures: {
      fr: [
        "Décodage de l'orientation visuelle à partir des tirs neuronaux",
        "Mise en évidence de la spécialisation fonctionnelle de la région aHV",
        "Implémentation complète de pipelines Python (SciPy, Scikit-learn, Matplotlib)"
      ],
      en: [
        "Visual stimulus orientation decoding from population neural spiking",
        "Functional specialization mapping of higher visual area aHV",
        "Modular open-source Python analysis notebooks"
      ]
    },
    technologies: ["Python", "NumPy", "SciPy", "Scikit-Learn", "GLM", "Neuromatch"],
    githubUrl: "https://github.com/ouattyac95/neuromatch-visual-cortex-glm",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "proj-heatwaves",
    title: "Heatwaves & Mental Health in Africa",
    subtitle: {
      fr: "Impact du Réchauffement Climatique sur les Fonctions Exécutives et la Cognition",
      en: "Impact of Climate Heatwaves on Executive Functions & Mental Wellbeing"
    },
    tagline: "Systematic Review & Climate-Cognition Assessment across Sub-Saharan Africa",
    category: "health_climate",
    status: "ongoing",
    period: "2024 - Present",
    description: {
      fr: "Projet transversal évaluant comment l'exposition répétée aux vagues de chaleur altère les capacités d'attention soutenue, la mémoire de travail et l'équilibre émotionnel en Afrique tropicale.",
      en: "Cross-disciplinary climate health project studying how chronic extreme heat stress compromises sustained attention, working memory capacity, and psychological resilience in Sub-Saharan Africa."
    },
    architecture: [
      "Systematic Review Protocol (PRISMA guidelines for climate-health studies)",
      "Meteorological Data Collection (ERA5-Land reanalysis heat index)",
      "Cognitive Battery Testing (Digit Span, Corsi Block Tapping, N-Back tasks)",
      "Statistical Modeling in R (Mixed-effects linear regression)"
    ],
    keyFeatures: {
      fr: [
        "Revue de littérature systématique d'Afrique subsaharienne",
        "Corrélation entre indice de chaleur (WBGT) et performances attentionnelles",
        "Recommandations de politiques publiques pour le bien-être au travail"
      ],
      en: [
        "Systematic literature review covering African climate health studies",
        "Empirical correlation between Wet Bulb Globe Temperature and cognitive fatigue",
        "Policy recommendations for occupational heat safety and cognitive ergonomics"
      ]
    },
    technologies: ["R", "PRISMA", "Python", "GIS Data", "Psychometrics"],
    publicationsRelated: ["pub-2026-3", "comm-2025-2"],
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800"
  }
];
