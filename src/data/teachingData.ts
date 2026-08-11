import { Course, Resource } from '../types';

export const initialResources: Resource[] = [
  {
    id: "res-moodle-template",
    title: "Gabarit de Cours Moodle H5P pour Neurosciences",
    type: "moodle_template",
    description: {
      fr: "Template Moodle clés en main avec activités H5P et quiz adaptatifs pour l'enseignement des neurosciences.",
      en: "Turnkey Moodle course template with interactive H5P activities and adaptive quiz modules."
    },
    language: "Moodle MBZ",
    tags: ["Moodle", "H5P", "EdTech"]
  },
  {
    id: "res-r-biostat",
    title: "Script R pour ANOVA & Modèles Mixtes en Biostatistique",
    type: "r_script",
    description: {
      fr: "Script R complet pour le nettoyage de données de santé, l'exécution d'ANOVA à mesures répétées et de modèles linéaires mixtes.",
      en: "Comprehensive R script for biological data wrangling, repeated measures ANOVA, and mixed-effects linear regression modeling."
    },
    language: "R",
    tags: ["R", "Biostatistics", "Tidyverse"]
  },
  {
    id: "res-eeg-pipeline",
    title: "Pipeline MNE-Python de Filtrage EEG Pariéto-Occipital",
    type: "eeg_pipeline",
    description: {
      fr: "Notebook Jupyter de traitement du signal EEG 14 canaux : filtrage passe-bande 0.5-45Hz, ICA et calcul de la densité spectrale Alpha/Thêta.",
      en: "Jupyter Notebook for 14-channel EEG signal processing: 0.5-45Hz bandpass filter, ICA artifact rejection, and Alpha/Theta PSD power spectral density calculations."
    },
    language: "Python",
    tags: ["Python", "MNE", "EEG", "Jupyter"]
  }
];

export const initialCourses: Course[] = [
  {
    id: "crs-neuropsych",
    code: "NEURO-301",
    title: {
      fr: "Neuropsychologie & Méthodes d'Évaluation Cognitives",
      en: "Neuropsychology & Cognitive Assessment Methods"
    },
    level: "Licence 3 & Master 1 Biosciences",
    institution: "Université Félix Houphouët-Boigny (UFHB)",
    hoursPerYear: 120,
    description: {
      fr: "Cours théorique et travaux pratiques sur les fondements de la neuropsychologie humaine, la mesure de la mémoire de travail, les fonctions exécutives et l'administration des batteries de tests psychométriques.",
      en: "Lecture and lab practicals covering human neuropsychology foundations, working memory measurement, executive function testing, and psychometric battery administration."
    },
    topics: [
      "Architecture de la Mémoire de Travail (Baddeley & Hitch)",
      "Évaluation des Déficits Cognitifs",
      "Écrans, Attention et Surcharge Attentionnelle",
      "Tests du Bloc de Corsi, Digit Span et Stroop Task"
    ],
    resourcesUrl: "https://moodle.ufhb.edu.ci/course/view.php?id=neuro301"
  },
  {
    id: "crs-data-analysis",
    code: "BIO-STAT-402",
    title: {
      fr: "Analyse de Données de Santé & Python/R pour la Recherche",
      en: "Health Data Analysis & Python/R for Scientific Research"
    },
    level: "Master 1 & Master 2 Neurosciences & Santé",
    institution: "Université Félix Houphouët-Boigny (UFHB)",
    hoursPerYear: 100,
    description: {
      fr: "Enseignement pratique axé sur la manipulation de bases de données biologiques, la statistique inférentielle (ANOVA, régression multivariée) et la visualisation de données avec Python (Pandas/Seaborn) et R.",
      en: "Hands-on data science course covering biological data wrangling, inferential statistics (ANOVA, multivariate regression), and data visualization with Python and R."
    },
    topics: [
      "Prétraitement de données sous Python (Pandas) & R (Tidyverse)",
      "Tests statistiques paramétriques et non-paramétriques",
      "Modèles Linéaires Généralisés (GLM)",
      "Visualisation graphique publication-ready (Seaborn, ggplot2)"
    ]
  },
  {
    id: "crs-lms-moodle",
    code: "TICE-501",
    title: {
      fr: "Ingénierie Pédagogique Numérique & Administration Moodle",
      en: "Digital Instructional Design & Moodle Administration"
    },
    level: "Formation Continue & Enseignants-Chercheurs",
    institution: "UFHB / Centre de Formation Certifications Microsoft",
    hoursPerYear: 80,
    description: {
      fr: "Formation certifiante destinée aux enseignants et moniteurs pour la création de cours interactifs H5P, l'évaluation des apprentissages et l'intégration de l'IA dans l'ingénierie pédagogique.",
      en: "Professional certification training for faculty on interactive H5P module creation, online assessment design, and generative AI integration in instructional engineering."
    },
    topics: [
      "Conception de parcours d'apprentissage sous Moodle",
      "Exercices interactifs H5P & Scénarisation pédagogique",
      "Suivi analytique et évaluation des compétences",
      "Alignement avec les certifications Microsoft & Certiport"
    ]
  }
];
