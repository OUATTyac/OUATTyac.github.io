import React, { useState } from 'react';
import { X, Copy, Check, FileText } from 'lucide-react';
import { Publication } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface BibtexModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({ publication, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'apa' | 'bibtex'>('apa');

  if (!publication) return null;

  // APA Citation generator
  const formatAPA = (pub: Publication) => {
    const authorsFormatted = Array.isArray(pub.authors) ? pub.authors.join(', ') : (pub.authors || 'Yacouba OUATTARA');
    const yearStr = pub.year ? `(${pub.year}).` : '';
    const titleStr = pub.title ? `${pub.title}.` : '';
    const journalStr = pub.journal ? `${pub.journal}` : '';
    const volStr = pub.volume ? `, ${pub.volume}` : '';
    const pageStr = pub.pages ? `, ${pub.pages}` : '';
    const doiStr = pub.doi ? ` https://doi.org/${pub.doi}` : '';
    const pmidStr = pub.pubmedId ? ` https://pubmed.ncbi.nlm.nih.gov/${pub.pubmedId}/` : '';
    return `${authorsFormatted} ${yearStr} ${titleStr} ${journalStr}${volStr}${pageStr}.${doiStr}${pmidStr}`;
  };

  const textToCopy = activeTab === 'apa' ? formatAPA(publication) : (publication.bibtex || formatAPA(publication));

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {t("Citer la publication", "Cite Publication")}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-1">{publication.title}</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-4">
          <button
            onClick={() => setActiveTab('apa')}
            className={`px-4 py-2 font-medium text-sm transition border-b-2 -mb-px ${
              activeTab === 'apa'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            Citation APA
          </button>
          <button
            onClick={() => setActiveTab('bibtex')}
            className={`px-4 py-2 font-medium text-sm transition border-b-2 -mb-px ${
              activeTab === 'bibtex'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            BibTeX
          </button>
        </div>

        {/* Content Code Box */}
        <div className="relative bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-60 border border-slate-800 leading-relaxed mb-6">
          <pre>{textToCopy}</pre>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">
            {t("Format prêt pour Overleaf / LaTeX / Zotero", "Ready for Overleaf, LaTeX or Zotero")}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition shadow-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                {t("Copié !", "Copied!")}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                {t("Copier dans le presse-papier", "Copy to Clipboard")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
