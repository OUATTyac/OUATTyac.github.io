import React from 'react';
import { Award, CheckCircle2, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

export const AwardsView: React.FC = () => {
  const { t } = useLanguage();
  const { awards } = useContent();

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Prix, Subventions & Distinctions", "Prizes, Grants & Distinctions")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Prix, Diplômes & Certifications", "Awards, Honors & Certifications")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Reconnaissances scientifiques accordées lors des symposia de recherche, bourses de congrès internationaux (FENS), qualifications professionnelles et accréditations en éthique scientifique.",
              "Scientific awards, travel grants, professional qualifications, and ethics certifications."
            )}
          </p>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {awards?.map(award => (
          <div
            key={award.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
                  {award.year}
                </span>
                <span className="text-slate-400 font-semibold uppercase">{award.category}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {t(award.title.fr, award.title.en)}
              </h3>

              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {award.organization}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {t(award.description.fr, award.description.en)}
              </p>
            </div>

            {award.credentialUrl && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={award.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{t("Vérifier la certification officielle", "Verify Official Credential")}</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
