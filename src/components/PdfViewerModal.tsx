import React from 'react';
import { X, ExternalLink, Download, FileText, Award } from 'lucide-react';
import { Communication } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PdfViewerModalProps {
  item: Communication | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ item, onClose }) => {
  const { t } = useLanguage();

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
            {item.type}
          </div>
          <span className="text-xs text-slate-500 font-medium">{item.dates} • {item.location}, {item.country}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
          {item.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-medium">
          {item.conference} {item.organizer ? `(${item.organizer})` : ''}
        </p>

        {item.award && (
          <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-800 dark:text-amber-300 text-xs font-semibold mb-4">
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span>{item.award}</span>
          </div>
        )}

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/80 mb-6">
          <h4 className="text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">
            {t("Résumé de la communication", "Presentation Abstract")}
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            {t(item.abstract)}
          </p>

          {/* Attached Image / Video / PDF previews */}
          {(item.imageUrl || item.videoUrl || item.pdfUrl) && (
            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-3">
              {item.imageUrl && (
                <div>
                  <h5 className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">{t("Image / Photo associée", "Attached Image / Photo")}</h5>
                  <img src={item.imageUrl} alt={item.title} className="max-h-64 object-contain rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
                </div>
              )}

              {item.videoUrl && (
                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-300">{t("Enregistrement vidéo / Présentation", "Video Recording / Presentation")}</span>
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {t("Regarder la vidéo", "Watch Video")}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Downloads / Preview buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            {(item.pdfUrl || item.posterUrl || item.slidesUrl) && (
              <a
                href={item.pdfUrl || item.posterUrl || item.slidesUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition shadow-sm"
              >
                <FileText className="w-4 h-4" />
                {t("Télécharger / Voir PDF", "Download / View PDF")}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition"
              >
                <ExternalLink className="w-4 h-4" />
                {t("Lien officiel conférence", "Official Conference Link")}
              </a>
            )}
            {item.halUrl && (
              <a
                href={item.halUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs transition"
              >
                <Download className="w-4 h-4" />
                HAL Archive PDF
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition"
          >
            {t("Fermer", "Close")}
          </button>
        </div>
      </div>
    </div>
  );
};
