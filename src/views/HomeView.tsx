import React from 'react';
import {
  Brain,
  Download,
  BookOpen,
  Mail,
  ArrowRight,
  Award,
  Calendar,
  Globe,
  Sparkles,
  Activity,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Building2,
  FileText,
  MessageSquare
} from 'lucide-react';
import { profileData } from '../data/profileData';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { EegSignalChart } from '../components/EegSignalChart';
import { CollaborationMap } from '../components/CollaborationMap';
import { Publication, Communication } from '../types';

interface HomeViewProps {
  setActiveView: (view: string) => void;
  onSelectPublication: (pub: Publication) => void;
  onSelectCommunication: (comm: Communication) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveView,
  onSelectPublication,
  onSelectCommunication
}) => {
  const { t } = useLanguage();
  const { publications = [], communications = [], projects = [], researchAreas = [], news = [], profilePhotoUrl } = useContent();

  const featuredPubs = publications.slice(0, 5);
  const featuredComms = communications.slice(0, 4);
  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="space-y-16 pb-12 animate-fade-in">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Column: Name & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1]">
                Yacouba <span className="text-indigo-600 dark:text-indigo-400">OUATTARA</span>
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300">
                {t(profileData.title.fr, profileData.title.en)}
              </p>
              <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span>{profileData.institution}</span>
              </p>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {t(profileData.bio.fr, profileData.bio.en)}
            </p>

            {/* Main Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('research')}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition flex items-center gap-2 active:scale-95"
              >
                <Brain className="w-4 h-4" />
                <span>{t("Axes de Recherche", "Research")}</span>
              </button>

              <button
                onClick={() => setActiveView('publications')}
                className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold text-sm transition flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t("Publications", "Publications")}</span>
              </button>

              <button
                onClick={() => setActiveView('communications')}
                className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold text-sm transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{t("Communications", "Communications")}</span>
              </button>

              <button
                onClick={() => setActiveView('contact')}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
                title="Contact"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Identifier Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <a href={profileData.orcidUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 transition">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ORCID: {profileData.orcid}
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <a href={profileData.halUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition">
                HAL Open Science
              </a>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>FENS Forum 2026 Barcelona Presenter</span>
            </div>
          </div>

          {/* Hero Right Column: Photo Card & Active Focus */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-indigo-900 via-slate-900 to-indigo-950 relative overflow-hidden mb-6 flex items-center justify-center text-white">
                <img
                  src={(profilePhotoUrl && profilePhotoUrl.trim() !== '' && profilePhotoUrl !== '/profile.jpg') ? profilePhotoUrl : profileData.photoUrl}
                  alt={profileData.name}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallback) {
                      target.dataset.fallback = 'true';
                      target.src = profileData.photoUrl;
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                    UFHB Biosciences Lab
                  </div>
                  <div className="text-sm font-semibold">
                    Yacouba OUATTARA • Cognitive EEG Research
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-indigo-900 dark:text-indigo-300 font-bold">FENS Forum 2026 Poster</div>
                    <div className="text-indigo-700 dark:text-indigo-400">Barcelona, Spain • 6-10 July 2026</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>

                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-emerald-900 dark:text-emerald-300 font-bold">Funding: FENS Forum 2026</div>
                    <div className="text-emerald-700 dark:text-emerald-400">Chica and Heinz Schaller Foundation</div>
                  </div>
                  <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH STATISTICS COUNTER DASHBOARD */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              {t("Impact & Activité Scientifique", "Scientific Impact Metrics")}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {t("Statistiques de Recherche & Production", "Research Production Statistics")}
            </h2>
          </div>
          <button
            onClick={() => setActiveView('cv')}
            className="text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-1"
          >
            {t("Voir le CV complet", "View Full Academic CV")}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div className="text-3xl font-black text-indigo-400 mb-1">{profileData.stats.publicationsCount}</div>
            <div className="text-xs text-slate-300 font-medium">{t("Publications", "Publications")}</div>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div className="text-3xl font-black text-emerald-400 mb-1">{profileData.stats.communicationsCount}</div>
            <div className="text-xs text-slate-300 font-medium">{t("Communications", "Scientific Talks")}</div>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div className="text-3xl font-black text-amber-400 mb-1">{profileData.stats.projectsCount}</div>
            <div className="text-xs text-slate-300 font-medium">{t("Projets IA/EdTech", "AI/EdTech Projects")}</div>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div className="text-3xl font-black text-cyan-400 mb-1">{profileData.stats.teachingHoursYearly}+</div>
            <div className="text-xs text-slate-300 font-medium">{t("Heures d'Enseignement/An", "Teaching Hours/Yr")}</div>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div className="text-3xl font-black text-rose-400 mb-1">1000+</div>
            <div className="text-xs text-slate-300 font-medium">{t("Étudiants Formés", "Students Mentored")}</div>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
            <div className="text-3xl font-black text-purple-400 mb-1">{profileData.stats.countriesVisitedPresented}</div>
            <div className="text-xs text-slate-300 font-medium">{t("Pays de Conférences", "Countries Presented")}</div>
          </div>
        </div>
      </section>

      {/* RESEARCH HIGHLIGHTS (6 CARDS) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              {t("Pôles de Recherche", "Research Pillars")}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("Grands Axes Scientifiques & Technologiques", "Key Scientific & Technological Domains")}
            </h2>
          </div>
          <button
            onClick={() => setActiveView('research')}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
          >
            {t("Explorer tous les axes", "Explore All Areas")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map(area => (
            <div
              key={area.id}
              onClick={() => setActiveView('research')}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {t(area.title.fr, area.title.en)}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {t(area.shortDesc.fr, area.shortDesc.en)}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>{area.statsKey}</span>
                <ChevronRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REAL-TIME EEG SIGNAL DEMO CHART */}
      <section>
        <EegSignalChart />
      </section>

      {/* FEATURED PROJECTS (4 MINI-SITES) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              {t("Projets Phares", "Featured Projects")}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("Innovations Technologiques & Neuro-IA", "Technological Innovations & Neuro-AI")}
            </h2>
          </div>
          <button
            onClick={() => setActiveView('projects')}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
          >
            {t("Voir tous les mini-sites projets", "View All Mini-site Projects")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => setActiveView('projects')}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                    {proj.period}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{proj.category.toUpperCase()}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {proj.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3">{proj.tagline}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {t(proj.description.fr, proj.description.en)}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.technologies.slice(0, 5).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>{t("Consulter le mini-site projet", "Explore Project Mini-Site")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PUBLICATIONS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              {t("Production Scientifique", "Scientific Publications")}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("Publications Récentes dans les Revues", "Recent Journal Articles")}
            </h2>
          </div>
          <button
            onClick={() => setActiveView('publications')}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
          >
            {t("Voir les 6 publications", "View All 6 Publications")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {featuredPubs.map(pub => (
            <div
              key={pub.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-800 transition flex flex-col sm:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    pub.status === 'published'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'
                  }`}>
                    {pub.status === 'published' ? 'Published' : 'Under Review'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{pub.year}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {pub.title}
                </h3>

                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {pub.authors.join(', ')}
                </div>

                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold italic">
                  {pub.journal} {pub.volume ? `(${pub.volume})` : ''}
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0">
                {pub.doi && (
                  <a
                    href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Lien DOI</span>
                  </a>
                )}
                <button
                  onClick={() => onSelectPublication(pub)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>APA / BibTeX</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COMMUNICATIONS (FENS 2026, UCAD, PASTEUR, CAMES) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              {t("Conférences & Congrès", "Conferences & Communications")}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("Posters & Présentations Orales Récentes", "Featured Posters & Oral Presentations")}
            </h2>
          </div>
          <button
            onClick={() => setActiveView('communications')}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
          >
            {t("Voir les 13 communications", "View All 13 Communications")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredComms.map(comm => (
            <div
              key={comm.id}
              onClick={() => onSelectCommunication(comm)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                    {comm.type}
                  </span>
                  <span className="text-slate-400 font-medium">{comm.dates} • {comm.location}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
                  {comm.title}
                </h3>

                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                  {comm.conference}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>{comm.country}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{t("Voir détails & PDF", "View details & PDF")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE CAREER TIMELINE */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            {t("Chronologie Scientifique", "Academic Trajectory")}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {t("Parcours Académique & Jalons de Recherche", "Academic Progression Timeline")}
          </h2>
        </div>

        <div className="relative border-l-2 border-indigo-200 dark:border-indigo-900/60 ml-4 space-y-8 pl-6">
          {profileData.timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900 shadow-sm" />
              <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                {item.year}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {t(item.title.fr, item.title.en)}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {t(item.desc.fr, item.desc.en)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE COLLABORATION MAP */}
      <section>
        <CollaborationMap />
      </section>

      {/* LATEST NEWS & ANNOUNCEMENTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              {t("Fil d'actualité", "Latest News")}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("Annonces Scientifiques & Événements", "Scientific News & Announcements")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{item.date}</span>
                </div>

                {item.imageUrl && (
                  <div className="mb-3 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video bg-slate-100 dark:bg-slate-800">
                    <img src={item.imageUrl} alt={t(item.title)} className="w-full h-full object-cover" />
                  </div>
                )}

                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {t(item.title)}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-2">
                  {t(item.summary)}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {item.pdfUrl && (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold transition inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </a>
                  )}

                  {item.videoUrl && (
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[10px] font-bold transition inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Vidéo</span>
                    </a>
                  )}

                  {item.linkUrl && (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{t("En savoir plus", "Read More")}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
