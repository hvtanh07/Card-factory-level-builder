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
  Boxes,
  GripVertical,
  ChevronUp,
  ArrowUpDown,
  MoveRight
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
  onReorderNodeInLayer?: (nodeId: string, direction: 'up' | 'down') => void;
  onMoveNodeToLayer?: (nodeId: string, targetLayer: number) => void;
  onDragDropReorder?: (sourceNodeId: string, targetNodeId: string | null, targetLayerId?: number) => void;
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
  onReorderNodeInLayer,
  onMoveNodeToLayer,
  onDragDropReorder,
}) => {
  const [expandedLayers, setExpandedLayers] = useState<Set<number>>(new Set([0, 1, 2, 3]));
  const [customLayers, setCustomLayers] = useState<number[]>([]);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOverTarget, setDragOverTarget] = useState<{ type: 'layer' | 'node'; id: string | number } | null>(null);

  // Group nodes by layer
  const layersMap = new Map<number, BoardNode[]>();
  for (const bn of levelData.BoardNodes) {
    const layerId = bn.LayerId ?? bn.TileMapId ?? 0;
    const list = layersMap.get(layerId) || [];
    list.push(bn);
    layersMap.set(layerId, list);
  }

  const existingLayers = Array.from(layersMap.keys());
  const maxLayer = Math.max(3, ...existingLayers, ...customLayers);

  // Ensure default layers 0..3 are listed even if empty, sorted top-to-bottom (highest layer at top, Layer 0 Base at bottom)
  const allLayerIds = Array.from(new Set([0, 1, 2, 3, ...existingLayers, ...customLayers])).sort((a, b) => b - a);
  const allLayerOptions = [...allLayerIds].sort((a, b) => a - b);
  const boxMap = new Map(levelData.BoxNodes.map(b => [b.Id, b]));

  const toggleExpand = (layerId: number) => {
    setExpandedLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerId)) next.delete(layerId);
      else next.add(layerId);
      return next;
    });
  };

  const handleAddNewLayer = () => {
    const nextLayer = maxLayer + 1;
    setCustomLayers(prev => [...prev, nextLayer]);
    setExpandedLayers(prev => new Set([...prev, nextLayer]));
  };

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, nodeId: string) => {
    e.dataTransfer.setData('text/plain', nodeId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedNodeId(nodeId);
  };

  const handleDragEnd = () => {
    setDraggedNodeId(null);
    setDragOverTarget(null);
  };

  const handleDragOverLayer = (e: React.DragEvent, layerId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverTarget?.type !== 'layer' || dragOverTarget?.id !== layerId) {
      setDragOverTarget({ type: 'layer', id: layerId });
    }
  };

  const handleDropOnLayer = (e: React.DragEvent, layerId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedNodeId && onDragDropReorder) {
      onDragDropReorder(draggedNodeId, null, layerId);
    }
    setDraggedNodeId(null);
    setDragOverTarget(null);
  };

  const handleDragOverNode = (e: React.DragEvent, targetNodeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverTarget?.type !== 'node' || dragOverTarget?.id !== targetNodeId) {
      setDragOverTarget({ type: 'node', id: targetNodeId });
    }
  };

  const handleDropOnNode = (e: React.DragEvent, targetNodeId: string, layerId: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedNodeId && onDragDropReorder) {
      onDragDropReorder(draggedNodeId, targetNodeId, layerId);
    }
    setDraggedNodeId(null);
    setDragOverTarget(null);
  };

  return (
    <div className="space-y-3">
      {/* Header with Title & Add Layer Button */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Layers size={14} className="text-sky-400" />
          Layer Hierarchy
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddNewLayer}
            className="flex items-center gap-1 px-2 py-0.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded text-[10px] font-bold transition active:scale-95"
            title="Create a new empty layer above"
          >
            <Plus size={11} />
            <span>Layer</span>
          </button>
          <span className="text-[11px] text-slate-400 font-mono">
            {levelData.BoardNodes.length} Nodes
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {allLayerIds.map(layerId => {
          const nodes = layersMap.get(layerId) || [];
          const isVisible = visibleLayers.has(layerId);
          const isIsolated = isolatedLayer === layerId;
          const isExpanded = expandedLayers.has(layerId);
          const isDropTargetLayer = dragOverTarget?.type === 'layer' && dragOverTarget?.id === layerId;

          return (
            <div
              key={`layer-row-${layerId}`}
              onDragOver={(e) => handleDragOverLayer(e, layerId)}
              onDrop={(e) => handleDropOnLayer(e, layerId)}
              className={`rounded-xl border transition overflow-hidden ${
                isDropTargetLayer
                  ? 'border-sky-400 ring-2 ring-sky-500/40 bg-sky-950/40'
                  : isIsolated
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
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
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
                    <div
                      onDragOver={(e) => handleDragOverLayer(e, layerId)}
                      onDrop={(e) => handleDropOnLayer(e, layerId)}
                      className={`p-2.5 text-center text-[11px] rounded-lg border border-dashed transition ${
                        isDropTargetLayer
                          ? 'border-sky-400 bg-sky-500/20 text-sky-200 font-semibold'
                          : 'border-slate-800/80 text-slate-500 italic'
                      }`}
                    >
                      Empty Layer. Drop boxes here or click + to add.
                    </div>
                  ) : (
                    nodes.map((bn, idx) => {
                      const bx = boxMap.get(bn.Id);
                      const sn = (levelData.SpawnerNodes || []).find(s => s.Id === bn.Id);
                      const isSpawner = !!sn;
                      const currentBox = bx || (sn?.SpawnBoxes[0]);
                      const isSelected = selectedNodeId === bn.Id;
                      const boxColor = currentBox ? getColor(currentBox.BoxColor) : null;
                      const cardCount = currentBox?.InitCards.length || 0;
                      const isBeingDragged = draggedNodeId === bn.Id;
                      const isDropTargetNode = dragOverTarget?.type === 'node' && dragOverTarget?.id === bn.Id;

                      return (
                        <div
                          key={`node-item-${bn.Id}`}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, bn.Id)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => handleDragOverNode(e, bn.Id)}
                          onDrop={(e) => handleDropOnNode(e, bn.Id, layerId)}
                          onClick={() => onSelectNode(bn.Id)}
                          className={`group relative flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer transition ${
                            isBeingDragged
                              ? 'opacity-30 border border-dashed border-sky-400 bg-sky-950/20'
                              : isDropTargetNode
                              ? 'border-t-2 border-t-sky-400 bg-sky-500/20 shadow-sm'
                              : isSelected
                              ? 'bg-sky-500/20 text-sky-200 border border-sky-500/50 shadow-sm'
                              : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                          }`}
                        >
                          {/* Left: Drag Grip, Order Index, Color Swatch, ID */}
                          <div className="flex items-center gap-1.5 min-w-0">
                            {/* Drag Grip Icon */}
                            <span 
                              className="text-slate-600 group-hover:text-slate-400 cursor-grab active:cursor-grabbing shrink-0" 
                              title="Drag to reorder or move across layers"
                            >
                              <GripVertical size={12} />
                            </span>

                            {/* Order Number */}
                            <span className="text-[10px] font-mono text-slate-500 font-bold min-w-[15px] shrink-0">
                              #{idx + 1}
                            </span>

                            {/* Color Swatch */}
                            {boxColor && (
                              <span
                                className="w-3 h-3 rounded-full shrink-0 border border-white/20 shadow-sm"
                                style={{ backgroundColor: boxColor.hex }}
                              />
                            )}

                            {/* Node ID */}
                            <span className="font-mono font-medium truncate text-[11px] flex items-center gap-1">
                              <span className="truncate">{bn.Id}</span>
                              {isSpawner && (
                                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 py-0.2 rounded font-sans font-bold shrink-0">
                                  SP:{sn.SpawnBoxes.length}b
                                </span>
                              )}
                            </span>
                          </div>

                          {/* Right: Quick Layer Mover, Order Up/Down, Delete */}
                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {/* Move to Layer Selector */}
                            {onMoveNodeToLayer && (
                              <select
                                value={layerId}
                                onChange={(e) => {
                                  const target = Number(e.target.value);
                                  onMoveNodeToLayer(bn.Id, target);
                                }}
                                className="bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-[10px] font-bold px-1 py-0.5 rounded border border-slate-700 hover:border-sky-500/50 cursor-pointer outline-none transition"
                                title={`Currently in Layer ${layerId}. Click to move to another layer`}
                              >
                                {allLayerOptions.map(l => (
                                  <option key={l} value={l} className="bg-slate-900 text-slate-200">
                                    L{l} {l === 0 ? '(Base)' : ''}
                                  </option>
                                ))}
                                <option value={maxLayer + 1} className="bg-slate-900 text-amber-300 font-bold">
                                  + L{maxLayer + 1} (New)
                                </option>
                              </select>
                            )}

                            {/* Reorder Up / Down Buttons */}
                            {onReorderNodeInLayer && (
                              <div className="flex items-center">
                                <button
                                  onClick={() => onReorderNodeInLayer(bn.Id, 'up')}
                                  disabled={idx === 0}
                                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-750 disabled:opacity-20 disabled:hover:bg-transparent transition"
                                  title="Move earlier in order (Up)"
                                >
                                  <ChevronUp size={12} />
                                </button>
                                <button
                                  onClick={() => onReorderNodeInLayer(bn.Id, 'down')}
                                  disabled={idx === nodes.length - 1}
                                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-750 disabled:opacity-20 disabled:hover:bg-transparent transition"
                                  title="Move later in order (Down)"
                                >
                                  <ChevronDown size={12} />
                                </button>
                              </div>
                            )}

                            {/* Delete button */}
                            <button
                              onClick={() => onDeleteNode(bn.Id)}
                              className="p-1 hover:bg-rose-900/50 rounded text-slate-500 hover:text-rose-400 transition ml-0.5"
                              title="Delete node"
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
