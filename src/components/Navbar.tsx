import React, { useState, useEffect } from 'react';
import {
  Brain,
  Globe,
  Search,
  Menu,
  X,
  Sparkles,
  BookOpen,
  MessageSquare,
  FolderGit2,
  GraduationCap,
  Award,
  Image as ImageIcon,
  FileText,
  Mail,
  UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenAdmin: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenAdmin,
  onOpenSearch
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t("Accueil", "Home"), icon: Brain },
    { id: 'about', label: t("À propos", "About"), icon: UserCheck },
    { id: 'research', label: t("Recherches", "Research"), icon: Brain },
    { id: 'publications', label: t("Publications", "Publications"), icon: BookOpen },
    { id: 'communications', label: t("Communications", "Communications"), icon: MessageSquare },
    { id: 'awards', label: t("Prix & Diplômes", "Awards & Certs"), icon: Award },
    { id: 'cv', label: t("CV", "CV"), icon: FileText },
    { id: 'projects', label: t("Projets", "Projects"), icon: FolderGit2 },
    { id: 'software', label: t("Logiciels & Datasets", "Software & Data"), icon: FolderGit2 },
    // { id: 'teaching', label: t("Enseignement", "Teaching"), icon: GraduationCap },
    { id: 'gallery', label: t("Galerie & Média", "Gallery & Media"), icon: ImageIcon },
    { id: 'contact', label: t("Contact", "Contact"), icon: Mail }
  ];

  const handleNavClick = (id: string) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Name Logo */}
        <button
          onClick={() => handleNavClick('home')}
          onDoubleClick={onOpenAdmin}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/20 group-hover:scale-105 transition">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg tracking-tight block leading-tight">
              Yacouba OUATTARA
            </span>
            <span className="text-[11px] text-slate-500 font-medium block">
              Cognitive Neuroscience & AI • UFHB
            </span>
          </div>
        </button>

        {/* Desktop Links Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium overflow-x-auto hide-scrollbar max-w-[55%]">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Search, Language Toggle, Admin Hub, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
            title={t("Recherche globale", "Search Platform")}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bilingual Switch FR / EN */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition border border-slate-200/80 dark:border-slate-700"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="uppercase">{language}</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1 animate-fade-in max-h-[80vh] overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-3 transition ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
