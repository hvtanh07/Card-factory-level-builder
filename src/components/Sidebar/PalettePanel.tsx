import React from 'react';
import { BOX_TYPES } from '../../constants/boxTypes';
import { CARD_COLORS } from '../../constants/colors';
import { Plus, Sparkles, PackagePlus } from 'lucide-react';

interface PalettePanelProps {
  onAddPreset: (typeId: number, colorId: number, cards: number[], rotation: number) => void;
}

export const PalettePanel: React.FC<PalettePanelProps> = ({ onAddPreset }) => {
  const PRESETS = [
    {
      name: 'Red Box (4 Cards)',
      typeId: 1,
      colorId: 0,
      cards: [0, 0, 0, 0],
      rotation: 0,
      colorHex: CARD_COLORS[0].hex,
      badge: 'Small',
    },
    {
      name: 'Blue Box (4 Cards)',
      typeId: 1,
      colorId: 1,
      cards: [1, 1, 1, 1],
      rotation: 0,
      colorHex: CARD_COLORS[1].hex,
      badge: 'Small',
    },
    {
      name: 'Green Box (4 Cards)',
      typeId: 1,
      colorId: 2,
      cards: [2, 2, 2, 2],
      rotation: 0,
      colorHex: CARD_COLORS[2].hex,
      badge: 'Small',
    },
    {
      name: 'Purple Box (4 Cards)',
      typeId: 1,
      colorId: 3,
      cards: [3, 3, 3, 3],
      rotation: 0,
      colorHex: CARD_COLORS[3].hex,
      badge: 'Small',
    },
    {
      name: 'Diagonal Box (6 Cards 45°)',
      typeId: 3,
      colorId: 1,
      cards: [1, 1, 1, 1, 1, 1],
      rotation: 45,
      colorHex: CARD_COLORS[1].hex,
      badge: 'Rotated',
    },
    {
      name: 'Small Tray (4 Cards)',
      typeId: 4,
      colorId: 5,
      cards: [0, 0, 2, 2],
      rotation: 0,
      colorHex: CARD_COLORS[5].hex,
      badge: 'Tray',
    },
    {
      name: 'Medium Tray (6 Cards)',
      typeId: 5,
      colorId: 5,
      cards: [1, 1, 2, 2, 3, 3],
      rotation: 0,
      colorHex: CARD_COLORS[5].hex,
      badge: 'Tray',
    },
    {
      name: 'Large Tray (8 Cards)',
      typeId: 6,
      colorId: 5,
      cards: [0, 0, 1, 1, 2, 2, 3, 3],
      rotation: 0,
      colorHex: CARD_COLORS[5].hex,
      badge: 'Large Tray',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <PackagePlus size={14} className="text-emerald-400" />
          Box Presets Palette
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((p, idx) => (
          <button
            key={`preset-${idx}`}
            onClick={() => onAddPreset(p.typeId, p.colorId, p.cards, p.rotation)}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition flex flex-col justify-between group active:scale-95 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                style={{ backgroundColor: p.colorHex }}
              />
              <span className="text-[9px] uppercase font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                {p.badge}
              </span>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200 group-hover:text-sky-300 transition">
                {p.name}
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {p.cards.length} cards {p.rotation !== 0 && `• ${p.rotation}°`}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
