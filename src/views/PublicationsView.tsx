import React, { useState } from 'react';
import { BookOpen, Search, Filter, Copy, Check, ExternalLink, FileText, Sparkles, Download } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Publication } from '../types';

interface PublicationsViewProps {
  onSelectPublication: (pub: Publication) => void;
}

export const PublicationsView: React.FC<PublicationsViewProps> = ({ onSelectPublication }) => {
  const { t } = useLanguage();
  const { publications = [] } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPubs = publications.filter(pub => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pub.authors || []).some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pub.keywords || []).some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      selectedStatus === 'all' || pub.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleCopyApa = (pub: Publication) => {
    const authorsArr = Array.isArray(pub.authors) ? pub.authors : [pub.authors || 'Yacouba OUATTARA'];
    const authorsStr = authorsArr.join(', ');
    const apaText = `${authorsStr} (${pub.year || ''}). ${pub.title || ''}. ${pub.journal || ''}${pub.volume ? `, ${pub.volume}` : ''}${pub.pages ? `, ${pub.pages}` : ''}.${pub.doi ? ` https://doi.org/${pub.doi}` : ''}`;
    navigator.clipboard.writeText(apaText);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Production Scientifique Revues & Indexation", "Peer-Reviewed Publications & Indexing")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Publications Scientifiques", "Scientific Publications")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Articles scientifiques publiés ou en cours d'évaluation dans des revues internationales à comité de lecture en neurosciences, électrophysiologie EEG, ergomie cognitive et technologies édu-agricoles.",
              "Peer-reviewed scientific articles, open archives, and preprints in cognitive neuroscience, EEG signal analysis, and AI application domains."
            )}
          </p>
        </div>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t("Filtrer par titre, journal, auteur, mot-clé...", "Search by title, journal, author, keyword...")}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 rounded-2xl text-xs font-medium outline-none text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {[
            { id: 'all', label: t('Tous', 'All') },
            { id: 'published', label: t('Publiés', 'Published') },
            { id: 'under_review', label: t('Sous évaluation', 'Under Review') },
            { id: 'submitted', label: t('Soumis', 'Submitted') }
          ].map(status => (
            <button
              key={status.id}
              onClick={() => setSelectedStatus(status.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedStatus === status.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Publication Cards List */}
      <div className="space-y-6">
        {filteredPubs.map(pub => (
          <div
            key={pub.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    pub.status === 'published'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60'
                  }`}
                >
                  {pub.status === 'published' ? t('Publié', 'Published') : t('Sous évaluation / Pre-print', 'Under Review')}
                </span>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                  {pub.year}
                </span>
              </div>

              {pub.doi && (
                <a
                  href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t("Ouvrir la publication via le résolveur DOI officiel", "Open publication via official DOI resolver")}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white border border-indigo-200/90 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition flex items-center gap-1.5 shadow-xs group/doi"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover/doi:text-white transition" />
                  <span>DOI: {pub.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}</span>
                  <ExternalLink className="w-3 h-3 opacity-75 group-hover/doi:opacity-100" />
                </a>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {pub.title}
              </h3>

              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                {(Array.isArray(pub.authors) ? pub.authors : [pub.authors || 'Yacouba OUATTARA']).map((author, i, arr) => (
                  <span key={i} className={String(author).includes('OUATTARA') || String(author).includes('Ouattara') ? 'font-bold text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300' : ''}>
                    {author}{i < arr.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>

              <div className="text-xs font-bold italic text-indigo-600 dark:text-indigo-400 mt-1">
                {pub.journal} {pub.volume ? `vol. ${pub.volume}` : ''} {pub.pages ? `pp. ${pub.pages}` : ''}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">Résumé (Abstract):</span>
              {t(pub.abstract)}
            </p>

            {/* Attached Image or Video or PDF Preview / Buttons */}
            {(pub.imageUrl || pub.pdfUrl || pub.videoUrl) && (
              <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl space-y-3">
                <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  {t("Pièces jointes & Médias", "Attachments & Media")}
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  {pub.imageUrl && (
                    <div className="flex items-center gap-2">
                      <img src={pub.imageUrl} alt={pub.title} className="w-16 h-12 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs" />
                      <a
                        href={pub.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-[11px] font-semibold border border-slate-200 dark:border-slate-700 flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3 text-indigo-600" />
                        {t("Agrandir l'image", "View Image")}
                      </a>
                    </div>
                  )}

                  {pub.pdfUrl && (
                    <a
                      href={pub.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{t("Télécharger PDF", "Download PDF")}</span>
                    </a>
                  )}

                  {pub.videoUrl && (
                    <a
                      href={pub.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t("Regarder Vidéo / Enregistrement", "Watch Video / Recording")}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {pub.keywords.map(kw => (
                <span key={kw} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                  #{kw}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {pub.doi && (
                  <a
                    href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t("Accéder via DOI", "Access via DOI")}</span>
                  </a>
                )}

                <button
                  onClick={() => onSelectPublication(pub)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs shadow-xs transition flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t("Voir BibTeX", "View BibTeX")}</span>
                </button>

                <button
                  onClick={() => handleCopyApa(pub)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  {copiedId === pub.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === pub.id ? t("Cité en APA!", "APA Copied!") : t("Copier citation APA", "Copy APA Citation")}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                {pub.halId && (
                  <a href={`https://hal.science/${pub.halId}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
                    HAL Archives
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {pub.researchGateUrl && (
                  <a href={pub.researchGateUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                    ResearchGate
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredPubs.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
            {t("Aucune publication ne correspond à votre filtre.", "No publications match your criteria.")}
          </div>
        )}
      </div>
    </div>
  );
};
