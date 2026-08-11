import { Communication } from '../types';

export const initialCommunications: Communication[] = [
  // 2026
  {
    id: "comm-2026-1",
    title: "Optimizing visuospatial working memory through adaptive digital learning: behavioral and EEG evidence",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Yian, T. R.", "Ouattara, S."],
    type: "poster",
    conference: "FENS Forum 2026",
    organizer: "Federation of European Neuroscience Societies (FENS)",
    location: "Barcelona",
    country: "Spain",
    dates: "6-10 July 2026",
    year: 2026,
    url: "https://world-wide.org/fens-26/optimizing-visuospatial-working-memory-addc440c",
    abstract: {
      fr: "Présentation au FENS Forum 2026 à Barcelone. Nous démontrons l'efficacité de l'apprentissage numérique adaptatif sur la mémoire de travail visuospatiale, étayée par des enregistrements EEG des bandes alpha/thêta.",
      en: "Presented at FENS Forum 2026 in Barcelona. Demonstrating the efficacy of adaptive digital learning systems on visuospatial working memory backed by parieto-occipital alpha/theta EEG power analysis."
    },
    keywords: ["FENS 2026", "Barcelona", "EEG", "Visuospatial Working Memory", "Adaptive Learning"],
    posterUrl: "https://world-wide.org/fens-26/optimizing-visuospatial-working-memory-addc440c"
  },
  {
    id: "comm-2026-2",
    title: "Impact d’un système d’apprentissage adaptatif sur les capacités cognitives des étudiants",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Ouattara, S."],
    type: "oral",
    conference: "Colloque international des 60 ans de la Bibliothèque Universitaire de l’UCAD",
    organizer: "Université Cheikh Anta Diop de Dakar (UCAD)",
    location: "Dakar",
    country: "Senegal",
    dates: "14-16 avril 2026",
    year: 2026,
    abstract: {
      fr: "Communication orale présentant les résultats de l'implémentation de la plateforme adaptive NeuroscIA sur les performances cognitives, la vitesse d'encodage et la rétention d'information chez les étudiants universitaires.",
      en: "Oral presentation detailing adaptive NeuroscIA platform deployment and its impact on university students' cognitive load, encoding speed, and information retention."
    },
    keywords: ["UCAD Dakar", "Learning Systems", "Cognitive Capacity", "Adaptive AI", "Higher Education"]
  },
  {
    id: "comm-2026-3",
    title: "Classification des signaux EEG par Deep Learning : Perspectives pour le diagnostic précoce neurologique",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Ouattara, S."],
    type: "oral",
    conference: "Journées Doctorales de l’Institut Pasteur de Côte d’Ivoire",
    organizer: "Institut Pasteur de Côte d'Ivoire",
    location: "Abidjan",
    country: "Côte d'Ivoire",
    dates: "25-27 mars 2026",
    year: 2026,
    abstract: {
      fr: "Présentation des architectures de Deep Learning (CNN-LSTM & Transformers) appliquées au filtrage et à la classification automatique des états cérébraux pathologiques ou normaux à partir de signaux EEG.",
      en: "Presentation of Deep Learning architectures (CNN-LSTM & Transformers) applied to filtering and automatic classification of pathological vs healthy brain states from raw EEG signals."
    },
    keywords: ["Institut Pasteur", "Deep Learning", "EEG Classification", "Early Diagnosis", "Neuroscience"]
  },
  {
    id: "comm-2026-4",
    title: "Corrélats électrophysiologiques de l'apprentissage sur écran : Analyse des profils oscillatoires des dynamiques pariéto-occipitales en mémoire de travail",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Yian, T. R.", "Ouattara, S."],
    type: "oral",
    conference: "7ème édition des Journées Scientifiques du CAMES (JSDC)",
    organizer: "CAMES & Université de Lomé",
    location: "Lomé",
    country: "Togo",
    dates: "09-12 mars 2026",
    year: 2026,
    abstract: {
      fr: "Analyse approfondie des variations spectrales de la puissance Alpha (8-12 Hz) et Thêta (4-8 Hz) dans les électrodes O1, O2, P3, P4 lors d'exercices de mémoire visuospatiale sur écran tactile.",
      en: "Detailed spectral power analysis of parieto-occipital Alpha (8-12 Hz) and Theta (4-8 Hz) power variations in O1, O2, P3, P4 leads during touchscreen visual memory tasks."
    },
    keywords: ["CAMES 2026", "Lomé Togo", "Parieto-Occipital", "Alpha Power", "Theta Synchronization", "EEG"]
  },

  // 2025
  {
    id: "comm-2025-1",
    title: "Approche Neuro-éducative de l’intelligence artificielle adaptative pour la personnalisation des apprentissages",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Ouattara, S."],
    type: "oral",
    conference: "Colloque scientifique international Chaire UNESCO IAHSO",
    organizer: "Chaire UNESCO IAHSO & UVCI",
    location: "Abidjan",
    country: "Côte d'Ivoire",
    dates: "04-05 décembre 2025",
    year: 2025,
    abstract: {
      fr: "Cadre méthodologique combinant la théorie de la charge cognitive et les modèles d'IA pour adapter dynamiquement la difficulté des tâches pédagogiques aux ressources attentionnelles de l'apprenant.",
      en: "Methodological framework combining cognitive load theory and generative AI models to dynamically adjust instructional difficulty based on real-time learner attentional metrics."
    },
    keywords: ["Chaire UNESCO", "Neuroeducation", "Adaptive AI", "Personalized Learning", "UVCI"]
  },
  {
    id: "comm-2025-2",
    title: "Impact des vagues de chaleur sur la santé mentale et les fonctions cognitives en Afrique : une revue systématique",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Badie, G. J.", "Ouattara, S."],
    type: "oral",
    conference: "Forum Africain sur le Climat (FAC 2025)",
    organizer: "PTR Changement Climatique CAMES & UFHB",
    location: "Abidjan",
    country: "Côte d'Ivoire",
    dates: "28-30 juillet 2025",
    year: 2025,
    abstract: {
      fr: "Revue systématique mettant en évidence les effets des températures extrêmes sur les fonctions exécutives, l'irritabilité, le stress thermique et les admissions en psychiatrie en Afrique subsaharienne.",
      en: "Systematic review highlighting extreme ambient heat impacts on executive functions, attentional fatigue, thermal stress, and psychiatric vulnerability across Sub-Saharan Africa."
    },
    keywords: ["Climate Change", "FAC 2025", "Heatwaves", "Mental Health", "Cognitive Function", "One Health"]
  },
  {
    id: "comm-2025-3",
    title: "Automatic classification of brain states from EEG signals: an AI and neuroscience approach",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Ouattara, S."],
    type: "keynote",
    conference: "Student Symposium on Clinical Research",
    organizer: "Abidjan Clinical Research Network",
    location: "Abidjan",
    country: "Côte d'Ivoire",
    dates: "June 2025",
    year: 2025,
    abstract: {
      fr: "Modélisation basée sur le Machine Learning pour discriminer les états de fatigue attentionnelle, de surcharge cognitive et de concentration optimale à partir de signaux EEG 14 canaux.",
      en: "Machine Learning pipeline discriminating attentional fatigue, cognitive overload, and peak focus states from 14-channel EEG recordings."
    },
    keywords: [ "Clinical Research", "EEG Signal Classification", "Machine Learning", "Cognitive Load"]
  },
  {
    id: "comm-2025-4",
    title: "Optimisation de la recherche en Afrique par l’IA : Classification des signaux EEG via le Machine Learning",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Yian, T. R.", "Ouattara, N."],
    type: "oral",
    conference: "Colloque International L'Afrique à l'ère de L'IA (RSS-PASRES)",
    organizer: "PASRES & Université Polytechnique de San Pédro",
    location: "San Pédro",
    country: "Côte d'Ivoire",
    dates: "6-9 mai 2025",
    year: 2025,
    halUrl: "https://hal.science/hal-05310406",
    abstract: {
      fr: "Publication dans les Actes de Colloque PASRES (pp. 173-184). Proposition d'un pipeline d'apprentissage automatique open-source adapté aux équipements EEG à bas coût pour la recherche neuroscientifique en Afrique.",
      en: "Published in PASRES Conference Proceedings (pp. 173-184). Open-source ML pipeline optimized for low-cost EEG hardware tailored for African neuroscientific research laboratories."
    },
    keywords: ["PASRES", "San Pédro", "HAL", "EEG Classification", "Machine Learning", "Open Science"]
  },
  {
    id: "comm-2025-5",
    title: "Intégration numérique et impacts cognitifs sur les apprenants : étude comparative entre milieux urbains et ruraux en Côte d’Ivoire",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Ouattara, S."],
    type: "oral",
    conference: "2e Congrès Scientifique international BIORESEARCH 2025",
    organizer: "INP-HB",
    location: "Yamoussoukro",
    country: "Côte d'Ivoire",
    dates: "7-9 mai 2025",
    year: 2025,
    abstract: {
      fr: "Comparaison des compétences de mémoire visuospatiale chez 240 élèves de zones rurales (Yamoussoukro/Koumassi) et urbaines (Abidjan) exposés aux outils numériques d'apprentissage.",
      en: "Fieldwork comparing visuospatial memory scores among 240 primary students from rural versus urban schools exposed to educational tablets in Côte d'Ivoire."
    },
    keywords: ["BIORESEARCH 2025", "INP-HB", "Urban vs Rural", "Digital Integration", "Cognitive Equity"]
  },

  // 2024
  {
    id: "comm-2024-1",
    title: "Écrans et mémoire de travail : impacts de l'apprentissage sur support numérique sur la cognition",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Ouattara, N.", "Yian, T. R.", "Doubran, P. J.", "Ouattara, S."],
    type: "oral",
    conference: "Colloque Jeunes Chercheurs 'Créativité, Innovation, Éthique'",
    organizer: "Université Paris 8",
    location: "Saint-Denis / Paris",
    country: "France",
    dates: "28 novembre 2024",
    year: 2024,
    abstract: {
      fr: "Présentation des résultats expérimentaux sur les compromis de vitesse-précision et la sélectivité attentionnelle lors de la lecture d'apprentissage sur écran vs papier chez de jeunes adultes et écoliers.",
      en: "Experimental results highlighting speed-accuracy trade-offs and attentional capture during screen-based reading tasks vs printed paper displays."
    },
    keywords: ["Paris 8", "France", "Jeunes Chercheurs", "Écrans", "Mémoire de travail"]
  },
  {
    id: "comm-2024-2",
    title: "L'approche One Health face à l'éducation numérique : Évaluation de l'impact des écrans sur la mémoire de travail",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Doubran, P. J.", "Ouattara, S."],
    type: "oral",
    conference: "Conférence One Health AFROHUN-CI",
    organizer: "AFROHUN-CI & UFHB",
    location: "Abidjan",
    country: "Côte d'Ivoire",
    dates: "19-20 novembre 2024",
    year: 2024,
    abstract: {
      fr: "Analyse intersectorielle (One Health) associant santé mentale de l'enfant, bien-être numérique, temps d'exposition aux écrans et dynamique familiale en Côte d'Ivoire.",
      en: "Intersectoral One Health analysis connecting child cognitive health, digital wellbeing, screen time limits, and family dynamics in Ivorian communities."
    },
    keywords: ["One Health", "AFROHUN", "Child Health", "Digital Wellbeing", "UFHB"]
  },
  {
    id: "comm-2024-3",
    title: "Utilisation des écrans dans l'enseignement supérieur en Afrique : Effets sur la mémorisation des étudiants",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Yian, T. R.", "Doubran, P. J.", "Ouattara, N."],
    type: "oral",
    conference: "Colloque scientifique international AfricaDigitalEdu 2024",
    organizer: "Université Virtuelle de Côte d'Ivoire (UVCI)",
    location: "Abidjan",
    country: "Côte d'Ivoire",
    dates: "17-18 octobre 2024",
    year: 2024,
    abstract: {
      fr: "Étude menée auprès de 350 étudiants d'université évaluant l'efficacité de la prise de notes sur ordinateur/tablette par rapport à la prise de notes manuscrite sur la rétention d'information à long terme.",
      en: "Empirical study among 350 university students comparing digital note-taking vs handwritten notes on conceptual retention during complex lectures."
    },
    keywords: ["AfricaDigitalEdu 2024", "UVCI", "Higher Education", "Note Taking", "Memory Retention"]
  },
  {
    id: "comm-2024-4",
    title: "Influence de l’utilisation des écrans comme support d’apprentissage sur la mémoire de travail",
    authors: ["Ouattara, Y.", "Yao, K. M.", "Ouattara, S."],
    type: "oral",
    conference: "Congrès International de Recherche Pluridisciplinaire",
    organizer: "Centre de Recherche Ibn Khaldoun",
    location: "Marrakech",
    country: "Morocco",
    dates: "5-7 juillet 2024",
    year: 2024,
    abstract: {
      fr: "Communication internationale à Marrakech synthétisant les premières données comportementales du projet de thèse sur les métriques de rappel libre et de rappel indice selon le support.",
      en: "International congress presentation in Marrakech delivering early behavioral data on free vs cued recall tasks under screen display conditions."
    },
    keywords: ["Marrakech", "Morocco", "Ibn Khaldoun", "Cognitive Psychology", "Working Memory"]
  }
];
