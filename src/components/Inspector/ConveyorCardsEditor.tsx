import React from 'react';
import { COLOR_LIST, getColor } from '../../constants/colors';
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface ConveyorCardsEditorProps {
  initialCards: number[];
  onChange: (newCards: number[]) => void;
}

export const ConveyorCardsEditor: React.FC<ConveyorCardsEditorProps> = ({
  initialCards,
  onChange,
}) => {
  const handleAddCard = (colorId: number) => {
    onChange([...initialCards, colorId]);
  };

  const handleRemoveCard = (index: number) => {
    const updated = [...initialCards];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleChangeCardColor = (index: number, newColorId: number) => {
    const updated = [...initialCards];
    updated[index] = newColorId;
    onChange(updated);
  };

  const handleMoveCard = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= initialCards.length) return;
    const updated = [...initialCards];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    onChange(updated);
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <div className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Layers size={14} className="text-sky-400" />
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Conveyor Prespawn Cards ({initialCards.length})
          </label>
        </div>
        {initialCards.length > 0 && (
          <button
            onClick={handleClear}
            className="text-[11px] text-rose-400 hover:text-rose-300 transition flex items-center gap-1"
          >
            <Trash2 size={11} />
            <span>Clear</span>
          </button>
        )}
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed">
        List of cards prespawned on the conveyor belt before the level begins.
      </p>

      {/* Visual Sequence Ribbon */}
      {initialCards.length > 0 ? (
        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-1.5 overflow-x-auto shadow-inner">
          {initialCards.map((colorId, idx) => {
            const colorDef = getColor(colorId);
            return (
              <div
                key={`ribbon-card-${idx}`}
                className="w-7 h-9 rounded-md flex flex-col items-center justify-between p-1 shrink-0 shadow-md border border-white/20 transition hover:scale-105"
                style={{ backgroundColor: colorDef.hex }}
                title={`Card #${idx + 1}: ${colorDef.name}`}
              >
                <span className="text-[9px] font-black text-white/90 drop-shadow">
                  {idx + 1}
                </span>
                <span className="text-[8px] font-bold text-white/80 drop-shadow">
                  C{colorId}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-3.5 rounded-xl border border-dashed border-slate-700/80 bg-slate-950/40 text-center text-xs text-slate-500">
          No cards prespawned on conveyor (belt starts empty)
        </div>
      )}

      {/* Quick Add Palette */}
      <div>
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
          Quick Add Card:
        </span>
        <div className="grid grid-cols-5 gap-1.5">
          {COLOR_LIST.slice(0, 10).map(col => (
            <button
              key={`quick-add-col-${col.id}`}
              onClick={() => handleAddCard(col.id)}
              className="flex items-center justify-center gap-1 px-1.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-750 border border-slate-700/80 hover:border-slate-500 transition group"
              title={`Add ${col.name} Card`}
            >
              <div
                className="w-3 h-3 rounded-full border border-white/20 shrink-0 shadow-sm group-hover:scale-110 transition"
                style={{ backgroundColor: col.hex }}
              />
              <span className="text-[10px] font-bold text-slate-300">
                {col.id}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Card List */}
      {initialCards.length > 0 && (
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {initialCards.map((colorId, idx) => {
            const colorDef = getColor(colorId);
            return (
              <div
                key={`conveyor-card-row-${idx}`}
                className="flex items-center justify-between p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 shadow-sm"
              >
                {/* Position Index */}
                <span className="text-[10px] font-mono font-bold text-slate-400 w-5 text-center">
                  #{idx + 1}
                </span>

                {/* Color preview chip + dropdown */}
                <div className="flex items-center gap-2 flex-1 mx-2">
                  <div
                    className="w-4 h-4 rounded-md border border-white/20 shadow-sm shrink-0"
                    style={{ backgroundColor: colorDef.hex }}
                  />
                  <select
                    value={colorId}
                    onChange={(e) => handleChangeCardColor(idx, Number(e.target.value))}
                    className="bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 flex-1"
                  >
                    {COLOR_LIST.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} (C{c.id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Move & Delete Actions */}
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => handleMoveCard(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition"
                    title="Move earlier"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => handleMoveCard(idx, 1)}
                    disabled={idx === initialCards.length - 1}
                    className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition"
                    title="Move later"
                  >
                    <ArrowDown size={12} />
                  </button>
                  <button
                    onClick={() => handleRemoveCard(idx)}
                    className="p-1 rounded hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition"
                    title="Remove card"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
