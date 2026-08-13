import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { initialPublications, initialCommunications, initialNews, initialGalleryPhotos } from '../data/initialData';
import { Publication, Communication, Project, NewsItem, GalleryPhoto } from '../types';

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'video';
  url: string;
  size?: string;
  createdAt: string;
}

interface ContentContextType {
  publications: Publication[];
  communications: Communication[];
  projects: Project[];
  news: NewsItem[];
  galleryPhotos: GalleryPhoto[];
  mediaFiles: MediaFile[];
  awards: any[];
  profilePhotoUrl: string;
  updateProfilePhotoUrl: (url: string) => void;
  addPublication: (pub: Omit<Publication, 'id'>) => void;
  updatePublication: (pub: Publication) => void;
  addCommunication: (comm: Omit<Communication, 'id'>) => void;
  updateCommunication: (comm: Communication) => void;
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (proj: Project) => void;
  addNewsItem: (item: Omit<NewsItem, 'id'>) => void;
  updateNewsItem: (item: NewsItem) => void;
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  updateGalleryPhoto: (photo: GalleryPhoto) => void;
  deleteGalleryPhoto: (id: string) => void;
  addMediaFile: (file: Omit<MediaFile, 'id' | 'createdAt'>) => void;
  updateMediaFile: (file: MediaFile) => void;
  deleteMediaFile: (id: string) => void;
  addAward: (award: any) => void;
  updateAward: (award: any) => void;
  deleteItem: (type: 'pubs' | 'comms' | 'news' | 'projects' | 'gallery' | 'media' | 'awards', id: string) => void;
  resetAllToDefault: () => void;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const FIRESTORE_DOC_PATH = doc(db, 'portfolio', 'data');

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [communications, setCommunications] = useState<Communication[]>(initialCommunications);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(initialGalleryPhotos);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');

