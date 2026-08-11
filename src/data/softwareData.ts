import { Software } from '../types';

export const initialSoftware: Software[] = [
  {
    id: "sw-eeg-classifier",
    title: "PyEEG-Classify",
    version: "v1.2.0",
    description: {
      fr: "Package Python open-source pour le prétraitement rapide, l'extraction de caractéristiques spectrales (PSD Alpha/Thêta) et la classification ML des signaux EEG 14-32 canaux.",
      en: "Open-source Python package for rapid EEG preprocessing, spectral feature extraction (Alpha/Theta PSD), and machine learning classification of 14-32 channel recordings."
    },
    techStack: ["Python", "MNE-Python", "Scikit-learn", "SciPy", "NumPy"],
    githubUrl: "https://github.com/ouattyac95/pyeeg-classify",
    pypiUrl: "https://pypi.org/project/pyeeg-classify/",
    docsUrl: "https://pyeeg-classify.readthedocs.io",
    license: "MIT License",
    category: "eeg_analysis"
  },
  {
    id: "sw-agrikora-api",
    title: "Agrikora REST Engine",
    version: "v2.0.1",
    description: {
      fr: "API Flask backend pour la prédiction des rendements agricoles par régression ML, le calcul d'indices météo-climatiques et la génération automatique de bilans coopératifs.",
      en: "Flask REST API backend for crop yield regression ML predictions, agro-meteorological index calculations, and automated cooperative PDF audit generation."
    },
    techStack: ["Python", "Flask", "Scikit-Learn", "ReportLab", "Pandas"],
    githubUrl: "https://github.com/ouattyac95/agrikora-backend",
    docsUrl: "https://agrikora-api.render.com/docs",
    license: "Apache 2.0",
    category: "ml_models"
  },
  {
    id: "sw-jobpilot-fastapi",
    title: "JobpilotAI Microservice",
    version: "v1.0.4",
    description: {
      fr: "Backend FastAPI orchestrant la génération de documents professionnels, le conseil commercial via Google Gemini API et l'authentification Firebase.",
      en: "FastAPI microservice driving commercial invoice generation, Gemini API marketing copywriting, and Firebase user session management."
    },
    techStack: ["Python", "FastAPI", "Google Gemini API", "Firebase Admin", "Pillow"],
    githubUrl: "https://github.com/ouattyac95/jobpilot-backend",
    license: "MIT License",
    category: "web_apps"
  },
  {
    id: "sw-neuromatch-notebooks",
    title: "GLM Visual Cortex Suite",
    version: "v1.0.0",
    description: {
      fr: "Collection de notebooks Jupyter pour l'analyse de données de microscopie biphotonique (50 000+ neurones), l'ajustement de GLMs Poisson et le décodage d'orientation visuelle.",
      en: "Jupyter notebooks suite analyzing 50,000+ two-photon calcium imaging neural recordings, fitting Poisson GLMs, and decoding visual orientation."
    },
    techStack: ["Python", "Jupyter", "SciPy", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/ouattyac95/neuromatch-visual-cortex-glm",
    license: "Open Science CC-BY 4.0",
    category: "educational"
  }
];
