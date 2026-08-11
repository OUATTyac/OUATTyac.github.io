import { Dataset } from '../types';

export const initialDatasets: Dataset[] = [
  {
    id: "ds-eeg-screen-wm",
    title: "EEG Visuospatial Working Memory & Screen Learning Dataset (Primary School & Higher Ed)",
    doi: "10.5281/zenodo.10842910",
    zenodoUrl: "https://zenodo.org/record/10842910",
    githubUrl: "https://github.com/ouattyac95/eeg-screen-working-memory-data",
    description: {
      fr: "Enregistrements EEG 14 canaux (Emotiv EPOC+) et logs comportementaux de 240 écoliers et étudiants lors de tâches de mémoire de travail visuospatiale (papier vs écran). Comprend les données spectrales PSD Alpha/Thêta et métriques socio-économiques.",
      en: "14-channel EEG recordings (Emotiv EPOC+) and behavioral logs from 240 primary school children and undergraduates performing visuospatial working memory tasks on paper vs screens. Includes spectral Alpha/Theta PSD features and SES metadata."
    },
    sampleSize: "N = 240 subjects (Primary & Undergraduates)",
    variables: [
      "Reaction Time (ms)",
      "Accuracy Rate (%)",
      "Alpha Power Spectral Density (8-12 Hz)",
      "Theta Power Spectral Density (4-8 Hz)",
      "Socioeconomic Status Index",
      "Urban/Rural Location Code"
    ],
    license: "Creative Commons Attribution 4.0 International (CC-BY 4.0)",
    year: 2026
  },
  {
    id: "ds-heatwaves-cognition",
    title: "Sub-Saharan Africa Heatwaves & Cognitive Load Systematic Review Database",
    doi: "10.5281/zenodo.10912001",
    zenodoUrl: "https://zenodo.org/record/10912001",
    githubUrl: "https://github.com/ouattyac95/heatwave-cognition-review-db",
    description: {
      fr: "Base de données structurée de la revue systématique regroupant 48 études africaines reliant la température ambiante extrême, l'indice WBGT, les performances attentionnelles et les admissions psychiatriques.",
      en: "Structured systematic review dataset aggregating 48 Sub-Saharan African studies linking extreme ambient temperature, WBGT index, attentional fatigue, and psychiatric admissions."
    },
    sampleSize: "48 Studies / 12,400 Total Data Records",
    variables: [
      "Temperature (°C)",
      "Humidity (%)",
      "Cognitive Domain (Attention, Executive, Memory)",
      "Effect Size (Hedges' g)",
      "Region / Country Code"
    ],
    license: "Open Data Commons Open Database License (ODbL)",
    year: 2025
  },
  {
    id: "ds-neuromatch-mouse-v1",
    title: "Mouse Visual Cortex 50,000+ Neuron Calcium Imaging Filtered Dataset",
    zenodoUrl: "https://zenodo.org/record/10542100",
    githubUrl: "https://github.com/ouattyac95/neuromatch-visual-cortex-glm",
    description: {
      fr: "Jeu de données prétraité de tirs neuronaux (microscopie biphotonique) couvrant les aires visuelles V1 et aHV chez la souris lors de tâches de discrimination d'orientation visuelle.",
      en: "Preprocessed two-photon calcium imaging neural spiking dataset covering visual areas V1 and aHV in mice during visual orientation discrimination tasks."
    },
    sampleSize: "50,000+ Neurons / 12 Mice Cohort",
    variables: [
      "Fluorescence Trace (dF/F)",
      "Inferred Spike Rates",
      "Stimulus Orientation Angle (°)",
      "Behavioral Lick Response",
      "Anatomic Coordinates (x, y, z)"
    ],
    license: "Open Science CC-BY 4.0",
    year: 2025
  }
];
