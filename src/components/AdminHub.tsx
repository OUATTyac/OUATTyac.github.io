import React, { useState } from 'react';
import {
  X, Plus, Trash2, Download, Upload, RotateCcw, Check, Sparkles, Award,
  BookOpen, MessageSquare, Briefcase, Newspaper, Image as ImageIcon,
  FileText, Paperclip, Copy, ExternalLink, Film, FolderPlus, Link2, Pencil, Edit3, Save, LogIn, LogOut
} from 'lucide-react';
import { useContent, MediaFile } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Publication, Communication, Project, NewsItem, GalleryPhoto } from '../types';

interface AdminHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminHub: React.FC<AdminHubProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { user, login, loginWithPasscode, logout, loading } = useAuth();
  const {
    publications,
    communications,
    projects,
    news,
    galleryPhotos,
    mediaFiles,
    profilePhotoUrl,
    updateProfilePhotoUrl,
    addPublication,
    addCommunication,
    addProject,
    addNewsItem,
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
    awards,
    updateAward,
    deleteItem,
    resetAllToDefault,
    exportBackupJSON,
    importBackupJSON
  } = useContent();

  const [activeTab, setActiveTab] = useState<'pub' | 'comm' | 'media' | 'news' | 'profile' | 'manage'>('pub');
  const [successMsg, setSuccessMsg] = useState('');
  const [userPhotoUrlInput, setUserPhotoUrlInput] = useState('');

  // Login states
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  // Form states for Publication
  const [pubTitle, setPubTitle] = useState('');
  const [pubAuthors, setPubAuthors] = useState('');
  const [pubYear, setPubYear] = useState(2026);
  const [pubJournal, setPubJournal] = useState('');
  const [pubDoi, setPubDoi] = useState('');
  const [pubPdfDataUrl, setPubPdfDataUrl] = useState('');
  const [pubPdfFileName, setPubPdfFileName] = useState('');
  const [pubImageDataUrl, setPubImageDataUrl] = useState('');
  const [pubImageFileName, setPubImageFileName] = useState('');
  const [pubVideoUrl, setPubVideoUrl] = useState('');
  const [pubAbstractFr, setPubAbstractFr] = useState('');
  const [pubAbstractEn, setPubAbstractEn] = useState('');

  // Form states for Communication
  const [commTitle, setCommTitle] = useState('');
  const [commAuthors, setCommAuthors] = useState('');
  const [commType, setCommType] = useState<'oral' | 'poster' | 'workshop' | 'keynote'>('oral');
  const [commConf, setCommConf] = useState('');
  const [commLocation, setCommLocation] = useState('');
  const [commCountry, setCommCountry] = useState('');
  const [commDates, setCommDates] = useState('');
  const [commYear, setCommYear] = useState(2026);
  const [commPdfDataUrl, setCommPdfDataUrl] = useState('');
  const [commPdfFileName, setCommPdfFileName] = useState('');
  const [commPdfUrlInput, setCommPdfUrlInput] = useState('');
  const [commImageDataUrl, setCommImageDataUrl] = useState('');
  const [commImageFileName, setCommImageFileName] = useState('');
  const [commImageUrlInput, setCommImageUrlInput] = useState('');
  const [commVideoUrl, setCommVideoUrl] = useState('');
  const [commAbstractFr, setCommAbstractFr] = useState('');

  // Form states for News
  const [newsTitleFr, setNewsTitleFr] = useState('');
  const [newsTitleEn, setNewsTitleEn] = useState('');
  const [newsSummaryFr, setNewsSummaryFr] = useState('');
  const [newsSummaryEn, setNewsSummaryEn] = useState('');
  const [newsLinkUrl, setNewsLinkUrl] = useState('');
  const [newsImageDataUrl, setNewsImageDataUrl] = useState('');
  const [newsImageFileName, setNewsImageFileName] = useState('');
  const [newsPdfDataUrl, setNewsPdfDataUrl] = useState('');
  const [newsPdfFileName, setNewsPdfFileName] = useState('');
  const [newsVideoUrl, setNewsVideoUrl] = useState('');

  // Form states for Media Upload (Images & PDFs)
  const [mediaName, setMediaName] = useState('');
  const [mediaDataUrl, setMediaDataUrl] = useState('');
  const [mediaFileName, setMediaFileName] = useState('');
  const [mediaFileType, setMediaFileType] = useState<'image' | 'pdf' | 'video'>('image');
  const [mediaFileSize, setMediaFileSize] = useState('');

  // Form states for Photo Gallery
  const [photoTitleFr, setPhotoTitleFr] = useState('');
  const [photoTitleEn, setPhotoTitleEn] = useState('');
  const [photoCategory, setPhotoCategory] = useState<'conferences' | 'laboratory' | 'fieldwork' | 'eeg'>('conferences');
  const [photoLocation, setPhotoLocation] = useState('Abidjan, Côte d\'Ivoire');
  const [photoDate, setPhotoDate] = useState('2026');
  const [photoCaptionFr, setPhotoCaptionFr] = useState('');
  const [photoImageDataUrl, setPhotoImageDataUrl] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');

  // Managing and Editing state
  const [manageCategory, setManageCategory] = useState<'pubs' | 'comms' | 'news' | 'projects' | 'gallery' | 'media' | 'backup' | 'awards'>('pubs');
  const [editingPub, setEditingPub] = useState<Publication | null>(null);
  const [editingComm, setEditingComm] = useState<Communication | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingProj, setEditingProj] = useState<Project | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaFile | null>(null);
  const [editingAward, setEditingAward] = useState<any | null>(null);

  const [jsonInput, setJsonInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 text-center">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    const handleGoogleLogin = async () => {
      setIsLoggingIn(true);
      setLoginError('');
      try {
        await login();
      } catch (err: any) {
        console.error("Login error:", err);
        if (err?.code === 'auth/unauthorized-domain') {
          setLoginError("Domaine non autorisé dans Firebase : Rendez-vous sur la Console Firebase > Authentication > Paramètres > Domaines autorisés, et ajoutez 'ouattyac.github.io'. Vous pouvez aussi utiliser le Code PIN ci-dessous.");
        } else if (err?.code === 'auth/popup-closed-by-user') {
          setLoginError("Connexion annulée : La fenêtre Google s'est fermée.");
        } else if (err?.code === 'auth/popup-blocked') {
          setLoginError("Pop-up bloquée par le navigateur. Autorisez les fenêtres pop-up pour ce site.");
        } else {
          setLoginError(err?.message || "Erreur lors de la connexion Google. Utilisez le Code PIN ci-dessous.");
        }
      } finally {
        setIsLoggingIn(false);
      }
    };

    const handlePasscodeLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError('');
      const ok = loginWithPasscode(passcode);
      if (!ok) {
        setLoginError("Code PIN incorrect.");
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-fade-in">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-8 h-8" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Connexion Administration</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Connectez-vous avec Google ou par Code PIN pour gérer votre portfolio.</p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-300 rounded-xl text-xs text-left leading-relaxed">
                {loginError}
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold transition shadow-md text-sm cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              <span>{isLoggingIn ? "Connexion en cours..." : "Se connecter avec Google"}</span>
            </button>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              {!showPasscode ? (
                <button
                  type="button"
                  onClick={() => setShowPasscode(true)}
                  className="text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
                >
                  Connexion alternative par Code PIN Admin
                </button>
              ) : (
                <form onSubmit={handlePasscodeLogin} className="space-y-3 pt-1 text-left">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Code PIN d'administration
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Ex: ton nom"
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl text-xs hover:bg-slate-800 transition cursor-pointer"
                    >
                      Valider
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400">Code par défaut: ton nom</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // File reader helper with image compression
  const handleFileRead = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoad: (dataUrl: string, file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_SIZE = 800;
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          onLoad(dataUrl, file);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      // PDF or other files
      if (file.size > 2 * 1024 * 1024) {
        alert(t("Le fichier est trop volumineux (> 2MB). Veuillez plutôt insérer un lien (URL) pour éviter de bloquer le site.", "File is too large (> 2MB). Please paste a URL link instead to avoid freezing the site."));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onLoad(reader.result, file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleAddPub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubTitle || !pubJournal) return;
    addPublication({
      title: pubTitle,
      authors: pubAuthors ? pubAuthors.split(',').map(a => a.trim()).filter(Boolean) : ['Yacouba OUATTARA'],
      year: Number(pubYear),
      journal: pubJournal,
      doi: pubDoi,
      pdfUrl: pubPdfDataUrl || undefined,
      imageUrl: pubImageDataUrl || undefined,
      videoUrl: pubVideoUrl || undefined,
      status: 'published',
      abstract: { fr: pubAbstractFr || pubTitle, en: pubAbstractEn || pubTitle },
      keywords: ['Neuroscience', 'Cognition', 'Research'],
      bibtex: `@article{ouattara${pubYear},\n  title={${pubTitle}},\n  author={${pubAuthors || 'Yacouba OUATTARA'}},\n  journal={${pubJournal}},\n  year={${pubYear}}\n}`
    });
    setSuccessMsg(t("Publication ajoutée avec succès !", "Publication added successfully!"));
    setPubTitle('');
    setPubJournal('');
    setPubDoi('');
    setPubPdfDataUrl('');
    setPubPdfFileName('');
    setPubImageDataUrl('');
    setPubImageFileName('');
    setPubVideoUrl('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddComm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commTitle || !commConf) return;

    const finalPdf = commPdfDataUrl || commPdfUrlInput || undefined;
    const finalImage = commImageDataUrl || commImageUrlInput || undefined;
    const finalPoster = finalImage || finalPdf || undefined;

    addCommunication({
      title: commTitle,
      authors: commAuthors ? commAuthors.split(',').map(a => a.trim()).filter(Boolean) : ['Yacouba OUATTARA'],
      type: commType,
      conference: commConf,
      location: commLocation || 'Abidjan',
      country: commCountry || 'Côte d\'Ivoire',
      dates: commDates || '2026',
      year: Number(commYear),
      pdfUrl: finalPdf,
      slidesUrl: commType === 'oral' ? finalPdf : undefined,
      posterUrl: finalPoster,
      imageUrl: finalImage,
      videoUrl: commVideoUrl || undefined,
      abstract: { fr: commAbstractFr || commTitle, en: commTitle },
      keywords: ['Communication', 'Scientific Conference', commType]
    });
    setSuccessMsg(t("Communication ajoutée avec succès !", "Communication added successfully!"));
    setCommTitle('');
    setCommConf('');
    setCommPdfDataUrl('');
    setCommPdfFileName('');
    setCommPdfUrlInput('');
    setCommImageDataUrl('');
    setCommImageFileName('');
    setCommImageUrlInput('');
    setCommVideoUrl('');
    setCommAbstractFr('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitleFr) return;
    addNewsItem({
      date: new Date().toISOString().split('T')[0],
      title: { fr: newsTitleFr, en: newsTitleEn || newsTitleFr },
      category: 'conference',
      summary: { fr: newsSummaryFr || newsTitleFr, en: newsSummaryEn || newsTitleEn || newsTitleFr },
      linkUrl: newsLinkUrl || undefined,
      imageUrl: newsImageDataUrl || undefined,
      pdfUrl: newsPdfDataUrl || undefined,
      videoUrl: newsVideoUrl || undefined,
      featured: true
    });
    setSuccessMsg(t("Actualité publiée !", "News item published!"));
    setNewsTitleFr('');
    setNewsTitleEn('');
    setNewsSummaryFr('');
    setNewsSummaryEn('');
    setNewsLinkUrl('');
    setNewsImageDataUrl('');
    setNewsImageFileName('');
    setNewsPdfDataUrl('');
    setNewsPdfFileName('');
    setNewsVideoUrl('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaDataUrl) return;
    addMediaFile({
      name: mediaName || mediaFileName || 'Document-sans-titre',
      type: mediaFileType,
      url: mediaDataUrl,
      size: mediaFileSize
    });
    setSuccessMsg(t("Fichier ajouté à la médiathèque !", "File saved to media library!"));
    setMediaName('');
    setMediaDataUrl('');
    setMediaFileName('');
    setMediaFileSize('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoImageDataUrl || !photoTitleFr) return;
    addGalleryPhoto({
      title: { fr: photoTitleFr, en: photoTitleEn || photoTitleFr },
      category: photoCategory,
      imageUrl: photoImageDataUrl,
      location: photoLocation,
      date: photoDate,
      caption: { fr: photoCaptionFr || photoTitleFr, en: photoTitleEn || photoTitleFr }
    });
    setSuccessMsg(t("Photo ajoutée à la Galerie !", "Photo added to Gallery!"));
    setPhotoTitleFr('');
    setPhotoTitleEn('');
    setPhotoImageDataUrl('');
    setPhotoFileName('');
    setPhotoCaptionFr('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExport = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yacouba_ouattara_site_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImport = () => {
    if (!jsonInput) return;
    const ok = importBackupJSON(jsonInput);
    if (ok) {
      setSuccessMsg(t("Base de données restaurée avec succès !", "Database restored successfully!"));
      setJsonInput('');
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      alert(t("Erreur de format JSON", "Invalid JSON format"));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {t("Tableau de bord Administrateur", "Admin Content Manager Hub")}
              </h3>
              <p className="text-xs text-slate-500">
                {t("Ajoutez du contenu, des images, des PDF et gérez votre site sans coder", "Add content, images, PDFs & manage site content without code")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/30 transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" />
            {successMsg}
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('pub')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pub' ? 'bg-indigo-600 text-white font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t("Ajouter Publication", "Add Publication")}
          </button>
          <button
            onClick={() => setActiveTab('comm')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'comm' ? 'bg-indigo-600 text-white font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {t("Ajouter Communication", "Add Communication")}
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'media' ? 'bg-indigo-600 text-white font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            {t("Médias (Images & PDF)", "Media (Images & PDF)")}
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'news' ? 'bg-indigo-600 text-white font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            {t("Publier Actualité", "Publish News")}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-emerald-500" />
            {t("Photo de Profil", "Profile Photo")}
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'manage' ? 'bg-indigo-600 text-white font-semibold' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            {t("Gérer & Éditer le Contenu", "Manage & Edit Content")}
          </button>
        </div>

        {/* Tab Forms */}
        <div className="flex-1 overflow-y-auto pr-1">
          {activeTab === 'pub' && (
            <form onSubmit={handleAddPub} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("Titre de l'article *", "Article Title *")}
                </label>
                <input
                  type="text"
                  required
                  value={pubTitle}
                  onChange={e => setPubTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-slate-100"
                  placeholder="e.g. EEG oscillation patterns during working memory tasks..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t("Auteurs (séparés par virgule)", "Authors (comma separated)")}
                  </label>
                  <input
                    type="text"
                    value={pubAuthors}
                    onChange={e => setPubAuthors(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                    placeholder="Ouattara, Y., Yao, K. M., Ouattara, S."
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t("Revue / Journal *", "Journal *")}
                  </label>
                  <input
                    type="text"
                    required
                    value={pubJournal}
                    onChange={e => setPubJournal(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                    placeholder="e.g. Brain and Neuroscience Advances"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t("Année", "Year")}
                  </label>
                  <input
                    type="number"
                    value={pubYear}
                    onChange={e => setPubYear(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Documents & Médias pour Publication */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl">
                {/* PDF */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("Document PDF", "PDF Document")}
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => handleFileRead(e, (dataUrl, file) => {
                      setPubPdfDataUrl(dataUrl);
                      setPubPdfFileName(file.name);
                    })}
                    className="text-[10px] text-slate-600 dark:text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full"
                  />
                  {pubPdfFileName && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 truncate">
                      <Check className="w-3 h-3" /> {pubPdfFileName}
                    </span>
                  )}
                </div>

                {/* Image / Figure */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("Image / Figure Article", "Article Image / Figure")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileRead(e, (dataUrl, file) => {
                      setPubImageDataUrl(dataUrl);
                      setPubImageFileName(file.name);
                    })}
                    className="text-[10px] text-slate-600 dark:text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full"
                  />
                  {pubImageFileName && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 truncate">
                      <Check className="w-3 h-3" /> {pubImageFileName}
                    </span>
                  )}
                </div>

                {/* Video URL */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <Film className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("Lien Vidéo / Présentation", "Video / Presentation Link")}
                  </label>
                  <input
                    type="text"
                    value={pubVideoUrl}
                    onChange={e => setPubVideoUrl(e.target.value)}
                    placeholder="Ex: https://youtube.com/watch?v=... ou mp4"
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px]"
                  />
                </div>
              </div>

              {/* Espace DOI Cliquable */}
              <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <label className="font-bold text-indigo-950 dark:text-indigo-200 text-xs flex items-center gap-1.5">
                    <Link2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    {t("Espace DOI Cliquable (Digital Object Identifier) *", "Clickable DOI Space (Digital Object Identifier) *")}
                  </label>
                  {pubDoi && (
                    <a
                      href={pubDoi.startsWith('http') ? pubDoi : `https://doi.org/${pubDoi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>Aperçu lien: https://doi.org/{pubDoi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <input
                  type="text"
                  value={pubDoi}
                  onChange={e => setPubDoi(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl outline-none text-xs font-mono text-indigo-900 dark:text-indigo-200 focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ex: 10.11648/j.cajph.20261203.13 ou https://doi.org/10.1016/j.bbr.2025.114890"
                />
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {t(
                    "Saisissez le DOI ou l'URL de l'article. Il sera automatiquement converti en lien cliquable https://doi.org/ sur la page Publications.",
                    "Enter the article DOI or URL. It will automatically resolve as a clickable https://doi.org/ button on the Publications page."
                  )}
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Résumé (FR)</label>
                <textarea
                  rows={2}
                  value={pubAbstractFr}
                  onChange={e => setPubAbstractFr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                  placeholder="Résumé succinct..."
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {t("Ajouter la publication au site", "Add Publication to Site")}
              </button>
            </form>
          )}

          {activeTab === 'comm' && (
            <form onSubmit={handleAddComm} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t("Titre de la communication *", "Communication Title *")}
                </label>
                <input
                  type="text"
                  required
                  value={commTitle}
                  onChange={e => setCommTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Type</label>
                  <select
                    value={commType}
                    onChange={e => setCommType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                  >
                    <option value="oral">Communication Orale</option>
                    <option value="poster">Poster Scientifique</option>
                    <option value="workshop">Workshop / Atelier</option>
                    <option value="keynote">Conférence Invitée</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Conférence *</label>
                  <input
                    type="text"
                    required
                    value={commConf}
                    onChange={e => setCommConf(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                    placeholder="e.g. FENS Forum 2026, CAMES..."
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Lieu & Pays</label>
                  <input
                    type="text"
                    value={commLocation}
                    onChange={e => setCommLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                    placeholder="Barcelona, Spain"
                  />
                </div>
              </div>

              {/* Documents & Médias pour Communication */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl">
                {/* PDF */}
                <div className="space-y-1.5 flex flex-col">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("PDF Poster / Slides", "PDF Poster / Slides")}
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => handleFileRead(e, (dataUrl, file) => {
                      setCommPdfDataUrl(dataUrl);
                      setCommPdfFileName(file.name);
                      setCommPdfUrlInput('');
                    })}
                    className="text-[10px] text-slate-600 dark:text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full"
                  />
                  <div className="text-[10px] text-slate-500 font-semibold my-0.5 text-center">OU / OR</div>
                  <input
                    type="text"
                    value={commPdfUrlInput}
                    onChange={e => { setCommPdfUrlInput(e.target.value); setCommPdfDataUrl(''); setCommPdfFileName(''); }}
                    placeholder="URL du PDF..."
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-[10px]"
                  />
                  {commPdfFileName && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 truncate mt-1">
                      <Check className="w-3 h-3" /> {commPdfFileName}
                    </span>
                  )}
                </div>

                {/* Photo / Image */}
                <div className="space-y-1.5 flex flex-col">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("Photo / Illustration", "Photo / Illustration")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileRead(e, (dataUrl, file) => {
                      setCommImageDataUrl(dataUrl);
                      setCommImageFileName(file.name);
                      setCommImageUrlInput('');
                    })}
                    className="text-[10px] text-slate-600 dark:text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full"
                  />
                  <div className="text-[10px] text-slate-500 font-semibold my-0.5 text-center">OU / OR</div>
                  <input
                    type="text"
                    value={commImageUrlInput}
                    onChange={e => { setCommImageUrlInput(e.target.value); setCommImageDataUrl(''); setCommImageFileName(''); }}
                    placeholder="URL de l'image..."
                    className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-[10px]"
                  />
                  {commImageFileName && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 truncate mt-1">
                      <Check className="w-3 h-3" /> {commImageFileName}
                    </span>
                  )}
                </div>

                {/* Video URL */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <Film className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("Lien Vidéo / Enregistrement", "Video / Recording Link")}
                  </label>
                  <input
                    type="text"
                    value={commVideoUrl}
                    onChange={e => setCommVideoUrl(e.target.value)}
                    placeholder="Ex: https://youtube.com/watch?v=..."
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {t("Ajouter la communication", "Add Communication")}
              </button>
            </form>
          )}

          {/* MEDIA & GALLERY UPLOAD TAB */}
          {activeTab === 'media' && (
            <div className="space-y-8 text-xs">
              {/* SECTION 1: UPLOAD MEDIA FILE (PDF, IMAGE OR VIDEO) */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                  <Paperclip className="w-4 h-4 text-indigo-600" />
                  {t("1. Ajouter un fichier PDF, Image ou Vidéo (Médiathèque)", "1. Upload PDF, Image or Video File (Media Library)")}
                </div>
                <p className="text-slate-500 text-[11px]">
                  {t("Téléversez un fichier depuis votre appareil (Séquence vidéo MP4, enregistrement EEG, PDF d'article, poster, diapositive, schéma) pour le stocker et réutiliser son lien.", "Upload a file from your device (MP4 Video clip, EEG recording, article PDF, poster, slides, diagram) to store and reuse its link.")}
                </p>

                <form onSubmit={handleSaveMedia} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t("Sélectionner le fichier (Vidéo, PDF ou Image) *", "Select File (Video, PDF or Image) *")}
                      </label>
                      <input
                        type="file"
                        required={!mediaDataUrl}
                        accept="application/pdf,image/*,video/*,.mp4,.webm,.mov,.ogg"
                        onChange={e => handleFileRead(e, (dataUrl, file) => {
                          setMediaDataUrl(dataUrl);
                          setMediaFileName(file.name);
                          setMediaFileSize(formatFileSize(file.size));
                          if (file.type.includes('video') || file.name.match(/\.(mp4|webm|mov|ogg|mkv|avi)$/i)) {
                            setMediaFileType('video');
                          } else if (file.type.includes('pdf')) {
                            setMediaFileType('pdf');
                          } else {
                            setMediaFileType('image');
                          }
                          if (!mediaName) setMediaName(file.name.replace(/\.[^/.]+$/, ""));
                        })}
                        className="text-xs text-slate-600 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t("Nom / Libellé du Fichier", "File Name / Label")}
                      </label>
                      <input
                        type="text"
                        value={mediaName}
                        onChange={e => setMediaName(e.target.value)}
                        placeholder="Ex: Demonstration_EEG_14_canaux.mp4"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  {mediaDataUrl && (
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {mediaFileType === 'image' ? (
                          <img src={mediaDataUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                        ) : mediaFileType === 'video' ? (
                          <div className="w-16 h-12 bg-purple-950/80 rounded-lg overflow-hidden relative flex items-center justify-center shrink-0 border border-purple-800">
                            <video src={mediaDataUrl} className="w-full h-full object-cover" />
                            <Film className="w-5 h-5 text-purple-300 absolute" />
                          </div>
                        ) : (
                          <div className="p-2.5 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-lg shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{mediaFileName}</div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold">{mediaFileType} • {mediaFileSize}</div>
                        </div>
                      </div>
                      <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> {t("Prêt à enregistrer", "Ready to save")}
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!mediaDataUrl}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {t("Enregistrer dans la Médiathèque", "Save to Media Library")}
                  </button>
                </form>
              </div>

              {/* SECTION 2: UPLOAD PHOTO TO GALLERY */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  {t("2. Ajouter une Photo à la Galerie du Site", "2. Add Photo to Site Gallery")}
                </div>

                <form onSubmit={handleAddPhoto} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t("Fichier Image (PNG, JPG, WebP) *", "Image File (PNG, JPG, WebP) *")}
                      </label>
                      <input
                        type="file"
                        required={!photoImageDataUrl}
                        accept="image/*"
                        onChange={e => handleFileRead(e, (dataUrl, file) => {
                          setPhotoImageDataUrl(dataUrl);
                          setPhotoFileName(file.name);
                        })}
                        className="text-xs text-slate-600 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t("Catégorie *", "Category *")}
                      </label>
                      <select
                        value={photoCategory}
                        onChange={e => setPhotoCategory(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                      >
                        <option value="conferences">Conférences & Symposia</option>
                        <option value="laboratory">Laboratoire & Équipements</option>
                        <option value="fieldwork">Missions de Terrain / Agrosystèmes</option>
                        <option value="eeg">Expérimentations EEG & Cognition</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Titre (FR) *</label>
                      <input
                        type="text"
                        required
                        value={photoTitleFr}
                        onChange={e => setPhotoTitleFr(e.target.value)}
                        placeholder="Ex: Atelier EEG 14 canaux à l'UFHB"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Lieu</label>
                      <input
                        type="text"
                        value={photoLocation}
                        onChange={e => setPhotoLocation(e.target.value)}
                        placeholder="Abidjan, Côte d'Ivoire"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                      <input
                        type="text"
                        value={photoDate}
                        onChange={e => setPhotoDate(e.target.value)}
                        placeholder="2026"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  {photoImageDataUrl && (
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-3">
                      <img src={photoImageDataUrl} alt="Preview" className="w-16 h-12 object-cover rounded-lg" />
                      <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        Aperçu de la photo de galerie ({photoFileName})
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!photoImageDataUrl || !photoTitleFr}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {t("Ajouter à la Galerie du site", "Add to Site Gallery")}
                  </button>
                </form>
              </div>

              {/* SECTION 3: MEDIA LIBRARY & GALLERY MANAGEMENT */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FolderPlus className="w-4 h-4 text-indigo-600" />
                  {t("Fichiers Médias & Photos de la Galerie", "Media Files & Gallery Photos")}
                </h4>

                {mediaFiles.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {t("Médiathèque (Vidéos / PDF / Images)", "Media Library (Videos / PDFs / Images)")} ({mediaFiles.length})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mediaFiles.map(mf => (
                        <div key={mf.id} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {mf.type === 'image' ? (
                              <img src={mf.url} alt={mf.name} className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
                            ) : mf.type === 'video' ? (
                              <div className="p-2 bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 rounded-lg flex-shrink-0">
                                <Film className="w-5 h-5" />
                              </div>
                            ) : (
                              <div className="p-2 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-lg flex-shrink-0">
                                <FileText className="w-5 h-5" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="font-semibold text-slate-800 dark:text-slate-200 truncate text-[11px]">{mf.name}</div>
                              <div className="text-[10px] text-slate-400 uppercase font-bold">{mf.type} {mf.size ? `• ${mf.size}` : ''}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => copyToClipboard(mf.url, mf.id)}
                              title={t("Copier le lien", "Copy link")}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              {copiedId === mf.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <a
                              href={mf.url}
                              target="_blank"
                              rel="noreferrer"
                              download={mf.name}
                              title={t("Ouvrir / Télécharger", "Open / Download")}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => deleteMediaFile(mf.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery photos count */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    {t("Photos dans la Galerie", "Photos in Gallery")} ({galleryPhotos.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {galleryPhotos.map(gp => (
                      <div key={gp.id} className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 aspect-video">
                        <img src={gp.imageUrl} alt={gp.title.fr} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-2 flex flex-col justify-end">
                          <span className="text-[10px] font-bold text-white truncate">{gp.title.fr}</span>
                          <span className="text-[9px] text-slate-300">{gp.location}</span>
                        </div>
                        <button
                          onClick={() => deleteGalleryPhoto(gp.id)}
                          className="absolute top-1.5 right-1.5 p-1 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition"
                          title="Supprimer la photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <form onSubmit={handleAddNews} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Titre de l'actualité (FR) *
                </label>
                <input
                  type="text"
                  required
                  value={newsTitleFr}
                  onChange={e => setNewsTitleFr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                  placeholder="Ex: Présentation au Congrès FENS 2026..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Résumé (FR)</label>
                <textarea
                  rows={3}
                  value={newsSummaryFr}
                  onChange={e => setNewsSummaryFr(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100"
                  placeholder="Description ou annonce de l'actualité..."
                />
              </div>

              {/* Lien Externe Optionnel */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-indigo-600" />
                  {t("Lien Web / Source (Optionnel)", "Web / Source Link (Optional)")}
                </label>
                <input
                  type="text"
                  value={newsLinkUrl}
                  onChange={e => setNewsLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>

              {/* Documents & Médias pour News */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl">
                {/* Image */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("Photo / Image", "Photo / Image")}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileRead(e, (dataUrl, file) => {
                      setNewsImageDataUrl(dataUrl);
                      setNewsImageFileName(file.name);
                    })}
                    className="text-[10px] text-slate-600 dark:text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full"
                  />
                  {newsImageFileName && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 truncate">
                      <Check className="w-3 h-3" /> {newsImageFileName}
                    </span>
                  )}
                </div>

                {/* PDF */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("Document PDF", "PDF Document")}
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={e => handleFileRead(e, (dataUrl, file) => {
                      setNewsPdfDataUrl(dataUrl);
                      setNewsPdfFileName(file.name);
                    })}
                    className="text-[10px] text-slate-600 dark:text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full"
                  />
                  {newsPdfFileName && (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 truncate">
                      <Check className="w-3 h-3" /> {newsPdfFileName}
                    </span>
                  )}
                </div>

                {/* Video URL */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 text-[11px]">
                    <Film className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    {t("Lien Vidéo", "Video Link")}
                  </label>
                  <input
                    type="text"
                    value={newsVideoUrl}
                    onChange={e => setNewsVideoUrl(e.target.value)}
                    placeholder="Ex: https://youtube.com/watch?v=..."
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[11px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {t("Publier l'actualité", "Publish News")}
              </button>
            </form>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 text-xs">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  {t("Modifier la photo de profil (Accueil)", "Change Profile Photo (Home)")}
                </div>
                <p className="text-slate-500 text-[11px]">
                  {t("Entrez l'URL de la photo ou téléchargez une nouvelle image pour modifier la photo affichée sur la page d'accueil.", "Enter an image URL or upload a new photo to change the picture displayed on the homepage.")}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 relative">
                    <img src={profilePhotoUrl || "https://placehold.co/400x500/1e1e2f/ffffff?text=Photo"} alt="Current Profile" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileRead(e, (dataUrl) => {
                          setUserPhotoUrlInput(dataUrl);
                        })}
                        className="text-xs text-slate-600 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-500">OU</span>
                      <input
                        type="text"
                        value={userPhotoUrlInput}
                        onChange={e => setUserPhotoUrlInput(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    if (userPhotoUrlInput) {
                      updateProfilePhotoUrl(userPhotoUrlInput);
                      setSuccessMsg(t("Photo de profil mise à jour !", "Profile photo updated!"));
                      setUserPhotoUrlInput('');
                      setTimeout(() => setSuccessMsg(''), 3000);
                    }
                  }}
                  disabled={!userPhotoUrlInput}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {t("Sauvegarder", "Save")}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="space-y-6 text-xs">
              {/* Category selector inside Manage */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
                {[
                  { id: 'pubs', label: `Publications (${publications.length})`, icon: BookOpen },
                  { id: 'comms', label: `Communications (${communications.length})`, icon: MessageSquare },
                  { id: 'news', label: `Actualités (${news.length})`, icon: Newspaper },
                  { id: 'projects', label: `Projets (${projects.length})`, icon: Briefcase },
                  { id: 'awards', label: `Prix & Financements (${awards?.length || 0})`, icon: Award },
                  { id: 'gallery', label: `Galerie (${galleryPhotos.length})`, icon: ImageIcon },
                  { id: 'media', label: `Médiathèque (${mediaFiles.length})`, icon: Film },
                  { id: 'backup', label: t('Sauvegarde / JSON', 'Backup / JSON'), icon: Download },
                ].map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setManageCategory(cat.id as any)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                        manageCategory === cat.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* LIST PUBLICATIONS */}
              {manageCategory === 'pubs' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {t("Liste des Publications Récents", "List of Publications")} ({publications.length})
                    </span>
                    <button
                      onClick={() => setActiveTab('pub')}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t("Ajouter une nouvelle publication", "Add new publication")}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {publications.map(pub => (
                      <div key={pub.id} className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold rounded-md text-[10px]">
                              {pub.year}
                            </span>
                            {pub.doi && (
                              <span className="text-[10px] text-slate-500 font-mono truncate">
                                DOI: {pub.doi}
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs line-clamp-1">{pub.title}</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{pub.journal} • {pub.authors.join(', ')}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingPub(pub)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center gap-1"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>{t("Modifier", "Edit")}</span>
                          </button>
                          <button
                            onClick={() => deleteItem('publications', pub.id)}
                            className="p-1.5 bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition"
                            title={t("Supprimer", "Delete")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LIST COMMUNICATIONS */}
              {manageCategory === 'comms' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {t("Liste des Communications & Symposia", "List of Communications")} ({communications.length})
                    </span>
                    <button
                      onClick={() => setActiveTab('comm')}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t("Ajouter communication", "Add communication")}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {communications.map(comm => (
                      <div key={comm.id} className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold rounded-md text-[10px] uppercase">
                              {comm.type} ({comm.year})
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold">{comm.location}</span>
                          </div>
                          <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs line-clamp-1">{comm.title}</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{comm.conference}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingComm(comm)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center gap-1"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>{t("Modifier", "Edit")}</span>
                          </button>
                          <button
                            onClick={() => deleteItem('communications', comm.id)}
                            className="p-1.5 bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition"
                            title={t("Supprimer", "Delete")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LIST NEWS */}
              {manageCategory === 'news' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {t("Liste des Actualités", "List of News")} ({news.length})
                    </span>
                    <button
                      onClick={() => setActiveTab('news')}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t("Publier une actualité", "Publish news")}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {news.map(nw => (
                      <div key={nw.id} className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0 flex-1">
                          <span className="text-[10px] text-slate-400 font-semibold">{nw.date}</span>
                          <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs line-clamp-1">{nw.title.fr}</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{nw.summary.fr}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingNews(nw)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center gap-1"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>{t("Modifier", "Edit")}</span>
                          </button>
                          <button
                            onClick={() => deleteItem('news', nw.id)}
                            className="p-1.5 bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition"
                            title={t("Supprimer", "Delete")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LIST PROJECTS */}
              {manageCategory === 'projects' && (
                <div className="space-y-3">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {t("Liste des Projets de Recherche", "Research Projects")} ({projects.length})
                  </span>

                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {projects.map(proj => (
                      <div key={proj.id} className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-[10px]">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">{proj.role}</span>
                            <span className="text-slate-400">• {proj.period}</span>
                          </div>
                          <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs line-clamp-1">{proj.title.fr}</h5>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingProj(proj)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center gap-1"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>{t("Modifier", "Edit")}</span>
                          </button>
                          <button
                            onClick={() => deleteItem('projects', proj.id)}
                            className="p-1.5 bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition"
                            title={t("Supprimer", "Delete")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LIST AWARDS */}
              {manageCategory === 'awards' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {t("Prix & Financements", "Awards & Funding")} ({awards?.length || 0})
                    </span>
                    <button
                      onClick={() => {
                        const newAward = {
                          id: `award-${Date.now()}`,
                          title: { fr: '', en: '' },
                          organization: '',
                          year: new Date().getFullYear(),
                          category: 'award',
                          description: { fr: '', en: '' },
                          credentialUrl: ''
                        };
                        setEditingAward(newAward);
                      }}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t("Ajouter", "Add")}
                    </button>
                  </div>

                  {editingAward ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (awards?.find(a => a.id === editingAward.id)) {
                          updateAward(editingAward);
                        } else {
                          addAward(editingAward);
                        }
                        setEditingAward(null);
                        setSuccessMsg("Prix / Financement sauvegardé !");
                        setTimeout(() => setSuccessMsg(''), 3000);
                      }}
                      className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                    >
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Titre</label>
                        <input
                          type="text"
                          required
                          value={editingAward.title.fr}
                          onChange={e => setEditingAward({ ...editingAward, title: { fr: e.target.value, en: e.target.value } })}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Organisation</label>
                        <input
                          type="text"
                          required
                          value={editingAward.organization}
                          onChange={e => setEditingAward({ ...editingAward, organization: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Période / Description</label>
                        <input
                          type="text"
                          required
                          value={editingAward.description.fr}
                          onChange={e => setEditingAward({ ...editingAward, description: { fr: e.target.value, en: e.target.value } })}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">URL du Financement (Optionnel)</label>
                        <input
                          type="text"
                          value={editingAward.credentialUrl || ''}
                          onChange={e => setEditingAward({ ...editingAward, credentialUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                        />
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={() => setEditingAward(null)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl">Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Sauvegarder</button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                      {awards?.map(award => (
                        <div key={award.id} className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="space-y-1 min-w-0 flex-1">
                            <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs line-clamp-1">{award.title.fr}</h5>
                            <p className="text-[11px] text-slate-500">{award.organization}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => setEditingAward(award)}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center gap-1"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>{t("Modifier", "Edit")}</span>
                            </button>
                            <button
                              onClick={() => deleteItem('awards', award.id)}
                              className="p-1.5 bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* LIST GALLERY PHOTOS */}
              {manageCategory === 'gallery' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {t("Galerie Photos & Images", "Photo Gallery")} ({galleryPhotos.length})
                    </span>
                    <button
                      onClick={() => setActiveTab('media')}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t("Ajouter une photo", "Add photo")}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
                    {galleryPhotos.map(gp => (
                      <div key={gp.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={gp.imageUrl} alt={gp.title.fr} className="w-12 h-12 object-cover rounded-xl shrink-0" />
                          <div className="min-w-0 space-y-0.5">
                            <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate">{gp.title.fr}</h5>
                            <p className="text-[10px] text-slate-400">{gp.location} • {gp.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingPhoto(gp)}
                            className="p-1.5 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 rounded-xl hover:bg-indigo-600 hover:text-white transition"
                            title={t("Modifier", "Edit")}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteGalleryPhoto(gp.id)}
                            className="p-1.5 bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition"
                            title={t("Supprimer", "Delete")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LIST MEDIA FILES (PDF, VIDEO, IMAGES) */}
              {manageCategory === 'media' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {t("Fichiers Média (Vidéos, PDF, Documents)", "Media Files (Videos, PDFs, Documents)")} ({mediaFiles.length})
                    </span>
                    <button
                      onClick={() => setActiveTab('media')}
                      className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t("Téléverser un fichier", "Upload file")}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                    {mediaFiles.map(mf => (
                      <div key={mf.id} className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {mf.type === 'image' ? (
                            <img src={mf.url} alt={mf.name} className="w-10 h-10 object-cover rounded-xl shrink-0" />
                          ) : mf.type === 'video' ? (
                            <div className="p-2.5 bg-purple-100 dark:bg-purple-950/80 text-purple-600 rounded-xl shrink-0">
                              <Film className="w-5 h-5" />
                            </div>
                          ) : (
                            <div className="p-2.5 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-xl shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate">{mf.name}</h5>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">{mf.type} {mf.size ? `• ${mf.size}` : ''}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setEditingMedia(mf)}
                            className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition flex items-center gap-1"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>{t("Modifier", "Edit")}</span>
                          </button>
                          <button
                            onClick={() => deleteMediaFile(mf.id)}
                            className="p-1.5 bg-red-100 dark:bg-red-950/60 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition"
                            title={t("Supprimer", "Delete")}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* BACKUP & JSON RESTORE */}
              {manageCategory === 'backup' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4 text-indigo-500" />
                      {t("Sauvegarde & Exportation JSON", "Backup & JSON Export")}
                    </h4>
                    <p className="text-slate-500 mb-3">
                      {t("Téléchargez l'intégralité de la base de données de vos publications, communications, médias et photos sous forme de fichier JSON.", "Download your full database of publications, communications, media files and gallery photos as a portable JSON file.")}
                    </p>
                    <button
                      onClick={handleExport}
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-100 dark:text-slate-900 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {t("Télécharger Fichier Backup JSON", "Download Backup JSON File")}
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-emerald-500" />
                      {t("Restauration depuis JSON", "Restore from JSON")}
                    </h4>
                    <textarea
                      rows={3}
                      value={jsonInput}
                      onChange={e => setJsonInput(e.target.value)}
                      placeholder="Coller ici le contenu du fichier JSON..."
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-[11px] mb-2"
                    />
                    <button
                      onClick={handleImport}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {t("Restaurer les Données", "Restore Data")}
                    </button>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-1 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      {t("Réinitialiser les données d'origine", "Reset to Default State")}
                    </h4>
                    <p className="text-red-600 dark:text-red-300 mb-3 text-[11px]">
                      {t("Rétablit toutes les données et photos d'origine du site.", "Restores all original publications, communications and gallery photos.")}
                    </p>
                    <button
                      onClick={resetAllToDefault}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
                    >
                      {t("Réinitialiser Tout", "Reset All Data")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* EDIT PUBLICATION MODAL */}
      {editingPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Pencil className="w-4 h-4 text-indigo-600" />
                {t("Modifier la Publication", "Edit Publication")}
              </h4>
              <button onClick={() => setEditingPub(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updatePublication(editingPub);
                setEditingPub(null);
                setSuccessMsg(t("Publication modifiée avec succès !", "Publication updated successfully!"));
                setTimeout(() => setSuccessMsg(''), 3000);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold mb-1">Titre de l'article *</label>
                <input
                  type="text"
                  required
                  value={editingPub.title}
                  onChange={e => setEditingPub({ ...editingPub, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Auteurs (séparés par une virgule) *</label>
                <input
                  type="text"
                  required
                  value={editingPub.authors.join(', ')}
                  onChange={e => setEditingPub({ ...editingPub, authors: e.target.value.split(',').map(s => s.trim()) })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Année *</label>
                  <input
                    type="number"
                    value={editingPub.year}
                    onChange={e => setEditingPub({ ...editingPub, year: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Revue / Journal *</label>
                  <input
                    type="text"
                    value={editingPub.journal}
                    onChange={e => setEditingPub({ ...editingPub, journal: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-indigo-700 dark:text-indigo-300 mb-1 flex items-center gap-1">
                  <Link2 className="w-3.5 h-3.5" /> DOI (Cliquable)
                </label>
                <input
                  type="text"
                  value={editingPub.doi || ''}
                  onChange={e => setEditingPub({ ...editingPub, doi: e.target.value })}
                  placeholder="Ex: 10.1016/j.bbr.2025.114890"
                  className="w-full px-3 py-2 bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl font-mono text-indigo-900 dark:text-indigo-200"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Résumé FR</label>
                <textarea
                  rows={3}
                  value={editingPub.abstract?.fr || ''}
                  onChange={e => setEditingPub({
                    ...editingPub,
                    abstract: { ...editingPub.abstract, fr: e.target.value, en: editingPub.abstract?.en || e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              {/* Media Attachments for Edit Publication */}
              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl space-y-3">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 text-xs flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-indigo-600" />
                  {t("Fichiers & Médias Associés (PDF, Image, Vidéo)", "Associated Media & Files (PDF, Image, Video)")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  {/* PDF */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-indigo-500" /> PDF Article
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={e => handleFileRead(e, (dataUrl) => setEditingPub({ ...editingPub, pdfUrl: dataUrl }))}
                      className="text-[10px] text-slate-500 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white cursor-pointer w-full mb-1"
                    />
                    <input
                      type="text"
                      placeholder="Ou lien URL du PDF"
                      value={editingPub.pdfUrl || ''}
                      onChange={e => setEditingPub({ ...editingPub, pdfUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px]"
                    />
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-indigo-500" /> Image / Figure
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileRead(e, (dataUrl) => setEditingPub({ ...editingPub, imageUrl: dataUrl }))}
                      className="text-[10px] text-slate-500 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white cursor-pointer w-full mb-1"
                    />
                    <input
                      type="text"
                      placeholder="Ou lien URL de l'image"
                      value={editingPub.imageUrl || ''}
                      onChange={e => setEditingPub({ ...editingPub, imageUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px]"
                    />
                  </div>

                  {/* Video */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <Film className="w-3 h-3 text-indigo-500" /> Vidéo Présentation
                    </label>
                    <input
                      type="text"
                      placeholder="Lien URL vidéo / YouTube"
                      value={editingPub.videoUrl || ''}
                      onChange={e => setEditingPub({ ...editingPub, videoUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px] mt-6 sm:mt-5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPub(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{t("Enregistrer les modifications", "Save Changes")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COMMUNICATION MODAL */}
      {editingComm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Pencil className="w-4 h-4 text-indigo-600" />
                {t("Modifier la Communication", "Edit Communication")}
              </h4>
              <button onClick={() => setEditingComm(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateCommunication(editingComm);
                setEditingComm(null);
                setSuccessMsg(t("Communication modifiée avec succès !", "Communication updated successfully!"));
                setTimeout(() => setSuccessMsg(''), 3000);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold mb-1">Titre de la communication *</label>
                <input
                  type="text"
                  required
                  value={editingComm.title}
                  onChange={e => setEditingComm({ ...editingComm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Type de présentation</label>
                  <select
                    value={editingComm.type}
                    onChange={e => setEditingComm({ ...editingComm, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="oral">Oral Presentation</option>
                    <option value="poster">Poster</option>
                    <option value="keynote">Keynote Speaker</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Année</label>
                  <input
                    type="number"
                    value={editingComm.year}
                    onChange={e => setEditingComm({ ...editingComm, year: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Congrès / Conférence *</label>
                <input
                  type="text"
                  required
                  value={editingComm.conference}
                  onChange={e => setEditingComm({ ...editingComm, conference: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Lieu (Ville)</label>
                  <input
                    type="text"
                    value={editingComm.location}
                    onChange={e => setEditingComm({ ...editingComm, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Pays</label>
                  <input
                    type="text"
                    value={editingComm.country}
                    onChange={e => setEditingComm({ ...editingComm, country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              {/* Media Attachments for Edit Communication */}
              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl space-y-3">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 text-xs flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-indigo-600" />
                  {t("Fichiers & Médias Associés (PDF, Image, Vidéo)", "Associated Media & Files (PDF, Image, Video)")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  {/* PDF */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-indigo-500" /> PDF Slides / Poster
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={e => handleFileRead(e, (dataUrl) => setEditingComm({ ...editingComm, pdfUrl: dataUrl, slidesUrl: editingComm.type === 'oral' ? dataUrl : editingComm.slidesUrl, posterUrl: editingComm.type === 'poster' ? dataUrl : editingComm.posterUrl }))}
                      className="text-[10px] text-slate-500 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white cursor-pointer w-full mb-1"
                    />
                    <input
                      type="text"
                      placeholder="Ou lien URL du PDF"
                      value={editingComm.pdfUrl || editingComm.slidesUrl || editingComm.posterUrl || ''}
                      onChange={e => setEditingComm({ ...editingComm, pdfUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px]"
                    />
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-indigo-500" /> Photo / Illustration
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileRead(e, (dataUrl) => setEditingComm({ ...editingComm, imageUrl: dataUrl }))}
                      className="text-[10px] text-slate-500 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white cursor-pointer w-full mb-1"
                    />
                    <input
                      type="text"
                      placeholder="Ou lien URL de la photo"
                      value={editingComm.imageUrl || ''}
                      onChange={e => setEditingComm({ ...editingComm, imageUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px]"
                    />
                  </div>

                  {/* Video */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <Film className="w-3 h-3 text-indigo-500" /> Vidéo Présentation
                    </label>
                    <input
                      type="text"
                      placeholder="Lien URL vidéo / YouTube"
                      value={editingComm.videoUrl || ''}
                      onChange={e => setEditingComm({ ...editingComm, videoUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px] mt-6 sm:mt-5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingComm(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{t("Enregistrer les modifications", "Save Changes")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT NEWS MODAL */}
      {editingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Pencil className="w-4 h-4 text-indigo-600" />
                {t("Modifier l'Actualité", "Edit News")}
              </h4>
              <button onClick={() => setEditingNews(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateNewsItem(editingNews);
                setEditingNews(null);
                setSuccessMsg(t("Actualité modifiée avec succès !", "News updated successfully!"));
                setTimeout(() => setSuccessMsg(''), 3000);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold mb-1">Titre (FR) *</label>
                <input
                  type="text"
                  required
                  value={editingNews.title.fr}
                  onChange={e => setEditingNews({
                    ...editingNews,
                    title: { ...editingNews.title, fr: e.target.value, en: editingNews.title.en || e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Résumé (FR) *</label>
                <textarea
                  rows={3}
                  required
                  value={editingNews.summary.fr}
                  onChange={e => setEditingNews({
                    ...editingNews,
                    summary: { ...editingNews.summary, fr: e.target.value, en: editingNews.summary.en || e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-indigo-700 dark:text-indigo-300 mb-1 flex items-center gap-1">
                  <Link2 className="w-3.5 h-3.5" /> Lien Web / Source
                </label>
                <input
                  type="text"
                  value={editingNews.linkUrl || ''}
                  onChange={e => setEditingNews({ ...editingNews, linkUrl: e.target.value })}
                  placeholder="Ex: https://..."
                  className="w-full px-3 py-2 bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-xl font-mono text-indigo-900 dark:text-indigo-200"
                />
              </div>

              {/* Media Attachments for Edit News */}
              <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl space-y-3">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 text-xs flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-indigo-600" />
                  {t("Fichiers & Médias Associés (Photo, PDF, Vidéo)", "Associated Media & Files (Photo, PDF, Video)")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  {/* Photo */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-indigo-500" /> Photo / Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileRead(e, (dataUrl) => setEditingNews({ ...editingNews, imageUrl: dataUrl }))}
                      className="text-[10px] text-slate-500 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white cursor-pointer w-full mb-1"
                    />
                    <input
                      type="text"
                      placeholder="Ou lien URL photo"
                      value={editingNews.imageUrl || ''}
                      onChange={e => setEditingNews({ ...editingNews, imageUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px]"
                    />
                  </div>

                  {/* PDF */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-indigo-500" /> Document PDF
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={e => handleFileRead(e, (dataUrl) => setEditingNews({ ...editingNews, pdfUrl: dataUrl }))}
                      className="text-[10px] text-slate-500 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white cursor-pointer w-full mb-1"
                    />
                    <input
                      type="text"
                      placeholder="Ou lien URL du PDF"
                      value={editingNews.pdfUrl || ''}
                      onChange={e => setEditingNews({ ...editingNews, pdfUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px]"
                    />
                  </div>

                  {/* Video */}
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <Film className="w-3 h-3 text-indigo-500" /> Lien Vidéo
                    </label>
                    <input
                      type="text"
                      placeholder="Lien URL vidéo / YouTube"
                      value={editingNews.videoUrl || ''}
                      onChange={e => setEditingNews({ ...editingNews, videoUrl: e.target.value })}
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-[10px] mt-6 sm:mt-5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingNews(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{t("Enregistrer les modifications", "Save Changes")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PROJECT MODAL */}
      {editingProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Pencil className="w-4 h-4 text-indigo-600" />
                {t("Modifier le Projet", "Edit Project")}
              </h4>
              <button onClick={() => setEditingProj(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateProject(editingProj);
                setEditingProj(null);
                setSuccessMsg(t("Projet modifié avec succès !", "Project updated successfully!"));
                setTimeout(() => setSuccessMsg(''), 3000);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold mb-1">Titre du Projet (FR) *</label>
                <input
                  type="text"
                  required
                  value={editingProj.title.fr}
                  onChange={e => setEditingProj({
                    ...editingProj,
                    title: { ...editingProj.title, fr: e.target.value, en: editingProj.title.en || e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Rôle</label>
                  <input
                    type="text"
                    value={editingProj.role}
                    onChange={e => setEditingProj({ ...editingProj, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Période</label>
                  <input
                    type="text"
                    value={editingProj.period}
                    onChange={e => setEditingProj({ ...editingProj, period: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Description (FR)</label>
                <textarea
                  rows={3}
                  value={editingProj.description.fr}
                  onChange={e => setEditingProj({
                    ...editingProj,
                    description: { ...editingProj.description, fr: e.target.value, en: editingProj.description.en || e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProj(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{t("Enregistrer les modifications", "Save Changes")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT GALLERY PHOTO MODAL */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Pencil className="w-4 h-4 text-indigo-600" />
                {t("Modifier la Photo de Galerie", "Edit Photo")}
              </h4>
              <button onClick={() => setEditingPhoto(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateGalleryPhoto(editingPhoto);
                setEditingPhoto(null);
                setSuccessMsg(t("Photo modifiée avec succès !", "Photo updated successfully!"));
                setTimeout(() => setSuccessMsg(''), 3000);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold mb-1">Titre de la photo (FR) *</label>
                <input
                  type="text"
                  required
                  value={editingPhoto.title.fr}
                  onChange={e => setEditingPhoto({
                    ...editingPhoto,
                    title: { ...editingPhoto.title, fr: e.target.value, en: editingPhoto.title.en || e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Lieu</label>
                  <input
                    type="text"
                    value={editingPhoto.location}
                    onChange={e => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Date / Année</label>
                  <input
                    type="text"
                    value={editingPhoto.date}
                    onChange={e => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">URL de l'image</label>
                <input
                  type="text"
                  required
                  value={editingPhoto.imageUrl}
                  onChange={e => setEditingPhoto({ ...editingPhoto, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-[10px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{t("Enregistrer les modifications", "Save Changes")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MEDIA FILE MODAL */}
      {editingMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
                <Pencil className="w-4 h-4 text-indigo-600" />
                {t("Modifier le Fichier Média", "Edit Media File")}
              </h4>
              <button onClick={() => setEditingMedia(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateMediaFile(editingMedia);
                setEditingMedia(null);
                setSuccessMsg(t("Fichier média modifié avec succès !", "Media file updated successfully!"));
                setTimeout(() => setSuccessMsg(''), 3000);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold mb-1">Nom du fichier *</label>
                <input
                  type="text"
                  required
                  value={editingMedia.name}
                  onChange={e => setEditingMedia({ ...editingMedia, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Type de média</label>
                  <select
                    value={editingMedia.type}
                    onChange={e => setEditingMedia({ ...editingMedia, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl capitalize"
                  >
                    <option value="video">Vidéo (MP4 / WebM)</option>
                    <option value="pdf">Document PDF</option>
                    <option value="image">Image (JPG / PNG)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Taille estimée</label>
                  <input
                    type="text"
                    value={editingMedia.size || ''}
                    onChange={e => setEditingMedia({ ...editingMedia, size: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                    placeholder="Ex: 4.2 MB"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Lien URL du fichier</label>
                <input
                  type="text"
                  required
                  value={editingMedia.url}
                  onChange={e => setEditingMedia({ ...editingMedia, url: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-mono text-[10px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMedia(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{t("Enregistrer les modifications", "Save Changes")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

