import React from 'react';
import { COLOR_LIST, getColor } from '../../constants/colors';
import { BoxTypeDef } from '../../types/level';
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, RefreshCw } from 'lucide-react';

interface CardStackEditorProps {
  cards: number[];
  boxColor: number;
  boxType: BoxTypeDef;
  onChange: (newCards: number[]) => void;
}

export const CardStackEditor: React.FC<CardStackEditorProps> = ({
  cards,
  boxColor,
  boxType,
  onChange,
}) => {
  const handleAddCard = (colorId: number) => {
    onChange([...cards, colorId]);
  };

  const handleRemoveCard = (index: number) => {
    const updated = [...cards];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleChangeCardColor = (index: number, newColorId: number) => {
    const updated = [...cards];
    updated[index] = newColorId;
    onChange(updated);
  };

  const handleMoveCard = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= cards.length) return;
    const updated = [...cards];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  // Preset generators
  const handleFillBoxColor = () => {
    const defaultColor = boxColor || 1;
    const newCards = Array(boxType.capacity).fill(defaultColor);
    onChange(newCards);
  };

  const handleFillPairs = () => {
    const newCards: number[] = [];
    const count = boxType.capacity;
    let currentColor = 1;
    for (let i = 0; i < count; i += 2) {
      newCards.push(((currentColor - 1) % 8) + 1);
      if (i + 1 < count) newCards.push(((currentColor - 1) % 8) + 1);
      currentColor++;
    }
    onChange(newCards);
  };

  const handleClear = () => {
    onChange([]);
  };

  const isOverCapacity = cards.length > boxType.capacity;

  return (
    <div className="space-y-3">
      {/* Header & Capacity */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Initial Cards ({cards.length}/{boxType.capacity})
        </label>
        {isOverCapacity && (
          <span className="text-xs text-rose-400 font-bold animate-pulse">
            Exceeds Capacity!
          </span>
        )}
      </div>

      {/* Card Items Stack */}
      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        {cards.length === 0 ? (
          <div className="p-3 rounded-lg border border-dashed border-slate-700 text-center text-xs text-slate-500">
            No cards in this box (empty tray)
          </div>
        ) : (
          cards.map((colorId, idx) => {
            const colorDef = getColor(colorId);
            return (
              <div
                key={`card-item-${idx}`}
                className="flex items-center justify-between p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 shadow-sm"
              >
                {/* Index badge */}
                <span className="text-[10px] font-mono text-slate-400 w-4 text-center">
                  #{idx + 1}
                </span>

                {/* Color Swatch & Dropdown */}
                <div className="flex items-center gap-2 flex-1 mx-2">
                  <div
                    className="w-4 h-4 rounded shadow-sm border border-white/20"
                    style={{ backgroundColor: colorDef.hex }}
                  />
                  <select
                    value={colorId}
                    onChange={(e) => handleChangeCardColor(idx, Number(e.target.value))}
                    className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded px-2 py-1 flex-1 focus:outline-none focus:border-sky-500"
                  >
                    {COLOR_LIST.map(c => (
                      <option key={`opt-${c.id}`} value={c.id}>
                        {c.name} ({c.id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Card order & delete actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveCard(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => handleMoveCard(idx, 1)}
                    disabled={idx === cards.length - 1}
                    className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Down"
                  >
                    <ArrowDown size={12} />
                  </button>
                  <button
                    onClick={() => handleRemoveCard(idx)}
                    className="p-1 hover:bg-rose-900/50 rounded text-slate-400 hover:text-rose-400 transition"
                    title="Remove Card"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Add Palette (Chips) */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] text-slate-400 font-medium">+ Quick Add Card:</span>
        <div className="grid grid-cols-4 gap-1.5">
          {COLOR_LIST.map(c => (
            <button
              key={`add-${c.id}`}
              onClick={() => handleAddCard(c.id)}
              className="py-1 px-1 rounded-lg border flex flex-col items-center gap-0.5 hover:brightness-125 transition active:scale-95 shadow"
              style={{
                backgroundColor: c.hex,
                borderColor: c.borderHex,
                color: c.textColor,
              }}
              title={`Add ${c.name}`}
            >
              <span className="text-[9px] font-bold truncate max-w-full">{c.name.substring(0, 4)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Presets & Batch Actions */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
        <button
          onClick={handleFillBoxColor}
          className="flex-1 py-1 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium rounded-lg border border-slate-700 flex items-center justify-center gap-1 transition"
        >
          <Sparkles size={11} className="text-amber-400" />
          Fill Monocolor
        </button>
        <button
          onClick={handleFillPairs}
          className="flex-1 py-1 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium rounded-lg border border-slate-700 flex items-center justify-center gap-1 transition"
        >
          <RefreshCw size={11} className="text-sky-400" />
          Fill Pairs
        </button>
        <button
          onClick={handleClear}
          className="py-1 px-2 bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-300 text-[11px] rounded-lg border border-slate-700 transition"
          title="Clear all cards"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
