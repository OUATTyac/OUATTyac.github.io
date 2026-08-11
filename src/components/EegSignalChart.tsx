import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, RefreshCw, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EegSignalChart: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [selectedBand, setSelectedBand] = useState<'alpha' | 'theta' | 'combined'>('combined');

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Generate SVG path points for EEG wave
  const generateWavePath = () => {
    const points: string[] = [];
    const width = 600;
    const height = 120;
    const midY = height / 2;

    for (let x = 0; x <= width; x += 4) {
      const tVal = time + x * 0.03;
      let y = midY;

      if (selectedBand === 'alpha' || selectedBand === 'combined') {
        // Alpha wave ~ 10 Hz
        y += Math.sin(tVal * 10) * 18 * (1 + 0.3 * Math.sin(tVal * 1.5));
      }
      if (selectedBand === 'theta' || selectedBand === 'combined') {
        // Theta wave ~ 5 Hz
        y += Math.sin(tVal * 5) * 22;
      }

      // Add slight noise
      y += (Math.sin(x * 12.3 + time * 2) * 3);

      points.push(`${x},${y.toFixed(1)}`);
    }

    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              {t("Signaux EEG Pariéto-Occipitaux (O1, O2, P3, P4)", "Parieto-Occipital EEG Oscillations (O1, O2, P3, P4)")}
            </h4>
            <p className="text-xs text-slate-400">
              {t("Simulation en temps réel des bandes Alpha & Thêta lors d'une tâche de mémoire de travail", "Real-time Alpha & Theta power simulation during visuospatial tasks")}
            </p>
          </div>
        </div>

        {/* Band Selectors & Play/Pause */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setSelectedBand('combined')}
              className={`px-3 py-1 rounded-lg transition ${
                selectedBand === 'combined' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Combo
            </button>
            <button
              onClick={() => setSelectedBand('alpha')}
              className={`px-3 py-1 rounded-lg transition ${
                selectedBand === 'alpha' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Alpha (8-12Hz)
            </button>
            <button
              onClick={() => setSelectedBand('theta')}
              className={`px-3 py-1 rounded-lg transition ${
                selectedBand === 'theta' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Thêta (4-8Hz)
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setTime(0)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition"
            title="Reset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Wave Monitor */}
      <div className="relative bg-slate-900/80 rounded-2xl border border-slate-800/80 p-4 h-36 flex items-center justify-center overflow-hidden">
        {/* Subtle Horizontal Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between py-3 pointer-events-none opacity-20">
          <div className="border-b border-indigo-500/40 w-full" />
          <div className="border-b border-indigo-500/60 w-full" />
          <div className="border-b border-indigo-500/40 w-full" />
        </div>

        <svg viewBox="0 0 600 120" className="w-full h-full preserve-3d">
          <path
            d={generateWavePath()}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute top-2 left-3 text-[10px] font-mono text-indigo-400 flex items-center gap-2">
          <Zap className="w-3 h-3 text-emerald-400" />
          <span>Fz-Pz PSD Ratio: 2.14 µV²/Hz</span>
        </div>
        <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500">
          Sample Rate: 250 Hz • Bandpass: 0.5 - 45 Hz
        </div>
      </div>
    </div>
  );
};
