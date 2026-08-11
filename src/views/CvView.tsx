import React from 'react';
import { FileText, Download, Printer, GraduationCap, BookOpen, MessageSquare, Award, Brain, Mail, Phone, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/profileData';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

export const CvView: React.FC = () => {
  const { t } = useLanguage();
  const { publications = [], communications = [], courses = [] } = useContent();

  const handlePrintCv = () => {
    window.print();
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Top Action Bar for CV */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Curriculum Vitae Académique & Scientifique</h1>
          <p className="text-xs text-slate-300 mt-1">Yacouba OUATTARA • Candidate Doctorat Neurosciences Cognitives & IA</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintCv}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>{t("Imprimer / Exporter PDF", "Print / Export PDF")}</span>
          </button>
        </div>
      </div>

      {/* Printable CV Container Paper Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-lg space-y-8 text-slate-900 dark:text-slate-100 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
        {/* CV Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Yacouba OUATTARA
            </h1>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {t(profileData.title.fr, profileData.title.en)}
            </p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {profileData.institution}
            </p>
          </div>

          <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>{profileData.emailPrimary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-indigo-500" />
              <span>{profileData.phonePrimary}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>UFR Biosciences, Univ. Houphouët-Boigny, Abidjan</span>
            </div>
            <div className="flex items-center gap-2 pt-1 font-bold text-emerald-600 dark:text-emerald-400">
              <span>ORCID: {profileData.orcid}</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("1. Résumé Exécutif & Profil de Recherche", "1. Executive Summary & Research Profile")}
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {t(profileData.bio.fr, profileData.bio.en)}
          </p>
        </div>

        {/* Education */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("2. Formation Académique & Diplômes", "2. Academic Education & Degrees")}
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between font-bold">
              <span>Doctorat en Neurosciences Cognitives (Soutenance 2026)</span>
              <span>2023 - 2026</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Université Félix Houphouët-Boigny (UFHB) • Côte d'Ivoire</p>

            <div className="flex justify-between font-bold pt-2">
              <span>Master en Neurosciences & Électrophysiologie (Mention Bien)</span>
              <span>2020 - 2021</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Université Félix Houphouët-Boigny (UFHB) • UFR Biosciences</p>

            <div className="flex justify-between font-bold pt-2">
              <span>Licence en Physiologie Animale & Pharmacology</span>
              <span>2017 - 2018</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">Université Félix Houphouët-Boigny (UFHB)</p>
          </div>
        </div>

        {/* Publications Summary */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("3. Articles & Publications Revues (Sélection)", "3. Selected Peer-Reviewed Publications")}
          </h2>

          <div className="space-y-3 text-xs">
            {publications.slice(0, 4).map((pub, i) => (
              <div key={pub.id} className="space-y-0.5">
                <div className="font-bold">{i + 1}. {pub.title} ({pub.year})</div>
                <div className="text-slate-600 dark:text-slate-400 italic">{pub.journal} {pub.volume ? `vol. ${pub.volume}` : ''}</div>
                <div className="text-slate-500 font-mono text-[10px]">Authors: {(pub.authors || []).join(', ')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Communications & Posters */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("4. Communications & Poster FENS 2026", "4. Conference Talks & FENS 2026 Poster")}
          </h2>

          <div className="space-y-3 text-xs">
            {communications.slice(0, 4).map((comm, i) => (
              <div key={comm.id} className="space-y-0.5">
                <div className="font-bold">{comm.title}</div>
                <div className="text-indigo-600 dark:text-indigo-400 font-medium">{comm.conference} • {comm.location} ({comm.year})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Technical Competencies */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900/60 pb-1">
            {t("5. Compétences Techniques & Matérielles", "5. Technical & Laboratory Skills")}
          </h2>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="font-bold mb-1">Électrophysiologie & EEG</div>
              <div className="text-slate-600 dark:text-slate-400">MNE-Python, EEGLAB, Signal FFT/Welch, Filtering, ERD/ERS Alpha Oscillations.</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="font-bold mb-1">IA & Data Science</div>
              <div className="text-slate-600 dark:text-slate-400">Python, PyTorch, Scikit-learn, Biostatistics R, Computer Vision.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
