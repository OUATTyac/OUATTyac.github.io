import React, { useState } from 'react';
import { MessageSquare, Calendar, MapPin, Globe, Award, Download, Search, Filter, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Communication } from '../types';

interface CommunicationsViewProps {
  onSelectCommunication: (comm: Communication) => void;
}

export const CommunicationsView: React.FC<CommunicationsViewProps> = ({ onSelectCommunication }) => {
  const { t } = useLanguage();
  const { communications = [] } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredComms = communications.filter(comm => {
    const matchesSearch =
      comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.conference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.country.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || comm.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Congrès Internationaux & Symposia", "International Conferences & Talks")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Communications & Posters Scientifiques", "Scientific Talks & Posters")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Présentations orales, posters académiques, keynotes et ateliers présentés dans des conférences internationales majeures (FENS Forum 2026 Barcelona, UCAD Dakar, Institut Pasteur, Colloques CAMES).",
              "Oral presentations, posters, keynotes and workshops presented at top international assemblies."
            )}
          </p>
        </div>
      </div>

      {/* Featured highlight: FENS Forum 2026 Barcelona */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white border border-indigo-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/80 text-indigo-200 text-xs font-bold uppercase">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t("Prochain Événement Phare 2026", "Upcoming High-Profile Event 2026")}</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            FENS Forum 2026 • Barcelona, Spain
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl">
            {t(
              "Poster Scientifique Sélectionné : 'EEG Parieto-Occipital Alpha Oscillations and Visual Working Memory Performance in Sub-Saharan University Learners'. 6-10 Juillet 2026.",
              "Accepted Scientific Poster Presentation at the Federation of European Neuroscience Societies (FENS) Forum in Barcelona."
            )}
          </p>
        </div>
        <button
          onClick={() => {
            const fens = communications.find(c => c.id === 'fens-2026');
            if (fens) onSelectCommunication(fens);
          }}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition whitespace-nowrap shrink-0"
        >
          {t("Voir le résumé du Poster FENS", "View FENS Poster Abstract")}
        </button>
      </div>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t("Rechercher ville, pays, conférence...", "Search city, country, event...")}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-2xl text-xs font-medium outline-none text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {[
            { id: 'all', label: t('Toutes (13)', 'All (13)') },
            { id: 'oral', label: t('Oral', 'Oral') },
            { id: 'poster', label: t('Poster', 'Poster') },
            { id: 'workshop', label: t('Atelier/Workshop', 'Workshop') },
            { id: 'keynote', label: t('Keynote', 'Keynote') }
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedType === type.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Communications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredComms.map(comm => (
          <div
            key={comm.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold uppercase border border-emerald-200/60 dark:border-emerald-800/60">
                  {comm.type}
                </span>
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  {comm.dates}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug mb-2">
                {comm.title}
              </h3>

              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                {comm.conference}
              </div>

              <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-3 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{comm.location}, {comm.country}</span>
              </div>

              {comm.award && (
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 rounded-xl border border-amber-200/80 dark:border-amber-900/80 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>{comm.award}</span>
                </div>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                {t(comm.abstract)}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => onSelectCommunication(comm)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-xs transition flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t("Voir Abstract & Support", "View Abstract & Material")}</span>
              </button>

              <div className="flex items-center gap-1">
                {(comm.keywords || []).slice(0, 2).map(kw => (
                  <span key={kw} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
