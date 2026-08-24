import React from 'react';

interface ConveyorBeltProps {
  scale?: number;
  completedCards?: number;
  totalCards?: number;
  slots?: { color: number; count: number; max: number }[];
}

export const ConveyorBelt: React.FC<ConveyorBeltProps> = ({
  completedCards = 0,
  totalCards = 24,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-2xl relative overflow-hidden select-none">
      {/* Top Header info */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold tracking-wider uppercase">
            Conveyor System
          </span>
          <span className="text-xs text-slate-400">Game Target Preview</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400 font-medium">Goal:</span>
          <span className="text-sm font-bold text-sky-400 font-mono">
            {completedCards}/{totalCards}
          </span>
        </div>
      </div>

      {/* Conveyor graphic matching screenshot */}
      <div className="relative w-full h-44 bg-[#69a1c7] rounded-xl overflow-hidden border-2 border-[#8ebfda]/40 p-2 shadow-inner">
        {/* Conveyor Machine Dispenser (Top Right) */}
        <div className="absolute top-2 right-8 w-16 h-14 bg-gradient-to-b from-slate-100 to-slate-300 rounded-lg border-2 border-slate-400 shadow-md flex flex-col items-center justify-center z-10">
          <div className="w-10 h-2 bg-slate-600 rounded-full mb-1"></div>
          <div className="w-12 h-3 bg-sky-200 rounded border border-slate-400"></div>
        </div>

        {/* Conveyor Belt Path (SVG S-Curve) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 140">
          <defs>
            <linearGradient id="beltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9ec9e2" />
              <stop offset="100%" stopColor="#7baece" />
            </linearGradient>
            <filter id="beltGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#335973" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* S-Shaped Conveyor Track */}
          <path
            d="M 350 25 L 350 45 Q 350 55 340 55 L 70 55 Q 55 55 55 70 L 55 125"
            fill="none"
            stroke="#ffffff"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#beltGlow)"
          />
          <path
            d="M 350 25 L 350 45 Q 350 55 340 55 L 70 55 Q 55 55 55 70 L 55 125"
            fill="none"
            stroke="url(#beltGrad)"
            strokeWidth="26"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Directional Chevrons */}
          <path d="M 345 35 L 350 40 L 355 35" fill="none" stroke="#6896b3" strokeWidth="3" strokeLinecap="round" />
          <path d="M 210 50 L 205 55 L 210 60" fill="none" stroke="#6896b3" strokeWidth="3" strokeLinecap="round" />
          <path d="M 60 85 L 55 90 L 50 85" fill="none" stroke="#6896b3" strokeWidth="3" strokeLinecap="round" />

          {/* Exit Ramp / Rollers (Bottom Left) */}
          <rect x="42" y="105" width="26" height="20" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <line x1="45" y1="110" x2="65" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="45" y1="115" x2="65" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="45" y1="120" x2="65" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>

        {/* 6 Delivery Card Slots matching the screenshot (2 top, 4 bottom) */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
          {/* Top 2 slots */}
          <div className="flex justify-center gap-3 ml-[-30px]">
            {[0, 1].map(i => (
              <div
                key={`top-slot-${i}`}
                className="w-12 h-16 rounded-md bg-[#507d9e]/70 border-2 border-dashed border-[#8ebfda] relative flex items-center justify-center shadow-md"
              >
                {/* 4 Corner Rivets */}
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-400"></div>
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-400"></div>
                <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-400"></div>
                <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-400"></div>
                <div className="w-8 h-12 rounded border border-dashed border-[#8ebfda]/40 flex items-center justify-center text-[10px] text-white/50 font-bold">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom 4 slots */}
          <div className="flex justify-center gap-3 ml-[30px] mb-1">
            {[0, 1, 2, 3].map(i => (
              <div
                key={`bot-slot-${i}`}
                className="w-12 h-16 rounded-md bg-[#507d9e]/70 border-2 border-dashed border-[#8ebfda] relative flex items-center justify-center shadow-md"
              >
                {/* 4 Corner Rivets */}
                <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-400"></div>
                <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-400"></div>
                <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-400"></div>
                <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-slate-100 border border-slate-400"></div>
                <div className="w-8 h-12 rounded border border-dashed border-[#8ebfda]/40 flex items-center justify-center text-[10px] text-white/50 font-bold">
                  {i + 3}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score / Target plaque plaque */}
        <div className="absolute right-6 top-16 bg-slate-100/90 text-slate-800 px-2 py-0.5 rounded border border-slate-400 text-xs font-bold font-mono shadow">
          {completedCards}/{totalCards}
        </div>
      </div>
    </div>
  );
};