  // 1. Écoute en temps réel des modifications depuis Firebase Cloud Firestore
  useEffect(() => {
    const unsub = onSnapshot(FIRESTORE_DOC_PATH, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.publications) setPublications(data.publications);
        if (data.communications) setCommunications(data.communications);
        if (data.projects) setProjects(data.projects);
        if (data.news) setNews(data.news);
        if (data.galleryPhotos) setGalleryPhotos(data.galleryPhotos);
        if (data.mediaFiles) setMediaFiles(data.mediaFiles);
        if (data.awards) setAwards(data.awards);
        if (data.profilePhotoUrl !== undefined) setProfilePhotoUrl(data.profilePhotoUrl);
      } else {
        // Premier chargement : initialisation dans le cloud
        saveToFirestore({
          publications: initialPublications,
          communications: initialCommunications,
          projects: [],
          news: initialNews,
          galleryPhotos: initialGalleryPhotos,
          mediaFiles: [],
          awards: [],
          profilePhotoUrl: ''
        });
      }
    }, (error) => {
      console.warn("Désynchronisation cloud Firebase, bascule locale :", error);
    });

    return () => unsub();
  }, []);

  // Fonction utilitaire pour tout enregistrer dans Firestore
  const saveToFirestore = async (data: any) => {
    try {
      await setDoc(FIRESTORE_DOC_PATH, data, { merge: true });
    } catch (err) {
      console.error("Erreur de sauvegarde Firebase :", err);
    }
  };

  const updateProfilePhotoUrl = (url: string) => {
    setProfilePhotoUrl(url);
    saveToFirestore({ profilePhotoUrl: url });
  };

  const addPublication = (pub: Omit<Publication, 'id'>) => {
    const newPub = { ...pub, id: 'pub-' + Date.now() };
    const updated = [newPub, ...publications];
    setPublications(updated);
    saveToFirestore({ publications: updated });
  };

  const updatePublication = (pub: Publication) => {
    const updated = publications.map(p => p.id === pub.id ? pub : p);
    setPublications(updated);
    saveToFirestore({ publications: updated });
  };

  const addCommunication = (comm: Omit<Communication, 'id'>) => {
    const newComm = { ...comm, id: 'comm-' + Date.now() };
    const updated = [newComm, ...communications];
    setCommunications(updated);
    saveToFirestore({ communications: updated });
  };

  const updateCommunication = (comm: Communication) => {
    const updated = communications.map(c => c.id === comm.id ? comm : c);
    setCommunications(updated);
    saveToFirestore({ communications: updated });
  };

  const addProject = (proj: Omit<Project, 'id'>) => {
    const newProj = { ...proj, id: 'proj-' + Date.now() };
    const updated = [newProj, ...projects];
    setProjects(updated);
    saveToFirestore({ projects: updated });
  };

  const updateProject = (proj: Project) => {
    const updated = projects.map(p => p.id === proj.id ? proj : p);
    setProjects(updated);
    saveToFirestore({ projects: updated });
  };

  const addNewsItem = (item: Omit<NewsItem, 'id'>) => {
    const newItem = { ...item, id: 'news-' + Date.now() };
    const updated = [newItem, ...news];
    setNews(updated);
    saveToFirestore({ news: updated });
  };

  const updateNewsItem = (item: NewsItem) => {
    const updated = news.map(n => n.id === item.id ? item : n);
    setNews(updated);
    saveToFirestore({ news: updated });
  };

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto = { ...photo, id: 'photo-' + Date.now() };
    const updated = [newPhoto, ...galleryPhotos];
    setGalleryPhotos(updated);
    saveToFirestore({ galleryPhotos: updated });
  };

  const updateGalleryPhoto = (photo: GalleryPhoto) => {
    const updated = galleryPhotos.map(p => p.id === photo.id ? photo : p);
    setGalleryPhotos(updated);
    saveToFirestore({ galleryPhotos: updated });
  };

  const deleteGalleryPhoto = (id: string) => {
    const updated = galleryPhotos.filter(p => p.id !== id);
    setGalleryPhotos(updated);
    saveToFirestore({ galleryPhotos: updated });
  };

  const addMediaFile = (file: Omit<MediaFile, 'id' | 'createdAt'>) => {
    const newFile: MediaFile = { ...file, id: 'media-' + Date.now(), createdAt: new Date().toISOString() };
    const updated = [newFile, ...mediaFiles];
    setMediaFiles(updated);
    saveToFirestore({ mediaFiles: updated });
  };

  const updateMediaFile = (file: MediaFile) => {
    const updated = mediaFiles.map(m => m.id === file.id ? file : m);
    setMediaFiles(updated);
    saveToFirestore({ mediaFiles: updated });
  };

  const deleteMediaFile = (id: string) => {
    const updated = mediaFiles.filter(m => m.id !== id);
    setMediaFiles(updated);
    saveToFirestore({ mediaFiles: updated });
  };

  const addAward = (award: any) => {
    const newAward = { ...award, id: 'award-' + Date.now() };
    const updated = [newAward, ...awards];
    setAwards(updated);
    saveToFirestore({ awards: updated });
  };

  const updateAward = (award: any) => {
    const updated = awards.map(a => a.id === award.id ? award : a);
    setAwards(updated);
    saveToFirestore({ awards: updated });
  };

  const deleteItem = (type: string, id: string) => {
    if (type === 'pubs') {
      const updated = publications.filter(p => p.id !== id);
      setPublications(updated);
      saveToFirestore({ publications: updated });
    } else if (type === 'comms') {
      const updated = communications.filter(c => c.id !== id);
      setCommunications(updated);
      saveToFirestore({ communications: updated });
    } else if (type === 'news') {
      const updated = news.filter(n => n.id !== id);
      setNews(updated);
      saveToFirestore({ news: updated });
    } else if (type === 'projects') {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveToFirestore({ projects: updated });
    } else if (type === 'gallery') {
      deleteGalleryPhoto(id);
    } else if (type === 'media') {
      deleteMediaFile(id);
    } else if (type === 'awards') {
      const updated = awards.filter(a => a.id !== id);
      setAwards(updated);
      saveToFirestore({ awards: updated });
    }
  };

  const resetAllToDefault = () => {
    setPublications(initialPublications);
    setCommunications(initialCommunications);
    setProjects([]);
    setNews(initialNews);
    setGalleryPhotos(initialGalleryPhotos);
    setMediaFiles([]);
    setAwards([]);
    setProfilePhotoUrl('');
    saveToFirestore({
      publications: initialPublications,
      communications: initialCommunications,
      projects: [],
      news: initialNews,
      galleryPhotos: initialGalleryPhotos,
      mediaFiles: [],
      awards: [],
      profilePhotoUrl: ''
    });
  };

  const exportBackupJSON = () => {
    return JSON.stringify({
      publications,
      communications,
      projects,
      news,
      galleryPhotos,
      mediaFiles,
      awards,
      profilePhotoUrl
    }, null, 2);
  };

  const importBackupJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.publications) setPublications(parsed.publications);
      if (parsed.communications) setCommunications(parsed.communications);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.news) setNews(parsed.news);
      if (parsed.galleryPhotos) setGalleryPhotos(parsed.galleryPhotos);
      if (parsed.mediaFiles) setMediaFiles(parsed.mediaFiles);
      if (parsed.awards) setAwards(parsed.awards);
      if (parsed.profilePhotoUrl !== undefined) setProfilePhotoUrl(parsed.profilePhotoUrl);
      saveToFirestore(parsed);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <ContentContext.Provider value={{
      publications,
      communications,
      projects,
      news,
      galleryPhotos,
      mediaFiles,
      awards,
      profilePhotoUrl,
      updateProfilePhotoUrl,
      addPublication,
      updatePublication,
      addCommunication,
      updateCommunication,
      addProject,
      updateProject,
      addNewsItem,
      updateNewsItem,
      addGalleryPhoto,
      updateGalleryPhoto,
      deleteGalleryPhoto,
      addMediaFile,
      updateMediaFile,
      deleteMediaFile,
      addAward,
      updateAward,
      deleteItem,
      resetAllToDefault,
      exportBackupJSON,
      importBackupJSON
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
