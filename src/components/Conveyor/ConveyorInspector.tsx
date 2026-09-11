import React from 'react';
import { ConveyorData, ConveyorNode, ConveyorSlot } from '../../types/conveyor';
import { 
  Settings, 
  Layers, 
  Box, 
  Trash2, 
  Plus, 
  ArrowUp, 
  ArrowDown, 
  RotateCw, 
  Repeat, 
  Lock, 
  Tv, 
  Navigation,
  Sliders,
  Sparkles
} from 'lucide-react';

interface ConveyorInspectorProps {
  conveyorData: ConveyorData;
  selectedNodeId: string | null;
  selectedSlotId: string | null;
  onSelectNode: (id: string | null) => void;
  onSelectSlot: (id: string | null) => void;
  onUpdateConveyor: (updated: ConveyorData) => void;
}

export const ConveyorInspector: React.FC<ConveyorInspectorProps> = ({
  conveyorData,
  selectedNodeId,
  selectedSlotId,
  onSelectNode,
  onSelectSlot,
  onUpdateConveyor,
}) => {
  const selectedNode = conveyorData.ConveyorNodes.find(n => n.Id === selectedNodeId);
  const selectedSlot = conveyorData.ConveyorSlots.find(s => s.Id === selectedSlotId);

  // Update Global Settings
  const updateGlobal = (key: keyof ConveyorData, val: any) => {
    onUpdateConveyor({ ...conveyorData, [key]: val });
  };

  // Update Node
  const updateSelectedNode = (updates: Partial<ConveyorNode>) => {
    if (!selectedNodeId) return;
    const updatedNodes = conveyorData.ConveyorNodes.map(n =>
      n.Id === selectedNodeId ? { ...n, ...updates } : n
    );
    onUpdateConveyor({ ...conveyorData, ConveyorNodes: updatedNodes });
  };

  // Delete Node
  const handleDeleteNode = (nodeId: string) => {
    const updatedNodes = conveyorData.ConveyorNodes.filter(n => n.Id !== nodeId);
    const updatedRoute = conveyorData.ConveyorRoute.filter(r => r !== nodeId);
    // Re-link slots if needed
    const fallbackNodeId = updatedNodes[0]?.Id || '0';
    const updatedSlots = conveyorData.ConveyorSlots.map(s =>
      s.TargetNodeId === nodeId ? { ...s, TargetNodeId: fallbackNodeId } : s
    );

    onUpdateConveyor({
      ...conveyorData,
      ConveyorNodes: updatedNodes,
      ConveyorRoute: updatedRoute,
      ConveyorSlots: updatedSlots,
    });
    if (selectedNodeId === nodeId) onSelectNode(null);
  };

  // Update Slot
  const updateSelectedSlot = (updates: Partial<ConveyorSlot>) => {
    if (!selectedSlotId) return;
    const updatedSlots = conveyorData.ConveyorSlots.map(s =>
      s.Id === selectedSlotId ? { ...s, ...updates } : s
    );
    onUpdateConveyor({ ...conveyorData, ConveyorSlots: updatedSlots });
  };

  // Delete Slot
  const handleDeleteSlot = (slotId: string) => {
    const updatedSlots = conveyorData.ConveyorSlots.filter(s => s.Id !== slotId);
    onUpdateConveyor({ ...conveyorData, ConveyorSlots: updatedSlots });
    if (selectedSlotId === slotId) onSelectSlot(null);
  };

  // Route reordering
  const moveRouteItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= conveyorData.ConveyorRoute.length) return;

    const newRoute = [...conveyorData.ConveyorRoute];
    const temp = newRoute[index];
    newRoute[index] = newRoute[targetIndex];
    newRoute[targetIndex] = temp;

    onUpdateConveyor({ ...conveyorData, ConveyorRoute: newRoute });
  };

  const reverseRoute = () => {
    onUpdateConveyor({
      ...conveyorData,
      ConveyorRoute: [...conveyorData.ConveyorRoute].reverse(),
    });
  };

  return (
    <div className="w-80 h-full bg-slate-900 border-l border-slate-800 flex flex-col select-none overflow-y-auto">
      {/* Header */}
      <div className="h-12 px-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-sky-400" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Conveyor Inspector
          </h2>
        </div>
        <span className="text-[10px] font-mono bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded border border-sky-500/30 font-bold">
          ID: {conveyorData.Id}
        </span>
      </div>

      <div className="p-4 space-y-5 flex-1">
        {/* SECTION 1: GLOBAL CONVEYOR SETTINGS */}
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Settings size={13} className="text-sky-400" />
              General Parameters
            </span>
          </div>

          {/* Id */}
          <div className="flex items-center justify-between text-xs">
            <label className="text-slate-400">Conveyor ID</label>
            <input
              type="number"
              value={conveyorData.Id}
              onChange={(e) => updateGlobal('Id', parseInt(e.target.value) || 1)}
              className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>

          {/* IsLoop Toggle */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-300 font-semibold block">Closed Loop Track</span>
              <span className="text-[10px] text-slate-500">Recirculate continuously</span>
            </div>
            <button
              onClick={() => updateGlobal('IsLoop', !conveyorData.IsLoop)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                conveyorData.IsLoop ? 'bg-sky-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  conveyorData.IsLoop ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* NumberOfArrows */}
          <div className="flex items-center justify-between text-xs">
            <label className="text-slate-400">Direction Arrows</label>
            <input
              type="number"
              min="1"
              max="12"
              value={conveyorData.NumberOfArrows ?? 3}
              onChange={(e) => updateGlobal('NumberOfArrows', parseInt(e.target.value) || 3)}
              className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
            />
          </div>

          {/* Board Offsets */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400">Board Offset (X, Z)</span>
              <button
                onClick={() => {
                  updateGlobal('BoardOffsetX', 0.0);
                  updateGlobal('BoardOffsetZ', 2.0);
                }}
                className="text-[10px] text-sky-400 hover:text-sky-300 underline"
              >
                Reset (0, 2)
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded px-2 py-1">
                <span className="text-[10px] font-bold text-slate-500">X:</span>
                <input
                  type="number"
                  step="0.1"
                  value={conveyorData.BoardOffsetX ?? 0.0}
                  onChange={(e) => updateGlobal('BoardOffsetX', parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-right text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded px-2 py-1">
                <span className="text-[10px] font-bold text-slate-500">Z:</span>
                <input
                  type="number"
                  step="0.1"
                  value={conveyorData.BoardOffsetZ ?? 2.0}
                  onChange={(e) => updateGlobal('BoardOffsetZ', parseFloat(e.target.value) || 0)}
                  className="w-full bg-transparent text-right text-xs text-slate-200 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SELECTED NODE PROPERTIES */}
        {selectedNode ? (
          <div className="bg-sky-950/30 rounded-xl p-3 border border-sky-500/40 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-sky-500/30">
              <span className="text-xs font-bold text-sky-300 uppercase tracking-wide flex items-center gap-1.5">
                <Navigation size={13} className="text-sky-400" />
                Node #{selectedNode.Id}
              </span>
              <button
                onClick={() => handleDeleteNode(selectedNode.Id)}
                className="p-1 text-slate-400 hover:text-rose-400 transition"
                title="Delete Node"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Position X & Z */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">X Position</label>
                <input
                  type="number"
                  step="0.05"
                  value={selectedNode.XPosition}
                  onChange={(e) => updateSelectedNode({ XPosition: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Z Position</label>
                <input
                  type="number"
                  step="0.05"
                  value={selectedNode.ZPosition}
                  onChange={(e) => updateSelectedNode({ ZPosition: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>
            </div>

            {/* Tangent Mode */}
            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-400">Tangent Mode</label>
              <select
                value={selectedNode.TangentMode}
                onChange={(e) => updateSelectedNode({ TangentMode: parseInt(e.target.value) || 0 })}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-sky-500"
              >
                <option value={0}>0 (Linear)</option>
                <option value={1}>1 (Smooth/Auto)</option>
                <option value={2}>2 (Custom)</option>
              </select>
            </div>

            {/* Y Rotation */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Y Rotation</span>
                <span className="font-mono text-sky-400">{selectedNode.YRotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={selectedNode.YRotation}
                onChange={(e) => updateSelectedNode({ YRotation: parseFloat(e.target.value) || 0 })}
                className="w-full accent-sky-500 h-1 bg-slate-800 rounded"
              />
            </div>
          </div>
        ) : null}

        {/* SECTION 3: SELECTED SLOT PROPERTIES */}
        {selectedSlot ? (
          <div className="bg-emerald-950/30 rounded-xl p-3 border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-emerald-500/30">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                <Box size={13} className="text-emerald-400" />
                Slot #{selectedSlot.Id}
              </span>
              <button
                onClick={() => handleDeleteSlot(selectedSlot.Id)}
                className="p-1 text-slate-400 hover:text-rose-400 transition"
                title="Delete Slot"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Target Node Dropdown */}
            <div className="flex items-center justify-between text-xs">
              <label className="text-slate-400">Target Node</label>
              <select
                value={selectedSlot.TargetNodeId}
                onChange={(e) => updateSelectedSlot({ TargetNodeId: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                {conveyorData.ConveyorNodes.map(n => (
                  <option key={n.Id} value={n.Id}>
                    Node {n.Id} ({n.XPosition}, {n.ZPosition})
                  </option>
                ))}
              </select>
            </div>

            {/* Position X & Z */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">X Position</label>
                <input
                  type="number"
                  step="0.05"
                  value={selectedSlot.XPosition}
                  onChange={(e) => updateSelectedSlot({ XPosition: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Z Position</label>
                <input
                  type="number"
                  step="0.05"
                  value={selectedSlot.ZPosition}
                  onChange={(e) => updateSelectedSlot({ ZPosition: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            {/* LockedTurn */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-400">
                <Lock size={12} className={selectedSlot.LockedTurn > 0 ? "text-amber-400" : ""} />
                <span>Locked Turns</span>
              </div>
              <input
                type="number"
                min="0"
                max="20"
                value={selectedSlot.LockedTurn}
                onChange={(e) => updateSelectedSlot({ LockedTurn: parseInt(e.target.value) || 0 })}
                className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-right text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            {/* UnlockedByAd */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-400">
                <Tv size={12} className={selectedSlot.UnlockedByAd ? "text-purple-400" : ""} />
                <span>Unlock by Ad</span>
              </div>
              <input
                type="checkbox"
                checked={selectedSlot.UnlockedByAd}
                onChange={(e) => updateSelectedSlot({ UnlockedByAd: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-purple-600 focus:ring-0"
              />
            </div>
          </div>
        ) : null}

        {/* SECTION 4: CONVEYOR ROUTE ORDER */}
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Repeat size={13} className="text-sky-400" />
              Route Order ({conveyorData.ConveyorRoute.length})
            </span>
            <button
              onClick={reverseRoute}
              className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
              title="Reverse Path Direction"
            >
              <RotateCw size={11} />
              <span>Reverse</span>
            </button>
          </div>

          <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
            {conveyorData.ConveyorRoute.map((nodeId, idx) => (
              <div
                key={`route-item-${nodeId}-${idx}`}
                onClick={() => onSelectNode(nodeId)}
                className={`flex items-center justify-between px-2 py-1 rounded text-xs transition cursor-pointer ${
                  selectedNodeId === nodeId
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <span className="font-mono">
                  {idx + 1}. Node {nodeId}
                </span>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => moveRouteItem(idx, 'up')}
                    disabled={idx === 0}
                    className="p-0.5 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => moveRouteItem(idx, 'down')}
                    disabled={idx === conveyorData.ConveyorRoute.length - 1}
                    className="p-0.5 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: SLOTS LIST */}
        <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
              <Box size={13} className="text-emerald-400" />
              Dock Slots ({conveyorData.ConveyorSlots.length})
            </span>
            <button
              onClick={() => {
                const nextIdx = conveyorData.ConveyorSlots.length;
                const newId = `${nextIdx}`;
                const lastSlot = conveyorData.ConveyorSlots[conveyorData.ConveyorSlots.length - 1];
                const targetNodeId = conveyorData.ConveyorNodes[Math.min(nextIdx, conveyorData.ConveyorNodes.length - 1)]?.Id || '0';
                const newSlot: ConveyorSlot = {
                  Id: newId,
                  TargetNodeId: targetNodeId,
                  YRotation: 90.0,
                  XPosition: lastSlot ? Math.round((lastSlot.XPosition + 1.3) * 100) / 100 : 0,
                  ZPosition: lastSlot ? lastSlot.ZPosition : 2.0,
                  LockedTurn: 0,
                  UnlockedByAd: false,
                };
                onUpdateConveyor({
                  ...conveyorData,
                  ConveyorSlots: [...conveyorData.ConveyorSlots, newSlot],
                });
                onSelectSlot(newId);
              }}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
              title="Add New Slot"
            >
              <Plus size={12} />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-1">
            {conveyorData.ConveyorSlots.map((slot, idx) => (
              <div
                key={`slot-item-${slot.Id}`}
                onClick={() => onSelectSlot(slot.Id)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition cursor-pointer group ${
                  selectedSlotId === slot.Id
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold">Slot {idx + 1}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    (Node {slot.TargetNodeId})
                  </span>
                </div>
                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  {slot.LockedTurn > 0 && (
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                      🔒 {slot.LockedTurn}T
                    </span>
                  )}
                  <button
                    onClick={() => handleDeleteSlot(slot.Id)}
                    className="p-1 text-slate-400 hover:text-rose-400 rounded transition opacity-60 group-hover:opacity-100"
                    title={`Delete Slot #${slot.Id}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
