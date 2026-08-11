import { Award } from '../types';

export const initialAwards: Award[] = [
  {
    id: "award-2nd-prize-sscr-2025",
    title: {
      fr: "2e Prix de la Meilleure Communication Orale",
      en: "2nd Prize for Best Oral Communication"
    },
    organization: "Student Symposium on Clinical Research, Abidjan",
    year: 2025,
    category: "prize",
    description: {
      fr: "Décerné pour la présentation remarquable sur la classification automatique des états cérébraux par Machine Learning et signaux EEG.",
      en: "Awarded for outstanding oral presentation on automated brain state classification from EEG signals via machine learning algorithms."
    }
  },
  {
    id: "cert-certiport-ai-2025",
    title: {
      fr: "IT Specialist - Artificial Intelligence (Pearson VUE)",
      en: "IT Specialist - Artificial Intelligence (Pearson VUE)"
    },
    organization: "Certiport (Pearson VUE)",
    year: 2025,
    category: "certification",
    description: {
      fr: "Certification internationale validant la maîtrise du cycle de vie d'un projet d'IA, des modèles ML/DL, du MLOps et des considérations éthiques.",
      en: "International professional certification validating end-to-end AI lifecycle management, ML/DL models, MLOps, and ethical AI deployment."
    },
    credentialUrl: "https://www.credly.com/badges/yacouba-ouattara-ai"
  },
  {
    id: "cert-neuromatch-2025",
    title: {
      fr: "Certificat en Neurosciences Computationnelles (128h)",
      en: "Computational Neuroscience Certificate (128h)"
    },
    organization: "Neuromatch Academy",
    year: 2025,
    category: "certification",
    description: {
      fr: "Programme intensif sélectif de 128 heures sur l'analyse de données neuronales à grande échelle, la modélisation GLM et le décodage cérébral.",
      en: "Selective 128-hour intensive course covering large-scale neural dataset analysis, GLM fitting, and population decoding."
    }
  },
  {
    id: "cert-moodle-teacher-2024",
    title: {
      fr: "Certificat Moodle Teachers",
      en: "Certified Moodle Educator"
    },
    organization: "Impact Formation Consulting",
    year: 2024,
    category: "certification",
    description: {
      fr: "Formation certifiante de 6 semaines sur l'ingénierie pédagogique numérique et l'administration avancée de plateformes Moodle.",
      en: "6-week certified training in digital instructional engineering and advanced Moodle LMS platform administration."
    }
  },
  {
    id: "cert-open-data-2025",
    title: {
      fr: "Certification Science Ouverte pour le Développement (Open Data)",
      en: "Open Science & Open Data for Development Certification"
    },
    organization: "CAFDO / Université Virtuelle du Burkina Faso",
    year: 2025,
    category: "certification",
    description: {
      fr: "Formation certifiante sur la promotion, la structuration, la gouvernance et la valorisation des données de recherche ouvertes.",
      en: "Certification covering open data management, FAIR research data principles, and open science advocacy in Africa."
    }
  },
  {
    id: "cert-tice-2023",
    title: {
      fr: "Certification des Compétences TICE pour l'Enseignement",
      en: "ICT Competencies for Teaching Certification"
    },
    organization: "Cergy-Paris Université - TechSoLab",
    year: 2023,
    category: "certification",
    description: {
      fr: "Validation des aptitudes à concevoir des dispositifs pédagogiques hybrides intégrant les technologies numériques.",
      en: "Validation of competencies in designing blended learning frameworks incorporating digital instructional technologies."
    }
  },
  {
    id: "award-microsoft-mos-master",
    title: {
      fr: "Microsoft Office Specialist (MOS) Expert & Master",
      en: "Microsoft Office Specialist (MOS) Expert & Master"
    },
    organization: "Microsoft Corporation",
    year: 2019,
    category: "certification",
    description: {
      fr: "Plus haut niveau de certification Microsoft validant une maîtrise experte de la suite Office et de la gestion documentaire.",
      en: "Highest level Microsoft certification validating expert mastery in desktop productivity applications and document architecture."
    }
  }
];
