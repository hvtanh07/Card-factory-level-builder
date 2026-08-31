export interface GameColor {
  id: number;
  name: string;
  hex: string;
  borderHex: string;
  darkHex: string;
  textColor: string;
  badgeBg: string;
}

export const GAME_COLORS: Record<number, GameColor> = {
  1: {
    id: 1,
    name: 'Red',
    hex: '#ef4444',
    borderHex: '#dc2626',
    darkHex: '#991b1b',
    textColor: '#ffffff',
    badgeBg: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  2: {
    id: 2,
    name: 'Blue',
    hex: '#3b82f6',
    borderHex: '#2563eb',
    darkHex: '#1e40af',
    textColor: '#ffffff',
    badgeBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  3: {
    id: 3,
    name: 'Green',
    hex: '#22c55e',
    borderHex: '#16a34a',
    darkHex: '#166534',
    textColor: '#ffffff',
    badgeBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  4: {
    id: 4,
    name: 'Yellow',
    hex: '#eab308',
    borderHex: '#ca8a04',
    darkHex: '#854d0e',
    textColor: '#ffffff',
    badgeBg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  5: {
    id: 5,
    name: 'Pink',
    hex: '#ec4899',
    borderHex: '#db2777',
    darkHex: '#9d174d',
    textColor: '#ffffff',
    badgeBg: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  },
  6: {
    id: 6,
    name: 'Orange',
    hex: '#f97316',
    borderHex: '#ea580c',
    darkHex: '#9a3412',
    textColor: '#ffffff',
    badgeBg: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
  7: {
    id: 7,
    name: 'Brown',
    hex: '#92400e',
    borderHex: '#78350f',
    darkHex: '#451a03',
    textColor: '#ffffff',
    badgeBg: 'bg-amber-900/20 text-amber-500 border-amber-900/30',
  },
  8: {
    id: 8,
    name: 'Cyan',
    hex: '#06b6d4',
    borderHex: '#0891b2',
    darkHex: '#155e75',
    textColor: '#ffffff',
    badgeBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
};

export const COLOR_LIST = Object.values(GAME_COLORS);
export const COLOR_OPTIONS = COLOR_LIST;
export const CARD_COLORS = COLOR_LIST;

export function getColor(colorId: number): GameColor {
  if (GAME_COLORS[colorId]) {
    return GAME_COLORS[colorId];
  }
  // Fallback for 0 or unknown ID
  if (colorId === 0) {
    return GAME_COLORS[1];
  }
  return {
    id: colorId,
    name: `Color ${colorId}`,
    hex: '#94a3b8',
    borderHex: '#64748b',
    darkHex: '#475569',
    textColor: '#ffffff',
    badgeBg: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  };
}
