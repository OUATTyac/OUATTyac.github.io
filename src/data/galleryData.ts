import { GalleryPhoto } from '../types';

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: "gal-fens-2026",
    title: {
      fr: "Présentation au FENS Forum 2026 à Barcelone",
      en: "FENS Forum 2026 Poster Session in Barcelona"
    },
    category: "conferences",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    location: "CCIB Barcelona, Spain",
    date: "Juillet 2026",
    caption: {
      fr: "Présentation du poster sur les corrélats EEG de la mémoire de travail devant la communauté neuroscientifique européenne.",
      en: "Poster presentation detailing parieto-occipital EEG correlates of working memory at the FENS Forum 2026."
    }
  },
  {
    id: "gal-ucad-2026",
    title: {
      fr: "Colloque des 60 ans de la BU de l'UCAD",
      en: "UCAD University Library 60th Anniversary Conference"
    },
    category: "conferences",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000",
    location: "UCAD Dakar, Senegal",
    date: "Avril 2026",
    caption: {
      fr: "Communication orale sur les systèmes d'apprentissage adaptatif lors des célébrations du soixantenaire de l'UCAD.",
      en: "Oral presentation on adaptive AI learning systems during UCAD's 60th anniversary symposium in Dakar."
    }
  },
  {
    id: "gal-pasteur-2026",
    title: {
      fr: "Journées Doctorales de l'Institut Pasteur",
      en: "Pasteur Institute Doctoral Research Conference"
    },
    category: "conferences",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    location: "Institut Pasteur Abidjan, Côte d'Ivoire",
    date: "Mars 2026",
    caption: {
      fr: "Exposé sur la classification Deep Learning des signaux EEG pour le diagnostic précoce des pathologies neurologiques.",
      en: "Presentation on Deep Learning EEG signal classification for early neurological disorder detection."
    }
  },
  {
    id: "gal-eeg-lab-ufhb",
    title: {
      fr: "Session d'Enregistrement EEG au Laboratoire UFHB",
      en: "EEG Recording Session at UFHB Laboratory"
    },
    category: "eeg",
    imageUrl: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000",
    location: "UFR Biosciences, UFHB Abidjan",
    date: "2025",
    caption: {
      fr: "Mise en place du casque EEG Emotiv 14 canaux et vérification de l'impédance des électrodes avant le test visuospatial.",
      en: "Setting up 14-channel Emotiv EEG cap and checking impedance values prior to cognitive battery testing."
    }
  },
  {
    id: "gal-field-yamoussoukro",
    title: {
      fr: "Collecte de Données Terrain auprès des Écoliers",
      en: "Fieldwork Data Collection in Primary Schools"
    },
    category: "fieldwork",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
    location: "Région de Yamoussoukro & Koumassi",
    date: "2025",
    caption: {
      fr: "Passation des tests de mémoire de travail sur tablettes éducatives dans une école primaire partenaire.",
      en: "Administering tablet-based visuospatial working memory tests to primary school students."
    }
  },
  {
    id: "gal-cames-lome",
    title: {
      fr: "7ème édition des Journées Scientifiques du CAMES",
      en: "7th CAMES Scientific Days in Lomé"
    },
    category: "conferences",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000",
    location: "Université de Lomé, Togo",
    date: "Mars 2026",
    caption: {
      fr: "Présentation des résultats sur les profils oscillatoires pariéto-occipitales devant le jury CAMES.",
      en: "Presenting findings on parieto-occipital oscillatory profiles at the CAMES Scientific Days in Togo."
    }
  }
];
