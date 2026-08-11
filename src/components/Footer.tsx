import React from 'react';
import { Brain, Mail, Phone, MapPin, Globe, ExternalLink, Heart } from 'lucide-react';
import { profileData } from '../data/profileData';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  setActiveView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Bio Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Yacouba OUATTARA
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t(profileData.bio.fr, profileData.bio.en)}
            </p>
            <div className="pt-2 text-xs text-indigo-400 font-medium">
              {profileData.institution}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t("Navigation", "Navigation")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('research')} className="hover:text-indigo-400 transition">
                  {t("Axes de Recherche (Working Memory, EEG, IA)", "Research Areas")}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('publications')} className="hover:text-indigo-400 transition">
                  {t("Publications Scientifiques (Articles & Revues)", "Scientific Publications")}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('communications')} className="hover:text-indigo-400 transition">
                  {t("Communications & Posters (FENS 2026, CAMES)", "Talks & Conference Posters")}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('projects')} className="hover:text-indigo-400 transition">
                  {t("Projets Mini-sites (Agrikora, NeuroscIA)", "Projects (Agrikora, NeuroscIA)")}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('software')} className="hover:text-indigo-400 transition">
                  {t("Logiciels & Datasets Open Science", "Software & Open Datasets")}
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Profiles & Repos */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t("Identifiants Académiques", "Academic Profiles")}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href={profileData.orcidUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ORCID: {profileData.orcid}</span>
                </a>
              </li>
              <li>
                <a href={profileData.researchGateUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                  <span>ResearchGate Profile</span>
                </a>
              </li>
              <li>
                <a href={profileData.halUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>HAL Science Open Archive</span>
                </a>
              </li>
              <li>
                <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn Network</span>
                </a>
              </li>
              <li>
                <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub Repositories</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t("Contact & Laboratoire", "Contact & Laboratory")}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>UFR Biosciences, Univ. Félix Houphouët-Boigny, Abidjan, Côte d'Ivoire</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href={`mailto:${profileData.emailPrimary}`} className="hover:text-white transition">
                  {profileData.emailPrimary}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{profileData.phonePrimary} / {profileData.phoneSecondary}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Yacouba OUATTARA. {t("Plateforme Académique & Scientifique Officielle (Version 2.0).", "Official Academic & Scientific Platform (Version 2.0).")}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{t("Conçu pour la recherche internationale & Open Science", "Built for international neuroscience & Open Science")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
