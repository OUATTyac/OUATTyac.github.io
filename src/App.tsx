import React, { useState } from 'react';
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

import { Publication, Communication } from './types';

export default function App() {
  const [activeView, setActiveView] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [selectedCommunication, setSelectedCommunication] = useState<Communication | null>(null);

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return (
          <HomeView
            setActiveView={setActiveView}
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
            setActiveView={setActiveView}
            onSelectPublication={setSelectedPublication}
            onSelectCommunication={setSelectedCommunication}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <ContentProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
          {/* Top Sticky Navbar */}
          <Navbar
            activeView={activeView}
            setActiveView={setActiveView}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Main Content View Frame */}
          <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {renderCurrentView()}
          </main>

          {/* Site Footer */}
          <Footer setActiveView={setActiveView} />

          {/* Interactive Modals */}
          <AdminHub
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
          />

          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            setActiveView={setActiveView}
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
  );
}

