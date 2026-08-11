import React, { useState } from 'react';
import { Search, X, BookOpen, MessageSquare, FolderGit2, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveView: (view: string) => void;
  onSelectPublication: (pub: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  setActiveView,
  onSelectPublication
}) => {
  const { t } = useLanguage();
  const { publications = [], communications = [], projects = [], researchAreas = [], software = [] } = useContent();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredPubs = q
    ? publications.filter(p => p.title.toLowerCase().includes(q) || p.journal.toLowerCase().includes(q) || (p.authors || []).some(a => a.toLowerCase().includes(q)))
    : [];

  const filteredComms = q
    ? communications.filter(c => c.title.toLowerCase().includes(q) || c.conference.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
    : [];

  const filteredProjects = q
    ? projects.filter(p => p.title.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/70 backdrop-blur-sm p-4 pt-20 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[80vh] flex flex-col">
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t("Rechercher un article, une conférence, un poster, EEG, IA...", "Search articles, conferences, posters, EEG, AI...")}
            className="w-full pl-12 pr-10 py-3 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-2xl outline-none text-slate-900 dark:text-slate-100 font-medium text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 text-xs pr-1">
          {!q ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto opacity-40 text-indigo-500" />
              <p>{t("Saisissez des mots-clés (ex: FENS, EEG, Mémoire de travail, Agrikora)", "Type keywords (e.g. FENS, EEG, Working Memory, Agrikora)")}</p>
            </div>
          ) : (
            <>
              {/* Publications Results */}
              {filteredPubs.length > 0 && (
                <div>
                  <h4 className="font-bold uppercase text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Publications ({filteredPubs.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredPubs.map(pub => (
                      <div
                        key={pub.id}
                        onClick={() => {
                          onSelectPublication(pub);
                          onClose();
                        }}
                        className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer transition border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{pub.title}</div>
                          <div className="text-slate-500 text-[11px]">{pub.journal} ({pub.year})</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Communications Results */}
              {filteredComms.length > 0 && (
                <div>
                  <h4 className="font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Communications ({filteredComms.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredComms.map(comm => (
                      <div
                        key={comm.id}
                        onClick={() => {
                          setActiveView('communications');
                          onClose();
                        }}
                        className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer transition border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{comm.title}</div>
                          <div className="text-slate-500 text-[11px]">{comm.conference} • {comm.location}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Results */}
              {filteredProjects.length > 0 && (
                <div>
                  <h4 className="font-bold uppercase text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    Projets ({filteredProjects.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredProjects.map(proj => (
                      <div
                        key={proj.id}
                        onClick={() => {
                          setActiveView('projects');
                          onClose();
                        }}
                        className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer transition border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100">{proj.title}</div>
                          <div className="text-slate-500 text-[11px]">{proj.tagline}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredPubs.length === 0 && filteredComms.length === 0 && filteredProjects.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  {t("Aucun résultat trouvé pour cette recherche.", "No matching results found for your query.")}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
