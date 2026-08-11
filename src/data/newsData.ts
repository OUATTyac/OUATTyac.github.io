import { NewsItem } from '../types';

export const initialNews: NewsItem[] = [
  {
    id: "news-2026-fens",
    date: "2026-07-06",
    title: {
      fr: "Acceptation et Présentation au FENS Forum 2026 à Barcelone",
      en: "FENS Forum 2026 Poster Acceptance & Presentation in Barcelona"
    },
    category: "conference",
    summary: {
      fr: "Notre étude sur l'optimisation de la mémoire de travail visuospatiale par apprentissage adaptatif a été sélectionnée pour présentation au FENS Forum 2026 à Barcelone.",
      en: "Our study on optimizing visuospatial working memory through adaptive digital learning was selected for presentation at FENS Forum 2026 in Barcelona."
    },
    linkUrl: "https://world-wide.org/fens-26/optimizing-visuospatial-working-memory-addc440c",
    featured: true
  },
  {
    id: "news-2026-dcn-review",
    date: "2026-06-15",
    title: {
      fr: "Manuscrit Soumis à Developmental Cognitive Neuroscience",
      en: "Manuscript Submitted to Developmental Cognitive Neuroscience"
    },
    category: "publication",
    summary: {
      fr: "Soumission de notre article majeur 'Neural efficiency of visuospatial working memory across learning modalities in primary school children: EEG evidence and the role of socioeconomic status'.",
      en: "Submitted major paper 'Neural efficiency of visuospatial working memory across learning modalities in primary school children: EEG evidence and the role of socioeconomic status'."
    },
    featured: true
  },
  {
    id: "news-2026-ucad",
    date: "2026-04-14",
    title: {
      fr: "Communication Orale au Colloque des 60 ans de l'UCAD à Dakar",
      en: "Oral Presentation at UCAD Library 60th Anniversary in Dakar"
    },
    category: "conference",
    summary: {
      fr: "Présentation des impacts de notre système adaptatif NeuroscIA sur les capacités cognitives des étudiants lors du colloque international de Dakar.",
      en: "Delivered oral communication on NeuroscIA adaptive platform impacts on student cognitive performance at UCAD Dakar."
    },
    featured: false
  },
  {
    id: "news-2026-cajph",
    date: "2026-03-20",
    title: {
      fr: "Publication dans Central African Journal of Public Health",
      en: "Article Published in Central African Journal of Public Health"
    },
    category: "publication",
    summary: {
      fr: "Parution de l'article sur les effets aigus du vaccin Johnson & Johnson sur les fonctions cognitives en Côte d'Ivoire (DOI: 10.11648/j.cajph.20261203.13).",
      en: "New paper published examining acute cognitive effects of Johnson & Johnson COVID-19 vaccination in Côte d'Ivoire."
    },
    featured: false
  }
];
