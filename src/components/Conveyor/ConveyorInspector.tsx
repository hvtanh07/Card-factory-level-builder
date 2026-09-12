import React from 'react';
import { ConveyorData, ConveyorNode, ConveyorSlot } from '../../types/conveyor';
import { 
  Lock, 
  Tv, 
  Trash2, 
  Plus, 
  RotateCw, 
  Sliders, 
  MapPin, 
  Workflow, 
  Route, 
  ChevronUp, 
  ChevronDown,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { DEFAULT_CONVEYOR_DATA } from '../../constants/defaultConveyor';

interface ConveyorInspectorProps {
  conveyorData: ConveyorData;
  selectedId: string | null;
  selectedType: 'node' | 'slot' | null;
  onSelectItem: (id: string | null, type: 'node' | 'slot' | null) => void;
  onUpdateConveyorData: (data: ConveyorData) => void;
}

export const ConveyorInspector: React.FC<ConveyorInspectorProps> = ({
  conveyorData,
  selectedId,
  selectedType,
  onSelectItem,
  onUpdateConveyorData,
}) => {
  const selectedNode = selectedType === 'node' && selectedId
    ? conveyorData.ConveyorNodes.find(n => n.Id === selectedId)
    : null;

  const selectedSlot = selectedType === 'slot' && selectedId
    ? conveyorData.ConveyorSlots.find(s => s.Id === selectedId)
    : null;

  // Add Node handler
  const handleAddNode = () => {
    const existingIds = conveyorData.ConveyorNodes.map(n => parseInt(n.Id)).filter(n => !isNaN(n));
    const nextId = existingIds.length > 0 ? (Math.max(...existingIds) + 1).toString() : `${conveyorData.ConveyorNodes.length}`;
    
    // Position new node at the end of the existing track
    const lastNode = conveyorData.ConveyorNodes[conveyorData.ConveyorNodes.length - 1];
    const newX = lastNode ? lastNode.XPosition + 1.2 : 0;
    const newZ = lastNode ? lastNode.ZPosition : 0;

    const newNode: ConveyorNode = {
      Id: nextId,
      XPosition: Number(newX.toFixed(2)),
      ZPosition: Number(newZ.toFixed(2)),
      TangentMode: 1,
      YRotation: 90.0,
    };

    const updatedNodes = [...conveyorData.ConveyorNodes, newNode];
    const updatedRoute = [...conveyorData.ConveyorRoute, nextId];

    onUpdateConveyorData({
      ...conveyorData,
      ConveyorNodes: updatedNodes,
      ConveyorRoute: updatedRoute,
    });
    onSelectItem(nextId, 'node');
  };

  // Add Slot handler
  const handleAddSlot = () => {
    const existingIds = conveyorData.ConveyorSlots.map(s => parseInt(s.Id)).filter(s => !isNaN(s));
    const nextId = existingIds.length > 0 ? (Math.max(...existingIds) + 1).toString() : `${conveyorData.ConveyorSlots.length}`;

    const lastSlot = conveyorData.ConveyorSlots[conveyorData.ConveyorSlots.length - 1];
    const newX = lastSlot ? lastSlot.XPosition + 1.3 : 0;
    const newZ = lastSlot ? lastSlot.ZPosition : 2.0;

    const newSlot: ConveyorSlot = {
      Id: nextId,
      TargetNodeId: conveyorData.ConveyorNodes[0]?.Id || '0',
      YRotation: 90.0,
      XPosition: Number(newX.toFixed(2)),
      ZPosition: Number(newZ.toFixed(2)),
      LockedTurn: 0,
      UnlockedByAd: false,
    };

    onUpdateConveyorData({
      ...conveyorData,
      ConveyorSlots: [...conveyorData.ConveyorSlots, newSlot],
    });
    onSelectItem(nextId, 'slot');
  };

  // Delete Node
  const handleDeleteNode = (id: string) => {
    const updatedNodes = conveyorData.ConveyorNodes.filter(n => n.Id !== id);
    const updatedRoute = conveyorData.ConveyorRoute.filter(r => r !== id);
    onUpdateConveyorData({
      ...conveyorData,
      ConveyorNodes: updatedNodes,
      ConveyorRoute: updatedRoute,
    });
    if (selectedId === id) onSelectItem(null, null);
  };

  // Delete Slot
  const handleDeleteSlot = (id: string) => {
    const updatedSlots = conveyorData.ConveyorSlots.filter(s => s.Id !== id);
    onUpdateConveyorData({
      ...conveyorData,
      ConveyorSlots: updatedSlots,
    });
    if (selectedId === id) onSelectItem(null, null);
  };

  // Update Slot
  const handleUpdateSlot = (updated: ConveyorSlot) => {
    const updatedSlots = conveyorData.ConveyorSlots.map(s => s.Id === updated.Id ? updated : s);
    onUpdateConveyorData({
      ...conveyorData,
      ConveyorSlots: updatedSlots,
    });
  };

  // Update Node
  const handleUpdateNode = (updated: ConveyorNode) => {
    const updatedNodes = conveyorData.ConveyorNodes.map(n => n.Id === updated.Id ? updated : n);
    onUpdateConveyorData({
      ...conveyorData,
      ConveyorNodes: updatedNodes,
    });
  };

  return (
    <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-y-auto select-none font-sans text-xs text-slate-300 custom-scrollbar">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <Workflow size={16} className="text-sky-400" />
          <h2 className="font-bold text-slate-100 uppercase tracking-wide text-xs">
            Conveyor Inspector
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-700/50 font-bold">
          ID: {conveyorData.Id}
        </span>
      </div>

      <div className="p-4 space-y-5">
        {/* SECTION 1: SELECTED ITEM EDITORS */}
        {selectedSlot ? (
          /* Slot Property Editor */
          <div className="space-y-4 p-3.5 rounded-xl bg-slate-950/80 border border-sky-500/30 shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-sky-300">
                <MapPin size={14} />
                <span>Docking Slot {selectedSlot.Id}</span>
              </div>
              <button
                onClick={() => handleDeleteSlot(selectedSlot.Id)}
                className="p-1 hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 rounded transition"
                title="Delete Slot"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Position Inputs */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Position (Unity)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-mono block">X Position</label>
                  <input
                    type="number"
                    step="0.05"
                    value={selectedSlot.XPosition}
                    onChange={(e) => handleUpdateSlot({ ...selectedSlot, XPosition: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-mono block">Z Position</label>
                  <input
                    type="number"
                    step="0.05"
                    value={selectedSlot.ZPosition}
                    onChange={(e) => handleUpdateSlot({ ...selectedSlot, ZPosition: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Rotation */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Y Rotation (Angle)</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="15"
                  value={selectedSlot.YRotation}
                  onChange={(e) => handleUpdateSlot({ ...selectedSlot, YRotation: parseFloat(e.target.value) || 0 })}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
                <button
                  onClick={() => handleUpdateSlot({ ...selectedSlot, YRotation: (selectedSlot.YRotation + 90) % 360 })}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
                  title="Rotate 90°"
                >
                  <RotateCw size={13} />
                </button>
              </div>
            </div>

            {/* Target Conveyor Node */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Target Conveyor Node
              </label>
              <select
                value={selectedSlot.TargetNodeId}
                onChange={(e) => handleUpdateSlot({ ...selectedSlot, TargetNodeId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
              >
                {conveyorData.ConveyorNodes.map(n => (
                  <option key={`opt-node-${n.Id}`} value={n.Id}>
                    Node {n.Id} (X: {n.XPosition.toFixed(1)}, Z: {n.ZPosition.toFixed(1)})
                  </option>
                ))}
              </select>
            </div>

            {/* UNLOCK / LOCK MECHANICS */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Lock size={12} />
                Slot Lock Rules
              </span>

              {/* 1. Move Lock (LockedTurn) */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <span>Move Lock</span>
                    {selectedSlot.LockedTurn > 0 && (
                      <span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-600/50 text-[10px] font-mono font-bold">
                        {selectedSlot.LockedTurn} Boxes
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    LockedTurn: {selectedSlot.LockedTurn}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={selectedSlot.LockedTurn}
                    onChange={(e) => {
                      const val = Math.max(0, parseInt(e.target.value) || 0);
                      handleUpdateSlot({ ...selectedSlot, LockedTurn: val, UnlockedByAd: val > 0 ? false : selectedSlot.UnlockedByAd });
                    }}
                    className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-amber-500 font-bold"
                  />
                  <div className="flex gap-1 flex-1">
                    {[0, 2, 3, 4].map(val => (
                      <button
                        key={`preset-turn-${val}`}
                        onClick={() => handleUpdateSlot({ ...selectedSlot, LockedTurn: val, UnlockedByAd: val > 0 ? false : selectedSlot.UnlockedByAd })}
                        className={`flex-1 py-1 rounded text-[10px] font-bold transition border ${
                          selectedSlot.LockedTurn === val
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {val === 0 ? 'Free' : `${val}`}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-tight">
                  {selectedSlot.LockedTurn > 0
                    ? `Player must send up ${selectedSlot.LockedTurn} box(es) before this slot unlocks.`
                    : 'Slot is immediately unlocked at start of level.'}
                </p>
              </div>

              {/* 2. Ad Lock (UnlockedByAd) */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Tv size={13} className={selectedSlot.UnlockedByAd ? "text-amber-400" : "text-slate-500"} />
                    <span>Unlocked by Ad</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={selectedSlot.UnlockedByAd}
                    onChange={(e) => {
                      const isAd = e.target.checked;
                      handleUpdateSlot({
                        ...selectedSlot,
                        UnlockedByAd: isAd,
                        LockedTurn: isAd ? 0 : selectedSlot.LockedTurn,
                      });
                    }}
                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
                  />
                </label>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Slot is locked until the player watches a rewarded video ad in game.
                </p>
              </div>
            </div>
          </div>
        ) : selectedNode ? (
          /* Node Property Editor */
          <div className="space-y-4 p-3.5 rounded-xl bg-slate-950/80 border border-sky-500/30 shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-sky-300">
                <Route size={14} />
                <span>Waypoint Node {selectedNode.Id}</span>
              </div>
              <button
                onClick={() => handleDeleteNode(selectedNode.Id)}
                className="p-1 hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 rounded transition"
                title="Delete Node"
              >
                <Trash2 size={13} />
              </button>
            </div>

            {/* Position Inputs */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Position (Unity)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-mono block">X Position</label>
                  <input
                    type="number"
                    step="0.1"
                    value={selectedNode.XPosition}
                    onChange={(e) => handleUpdateNode({ ...selectedNode, XPosition: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-mono block">Z Position</label>
                  <input
                    type="number"
                    step="0.1"
                    value={selectedNode.ZPosition}
                    onChange={(e) => handleUpdateNode({ ...selectedNode, ZPosition: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Rotation & Tangent */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 font-mono block">Y Rotation</label>
                <input
                  type="number"
                  step="15"
                  value={selectedNode.YRotation}
                  onChange={(e) => handleUpdateNode({ ...selectedNode, YRotation: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-mono block">Tangent Mode</label>
                <input
                  type="number"
                  value={selectedNode.TangentMode}
                  onChange={(e) => handleUpdateNode({ ...selectedNode, TangentMode: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Empty Selection Hint */
          <div className="p-3 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center space-y-1 text-slate-500">
            <p className="font-semibold text-slate-400">No Item Selected</p>
            <p className="text-[11px]">Click a Conveyor Node or Docking Slot on the canvas to inspect & edit.</p>
          </div>
        )}

        {/* SECTION 2: QUICK ACTIONS & ADD TOOLS */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Add Elements
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddNode}
              className="py-2 px-3 rounded-xl bg-sky-950/70 hover:bg-sky-900 text-sky-200 border border-sky-700/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
            >
              <Plus size={14} className="text-sky-400" />
              <span>Add Node</span>
            </button>
            <button
              onClick={handleAddSlot}
              className="py-2 px-3 rounded-xl bg-indigo-950/70 hover:bg-indigo-900 text-indigo-200 border border-indigo-700/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
            >
              <Plus size={14} className="text-indigo-400" />
              <span>Add Slot</span>
            </button>
          </div>
        </div>

        {/* SECTION 3: GLOBAL CONVEYOR SETTINGS */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders size={13} className="text-sky-400" />
            Global Conveyor Parameters
          </span>

          {/* IsLoop toggle */}
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:bg-slate-950 transition">
            <div>
              <span className="font-semibold text-slate-200 block">IsLoop Track</span>
              <span className="text-[10px] text-slate-500">Continuous loop vs Portal endpoints</span>
            </div>
            <input
              type="checkbox"
              checked={conveyorData.IsLoop}
              onChange={(e) => onUpdateConveyorData({ ...conveyorData, IsLoop: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0"
            />
          </label>

          {/* Number of Arrows */}
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">NumberOfArrows</span>
              <span className="font-mono font-bold text-sky-400">{conveyorData.NumberOfArrows}</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={conveyorData.NumberOfArrows}
              onChange={(e) => onUpdateConveyorData({ ...conveyorData, NumberOfArrows: parseInt(e.target.value) || 3 })}
              className="w-full accent-sky-500 cursor-pointer"
            />
          </div>

          {/* Board Offsets */}
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="font-semibold text-slate-200 block text-[11px]">Board Offsets</span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 font-mono block">BoardOffsetX</label>
                <input
                  type="number"
                  step="0.1"
                  value={conveyorData.BoardOffsetX}
                  onChange={(e) => onUpdateConveyorData({ ...conveyorData, BoardOffsetX: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-mono block">BoardOffsetZ</label>
                <input
                  type="number"
                  step="0.1"
                  value={conveyorData.BoardOffsetZ}
                  onChange={(e) => onUpdateConveyorData({ ...conveyorData, BoardOffsetZ: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: SLOTS & ROUTE SUMMARY LIST */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Conveyor Slots ({conveyorData.ConveyorSlots.length})
            </span>
          </div>

          <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
            {conveyorData.ConveyorSlots.map(slot => {
              const isSelected = selectedType === 'slot' && selectedId === slot.Id;
              return (
                <div
                  key={`slot-item-${slot.Id}`}
                  onClick={() => onSelectItem(slot.Id, 'slot')}
                  className={`p-2 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-500/80 text-sky-200'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">Slot {slot.Id}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({slot.XPosition.toFixed(2)}, {slot.ZPosition.toFixed(2)})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {slot.UnlockedByAd ? (
                      <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-600/50 text-[9px] text-amber-300 font-bold">
                        📺 Ad
                      </span>
                    ) : slot.LockedTurn > 0 ? (
                      <span className="px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-600/50 text-[9px] text-rose-300 font-bold">
                        🔒 Move {slot.LockedTurn}
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-bold">✓ Open</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: DEFAULT PRESET RESET */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={() => onUpdateConveyorData(DEFAULT_CONVEYOR_DATA)}
            className="w-full py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition"
          >
            Reset to Default Demo Conveyor
          </button>
        </div>
      </div>
    </div>
  );
};
