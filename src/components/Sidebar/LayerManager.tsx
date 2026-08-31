import React, { useState } from 'react';
import { LevelData, BoardNode, BoxNode } from '../../types/level';
import { getColor } from '../../constants/colors';
import { getBoxType } from '../../constants/boxTypes';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Focus, 
  Trash2,
  Lock,
  Boxes
} from 'lucide-react';

interface LayerManagerProps {
  levelData: LevelData;
  selectedNodeId: string | null;
  visibleLayers: Set<number>;
  isolatedLayer: number | null;
  onToggleLayerVisibility: (layerId: number) => void;
  onToggleIsolateLayer: (layerId: number) => void;
  onSelectNode: (id: string) => void;
  onDeleteNode: (id: string) => void;
  onAddNewNodeToLayer: (layerId: number) => void;
}

export const LayerManager: React.FC<LayerManagerProps> = ({
  levelData,
  selectedNodeId,
  visibleLayers,
  isolatedLayer,
  onToggleLayerVisibility,
  onToggleIsolateLayer,
  onSelectNode,
  onDeleteNode,
  onAddNewNodeToLayer,
}) => {
  const [expandedLayers, setExpandedLayers] = useState<Set<number>>(new Set([0, 1, 2, 3]));

  // Group nodes by layer
  const layersMap = new Map<number, BoardNode[]>();
  for (const bn of levelData.BoardNodes) {
    const layerId = bn.LayerId ?? bn.TileMapId ?? 0;
    const list = layersMap.get(layerId) || [];
    list.push(bn);
    layersMap.set(layerId, list);
  }

  // Ensure default layers 0..3 are listed even if empty, sorted top-to-bottom (highest layer at top, Layer 0 Base at bottom)
  const allLayerIds = Array.from(new Set([0, 1, 2, 3, ...layersMap.keys()])).sort((a, b) => b - a);
  const boxMap = new Map(levelData.BoxNodes.map(b => [b.Id, b]));

  const toggleExpand = (layerId: number) => {
    setExpandedLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerId)) next.delete(layerId);
      else next.add(layerId);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers size={14} className="text-sky-400" />
          Layer Hierarchy
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          {levelData.BoardNodes.length} Nodes
        </span>
      </div>

      <div className="space-y-2">
        {allLayerIds.map(layerId => {
          const nodes = layersMap.get(layerId) || [];
          const isVisible = visibleLayers.has(layerId);
          const isIsolated = isolatedLayer === layerId;
          const isExpanded = expandedLayers.has(layerId);

          return (
            <div
              key={`layer-row-${layerId}`}
              className={`rounded-xl border transition overflow-hidden ${
                isIsolated
                  ? 'bg-sky-950/40 border-sky-500/50'
                  : isVisible
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              {/* Layer Header */}
              <div className="flex items-center justify-between p-2.5 hover:bg-slate-800/50 transition">
                <div
                  className="flex items-center gap-2 cursor-pointer flex-1"
                  onClick={() => toggleExpand(layerId)}
                >
                  <button className="text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                    <span className="text-xs font-bold text-slate-200">
                      Layer {layerId}
                    </span>
                    {layerId === 0 && (
                      <span className="text-[9px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1 rounded font-bold uppercase">
                        Base
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded font-mono">
                      {nodes.length}
                    </span>
                  </div>
                </div>

                {/* Layer action controls */}
                <div className="flex items-center gap-1">
                  {/* Isolate button */}
                  <button
                    onClick={() => onToggleIsolateLayer(layerId)}
                    className={`p-1 rounded text-xs transition ${
                      isIsolated
                        ? 'bg-sky-500 text-white'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                    title={isIsolated ? 'Clear layer isolation' : 'Isolate this layer'}
                  >
                    <Focus size={13} />
                  </button>

                  {/* Visibility button */}
                  <button
                    onClick={() => onToggleLayerVisibility(layerId)}
                    className={`p-1 rounded text-xs transition ${
                      isVisible
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-500 hover:text-slate-400'
                    }`}
                    title={isVisible ? 'Hide layer' : 'Show layer'}
                  >
                    {isVisible ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>

                  {/* Add node to this layer */}
                  <button
                    onClick={() => onAddNewNodeToLayer(layerId)}
                    className="p-1 rounded text-slate-400 hover:bg-slate-800 hover:text-sky-300 transition"
                    title={`Add new box to Layer ${layerId}`}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Node items inside this layer */}
              {isExpanded && (
                <div className="px-2 pb-2 pt-1 space-y-1 border-t border-slate-800/60 bg-slate-950/20">
                  {nodes.length === 0 ? (
                    <div className="p-2 text-center text-[11px] text-slate-400 italic">
                      No nodes in Layer {layerId}
                    </div>
                  ) : (
                    nodes.map(bn => {
                      const bx = boxMap.get(bn.Id);
                      const isSelected = selectedNodeId === bn.Id;
                      const boxColor = bx ? getColor(bx.BoxColor) : null;
                      const boxType = bx ? getBoxType(bx.TypeId) : null;
                      const cardCount = bx?.InitCards.length || 0;
                      const blocksCount = bx?.BlockedNodes.length || 0;

                      return (
                        <div
                          key={`node-item-${bn.Id}`}
                          onClick={() => onSelectNode(bn.Id)}
                          className={`flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer transition ${
                            isSelected
                              ? 'bg-sky-500/20 text-sky-200 border border-sky-500/50 shadow-sm'
                              : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {boxColor && (
                              <span
                                className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                                style={{ backgroundColor: boxColor.hex }}
                              />
                            )}
                            <span className="font-mono font-medium truncate text-[11px]">
                              {bn.Id}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {blocksCount > 0 && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1 rounded font-mono" title={`Blocks ${blocksCount} nodes`}>
                                B:{blocksCount}
                              </span>
                            )}
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-1 rounded font-mono">
                              {cardCount}c
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteNode(bn.Id);
                              }}
                              className="p-1 hover:bg-rose-900/50 rounded text-slate-500 hover:text-rose-400 transition"
                              title="Delete"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
