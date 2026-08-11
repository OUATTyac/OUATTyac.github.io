import React, { useState } from 'react';
import { Brain, Activity, Cpu, GraduationCap, Globe, CheckCircle2, FileCode, Layers } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { EegSignalChart } from '../components/EegSignalChart';

export const ResearchView: React.FC = () => {
  const { t } = useLanguage();
  const { researchAreas = [] } = useContent();
  const [selectedAreaId, setSelectedAreaId] = useState(researchAreas[0]?.id || 'area-working-memory');

  const activeArea = researchAreas.find(a => a.id === selectedAreaId) || researchAreas[0];

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Programme Scientifique & Méthodologies", "Scientific Research Agenda")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Axes & Laboratoire de Recherche", "Research Areas & Laboratory")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Une approche intégrée combinant l'électrophysiologie cérébrale (EEG), la psychologie cognitive, l'intelligence artificielle et l'ergonomie éducative pour transformer l'apprentissage et la santé en Afrique.",
              "An integrated paradigm combining electrophysiology (EEG), cognitive psychology, machine learning, and educational ergonomics."
            )}
          </p>
        </div>
      </div>

      {/* Real-time EEG Visualizer */}
      <EegSignalChart />

      {/* Research Areas Navigation Tabs & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            {t("Sélectionnez un axe de recherche", "Select Research Domain")}
          </div>
          {researchAreas.map(area => {
            const isSelected = area.id === selectedAreaId;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-bold'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                }`}
              >
                <div className="text-sm">{t(area.title.fr, area.title.en)}</div>
                <div className={`text-[11px] mt-1 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {area.statsKey}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Area Content Detail */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              {activeArea.statsKey}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t(activeArea.title.fr, activeArea.title.en)}
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t(activeArea.fullDesc.fr, activeArea.fullDesc.en)}
            </p>
          </div>

          {/* Objectives */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {t("Objectifs Scientifiques", "Research Objectives")}
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {(Array.isArray(t(activeArea?.objectives)) ? t(activeArea?.objectives) : []).map((obj: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodology */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              {t("Méthodologie & Pipeline de Traitement", "Methodology & Signal Pipeline")}
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {(Array.isArray(t(activeArea?.methodology)) ? t(activeArea?.methodology) : []).map((meth: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>{meth}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Hardware */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">
              {t("Outils, Logiciels & Équipements Matériels", "Tools, Software & Hardware Stack")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(activeArea?.tools || []).map(tool => (
                <span key={tool} className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-200/60 dark:border-indigo-800/60">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
