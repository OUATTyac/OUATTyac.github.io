import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

import {
  Publication,
  Communication,
  Project,
  ResearchArea,
  Software,
  Dataset,
  Course,
  Award,
  NewsItem,
  GalleryPhoto,
  Resource
} from '../types';

import { initialPublications } from '../data/publicationsData';
import { initialCommunications } from '../data/communicationsData';
import { initialProjects } from '../data/projectsData';
import { initialResearchAreas } from '../data/researchData';
import { initialSoftware } from '../data/softwareData';
import { initialDatasets } from '../data/datasetsData';
import { initialCourses, initialResources } from '../data/teachingData';
import { initialAwards } from '../data/awardsData';
import { initialNews } from '../data/newsData';
import { initialGalleryPhotos } from '../data/galleryData';
import { profileData } from '../data/profileData';

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'video';
  url: string;
  size?: string;
  createdAt: string;
}

export const initialMediaFiles: MediaFile[] = [
  {
    id: "media-demo-eeg-video",
    name: "Démonstration EEG 14 canaux en direct - Laboratoire UFHB.mp4",
    type: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    size: "4.2 MB",
    createdAt: new Date().toISOString()
  },
  {
    id: "media-demo-pdf-pub",
    name: "Article_Ouattara_2026_Cognitive_Vaccine.pdf",
    type: "pdf",
    url: "https://www.w3.org/W3C/DesignIssues/PDF.pdf",
    size: "1.1 MB",
    createdAt: new Date().toISOString()
  }
];

interface ContentContextType {
  publications: Publication[];
  communications: Communication[];
  projects: Project[];
  researchAreas: ResearchArea[];
  software: Software[];
  datasets: Dataset[];
  courses: Course[];
  resources: Resource[];
  awards: Award[];
  news: NewsItem[];
  galleryPhotos: GalleryPhoto[];
  mediaFiles: MediaFile[];
  profilePhotoUrl: string;
  updateProfilePhotoUrl: (url: string) => void;

  addPublication: (pub: Omit<Publication, 'id'>) => void;
  addCommunication: (comm: Omit<Communication, 'id'>) => void;
  addProject: (proj: Omit<Project, 'id'>) => void;
  addNewsItem: (news: Omit<NewsItem, 'id'>) => void;
  addDataset: (dataset: Omit<Dataset, 'id'>) => void;
  addSoftware: (sw: Omit<Software, 'id'>) => void;
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (id: string) => void;
  addMediaFile: (media: Omit<MediaFile, 'id' | 'createdAt'>) => void;
  deleteMediaFile: (id: string) => void;
  addAward: (award: Omit<Award, 'id'>) => void;
  
  updatePublication: (pub: Publication) => void;
  updateCommunication: (comm: Communication) => void;
  updateProject: (proj: Project) => void;
  updateNewsItem: (news: NewsItem) => void;
  updateGalleryPhoto: (photo: GalleryPhoto) => void;
  updateMediaFile: (media: MediaFile) => void;
  updateAward: (award: Award) => void;

  deleteItem: (collection: 'publications' | 'communications' | 'projects' | 'news' | 'gallery' | 'awards', id: string) => void;
  resetAllToDefault: () => void;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [publications, setPublications] = useState<Publication[]>(() => {
    try {
      const saved = localStorage.getItem('yac_pubs');
      return saved ? JSON.parse(saved) : initialPublications;
    } catch {
      return initialPublications;
    }
  });

