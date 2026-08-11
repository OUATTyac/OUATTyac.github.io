import React, { useState } from 'react';
import { FolderGit2, Download, ExternalLink, Github, Database, Code, Terminal, FileCode, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

export const SoftwareDataView: React.FC = () => {
  const { t } = useLanguage();
  const { software = [], datasets = [] } = useContent();

  const [activeSection, setActiveSection] = useState<'software' | 'datasets'>('software');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const samplePythonCode = `# EEG Bandpass Filtering & Alpha Oscillations Extraction (MNE-Python Pipeline)
import mne
import numpy as np

def process_parieto_occipital_eeg(raw_eeg_path, l_freq=1.0, h_freq=40.0):
    # Load 16-channel EEG stream
    raw = mne.io.read_raw_fif(raw_eeg_path, preload=True)
    raw.filter(l_freq, h_freq, fir_design='firwin')
    
    # Select O1, O2, P3, P4 Parieto-Occipital Electrodes
    picks = mne.pick_channels(raw.ch_names, include=['O1', 'O2', 'P3', 'P4'])
    
    # Compute Power Spectral Density (PSD) in Alpha Band (8-12 Hz)
    psd, freqs = mne.time_frequency.psd_array_welch(
        raw.get_data(picks=picks), sfreq=raw.info['sfreq'], fmin=8.0, fmax=12.0
    )
    alpha_power = np.mean(psd, axis=-1)
    return alpha_power
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(samplePythonCode);
    setCopiedCodeId('python-snippet');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Open Science, Datasets & Code Repositories", "Open Science, Datasets & Code Repositories")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Logiciels, Pipelines EEG & Datasets", "Software, EEG Pipelines & Open Datasets")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Ressources en libre accès (Open Science) comprenant des packages Python/MNE-Python, scripts de filtrage du signal EEG, jeux de données neuro-ergonomiques sur Zenodo et modèles de classification IA.",
              "Open science resources including Python EEG filtering packages, open neuro-ergonomic datasets on Zenodo, and AI models."
            )}
          </p>
        </div>
      </div>

      {/* Switcher: Software vs Datasets */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          onClick={() => setActiveSection('software')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeSection === 'software'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>{t("Logiciels & Packages Python", "Software & Python Packages")} ({software.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('datasets')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
            activeSection === 'datasets'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>{t("Jeux de Données Open Data (Zenodo)", "Open Datasets (Zenodo)")} ({datasets.length})</span>
        </button>
      </div>

      {/* Section 1: Software List */}
      {activeSection === 'software' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {software.map(sw => (
              <div
                key={sw.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                      v{sw.version} • {sw.license}
                    </span>
                    <span className="text-slate-400 font-medium">{sw.category.toUpperCase()}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {sw.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {t(sw.description.fr, sw.description.en)}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {sw.techStack.map(tech => (
                      <span key={tech} className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                    {sw.githubUrl && (
                      <a href={sw.githubUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                        <Github className="w-3.5 h-3.5" />
                        <span>Code GitHub</span>
                      </a>
                    )}
                    {sw.pypiUrl && (
                      <a href={sw.pypiUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>PyPI / Package</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Python Code Pipeline Snippet Box */}
          <div className="bg-slate-950 text-slate-100 rounded-3xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-400">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>Script Open-Source MNE-Python EEG Extraction Pipeline</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {copiedCodeId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5 text-indigo-400" />}
                <span>{copiedCodeId ? t('Copié !', 'Copied!') : t('Copier Script', 'Copy Code')}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 rounded-2xl overflow-x-auto text-[11px] font-mono text-emerald-300 leading-relaxed border border-slate-800">
              {samplePythonCode}
            </pre>
          </div>
        </div>
      )}

      {/* Section 2: Datasets List */}
      {activeSection === 'datasets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datasets.map(ds => (
              <div
                key={ds.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold">
                      {ds.year} • {ds.license}
                    </span>
                    <span className="text-slate-400 font-semibold">{ds.sampleSize}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {ds.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {t(ds.description.fr, ds.description.en)}
                  </p>
                </div>

                <div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-4 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Variables Mesurées:</span>
                    <div className="flex flex-wrap gap-1">
                      {ds.variables.map(v => (
                        <span key={v} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px]">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                    {ds.zenodoUrl && (
                      <a href={ds.zenodoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Zenodo DOI Repository</span>
                      </a>
                    )}
                    {ds.githubUrl && (
                      <a href={ds.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:underline flex items-center gap-1">
                        <Github className="w-3.5 h-3.5" />
                        <span>Data GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
