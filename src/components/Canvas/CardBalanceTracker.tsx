import React, { useState } from 'react';
import { LevelData } from '../../types/level';
import { getColor } from '../../constants/colors';
import { getCardDistribution, getColoredBoxCapacities } from '../../utils/levelValidator';
import { 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Scale,
  Plus,
  Minus,
  Check
} from 'lucide-react';

interface CardBalanceTrackerProps {
  levelData: LevelData;
}

export const CardBalanceTracker: React.FC<CardBalanceTrackerProps> = ({ levelData }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const cardDistribution = getCardDistribution(levelData);
  const coloredCapacities = getColoredBoxCapacities(levelData);

  // Collect all unique colors present either as cards or required by boxes
  const allColorIds = Array.from(
    new Set([
      ...Object.keys(cardDistribution).map(Number),
      ...Object.keys(coloredCapacities).map(Number),
    ])
  ).sort((a, b) => a - b);

  const balanceStats = allColorIds.map(colorId => {
    const required = coloredCapacities[colorId] || 0;
    const current = cardDistribution[colorId] || 0;
    const diff = current - required;
    const colorDef = getColor(colorId);

    return {
      colorId,
      colorDef,
      required,
      current,
      diff,
      isBalanced: diff === 0,
      isSpare: diff > 0,
      isMissing: diff < 0,
    };
  });

  const totalRequired = Object.values(coloredCapacities).reduce((a, b) => a + b, 0);
  const totalCurrent = Object.values(cardDistribution).reduce((a, b) => a + b, 0);
  const imbalancedColors = balanceStats.filter(s => !s.isBalanced);
  const isAllBalanced = balanceStats.length > 0 && imbalancedColors.length === 0;

  if (allColorIds.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-4 right-4 z-20 w-80 max-w-[calc(100vw-2rem)] select-none font-sans">
      <div className="bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700/60 shadow-2xl overflow-hidden transition-all duration-200">
        {/* Header Bar */}
        <div 
          onClick={() => setIsExpanded(prev => !prev)}
          className="px-3.5 py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition border-b border-slate-800/80"
        >
          <div className="flex items-center gap-2">
            <Scale size={15} className={isAllBalanced ? "text-emerald-400" : "text-amber-400"} />
            <span className="text-xs font-bold text-slate-200 tracking-wide">
              Card Balance
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAllBalanced ? (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 size={11} />
                <span>Balanced</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <AlertCircle size={11} />
                <span>{imbalancedColors.length} Imbalance{imbalancedColors.length > 1 ? 's' : ''}</span>
              </span>
            )}

            <button
              className="p-0.5 text-slate-400 hover:text-slate-200 rounded"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        {/* Quick Badge Chips (Always visible quick overview) */}
        <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/60 flex flex-wrap gap-1.5 items-center">
          {balanceStats.map(({ colorId, colorDef, diff, isBalanced, isSpare }) => (
            <div
              key={`badge-chip-${colorId}`}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-xs font-mono font-bold shadow-sm ${
                isBalanced
                  ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-400'
                  : isSpare
                  ? 'bg-amber-950/40 border-amber-700/60 text-amber-300'
                  : 'bg-rose-950/40 border-rose-700/60 text-rose-300'
              }`}
              title={`${colorDef.name}: ${isBalanced ? 'Balanced' : isSpare ? `+${diff} spare card(s)` : `${diff} missing card(s)`}`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0"
                style={{ backgroundColor: colorDef.hex }}
              />
              <span>
                {isBalanced ? (
                  <span className="text-[10px] text-emerald-400">✓</span>
                ) : isSpare ? (
                  `+${diff}`
                ) : (
                  `${diff}`
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Expanded Detailed Breakdown */}
        {isExpanded && (
          <div className="p-3 space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="space-y-1.5">
              {balanceStats.map(({ colorId, colorDef, required, current, diff, isBalanced, isSpare, isMissing }) => (
                <div
                  key={`detail-row-${colorId}`}
                  className={`flex items-center justify-between p-2 rounded-lg border text-xs transition ${
                    !isBalanced 
                      ? 'bg-slate-800/60 border-slate-700/80 shadow-sm' 
                      : 'bg-slate-900/40 border-slate-800/50'
                  }`}
                >
                  {/* Left: Color dot & Name */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-3.5 h-3.5 rounded-full shadow-sm flex-shrink-0 border border-white/20"
                      style={{ backgroundColor: colorDef.hex }}
                    />
                    <span className="font-semibold text-slate-200 truncate text-[11px]">
                      {colorDef.name}
                    </span>
                  </div>

                  {/* Right: Counts and Diff Status */}
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-200 text-xs">{current}</span>
                      <span className="text-slate-500 font-mono text-[10px]"> / {required}</span>
                    </div>

                    {isBalanced && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-semibold">
                        <Check size={10} />
                        <span>OK</span>
                      </span>
                    )}

                    {isSpare && (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-bold">
                        <Plus size={9} />
                        <span>{diff} spare</span>
                      </span>
                    )}

                    {isMissing && (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-[10px] font-bold">
                        <Minus size={9} />
                        <span>{Math.abs(diff)} missing</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary Footer */}
            <div className="pt-2 mt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Total Level Cards:</span>
              <span className="font-mono font-bold text-slate-200">
                {totalCurrent} / {totalRequired}
                {totalCurrent !== totalRequired && (
                  <span className={`ml-1.5 ${totalCurrent > totalRequired ? 'text-amber-400' : 'text-rose-400'}`}>
                    ({totalCurrent > totalRequired ? `+${totalCurrent - totalRequired}` : `${totalCurrent - totalRequired}`})
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