  const [communications, setCommunications] = useState<Communication[]>(() => {
    try {
      const saved = localStorage.getItem('yac_comms');
      return saved ? JSON.parse(saved) : initialCommunications;
    } catch {
      return initialCommunications;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('yac_projects');
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [researchAreas] = useState<ResearchArea[]>(initialResearchAreas);

  const [software, setSoftware] = useState<Software[]>(() => {
    try {
      const saved = localStorage.getItem('yac_software');
      return saved ? JSON.parse(saved) : initialSoftware;
    } catch {
      return initialSoftware;
    }
  });

  const [datasets, setDatasets] = useState<Dataset[]>(() => {
    try {
      const saved = localStorage.getItem('yac_datasets');
      return saved ? JSON.parse(saved) : initialDatasets;
    } catch {
      return initialDatasets;
    }
  });

  const [courses] = useState<Course[]>(initialCourses);
  const [resources] = useState<Resource[]>(initialResources);
  const [awards, setAwards] = useState<Award[]>(() => {
    try {
      const saved = localStorage.getItem('yac_awards');
      return saved ? JSON.parse(saved) : initialAwards;
    } catch {
      return initialAwards;
    }
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('yac_news');
      return saved ? JSON.parse(saved) : initialNews;
    } catch {
      return initialNews;
    }
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('yac_gallery');
      return saved ? JSON.parse(saved) : initialGalleryPhotos;
    } catch {
      return initialGalleryPhotos;
    }
  });

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(() => {
    try {
      const saved = localStorage.getItem('yac_media');
      return saved ? JSON.parse(saved) : initialMediaFiles;
    } catch {
      return initialMediaFiles;
    }
  });

  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('yac_profile_photo');
      if (saved && saved.trim() !== '' && saved !== '/profile.jpg') {
        return saved;
      }
    } catch {
      // Ignore local storage error
    }
    return profileData.photoUrl;
  });

  const updateProfilePhotoUrl = (url: string) => {
    setProfilePhotoUrl(url);
    try {
      localStorage.setItem('yac_profile_photo', url);
    } catch {
      // Ignore local storage error
    }
  };

  // Fetch initial data from Firestore
  useEffect(() => {
    getDoc(doc(db, 'portfolio', 'data')).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.publications) setPublications(data.publications);
        if (data.communications) setCommunications(data.communications);
        if (data.projects) setProjects(data.projects);
        if (data.news) setNews(data.news);
        if (data.software) setSoftware(data.software);
        if (data.datasets) setDatasets(data.datasets);
        if (data.galleryPhotos) setGalleryPhotos(data.galleryPhotos);
        if (data.mediaFiles) setMediaFiles(data.mediaFiles);
        if (data.awards) setAwards(data.awards);
        if (data.profilePhotoUrl && data.profilePhotoUrl.trim() !== '' && data.profilePhotoUrl !== '/profile.jpg') {
          setProfilePhotoUrl(data.profilePhotoUrl);
        }
      }
    }).catch(console.error);
  }, []);

  const syncToFirestore = async (key: string, value: any) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'portfolio', 'data'), { [key]: value }, { merge: true });
    } catch (e) {
      console.warn("Firestore sync error", e);
    }
  };

  // Sync to localStorage and Firestore
  useEffect(() => {
    try {
      localStorage.setItem('yac_pubs', JSON.stringify(publications));
      syncToFirestore('publications', publications);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [publications, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_comms', JSON.stringify(communications));
      syncToFirestore('communications', communications);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [communications, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_projects', JSON.stringify(projects));
      syncToFirestore('projects', projects);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [projects, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_news', JSON.stringify(news));
      syncToFirestore('news', news);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [news, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_software', JSON.stringify(software));
      syncToFirestore('software', software);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [software, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_datasets', JSON.stringify(datasets));
      syncToFirestore('datasets', datasets);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [datasets, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_gallery', JSON.stringify(galleryPhotos));
      syncToFirestore('galleryPhotos', galleryPhotos);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [galleryPhotos, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_media', JSON.stringify(mediaFiles));
      syncToFirestore('mediaFiles', mediaFiles);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [mediaFiles, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_awards', JSON.stringify(awards));
      syncToFirestore('awards', awards);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [awards, user]);

  useEffect(() => {
    try {
      localStorage.setItem('yac_profile_photo', profilePhotoUrl);
      syncToFirestore('profilePhotoUrl', profilePhotoUrl);
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  }, [profilePhotoUrl, user]);

  const addPublication = (pubData: Omit<Publication, 'id'>) => {
    const newPub: Publication = {
      ...pubData,
      id: `pub-${Date.now()}`
    };
    setPublications(prev => [newPub, ...prev]);
  };

  const addCommunication = (commData: Omit<Communication, 'id'>) => {
    const newComm: Communication = {
      ...commData,
      id: `comm-${Date.now()}`
    };
    setCommunications(prev => [newComm, ...prev]);
  };

  const addProject = (projData: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...projData,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const addNewsItem = (newsData: Omit<NewsItem, 'id'>) => {
    const newNews: NewsItem = {
      ...newsData,
      id: `news-${Date.now()}`
    };
    setNews(prev => [newNews, ...prev]);
  };

  const addDataset = (datasetData: Omit<Dataset, 'id'>) => {
    const newDs: Dataset = {
      ...datasetData,
      id: `ds-${Date.now()}`
    };
    setDatasets(prev => [newDs, ...prev]);
  };

  const addSoftware = (swData: Omit<Software, 'id'>) => {
    const newSw: Software = {
      ...swData,
      id: `sw-${Date.now()}`
    };
    setSoftware(prev => [newSw, ...prev]);
  };

  const addGalleryPhoto = (photoData: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photoData,
      id: `photo-${Date.now()}`
    };
    setGalleryPhotos(prev => [newPhoto, ...prev]);
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos(prev => prev.filter(p => p.id !== id));
  };

  const addMediaFile = (mediaData: Omit<MediaFile, 'id' | 'createdAt'>) => {
    const newMedia: MediaFile = {
      ...mediaData,
      id: `media-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setMediaFiles(prev => [newMedia, ...prev]);
  };

  const deleteMediaFile = (id: string) => {
    setMediaFiles(prev => prev.filter(m => m.id !== id));
  };

  const addAward = (awardData: Omit<Award, 'id'>) => {
    const newAward: Award = {
      ...awardData,
      id: `award-${Date.now()}`
    };
    setAwards(prev => [newAward, ...prev]);
  };

  const updateAward = (award: Award) => {
    setAwards(prev => prev.map(a => a.id === award.id ? award : a));
  };

  const updatePublication = (pub: Publication) => {
    setPublications(prev => prev.map(p => p.id === pub.id ? pub : p));
  };

  const updateCommunication = (comm: Communication) => {
    setCommunications(prev => prev.map(c => c.id === comm.id ? comm : c));
  };

  const updateProject = (proj: Project) => {
    setProjects(prev => prev.map(p => p.id === proj.id ? proj : p));
  };

  const updateNewsItem = (newsItem: NewsItem) => {
    setNews(prev => prev.map(n => n.id === newsItem.id ? newsItem : n));
  };

  const updateGalleryPhoto = (photo: GalleryPhoto) => {
    setGalleryPhotos(prev => prev.map(gp => gp.id === photo.id ? photo : gp));
  };

  const updateMediaFile = (media: MediaFile) => {
    setMediaFiles(prev => prev.map(m => m.id === media.id ? media : m));
  };

  const deleteItem = (collection: 'publications' | 'communications' | 'projects' | 'news' | 'gallery' | 'awards', id: string) => {
    if (collection === 'publications') setPublications(prev => prev.filter(i => i.id !== id));
    if (collection === 'communications') setCommunications(prev => prev.filter(i => i.id !== id));
    if (collection === 'projects') setProjects(prev => prev.filter(i => i.id !== id));
    if (collection === 'news') setNews(prev => prev.filter(i => i.id !== id));
    if (collection === 'gallery') setGalleryPhotos(prev => prev.filter(i => i.id !== id));
    if (collection === 'awards') setAwards(prev => prev.filter(i => i.id !== id));
  };

  const resetAllToDefault = () => {
    localStorage.removeItem('yac_pubs');
    localStorage.removeItem('yac_comms');
    localStorage.removeItem('yac_projects');
    localStorage.removeItem('yac_news');
    localStorage.removeItem('yac_software');
    localStorage.removeItem('yac_datasets');
    localStorage.removeItem('yac_gallery');
    localStorage.removeItem('yac_media');
    setPublications(initialPublications);
    setCommunications(initialCommunications);
    setProjects(initialProjects);
    setNews(initialNews);
    setSoftware(initialSoftware);
    setDatasets(initialDatasets);
    setGalleryPhotos(initialGalleryPhotos);
    setMediaFiles(initialMediaFiles);
  };

  const exportBackupJSON = () => {
    return JSON.stringify({
      publications,
      communications,
      projects,
      news,
      software,
      datasets,
      galleryPhotos,
      mediaFiles,
      exportedAt: new Date().toISOString()
    }, null, 2);
  };

  const importBackupJSON = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.publications) setPublications(data.publications);
      if (data.communications) setCommunications(data.communications);
      if (data.projects) setProjects(data.projects);
      if (data.news) setNews(data.news);
      if (data.software) setSoftware(data.software);
      if (data.datasets) setDatasets(data.datasets);
      if (data.galleryPhotos) setGalleryPhotos(data.galleryPhotos);
      if (data.mediaFiles) setMediaFiles(data.mediaFiles);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        publications,
        communications,
        projects,
        researchAreas,
        software,
        datasets,
        courses,
        resources,
        awards,
        news,
        galleryPhotos,
        mediaFiles,
        profilePhotoUrl,
        updateProfilePhotoUrl,
        addPublication,
        addCommunication,
        addProject,
        addNewsItem,
        addDataset,
        addSoftware,
        addGalleryPhoto,
        deleteGalleryPhoto,
        addMediaFile,
        deleteMediaFile,
        updatePublication,
        updateCommunication,
        updateProject,
        updateNewsItem,
        updateGalleryPhoto,
        updateMediaFile,
        addAward,
        updateAward,
        deleteItem,
        resetAllToDefault,
        exportBackupJSON,
        importBackupJSON
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
