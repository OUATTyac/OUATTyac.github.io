import { ResearchArea } from '../types';

export const initialResearchAreas: ResearchArea[] = [
  {
    id: "area-working-memory",
    title: {
      fr: "Mémoire de Travail Visuospatiale & Écrans",
      en: "Visuospatial Working Memory & Digital Displays"
    },
    iconName: "Brain",
    shortDesc: {
      fr: "Étude des processus d'encodage, de stockage temporaire et de rappel d'informations visuelles lors de l'apprentissage sur supports numériques par rapport au papier.",
      en: "Investigating encoding, storage, and retrieval mechanisms of visual information during digital screen learning compared to traditional paper displays."
    },
    fullDesc: {
      fr: "Ce domaine de recherche explore comment l'utilisation des écrans (tablettes, smartphones, ordinateurs) modifie l'architecture attentionnelle et la mémoire de travail visuospatiale chez les écoliers et les étudiants universitaires. Nous analysons l'influence du milieu géographique (urbain vs rural) et du niveau socio-économique.",
      en: "This research domain explores how screen usage (tablets, smartphones, computers) alters attentional architecture and visuospatial working memory capacity in primary students and undergraduates. We evaluate geographic disparities (urban vs rural) and socioeconomic status (SES) interactions."
    },
    objectives: {
      fr: [
        "Mesurer l'impact du format de présentation (écran vs papier) sur la capacité de rétention",
        "Identifier la charge cognitive induite par les interfaces tactiles interactives",
        "Proposer des recommandations ergonomiques pour l'usage des écrans dans l'enseignement"
      ],
      en: [
        "Quantify presentation format impacts (screen vs paper) on retention performance",
        "Dissect cognitive load variations induced by interactive touchscreen interfaces",
        "Formulate evidence-based guidelines for educational screen ergonomics in schools"
      ]
    },
    methodology: {
      fr: [
        "Tâches de bloc de Corsi informatisées et tests de rétention de patterns visuels",
        "Enregistrements comportementaux (temps de réaction, taux d'erreur, compromis vitesse-précision)",
        "Analyses statistiques inférentielles et modèles linéaires à effets mixtes sous R & Python"
      ],
      en: [
        "Digital Corsi Block Tapping and visual pattern retention battery tests",
        "Behavioral logs (reaction times, error rates, speed-accuracy trade-offs)",
        "Inferential statistics and mixed-effects linear regression modeling in R & Python"
      ]
    },
    tools: ["Psychopy", "Corsi Block Task", "R", "Python", "E-Prime"],
    statsKey: "6 Publications & 8 Communications"
  },
  {
    id: "area-eeg",
    title: {
      fr: "Traitement du Signal EEG & Dynamiques Pariéto-Occipitales",
      en: "EEG Signal Processing & Parieto-Occipital Dynamics"
    },
    iconName: "Activity",
    shortDesc: {
      fr: "Analyse des rythmes cérébraux Alpha (8-12 Hz) et Thêta (4-8 Hz) pour caractériser l'efficacité neurale et la fatigue cognitive.",
      en: "Analyzing Alpha (8-12 Hz) and Theta (4-8 Hz) oscillatory brain dynamics to index neural efficiency and cognitive fatigue."
    },
    fullDesc: {
      fr: "À travers des enregistrements électroencéphalographiques (EEG 14-32 canaux), nous étudions les variations spectrales de densité de puissance (PSD) dans les régions pariéto-occipitales (O1, O2, P3, P4). La désynchronisation de la bande Alpha et la synchronisation Thêta fournissent une mesure directe du recrutement neuronal.",
      en: "Utilizing 14-to-32 channel EEG recordings, we study parieto-occipital power spectral density (PSD) variations in O1, O2, P3, P4 electrode channels. Alpha band desynchronization and Theta event-related synchronization provide direct neural efficiency metrics."
    },
    objectives: {
      fr: [
        "Isoler les marqueurs électrophysiologiques de la charge cognitive visuospatiale",
        "Développer des filtres de débruitage d'artefacts oculaires et musculaires robustes",
        "Caractériser la signature EEG de l'apprentissage adaptatif efficace"
      ],
      en: [
        "Isolate electrophysiological biomarkers of visuospatial cognitive load",
        "Build robust signal preprocessing pipelines for ocular and myogenic artifact rejection",
        "Characterize parieto-occipital EEG signatures during adaptive digital learning"
      ]
    },
    methodology: {
      fr: [
        "Prétraitement par analyse en composantes indépendantes (ICA) sous MNE-Python",
        "Transformée de Fourier Rapide (FFT) et transformée en ondelettes de Morlet",
        "Topographies de puissance spectrale et synchronisation de phase de phase inter-électrode"
      ],
      en: [
        "Artifact removal via Independent Component Analysis (ICA) in MNE-Python",
        "Fast Fourier Transform (FFT) and continuous Morlet wavelet decomposition",
        "Power spectral scalp topographies and phase synchronization analysis"
      ]
    },
    tools: ["MNE-Python", "EEGLAB", "Emotiv EPOC+", "Cyton OpenBCI", "SciPy"],
    statsKey: "FENS Forum 2026 & Pasteur Institute"
  },
  {
    id: "area-ai",
    title: {
      fr: "Intelligence Artificielle & Deep Learning en Neurosciences",
      en: "AI & Deep Learning in Neuroscience"
    },
    iconName: "Cpu",
    shortDesc: {
      fr: "Classification automatique des états cérébraux par Machine Learning et Deep Learning pour le diagnostic neurologique et les interfaces cerveau-machine.",
      en: "Automated brain state classification using Machine Learning and Deep Learning architectures for neurodiagnosis and BCI systems."
    },
    fullDesc: {
      fr: "Nous développons des modèles algorithmiques (CNN, LSTM, LightGBM, Random Forest) capables de classifier automatiquement les signaux EEG et de prédire les intentions ou les états cognitifs (surcharge, concentration, somnolence). Ces modèles ouvrent des voies pour le diagnostic neurologique précoce.",
      en: "We design machine learning models (CNN, LSTM, LightGBM, Random Forest) capable of automated state discrimination from high-dimensional EEG feature spaces. Applications range from early neurological diagnosis to real-time closed-loop BCI systems."
    },
    objectives: {
      fr: [
        "Créer des classifieurs EEG à haute précision adaptés aux signaux réels et bruités",
        "Optimiser les temps de calcul pour des applications BCI en temps réel",
        "Publier des algorithmes open-source légers pour les laboratoires africains"
      ],
      en: [
        "Build high-accuracy EEG classifiers robust to real-world noisy signals",
        "Optimize inference latency for real-time BCI closed-loop deployment",
        "Release open-source lightweight ML pipelines tailored for African institutions"
      ]
    },
    methodology: {
      fr: [
        "Extraction de caractéristiques temporelles, fréquentielles et temps-fréquence",
        "Validation croisée stratifiée K-fold pour prévenir le surapprentissage",
        "Entraînement de réseaux de neurones sous PyTorch et Scikit-learn"
      ],
      en: [
        "Time-domain, spectral, and time-frequency feature extraction",
        "Stratified K-Fold cross-validation to guarantee generalization",
        "Deep neural network training in PyTorch and Scikit-learn"
      ]
    },
    tools: ["PyTorch", "Scikit-Learn", "FastAPI", "TensorFlow", "LightGBM"],
    statsKey: "PASRES 2025 & 2nd Prize SSCR 2025"
  },
  {
    id: "area-neuroeducation",
    title: {
      fr: "Neuroéducation & Apprentissage Adaptatif",
      en: "Neuroeducation & Adaptive Learning"
    },
    iconName: "GraduationCap",
    shortDesc: {
      fr: "Application des principes des neurosciences cognitives à la conception de systèmes d'apprentissage numériques personnalisés.",
      en: "Applying cognitive neuroscience principles to design personalized, adaptive digital learning environments."
    },
    fullDesc: {
      fr: "La neuroéducation cherche à utiliser les connaissances sur le fonctionnement du cerveau (mémoire, attention, plasticité) pour améliorer les méthodes pédagogiques. Nous créons des environnements d'apprentissage qui s'adaptent en temps réel aux besoins et capacités de l'apprenant.",
      en: "Neuroeducation leverages neuroscience insights (memory, attention, neuroplasticity) to revolutionize instructional design. We build learning platforms that dynamically adapt difficulty to match individual learner pace and cognitive bandwidth."
    },
    objectives: {
      fr: [
        "Harmoniser les technologies éducatives avec la théorie de la charge cognitive",
        "Concevoir des interfaces adaptatives pour l'enseignement primaire et supérieur",
        "Former les enseignants et formateurs aux principes de la neuroéducation"
      ],
      en: [
        "Align educational technology with cognitive load theory principles",
        "Design adaptive learning interfaces for primary and higher education",
        "Train educators and instructional designers in evidence-based neuroeducation"
      ]
    },
    methodology: {
      fr: [
        "Expérimentations en classe réelle avec suivi longitudinal",
        "Évaluation de la rétention d'information à 24h, 7 jours et 30 jours",
        "Intégration de tableaux de bord analytiques pour les enseignants"
      ],
      en: [
        "Real-classroom randomized control trials with longitudinal tracking",
        "Memory retention testing at 24-hour, 7-day, and 30-day intervals",
        "Analytics dashboards providing actionable feedback for teachers"
      ]
    },
    tools: ["Moodle", "H5P", "NeuroscIA", "Python", "LMS Integration"],
    statsKey: "UCAD 2026 & Chaire UNESCO 2025"
  },
  {
    id: "area-one-health",
    title: {
      fr: "One Health, Climat & Santé Mentale",
      en: "One Health, Climate & Mental Health"
    },
    iconName: "Globe",
    shortDesc: {
      fr: "Étude des interactions entre les facteurs environnementaux (vagues de chaleur, urbanisation) et la santé cognitive et mentale.",
      en: "Investigating interactions between environmental stress (heatwaves, urbanization) and cognitive health and mental wellbeing."
    },
    fullDesc: {
      fr: "L'approche One Health reconnaît l'interconnexion étroite entre la santé humaine, la santé animale et l'environnement. Nos travaux analysent notamment l'impact des vagues de chaleur sur les fonctions exécutives, l'observance thérapeutique en psychiatrie et les vulnérabilités liées à la vaccination.",
      en: "The One Health paradigm recognizes the intrinsic link between human health, animal health, and environmental ecosystems. Our work focuses on ambient thermal stress impacts on executive function and psychiatric treatment compliance in West Africa."
    },
    objectives: {
      fr: [
        "Évaluer l'impact des vagues de chaleur sur la performance cognitive en Afrique",
        "Identifier les facteurs environnementaux influençant l'adhésion aux soins psychiatriques",
        "Informer les politiques publiques d'adaptation au changement climatique"
      ],
      en: [
        "Quantify extreme heatwave effects on cognitive processing speed and memory",
        "Identify environmental and social drivers of psychiatric treatment non-adherence",
        "Inform climate adaptation public health policies in Sub-Saharan Africa"
      ]
    },
    methodology: {
      fr: [
        "Revues systématiques selon la méthodologie PRISMA",
        "Enquêtes épidémiologiques transversales en milieu hospitalier (Bingerville)",
        "Analyses statistiques multivariées des facteurs de risque"
      ],
      en: [
        "Systematic literature reviews using PRISMA guidelines",
        "Hospital-based cross-sectional epidemiological surveys (Bingerville)",
        "Multivariate statistical regression of clinical and environmental risk factors"
      ]
    },
    tools: ["R", "PRISMA", "SPSS", "Geographic Information Systems"],
    statsKey: "FAC 2025 & AFROHUN One Health 2024"
  }
];
