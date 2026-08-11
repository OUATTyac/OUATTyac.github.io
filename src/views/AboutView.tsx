import React from 'react';
import { UserCheck, Award, GraduationCap, Building2, Heart, Target, Compass, BookOpen } from 'lucide-react';
import { profileData } from '../data/profileData';
import { initialAwards } from '../data/awardsData';
import { useLanguage } from '../context/LanguageContext';

export const AboutView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Biographie & Identité Chercheur", "Biography & Research Identity")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Yacouba OUATTARA
          </h1>
          <p className="text-sm font-semibold text-indigo-300">
            {t(profileData.title.fr, profileData.title.en)}
          </p>
          <p className="text-xs text-slate-300 leading-relaxed pt-2">
            {t(profileData.bio.fr, profileData.bio.en)}
          </p>
        </div>
      </div>

      {/* Vision, Mission, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t("Vision Scientifique", "Scientific Vision")}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(profileData.vision.fr, profileData.vision.en)}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t("Mission Académique", "Academic Mission")}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              "Développer des recherches rigoureuses en neurophysiologie (EEG) et en intelligence artificielle tout en formant la prochaine génération d'étudiants en biosciences et technologies éducatives.",
              "Conduct rigorous EEG and AI research while mentoring the next generation of students in biosciences, cognitive ergonomics, and digital instructional technologies."
            )}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t("Open Science & Éthique", "Open Science & Ethics")}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              "Engagement indéfectible envers la science ouverte, le partage de données (Open Data), la reproductibilité des résultats et l'équité d'accès aux technologies d'apprentissage.",
              "Unwavering commitment to Open Science, FAIR data sharing, research reproducibility, and digital learning equity across communities."
            )}
          </p>
        </div>
      </div>

      {/* Education & Academic Formation */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          {t("Formation Académique & Diplômes", "Academic Background & Degrees")}
        </h2>

        <div className="space-y-6 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              <span>Doctorat en Neurosciences Cognitives (En cours)</span>
              <span>2022 - 2026</span>
            </div>
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Université Félix Houphouët-Boigny (UFHB) - École Doctorale Biologie-Environnement-Santé
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Sujet de thèse : Examen neuroscientifique des facteurs intervenants dans l'efficacité des écrans comme outil pour l'apprentissage.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              <span>Master en Neurosciences (Mention Bien)</span>
              <span>2020 - 2021</span>
            </div>
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Université Félix Houphouët-Boigny (UFHB) - UFR Biosciences
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Spécialisation en neurobiologie comportementale, électrophysiologie et traitement du signal.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between font-bold text-amber-600 dark:text-amber-400 mb-1">
              <span>Licence en Physiologie Animale, Neurosciences & Pharmacologie</span>
              <span>2017 - 2018</span>
            </div>
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Université Félix Houphouët-Boigny (UFHB)
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Badges Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          {t("Certifications Internationales & Qualifications", "International Certifications & Qualifications")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialAwards.map(award => (
            <div
              key={award.id}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-xs space-y-1.5"
            >
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">{award.year}</div>
              <div className="font-bold text-slate-900 dark:text-slate-100">{t(award.title.fr, award.title.en)}</div>
              <div className="text-slate-500 font-medium">{award.organization}</div>
              <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{t(award.description.fr, award.description.en)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
