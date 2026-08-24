import React from 'react';
import { LevelData, ValidationIssue } from '../../types/level';
import { CARD_COLORS, getColor } from '../../constants/colors';
import { getCardDistribution } from '../../utils/levelValidator';
import { AlertTriangle, CheckCircle2, Info, Layers, Package, Layers3 } from 'lucide-react';

interface StatsBarProps {
  levelData: LevelData;
  validationIssues: ValidationIssue[];
  onOpenValidationModal?: () => void;
  onUpdateGlobalSettings: (isOddSize: boolean, version: number) => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  levelData,
  validationIssues,
  onOpenValidationModal,
  onUpdateGlobalSettings,
}) => {
  const cardDistribution = getCardDistribution(levelData);
  const totalCards = Object.values(cardDistribution).reduce((a, b) => a + b, 0);

  const errors = validationIssues.filter(i => i.type === 'error');
  const warnings = validationIssues.filter(i => i.type === 'warning');

  return (
    <div className="h-9 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-xs text-slate-300 select-none z-20">
      {/* Left: Summary Metrics */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Package size={13} className="text-sky-400" />
          <span>Boxes:</span>
          <span className="font-mono font-bold text-slate-200">{levelData.BoardNodes.length}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <Layers3 size={13} className="text-amber-400" />
          <span>Total Cards:</span>
          <span className="font-mono font-bold text-slate-200">{totalCards}</span>
        </div>

        <div className="h-4 w-px bg-slate-800"></div>

        {/* Card Color breakdown chips */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-medium">Deck:</span>
          {Object.entries(cardDistribution).map(([colorIdStr, count]) => {
            const colorId = Number(colorIdStr);
            const colorDef = getColor(colorId);
            return (
              <div
                key={`stat-col-${colorId}`}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 shadow-sm"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: colorDef.hex }}
                />
                <span className="font-mono font-semibold text-[11px] text-slate-200">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Validation Status & Global settings */}
      <div className="flex items-center gap-3">
        {/* IsOddSize toggle */}
        <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
          <input
            type="checkbox"
            checked={levelData.IsOddSize}
            onChange={(e) => onUpdateGlobalSettings(e.target.checked, levelData.Version)}
            className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
          />
          <span>IsOddSize</span>
        </label>

        <div className="h-4 w-px bg-slate-800"></div>

        {/* Validation indicator */}
        {errors.length > 0 ? (
          <div
            className="flex items-center gap-1.5 text-rose-400 bg-rose-950/40 border border-rose-800/50 px-2 py-0.5 rounded cursor-pointer"
            title={errors.map(e => e.message).join('\n')}
          >
            <AlertTriangle size={12} />
            <span className="font-semibold text-[11px]">{errors.length} Error{errors.length > 1 ? 's' : ''}</span>
          </div>
        ) : warnings.length > 0 ? (
          <div
            className="flex items-center gap-1.5 text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2 py-0.5 rounded cursor-pointer"
            title={warnings.map(w => w.message).join('\n')}
          >
            <Info size={12} />
            <span className="font-semibold text-[11px]">{warnings.length} Warning{warnings.length > 1 ? 's' : ''}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded">
            <CheckCircle2 size={12} />
            <span className="font-semibold text-[11px]">Level Valid</span>
          </div>
        )}
      </div>
    </div>
  );
};
