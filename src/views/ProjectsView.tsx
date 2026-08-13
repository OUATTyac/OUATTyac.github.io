import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, Sparkles, CheckCircle2, Layers, Cpu, Play } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Project } from '../types';

export const ProjectsView: React.FC = () => {
  const { t } = useLanguage();
  const { projects = [] } = useContent();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-neuroscia');
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'demo'>('overview');

  // Sécurisation de la sélection du projet actif
  const activeProject: Project | undefined = projects.find(p => p?.id === selectedProjectId) || projects[0];

  // Helper sécurisé pour le rendu des chaînes ou objets multilingues
  const renderText = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return (t(val) as string) || '';
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500">
        <FolderGit2 className="w-12 h-12 mx-auto mb-3 text-slate-400 opacity-50" />
        <p className="font-semibold">{t("Aucun projet disponible pour le moment.", "No projects available at the moment.")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Mini-Sites Projets IA & Neuro-Agronomie", "AI & Neuro-Agronomy Mini-Sites")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Projets de Recherche & Applications", "Research Projects & Applications")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Découvrez les mini-sites d'expérimentation interactive développés pour valoriser nos recherches en neuro-ergonomie, diagnostic phytosanitaire par vision IA et technologies éducatives adaptatives.",
              "Interactive mini-sites showcasing research prototypes in neuro-ergonomics, plant pathology AI, and adaptive educational dashboards."
            )}
          </p>
        </div>
      </div>

      {/* Projects Grid Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map(proj => {
          if (!proj) return null;
          const isSelected = proj.id === selectedProjectId;
          const categoryStr = renderText(proj.category);
          const titleStr = renderText(proj.title);
          const taglineStr = renderText(proj.tagline || proj.subtitle);
          const periodStr = renderText(proj.period);

          return (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedProjectId(proj.id);
                setActiveTab('overview');
              }}
              className={`p-5 rounded-3xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
              }`}
            >
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase mb-2 inline-block ${
                  isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {categoryStr.toUpperCase()}
                </span>
                <h3 className="font-bold text-sm leading-snug line-clamp-1">{titleStr}</h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {taglineStr}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t text-[11px] font-semibold flex items-center justify-between ${
                isSelected ? 'border-indigo-500 text-indigo-100' : 'border-slate-100 dark:border-slate-800 text-slate-400'
              }`}>
                <span>{periodStr}</span>
                <span>{isSelected ? t('Sélectionné', 'Active') : t('Voir', 'View')} →</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Project Interactive Showcase Panel */}
      {activeProject && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase">
                {renderText(activeProject.period)} • {renderText(activeProject.category)}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
                {renderText(activeProject.title)}
              </h2>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {renderText(activeProject.tagline || activeProject.subtitle)}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repo</span>
                </a>
              )}
              {activeProject.demoUrl && (
                <a
                  href={activeProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t("Visiter le site web du projet", "Visit Project Live App")}</span>
                </a>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            {[
              { id: 'overview', label: t('Aperçu du Projet', 'Overview'), icon: Sparkles },
              { id: 'architecture', label: t('Architecture & Modules', 'Architecture'), icon: Layers },
              { id: 'demo', label: t('Démonstration Interactive', 'Interactive Demo'), icon: Play }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {renderText(activeProject.description)}
              </p>

              {/* Key Features */}
              {activeProject.keyFeatures && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("Fonctionnalités Clés du Projet", "Key Project Features")}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(Array.isArray(activeProject.keyFeatures)
                      ? activeProject.keyFeatures
                      : Array.isArray(t(activeProject.keyFeatures))
                      ? (t(activeProject.keyFeatures) as any)
                      : []
                    ).map((feat: any, idx: number) => (
                      <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{renderText(feat)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {Array.isArray(activeProject.technologies) && activeProject.technologies.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {t("Stack Technique & Algorithmique", "Technical & Algorithmic Stack")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold text-xs border border-indigo-200/60 dark:border-indigo-800/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t("Composition & Pipeline de Données", "Pipeline & Component Architecture")}
              </h4>
              <div className="space-y-3">
                {Array.isArray(activeProject.architecture) && activeProject.architecture.length > 0 ? (
                  activeProject.architecture.map((arch, idx) => (
                    <div key={idx} className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs border border-slate-800 flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{renderText(arch)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">{t("Aucune architecture renseignée.", "No architecture details provided.")}</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Mini Demo Simulation */}
          {activeTab === 'demo' && (
            <div className="p-6 bg-slate-950 text-white rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-400">
                  <Play className="w-4 h-4 text-emerald-400" />
                  <span>{t("Démonstrateur de Simulation Live", "Live Interactive Simulator")}</span>
                </div>
                <span className="text-[11px] text-slate-400">Status: Active Engine v2.0</span>
              </div>

              <p className="text-xs text-slate-300">
                {t(
                  `Aperçu interactif des entrées/sorties du modèle ${renderText(activeProject.title)}.`,
                  `Live input/output testing simulator for ${renderText(activeProject.title)}.`
                )}
              </p>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between font-mono text-emerald-400 text-[11px]">
                  <span>&gt; Input EEG / Sensor Stream</span>
                  <span>Signal SNR: 18.4 dB</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-3/4 animate-pulse" />
                </div>
                <div className="text-slate-400 text-[11px]">
                  Features extracted: Alpha Power (8-12Hz) = 4.2 µV², Theta/Beta Ratio = 2.15, Classifier Confidence = 94.8%
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
