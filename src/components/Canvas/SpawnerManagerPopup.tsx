import React, { useState, useEffect } from 'react';
import { LevelData, BoardNode, SpawnerNode, SpawnBox } from '../../types/level';
import { CARD_COLORS, getColor } from '../../constants/colors';
import { BOX_TYPES, getBoxType } from '../../constants/boxTypes';
import { CardStackEditor } from '../Inspector/CardStackEditor';
import { 
  PackagePlus, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Copy, 
  RotateCw, 
  Sliders, 
  Layers, 
  Lock, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Maximize2, 
  Minimize2, 
  ArrowRight,
  Repeat,
  Check,
  Compass,
  Box
} from 'lucide-react';

interface SpawnerManagerPopupProps {
  levelData: LevelData;
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  onUpdateSpawnerNode: (spawner: SpawnerNode) => void;
  onUpdateBoardNode: (board: BoardNode) => void;
  onDeleteSpawnerNode?: (id: string) => void;
}

export const SpawnerManagerPopup: React.FC<SpawnerManagerPopupProps> = ({
  levelData,
  selectedNodeId,
  onSelectNode,
  onUpdateSpawnerNode,
  onUpdateBoardNode,
  onDeleteSpawnerNode,
}) => {
  const spawners = levelData.SpawnerNodes || [];
  if (spawners.length === 0) return null;

  // Identify active spawner: currently selected node if it is a spawner, otherwise first spawner
  const selectedSpawnerFromId = spawners.find(s => s.Id === selectedNodeId);
  const [activeSpawnerId, setActiveSpawnerId] = useState<string>(
    selectedSpawnerFromId?.Id || spawners[0].Id
  );

  // Sync active spawner when selectedNodeId changes to a spawner
  useEffect(() => {
    if (selectedSpawnerFromId) {
      setActiveSpawnerId(selectedSpawnerFromId.Id);
      setIsMinimized(false);
      setIsClosed(false);
    }
  }, [selectedNodeId, selectedSpawnerFromId]);

  const activeSpawner = spawners.find(s => s.Id === activeSpawnerId) || spawners[0];
  const activeBoardNode = levelData.BoardNodes.find(n => n.Id === activeSpawner.Id);

  // Selection inside spawner queue
  const [selectedBoxIdx, setSelectedBoxIdx] = useState<number>(0);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  // Bound selectedBoxIdx
  useEffect(() => {
    if (selectedBoxIdx >= activeSpawner.SpawnBoxes.length) {
      setSelectedBoxIdx(Math.max(0, activeSpawner.SpawnBoxes.length - 1));
    }
  }, [activeSpawner.SpawnBoxes.length, selectedBoxIdx]);

  if (isClosed && !selectedSpawnerFromId) {
    // Show compact floating pill to reopen anytime
    return (
      <div className="absolute top-4 left-4 z-30">
        <button
          onClick={() => {
            setIsClosed(false);
            setIsMinimized(false);
            onSelectNode(activeSpawner.Id);
          }}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/95 hover:bg-amber-950/80 text-amber-300 border border-amber-500/50 rounded-xl text-xs font-bold shadow-2xl backdrop-blur-md transition active:scale-95 group"
          title="Open Spawner Manager"
        >
          <Repeat size={14} className="text-amber-400 group-hover:rotate-180 transition-transform duration-500" />
          <span>Spawner: {activeSpawner.Id} ({activeSpawner.SpawnBoxes.length} boxes)</span>
        </button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-900/95 border border-amber-500/50 rounded-2xl shadow-2xl backdrop-blur-md">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Repeat size={13} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Spawner</span>
            <span className="text-xs font-mono font-bold text-white">
              {activeSpawner.Id} ({activeSpawner.SpawnBoxes.length} boxes)
            </span>
          </div>
          <button
            onClick={() => setIsMinimized(false)}
            className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition ml-2"
            title="Expand Spawner Manager"
          >
            <Maximize2 size={13} />
          </button>
          <button
            onClick={() => setIsClosed(true)}
            className="p-1 hover:bg-rose-900/60 rounded-lg text-slate-400 hover:text-rose-300 transition"
            title="Close"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    );
  }

  // Active Box being edited
  const currentBox: SpawnBox | undefined = activeSpawner.SpawnBoxes[selectedBoxIdx];
  const boxType = currentBox ? getBoxType(currentBox.TypeId, Boolean(currentBox.IsPaperBox)) : BOX_TYPES[1];

  // Helper updates
  const updateSpawnerBoxes = (newBoxes: SpawnBox[]) => {
    onUpdateSpawnerNode({
      ...activeSpawner,
      SpawnBoxes: newBoxes,
    });
  };

  const handleAddBox = () => {
    const nextColor = (activeSpawner.SpawnBoxes.length + 1) % 6;
    const defaultCards = nextColor === 0 ? [0, 0, 0, 1, 1, 1] : [nextColor, nextColor, nextColor, (nextColor + 1) % 6, (nextColor + 1) % 6, (nextColor + 1) % 6];
    const newBox: SpawnBox = {
      Id: "",
      TypeId: 1, // Type 1 (1x2 / 6 cards) standard
      BoxColor: nextColor,
      BlockedNodes: [],
      InitCards: defaultCards,
      IsHidden: false,
      LockedTurn: 0,
      IsPaperBox: false,
      IsRainbowBox: false,
      IsCardsHidden: false,
    };
    const updated = [...activeSpawner.SpawnBoxes, newBox];
    updateSpawnerBoxes(updated);
    setSelectedBoxIdx(updated.length - 1);
  };

  const handleDuplicateBox = (idx: number) => {
    const target = activeSpawner.SpawnBoxes[idx];
    if (!target) return;
    const copy: SpawnBox = {
      ...target,
      Id: "",
      InitCards: [...target.InitCards],
      BlockedNodes: [],
    };
    const updated = [...activeSpawner.SpawnBoxes];
    updated.splice(idx + 1, 0, copy);
    updateSpawnerBoxes(updated);
    setSelectedBoxIdx(idx + 1);
  };

  const handleRemoveBox = (idx: number) => {
    if (activeSpawner.SpawnBoxes.length <= 1) {
      alert("Spawner must contain at least 1 box. To remove the spawner entirely, delete the spawner node.");
      return;
    }
    const updated = activeSpawner.SpawnBoxes.filter((_, i) => i !== idx);
    updateSpawnerBoxes(updated);
    setSelectedBoxIdx(Math.max(0, Math.min(idx, updated.length - 1)));
  };

  const handleMoveBox = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= activeSpawner.SpawnBoxes.length) return;
    const updated = [...activeSpawner.SpawnBoxes];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    updateSpawnerBoxes(updated);
    setSelectedBoxIdx(toIdx);
  };

  const handleUpdateCurrentBox = (patch: Partial<SpawnBox>) => {
    if (!currentBox) return;
    const updated = [...activeSpawner.SpawnBoxes];
    updated[selectedBoxIdx] = {
      ...currentBox,
      ...patch,
    };
    updateSpawnerBoxes(updated);
  };


  // Rotation helpers
  const currentRotation = activeBoardNode?.YRotation ?? activeBoardNode?.ZRotation ?? 180;
  const handleRotateGate = (angle: number) => {
    if (!activeBoardNode) return;
    onUpdateBoardNode({
      ...activeBoardNode,
      YRotation: angle,
      ZRotation: angle,
    });
  };

  return (
    <div className="absolute top-4 left-4 z-30 w-96 max-h-[85vh] bg-slate-900/95 border border-amber-500/40 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-fadeIn">
      {/* 1. Header with Spawner Info & Rotation */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
            <Repeat size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Spawner Manager
              </span>
              {spawners.length > 1 && (
                <select
                  value={activeSpawnerId}
                  onChange={(e) => {
                    setActiveSpawnerId(e.target.value);
                    onSelectNode(e.target.value);
                    setSelectedBoxIdx(0);
                  }}
                  className="bg-slate-800 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30 cursor-pointer outline-none"
                >
                  {spawners.map(s => (
                    <option key={s.Id} value={s.Id}>
                      {s.Id} ({s.SpawnBoxes.length}b)
                    </option>
                  ))}
                </select>
              )}
            </div>
            <h3 className="text-xs font-mono font-bold text-slate-100 flex items-center gap-2">
              <span>{activeSpawner.Id}</span>
              {activeBoardNode && (
                <span className="text-[10px] font-normal text-slate-400">
                  L{activeBoardNode.LayerId ?? 0} ({activeBoardNode.XPosition.toFixed(1)}, {activeBoardNode.ZPosition.toFixed(1)})
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
            title="Minimize"
          >
            <Minimize2 size={13} />
          </button>
          <button
            onClick={() => setIsClosed(true)}
            className="p-1.5 hover:bg-rose-900/50 rounded-lg text-slate-400 hover:text-rose-300 transition"
            title="Close"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* 2. Gate Direction Toolbar */}
      <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/80 flex items-center justify-between text-xs shrink-0">
        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
          <Compass size={12} className="text-amber-400" />
          Gate Face: <strong className="text-amber-300">{currentRotation}°</strong>
        </span>
        <div className="flex items-center gap-1">
          {[
            { angle: 180, label: '← Left' },
            { angle: 0, label: 'Right →' },
            { angle: 90, label: '↓ Down' },
            { angle: 270, label: '↑ Up' },
          ].map(r => (
            <button
              key={r.angle}
              onClick={() => handleRotateGate(r.angle)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                currentRotation === r.angle
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content: Queue + Full Box Editor */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* 3. Spawner Boxes Queue (Sequence of Boxes) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Box size={13} className="text-amber-400" />
              Spawn Sequence ({activeSpawner.SpawnBoxes.length} Boxes)
            </span>
            <button
              onClick={handleAddBox}
              className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg text-[11px] font-bold transition active:scale-95"
            >
              <Plus size={12} />
              <span>Add Box</span>
            </button>
          </div>

          {/* Queue cards list */}
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {activeSpawner.SpawnBoxes.map((sb, idx) => {
              const colorDef = getColor(sb.BoxColor);
              const bType = getBoxType(sb.TypeId, Boolean(sb.IsPaperBox));
              const isSelected = selectedBoxIdx === idx;
              const isAtGate = idx === 0;

              return (
                <div
                  key={`queue-box-${idx}`}
                  onClick={() => setSelectedBoxIdx(idx)}
                  className={`p-2 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                      : 'bg-slate-850/70 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Index badge */}
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isAtGate
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isAtGate ? '1 [GATE]' : `#${idx + 1}`}
                    </span>

                    {/* Color Swatch */}
                    <div
                      className="w-4 h-4 rounded-md border border-white/20 shrink-0 shadow-sm flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ backgroundColor: colorDef.hex }}
                    >
                      {sb.IsPaperBox ? 'T' : ''}
                    </div>

                    {/* Box description */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-200 truncate flex items-center gap-1">
                        <span>{colorDef.name} ({bType.name})</span>
                        {(sb.LockedTurn ?? 0) > 0 && (
                          <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-1 rounded">
                            T:{sb.LockedTurn}
                          </span>
                        )}
                      </span>
                      {/* Mini card dots */}
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {sb.InitCards.map((c, ci) => (
                          <span
                            key={ci}
                            className="w-2 h-2 rounded-full border border-black/30 shrink-0"
                            style={{ backgroundColor: getColor(c).hex }}
                          />
                        ))}
                        {sb.InitCards.length === 0 && (
                          <span className="text-[9px] text-slate-500 italic">Empty</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Reorder, Duplicate, Delete */}
                  <div className="flex items-center gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleMoveBox(idx, idx - 1)}
                      disabled={idx === 0}
                      className="p-1 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-400 hover:text-white transition"
                      title="Move Earlier in Queue"
                    >
                      <ChevronLeft size={13} />
                    </button>
                    <button
                      onClick={() => handleMoveBox(idx, idx + 1)}
                      disabled={idx === activeSpawner.SpawnBoxes.length - 1}
                      className="p-1 hover:bg-slate-700 disabled:opacity-30 rounded text-slate-400 hover:text-white transition"
                      title="Move Later in Queue"
                    >
                      <ChevronRight size={13} />
                    </button>
                    <button
                      onClick={() => handleDuplicateBox(idx)}
                      className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-amber-300 transition"
                      title="Duplicate Box"
                    >
                      <Copy size={12} />
                    </button>
                    <button
                      onClick={() => handleRemoveBox(idx)}
                      className="p-1 hover:bg-rose-900/60 rounded text-slate-400 hover:text-rose-400 transition"
                      title="Delete Box"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Full Box Editor for Selected Box in Queue */}
        {currentBox && (
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sliders size={13} />
                Editing Box #{selectedBoxIdx + 1} {selectedBoxIdx === 0 ? '(At Gate)' : ''}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {currentBox.InitCards.length}/{boxType.capacity} cards
              </span>
            </div>

            {/* A. Box Color Picker */}
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Box Color
              </label>
              <div className="grid grid-cols-8 gap-1">
                {CARD_COLORS.map(c => {
                  const isCur = currentBox.BoxColor === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleUpdateCurrentBox({ BoxColor: c.id })}
                      className={`h-7 rounded-lg flex items-center justify-center transition border ${
                        isCur
                          ? 'ring-2 ring-white border-white scale-105 shadow-md'
                          : 'border-white/10 hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isCur && <Check size={12} className="text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* B. Box Type Selector */}
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Box Type & Dimensions
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.values(BOX_TYPES).slice(0, 3).map(bt => {
                  const isCur = currentBox.TypeId === bt.id;
                  return (
                    <button
                      key={bt.id}
                      onClick={() => handleUpdateCurrentBox({ TypeId: bt.id })}
                      className={`px-2 py-1.5 rounded-lg border text-left transition ${
                        isCur
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-[11px] font-bold">{bt.name}</div>
                      <div className="text-[9px] opacity-70">{bt.capacity} slots</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* C. Interactive Card Stack Editor */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <CardStackEditor
                cards={currentBox.InitCards}
                boxColor={currentBox.BoxColor}
                boxType={boxType}
                onChange={(newCards) => handleUpdateCurrentBox({ InitCards: newCards })}
              />
            </div>

            {/* D. Locked Turn & Attributes */}
            <div className="grid grid-cols-2 gap-2">
              {/* Turn Lock */}
              <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Lock Turns
                </label>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map(turns => (
                    <button
                      key={turns}
                      onClick={() => handleUpdateCurrentBox({ LockedTurn: turns })}
                      className={`flex-1 py-1 rounded text-[10px] font-mono font-bold transition ${
                        (currentBox.LockedTurn || 0) === turns
                          ? 'bg-indigo-500 text-white shadow-sm'
                          : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {turns === 0 ? 'Off' : turns}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Flags */}
              <div className="bg-slate-950/40 p-2 rounded-xl border border-slate-800 flex flex-col justify-center gap-1.5">
                <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(currentBox.IsPaperBox)}
                    onChange={(e) => handleUpdateCurrentBox({ IsPaperBox: e.target.checked })}
                    className="rounded accent-amber-500"
                  />
                  <span>Paper Tray</span>
                </label>
                <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(currentBox.IsRainbowBox)}
                    onChange={(e) => handleUpdateCurrentBox({ IsRainbowBox: e.target.checked })}
                    className="rounded accent-purple-500"
                  />
                  <span>Mystery Box</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Status */}
      <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-time Sync</span>
        </span>
        <button
          onClick={() => onSelectNode(activeSpawner.Id)}
          className="text-amber-400 hover:text-amber-300 font-bold hover:underline"
        >
          Focus on Canvas
        </button>
      </div>
    </div>
  );
};
