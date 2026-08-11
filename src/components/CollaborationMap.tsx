import React, { useState } from 'react';
import { MapPin, Globe, Building2, UserCheck, Sparkles } from 'lucide-react';
import { collaborationNodes } from '../data/collaborationsData';
import { useLanguage } from '../context/LanguageContext';

export const CollaborationMap: React.FC = () => {
  const { t } = useLanguage();
  const [activeNode, setActiveNode] = useState(collaborationNodes[0]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            {t("Réseau Scientifique International", "International Scientific Network")}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {t("Carte des Collaborations & Partenariats", "Collaborations & Academic Map")}
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{collaborationNodes.length} {t("Nœuds de Recherche", "Research Nodes")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Visual Map Representation */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 min-h-[340px] relative flex flex-col justify-between overflow-hidden border border-slate-800">
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>[LAT 5.3484° N, LON 4.0083° W]</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              GLOBAL NETWORK ACTIVE
            </span>
          </div>

          {/* Map Node Pins Layout */}
          <div className="relative z-10 my-auto py-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {collaborationNodes.map(node => {
              const isSelected = activeNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg scale-105'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
                    <span className="font-bold text-xs truncate">{node.city}</span>
                  </div>
                  <div className="text-[11px] opacity-80 truncate">{node.country}</div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>UFHB Abidjan → Barcelona, Dakar, Lomé, Paris, San Pédro</span>
            <span>Open Science</span>
          </div>
        </div>

        {/* Selected Node Detail Card */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4" />
              {activeNode.city}, {activeNode.country}
            </div>

            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3">
              {activeNode.institution}
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                  {t("Collaborateurs clés", "Key Collaborators")}
                </div>
                <div className="font-medium text-slate-800 dark:text-slate-200">
                  {activeNode.collaborators}
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {t("Axe de Recherche commun", "Focus Research Area")}
                </div>
                <div className="font-medium text-slate-800 dark:text-slate-200">
                  {activeNode.focusArea}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-right">
            <span className="text-xs text-slate-500">
              {t("Découvrez nos publications conjointes", "Explore Joint Publications")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
