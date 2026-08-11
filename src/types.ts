export type Language = 'fr' | 'en';

export interface Author {
  name: string;
  orcid?: string;
  isMain?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  volume?: string;
  pages?: string;
  doi?: string;
  pubmedId?: string;
  halId?: string;
  researchGateUrl?: string;
  pdfUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  status: 'published' | 'under_review' | 'submitted' | 'in_preparation';
  abstract: {
    fr: string;
    en: string;
  };
  keywords: string[];
  bibtex: string;
  researchAreaId?: string;
}

export interface Communication {
  id: string;
  title: string;
  authors: string[];
  type: 'oral' | 'poster' | 'workshop' | 'keynote' | 'abstract';
  conference: string;
  organizer?: string;
  location: string;
  country: string;
  dates: string;
  year: number;
  url?: string;
  doi?: string;
  halUrl?: string;
  abstract: {
    fr: string;
    en: string;
  };
  award?: string;
  slidesUrl?: string;
  posterUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
  keywords: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: {
    fr: string;
    en: string;
  };
  tagline: string;
  category: 'ai_neuro' | 'agri_tech' | 'comp_neuro' | 'health_climate';
  status: 'active' | 'completed' | 'ongoing';
  period: string;
  description: {
    fr: string;
    en: string;
  };
  architecture?: string[];
  keyFeatures: {
    fr: string[];
    en: string[];
  };
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  devpostUrl?: string;
  publicationsRelated?: string[];
  imageUrl?: string;
}

export interface ResearchArea {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  iconName: string;
  shortDesc: {
    fr: string;
    en: string;
  };
  fullDesc: {
    fr: string;
    en: string;
  };
  objectives: {
    fr: string[];
    en: string[];
  };
  methodology: {
    fr: string[];
    en: string[];
  };
  tools: string[];
  statsKey: string;
}

export interface Software {
  id: string;
  title: string;
  version: string;
  description: {
    fr: string;
    en: string;
  };
  techStack: string[];
  githubUrl?: string;
  docsUrl?: string;
  pypiUrl?: string;
  license: string;
  category: 'eeg_analysis' | 'ml_models' | 'web_apps' | 'educational';
}

export interface Dataset {
  id: string;
  title: string;
  doi?: string;
  zenodoUrl?: string;
  githubUrl?: string;
  description: {
    fr: string;
    en: string;
  };
  sampleSize: string;
  variables: string[];
  license: string;
  year: number;
}

export interface Course {
  id: string;
  code: string;
  title: {
    fr: string;
    en: string;
  };
  level: string;
  institution: string;
  hoursPerYear: number;
  description: {
    fr: string;
    en: string;
  };
  topics: string[];
  resourcesUrl?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'code_snippet' | 'eeg_pipeline' | 'r_script' | 'slides' | 'moodle_template';
  description: {
    fr: string;
    en: string;
  };
  language?: string;
  downloadUrl?: string;
  codeContent?: string;
  tags: string[];
}

export interface Award {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  organization: string;
  year: number;
  category: 'academic' | 'grant' | 'certification' | 'prize';
  description: {
    fr: string;
    en: string;
  };
  credentialUrl?: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: {
    fr: string;
    en: string;
  };
  category: 'publication' | 'conference' | 'award' | 'project' | 'media';
  summary: {
    fr: string;
    en: string;
  };
  linkUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
  videoUrl?: string;
  featured?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  category: 'conferences' | 'laboratory' | 'fieldwork' | 'eeg';
  imageUrl: string;
  location: string;
  date: string;
  caption: {
    fr: string;
    en: string;
  };
}

export interface CollaborationNode {
  id: string;
  institution: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  collaborators: string;
  focusArea: string;
}
