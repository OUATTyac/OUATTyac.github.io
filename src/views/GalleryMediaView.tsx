import React, { useState } from 'react';
import { Image as ImageIcon, MapPin, Calendar, X, Film, FileText, ExternalLink, Filter, Play } from 'lucide-react';
import { useContent, MediaFile } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { GalleryPhoto } from '../types';

export const GalleryMediaView: React.FC = () => {
  const { t } = useLanguage();
  const { galleryPhotos = [], mediaFiles = [] } = useContent();

  const [selectedMediaType, setSelectedMediaType] = useState<'all' | 'photos' | 'videos' | 'documents'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [activeVideo, setActiveVideo] = useState<MediaFile | null>(null);

  const videos = mediaFiles.filter(m => m.type === 'video');
  const pdfs = mediaFiles.filter(m => m.type === 'pdf');

  return (
    <div className="space-y-10 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <Film className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t("Médiathèque, Vidéos & Galerie", "Media Library, Videos & Gallery")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {t("Galerie Photos, Vidéos & Documents", "Photo Gallery, Video Demos & Documents")}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t(
              "Démonstrations vidéo des enregistrements EEG 14 canaux au laboratoire UFHB, photographies des congrès scientifiques internationaux, posters de recherche et documents téléchargeables.",
              "Video demonstrations of 14-channel EEG recordings at UFHB laboratory, photos from international conferences, research posters, and downloadable documents."
            )}
          </p>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {[
          { id: 'all', label: t('Tous les médias', 'All Media') },
          { id: 'photos', label: `${t('Photos Galerie', 'Gallery Photos')} (${galleryPhotos.length})` },
          { id: 'videos', label: `${t('Séquences Vidéos', 'Video Demos')} (${videos.length})` },
          { id: 'documents', label: `${t('Documents & PDF', 'PDF Documents')} (${pdfs.length})` }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedMediaType(cat.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
              selectedMediaType === cat.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* VIDEOS SECTION */}
      {(selectedMediaType === 'all' || selectedMediaType === 'videos') && videos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-slate-100">
            <Film className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h2>{t("Séquences Vidéos & Démonstrations de Laboratoire", "Video Clips & Laboratory Demos")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map(video => (
              <div
                key={video.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col"
              >
                <div className="aspect-video relative bg-slate-950 flex items-center justify-center overflow-hidden group">
                  <video
                    src={video.url}
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                      <Film className="w-3 h-3" />
                      <span>{video.size || 'MP4 Video'}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {video.name}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noreferrer"
                      download={video.name}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>{t("Télécharger la vidéo", "Download video")}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PHOTOS MASONRY GRID */}
      {(selectedMediaType === 'all' || selectedMediaType === 'photos') && galleryPhotos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-slate-100">
            <ImageIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2>{t("Photographies d'Événements & de Terrain", "Fieldwork & Event Photographs")}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map(photo => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                  <img
                    src={photo.imageUrl}
                    alt={t(photo.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1 rounded-full">
                      {t("Agrandir la photo", "Zoom Photo")}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-indigo-500" />
                        {photo.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-indigo-500" />
                        {photo.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                      {t(photo.title)}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {t(photo.caption)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF DOCUMENTS SECTION */}
      {(selectedMediaType === 'all' || selectedMediaType === 'documents') && pdfs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-slate-100">
            <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2>{t("Documents PDF & Preprints", "PDF Documents & Preprints")}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pdfs.map(pdf => (
              <div
                key={pdf.id}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-4 shadow-xs hover:border-red-300 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-3 bg-red-50 dark:bg-red-950/60 text-red-600 rounded-xl shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">{pdf.name}</h3>
                    <p className="text-xs text-slate-500">{pdf.size || 'PDF File'}</p>
                  </div>
                </div>

                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noreferrer"
                  download={pdf.name}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shrink-0"
                >
                  <span>{t("Ouvrir PDF", "Open PDF")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative space-y-4 p-6">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute right-4 top-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={t(activePhoto.title)}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2 text-white">
              <div className="flex items-center gap-3 text-xs text-indigo-400 font-bold uppercase">
                <span>{activePhoto.location}</span>
                <span>•</span>
                <span>{activePhoto.date}</span>
              </div>
              <h3 className="text-xl font-bold">{t(activePhoto.title)}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(activePhoto.caption)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
