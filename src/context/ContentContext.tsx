import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

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
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [communications, setCommunications] = useState<Communication[]>(initialCommunications);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [researchAreas] = useState<ResearchArea[]>(initialResearchAreas);
  const [software, setSoftware] = useState<Software[]>(initialSoftware);
  const [datasets, setDatasets] = useState<Dataset[]>(initialDatasets);
  const [courses] = useState<Course[]>(initialCourses);
  const [resources] = useState<Resource[]>(initialResources);
  const [awards, setAwards] = useState<Award[]>(initialAwards);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(initialGalleryPhotos);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMediaFiles);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>(profileData.photoUrl);

  const syncToFirestore = async (key: string, value: any) => {
    try {
      await setDoc(doc(db, 'portfolio', 'data'), { [key]: value }, { merge: true });
      console.log(`✅ Synchronisé sur Firebase Cloud : ${key}`);
    } catch (e) {
      console.error("Erreur de synchro Firestore :", e);
    }
  };

  const updateProfilePhotoUrl = (url: string) => {
    setProfilePhotoUrl(url);
    syncToFirestore('profilePhotoUrl', url);
  };

  // Écoute en temps réel depuis Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'portfolio', 'data'),
      (docSnap) => {
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
          if (data.profilePhotoUrl) setProfilePhotoUrl(data.profilePhotoUrl);
        }
      },
      (error) => {
        console.warn("Firestore listener warning:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const addPublication = (pubData: Omit<Publication, 'id'>) => {
    const newPub: Publication = { ...pubData, id: `pub-${Date.now()}` };
    setPublications(prev => {
      const updated = [newPub, ...prev];
      syncToFirestore('publications', updated);
      return updated;
    });
  };

  const addCommunication = (commData: Omit<Communication, 'id'>) => {
    const newComm: Communication = { ...commData, id: `comm-${Date.now()}` };
    setCommunications(prev => {
      const updated = [newComm, ...prev];
      syncToFirestore('communications', updated);
      return updated;
    });
  };

  const addProject = (projData: Omit<Project, 'id'>) => {
    const newProj: Project = { ...projData, id: `proj-${Date.now()}` };
    setProjects(prev => {
      const updated = [newProj, ...prev];
      syncToFirestore('projects', updated);
      return updated;
    });
  };

  const addNewsItem = (newsData: Omit<NewsItem, 'id'>) => {
    const newNews: NewsItem = { ...newsData, id: `news-${Date.now()}` };
    setNews(prev => {
      const updated = [newNews, ...prev];
      syncToFirestore('news', updated);
      return updated;
    });
  };

  const addDataset = (datasetData: Omit<Dataset, 'id'>) => {
    const newDs: Dataset = { ...datasetData, id: `ds-${Date.now()}` };
    setDatasets(prev => {
      const updated = [newDs, ...prev];
      syncToFirestore('datasets', updated);
      return updated;
    });
  };

  const addSoftware = (swData: Omit<Software, 'id'>) => {
    const newSw: Software = { ...swData, id: `sw-${Date.now()}` };
    setSoftware(prev => {
      const updated = [newSw, ...prev];
      syncToFirestore('software', updated);
      return updated;
    });
  };

  const addGalleryPhoto = (photoData: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = { ...photoData, id: `photo-${Date.now()}` };
    setGalleryPhotos(prev => {
      const updated = [newPhoto, ...prev];
      syncToFirestore('galleryPhotos', updated);
      return updated;
    });
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos(prev => {
      const updated = prev.filter(p => p.id !== id);
      syncToFirestore('galleryPhotos', updated);
      return updated;
    });
  };

  const addMediaFile = (mediaData: Omit<MediaFile, 'id' | 'createdAt'>) => {
    const newMedia: MediaFile = { ...mediaData, id: `media-${Date.now()}`, createdAt: new Date().toISOString() };
    setMediaFiles(prev => {
      const updated = [newMedia, ...prev];
      syncToFirestore('mediaFiles', updated);
      return updated;
    });
  };

  const deleteMediaFile = (id: string) => {
    setMediaFiles(prev => {
      const updated = prev.filter(m => m.id !== id);
      syncToFirestore('mediaFiles', updated);
      return updated;
    });
  };

  const addAward = (awardData: Omit<Award, 'id'>) => {
    const newAward: Award = { ...awardData, id: `award-${Date.now()}` };
    setAwards(prev => {
      const updated = [newAward, ...prev];
      syncToFirestore('awards', updated);
      return updated;
    });
  };

  const updateAward = (award: Award) => {
    setAwards(prev => {
      const updated = prev.map(a => a.id === award.id ? award : a);
      syncToFirestore('awards', updated);
      return updated;
    });
  };

  const updatePublication = (pub: Publication) => {
    setPublications(prev => {
      const updated = prev.map(p => p.id === pub.id ? pub : p);
      syncToFirestore('publications', updated);
      return updated;
    });
  };

  const updateCommunication = (comm: Communication) => {
    setCommunications(prev => {
      const updated = prev.map(c => c.id === comm.id ? comm : c);
      syncToFirestore('communications', updated);
      return updated;
    });
  };

  const updateProject = (proj: Project) => {
    setProjects(prev => {
      const updated = prev.map(p => p.id === proj.id ? proj : p);
      syncToFirestore('projects', updated);
      return updated;
    });
  };

  const updateNewsItem = (newsItem: NewsItem) => {
    setNews(prev => {
      const updated = prev.map(n => n.id === newsItem.id ? newsItem : n);
      syncToFirestore('news', updated);
      return updated;
    });
  };

  const updateGalleryPhoto = (photo: GalleryPhoto) => {
    setGalleryPhotos(prev => {
      const updated = prev.map(gp => gp.id === photo.id ? photo : gp);
      syncToFirestore('galleryPhotos', updated);
      return updated;
    });
  };

  const updateMediaFile = (media: MediaFile) => {
    setMediaFiles(prev => {
      const updated = prev.map(m => m.id === media.id ? media : m);
      syncToFirestore('mediaFiles', updated);
      return updated;
    });
  };

  const deleteItem = (collection: 'publications' | 'communications' | 'projects' | 'news' | 'gallery' | 'awards', id: string) => {
    if (collection === 'publications') {
      setPublications(prev => {
        const updated = prev.filter(i => i.id !== id);
        syncToFirestore('publications', updated);
        return updated;
      });
    }
    if (collection === 'communications') {
      setCommunications(prev => {
        const updated = prev.filter(i => i.id !== id);
        syncToFirestore('communications', updated);
        return updated;
      });
    }
    if (collection === 'projects') {
      setProjects(prev => {
        const updated = prev.filter(i => i.id !== id);
        syncToFirestore('projects', updated);
        return updated;
      });
    }
    if (collection === 'news') {
      setNews(prev => {
        const updated = prev.filter(i => i.id !== id);
        syncToFirestore('news', updated);
        return updated;
      });
    }
    if (collection === 'gallery') {
      setGalleryPhotos(prev => {
        const updated = prev.filter(i => i.id !== id);
        syncToFirestore('galleryPhotos', updated);
        return updated;
      });
    }
    if (collection === 'awards') {
      setAwards(prev => {
        const updated = prev.filter(i => i.id !== id);
        syncToFirestore('awards', updated);
        return updated;
      });
    }
  };

  const resetAllToDefault = () => {
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
