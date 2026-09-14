import React from 'react';
import { BOX_TYPES } from '../../constants/boxTypes';
import { CARD_COLORS } from '../../constants/colors';
import { SpawnBox } from '../../types/level';
import { Plus, Sparkles, PackagePlus, Repeat, Lock, Layers } from 'lucide-react';

interface PalettePanelProps {
  onAddPreset: (typeId: number, colorId: number, cards: number[], rotation: number) => void;
  onAddSpawnerPreset?: (preset?: { boxes?: SpawnBox[]; rotation?: number; name?: string }) => void;
}

export const PalettePanel: React.FC<PalettePanelProps> = ({ onAddPreset, onAddSpawnerPreset }) => {
  const PRESETS = [
    {
      name: 'Red Box (4 Cards)',
      typeId: 0,
      colorId: 0,
      cards: [0, 0, 0, 0],
      rotation: 0,
      colorHex: CARD_COLORS[0].hex,
      badge: 'Small',
    },
    {
      name: 'Blue Box (4 Cards)',
      typeId: 0,
      colorId: 1,
      cards: [1, 1, 1, 1],
      rotation: 0,
      colorHex: CARD_COLORS[1].hex,
      badge: 'Small',
    },
    {
      name: 'Green Box (4 Cards)',
      typeId: 0,
      colorId: 2,
      cards: [2, 2, 2, 2],
      rotation: 0,
      colorHex: CARD_COLORS[2].hex,
      badge: 'Small',
    },
    {
      name: 'Yellow Box (4 Cards)',
      typeId: 0,
      colorId: 3,
      cards: [3, 3, 3, 3],
      rotation: 0,
      colorHex: CARD_COLORS[3].hex,
      badge: 'Small',
    },
    {
      name: 'Pink Box (6 Cards)',
      typeId: 1,
      colorId: 4,
      cards: [4, 4, 4, 4, 4, 4],
      rotation: 0,
      colorHex: CARD_COLORS[4].hex,
      badge: 'Medium',
    },
    {
      name: 'Small Paper Box (4 Cards)',
      typeId: 0,
      colorId: 0,
      cards: [0, 0, 1, 1],
      rotation: 0,
      colorHex: '#ffffff',
      badge: 'Paper Box',
    },
    {
      name: 'Medium Paper Box (6 Cards)',
      typeId: 1,
      colorId: 1,
      cards: [1, 1, 2, 2, 3, 3],
      rotation: 0,
      colorHex: '#ffffff',
      badge: 'Paper Box',
    },
    {
      name: 'Large Paper Box (8 Cards)',
      typeId: 2,
      colorId: 2,
      cards: [0, 0, 1, 1, 2, 2, 3, 3],
      rotation: 0,
      colorHex: '#ffffff',
      badge: 'Paper Box',
    },
  ];

  const SPAWNER_PRESETS: Array<{
    name: string;
    description: string;
    boxes: SpawnBox[];
    rotation: number;
    badge: string;
  }> = [
    {
      name: 'Standard Spawner',
      description: '2 Boxes (Red & Blue, 6 cards each)',
      rotation: 180,
      badge: '2 Boxes',
      boxes: [
        {
          Id: '',
          TypeId: 1,
          BoxColor: 0,
          BlockedNodes: [],
          InitCards: [0, 0, 0, 1, 1, 1],
          IsHidden: false,
          LockedTurn: 0,
          IsPaperBox: false,
          IsRainbowBox: false,
        },
        {
          Id: '',
          TypeId: 1,
          BoxColor: 1,
          BlockedNodes: [],
          InitCards: [1, 1, 1, 0, 0, 0],
          IsHidden: false,
          LockedTurn: 0,
          IsPaperBox: false,
          IsRainbowBox: false,
        },
      ],
    },
    {
      name: 'Multi-Box Spawner',
      description: '3 Boxes (Green, Yellow, Pink)',
      rotation: 180,
      badge: '3 Boxes',
      boxes: [
        {
          Id: '',
          TypeId: 1,
          BoxColor: 2,
          BlockedNodes: [],
          InitCards: [2, 2, 2, 3, 3, 3],
          IsHidden: false,
          LockedTurn: 0,
          IsPaperBox: false,
        },
        {
          Id: '',
          TypeId: 1,
          BoxColor: 3,
          BlockedNodes: [],
          InitCards: [3, 3, 3, 2, 2, 2],
          IsHidden: false,
          LockedTurn: 0,
          IsPaperBox: false,
        },
        {
          Id: '',
          TypeId: 1,
          BoxColor: 4,
          BlockedNodes: [],
          InitCards: [4, 4, 4, 2, 2, 2],
          IsHidden: false,
          LockedTurn: 0,
          IsPaperBox: false,
        },
      ],
    },
    {
      name: 'Locked Turn Spawner',
      description: '2 Boxes with Turn Locks (T:2 & T:0)',
      rotation: 180,
      badge: 'Timed',
      boxes: [
        {
          Id: '',
          TypeId: 1,
          BoxColor: 2,
          BlockedNodes: [],
          InitCards: [2, 2, 2, 0, 0, 0],
          IsHidden: false,
          LockedTurn: 2,
          IsPaperBox: false,
        },
        {
          Id: '',
          TypeId: 1,
          BoxColor: 0,
          BlockedNodes: [],
          InitCards: [0, 0, 0, 2, 2, 2],
          IsHidden: false,
          LockedTurn: 0,
          IsPaperBox: false,
        },
      ],
    },
    {
      name: 'Paper Tray Spawner',
      description: '2 Paper Box Trays for Conveyor Feeder',
      rotation: 180,
      badge: 'Trays',
      boxes: [
        {
          Id: '',
          TypeId: 1,
          BoxColor: 0,
          BlockedNodes: [],
          InitCards: [0, 0, 1, 1, 2, 2],
          IsHidden: false,
          LockedTurn: 0,
          IsPaperBox: true,
        },
        {
          Id: '',
          TypeId: 1,
          BoxColor: 1,
          BlockedNodes: [],
          InitCards: [1, 1, 2, 2, 3, 3],
          IsHidden: false,
          LockedTurn: 0,
          IsPaperBox: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      {/* 1. Spawner Presets Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Repeat size={14} />
            Spawner Presets
          </span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
            Portal
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {SPAWNER_PRESETS.map((sp, idx) => (
            <button
              key={`spawner-preset-${idx}`}
              onClick={() => onAddSpawnerPreset?.({ boxes: sp.boxes, rotation: sp.rotation, name: sp.name })}
              className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-amber-950/30 border border-amber-500/30 hover:border-amber-500/60 text-left transition flex items-center justify-between group active:scale-95 shadow-sm"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Repeat size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition truncate">
                    {sp.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {sp.description}
                  </div>
                </div>
              </div>
              <span className="text-[9px] uppercase font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">
                {sp.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Standard Box Presets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <PackagePlus size={14} className="text-emerald-400" />
            Standard Box Presets
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
    </div>
  );
};

