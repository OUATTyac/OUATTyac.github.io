import React from 'react';
import { GraduationCap, Clock, BookOpen, Download, FileCode, CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

export const TeachingView: React.FC = () => {
  const { t } = useLanguage();
  const { courses = [], resources = [] } = useContent();

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Enseignement Supérieur & Pédagogie", "Higher Education & Teaching")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Enseignement & Ressources Pédagogiques", "Teaching & Educational Resources")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Activités d'enseignement à l'Université Félix Houphouët-Boigny (UFHB), cours de neurosciences cognitives, électrophysiologie, statistiques sous R et ingénierie technopédagogique.",
              "Teaching activities at Université Félix Houphouët-Boigny (UFHB), courses in cognitive neurosciences, EEG, biostatistics in R, and instructional design."
            )}
          </p>
        </div>
      </div>

      {/* Teaching Philosophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t("Pédagogie Active & TP", "Active Learning & Labs")}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              "Intégration systématique de travaux pratiques sur ordinateurs, d'analyse de signaux EEG réels et de cas cliniques concrets pour renforcer l'assimilation.",
              "Systematic integration of active computer lab sessions, real EEG signal filtering scripts, and clinical case studies."
            )}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t("Volume Horaire Annuel", "Annual Teaching Volume")}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              "Plus de 180 heures d'enseignements magistraux, travaux dirigés (TD) et travaux pratiques (TP) dispensées chaque année auprès d'étudiants en Licence et Master.",
              "Over 180 hours of lectures, tutorials, and practical lab sessions delivered annually to Bachelor and Master students."
            )}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t("Encadrement & Projets", "Mentorship & Projects")}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(
              "Mentorat individuel de mémorants de Master et de projets tuteurés d'étudiants axés sur l'innovation biologique et éducative.",
              "Individual mentorship for Master thesis students and supervised innovation projects in biosciences and EdTech."
            )}
          </p>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          {t("Cours Dispensés à l'UFHB", "Courses Taught at UFHB")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
                    {course.code} • {course.level}
                  </span>
                  <span className="text-slate-400 font-bold">{course.hoursPerYear}h / an</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {t(course.title.fr, course.title.en)}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {t(course.description.fr, course.description.en)}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.topics.map(topic => (
                    <span key={topic} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                      #{topic}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-medium">
                  Institution: {course.institution}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pedagogical Downloads & Code Resources */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          {t("Ressources Pédagogiques Téléchargeables (Moodle & R)", "Downloadable Teaching Resources (Moodle & R)")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map(res => (
            <div key={res.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>{res.title}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] uppercase">{res.type}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{t(res.description.fr, res.description.en)}</p>
              <div className="pt-2 flex items-center justify-between font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Language: {res.language || 'Multi'}</span>
                <button
                  onClick={() => alert(t("Téléchargement de la ressource " + res.title, "Downloading resource " + res.title))}
                  className="hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("Télécharger File", "Download File")}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
