import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdminHub } from './components/AdminHub';
import { SearchModal } from './components/SearchModal';
import { BibtexModal } from './components/BibtexModal';
import { PdfViewerModal } from './components/PdfViewerModal';

import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ResearchView } from './views/ResearchView';
import { PublicationsView } from './views/PublicationsView';
import { CommunicationsView } from './views/CommunicationsView';
import { ProjectsView } from './views/ProjectsView';
import { SoftwareDataView } from './views/SoftwareDataView';
import { TeachingView } from './views/TeachingView';
import { GalleryMediaView } from './views/GalleryMediaView';
import { AwardsView } from './views/AwardsView';
import { CvView } from './views/CvView';
import { ContactView } from './views/ContactView';
import { NewsView } from './views/NewsView';

import { Publication, Communication } from './types';

export default function App() {
  // Fonction utilitaire pour lire le hash de l'URL au chargement initial
  const getViewFromHash = (): string => {
    const hash = window.location.hash.replace('#', '').trim();
    return hash || 'home';
  };

  const [activeView, setActiveView] = useState<string>(getViewFromHash);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [selectedCommunication, setSelectedCommunication] = useState<Communication | null>(null);

  // Fonction centrale pour changer de vue ET mettre à jour l'URL hash (#)
  const handleNavigate = (view: string) => {
    setActiveView(view);
    if (view === 'home') {
      // Nettoie l'URL sans recharger la page si on revient à l'accueil
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronisation avec les boutons Précédent/Suivant du navigateur
  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace('#', '').trim();
      setActiveView(currentHash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomeView
            setActiveView={handleNavigate}
            onSelectPublication={setSelectedPublication}
            onSelectCommunication={setSelectedCommunication}
          />
        );
      case 'about':
        return <AboutView />;
      case 'research':
        return <ResearchView />;
      case 'publications':
        return <PublicationsView onSelectPublication={setSelectedPublication} />;
      case 'communications':
        return <CommunicationsView onSelectCommunication={setSelectedCommunication} />;
      case 'news':
        return <NewsView />;
      case 'projects':
        return <ProjectsView />;
      case 'software':
        return <SoftwareDataView />;
      case 'teaching':
        return <TeachingView />;
      case 'gallery':
        return <GalleryMediaView />;
      case 'awards':
        return <AwardsView />;
      case 'cv':
        return <CvView />;
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView
            setActiveView={handleNavigate}
            onSelectPublication={setSelectedPublication}
            onSelectCommunication={setSelectedCommunication}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <ContentProvider>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
            {/* Top Sticky Navbar */}
            <Navbar
              activeView={activeView}
              setActiveView={handleNavigate}
              onOpenAdmin={() => setIsAdminOpen(true)}
              onOpenSearch={() => setIsSearchOpen(true)}
            />

            {/* Main Content View Frame */}
            <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              {renderCurrentView()}
            </main>

            {/* Site Footer */}
            <Footer setActiveView={handleNavigate} />

            {/* Interactive Modals */}
            <AdminHub
              isOpen={isAdminOpen}
              onClose={() => setIsAdminOpen(false)}
            />

            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
              setActiveView={handleNavigate}
              onSelectPublication={setSelectedPublication}
            />

            <BibtexModal
              publication={selectedPublication}
              onClose={() => setSelectedPublication(null)}
            />

            <PdfViewerModal
              item={selectedCommunication}
              onClose={() => setSelectedCommunication(null)}
            />
          </div>
        </ContentProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
