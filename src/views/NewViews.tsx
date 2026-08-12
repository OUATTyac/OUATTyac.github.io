import React, { useState } from 'react';
import { Newspaper, Calendar, ExternalLink, FileText, Video, Tag, Search, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { NewsItem } from '../types';

export const NewsView: React.FC = () => {
  const { news } = useContent();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: t('Toutes les actualités', 'All News') },
    { id: 'conference', label: t('Conférences', 'Conferences') },
    { id: 'publication', label: t('Publications', 'Publications') },
    { id: 'award', label: t('Prix & Distinctions', 'Awards') },
    { id: 'project', label: t('Projets & Bourses', 'Projects & Grants') },
    { id: 'media', label: t('Médias & Interviews', 'Media') }
  ];

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const title = t(item.title.fr, item.title.en).toLowerCase();
    const summary = t(item.summary.fr, item.summary.en).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || title.includes(query) || summary.includes(query);
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'conference':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'publication':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'award':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'project':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'media':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-4 border border-indigo-500/30">
            <Newspaper className="w-4 h-4" />
            <span>{t("Actualités & Événements", "News & Events")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            {t("Dernières Actualités & Annonces", "Latest News & Announcements")}
          </h1>
          <p className="text-indigo-200/90 text-sm sm:text-base leading-relaxed">
            {t(
              "Suivez les temps forts de mes formations, de mes recherches en neurosciences cognitives, mes participations aux congrès internationaux (FENS, SfN, IBRO), prix reçus et publications.",
              "Follow the highlights of my research in cognitive neuroscience, international conference presentations (FENS, IBRO, SfN), awards, and scientific publications."
            )}
          </p>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t("Rechercher une actualité...", "Search news...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Newspaper className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-500 font-medium text-sm">
            {t("Aucune actualité ne correspond à votre recherche.", "No news matches your search criteria.")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => {
            const titleText = t(item.title.fr, item.title.en);
            const summaryText = t(item.summary.fr, item.summary.en);

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Optional Image */}
                {item.imageUrl && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 relative">
                    <img
                      src={item.imageUrl}
                      alt={titleText}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getCategoryBadgeClass(item.category)} uppercase tracking-wider`}>
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition leading-snug">
                    {titleText}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                    {summaryText}
                  </p>
                </div>

                {/* Footer Action Links */}
                {(item.linkUrl || item.pdfUrl || item.videoUrl) && (
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3 text-xs font-semibold">
                    {item.linkUrl && (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <span>{t("En savoir plus", "Read More")}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {item.pdfUrl && (
                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </a>
                    )}
                    {item.videoUrl && (
                      <a
                        href={item.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:underline"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>{t("Vidéo", "Video")}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
