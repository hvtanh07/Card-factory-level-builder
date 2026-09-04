import React from 'react';
import { BoardNode, BoxNode, SpawnerNode, SpawnBox, LevelData } from '../../types/level';
import { BOX_TYPE_OPTIONS, getBoxType } from '../../constants/boxTypes';
import { COLOR_LIST, getColor } from '../../constants/colors';
import { CardStackEditor } from './CardStackEditor';
import { calculateAutoBlockers, getBlockedByMap } from '../../utils/autoBlocker';
import { 
  Sliders, 
  RotateCw, 
  Layers, 
  Grid, 
  Copy, 
  Trash2, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Link, 
  Check, 
  Plus,
  Compass,
  Lock,
  HelpCircle,
  PackagePlus,
  Sparkles
} from 'lucide-react';

interface NodeInspectorProps {
  levelData: LevelData;
  selectedNodeId: string | null;
  onUpdateBoardNode: (node: BoardNode) => void;
  onUpdateBoxNode: (box: BoxNode) => void;
  onUpdateSpawnerNode?: (spawner: SpawnerNode) => void;
  onDuplicateNode: (id: string) => void;
  onDeleteNode: (id: string) => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  levelData,
  selectedNodeId,
  onUpdateBoardNode,
  onUpdateBoxNode,
  onUpdateSpawnerNode,
  onDuplicateNode,
  onDeleteNode,
}) => {
  const boardNode = levelData.BoardNodes.find(n => n.Id === selectedNodeId);
  const boxNode = levelData.BoxNodes.find(b => b.Id === selectedNodeId);
  const spawnerNode = (levelData.SpawnerNodes || []).find(s => s.Id === selectedNodeId);

  const blockedByMap = getBlockedByMap(levelData.BoxNodes);
  const blockersOfThisNode = selectedNodeId ? blockedByMap.get(selectedNodeId) || [] : [];

  if (!boardNode || (!boxNode && !spawnerNode)) {
    return (
      <div className="w-80 h-full bg-slate-900/90 backdrop-blur-md border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-500">
        <Sliders size={36} className="mb-3 opacity-40 text-sky-400" />
        <h3 className="text-sm font-bold text-slate-300 mb-1">No Node Selected</h3>
        <p className="text-xs max-w-xs text-slate-500">
          Click any box or spawner on the canvas to inspect and edit its properties.
        </p>
      </div>
    );
  }

  // Active box or Spawner primary box
  const isSpawner = !!spawnerNode;
  const currentBox = boxNode || (spawnerNode?.SpawnBoxes[0] as BoxNode) || {
    Id: boardNode.Id,
    TypeId: 3,
    BoxColor: 0,
    BlockedNodes: spawnerNode?.BlockedNodes || [],
    InitCards: [],
    IsHidden: false,
    LockedTurn: 0,
    IsCardsHidden: false,
  };

  const boxType = getBoxType(currentBox.TypeId);

  const handleQuickAngle = (angle: number) => {
    onUpdateBoardNode({
      ...boardNode,
      ZRotation: angle,
    });
  };

  const handleToggleBlockedNode = (targetId: string) => {
    const current = (boxNode ? boxNode.BlockedNodes : spawnerNode?.BlockedNodes) || [];
    const updated = current.includes(targetId)
      ? current.filter(id => id !== targetId)
      : [...current, targetId];
    
    if (boxNode) {
      onUpdateBoxNode({
        ...boxNode,
        BlockedNodes: updated,
      });
    } else if (spawnerNode && onUpdateSpawnerNode) {
      onUpdateSpawnerNode({
        ...spawnerNode,
        BlockedNodes: updated,
      });
    }
  };

  // Add spawn box to spawner queue
  const handleAddSpawnBox = () => {
    if (!spawnerNode || !onUpdateSpawnerNode) return;
    const newBox: SpawnBox = {
      Id: "",
      TypeId: 3,
      BoxColor: (spawnerNode.SpawnBoxes.length + 1) % 6,
      BlockedNodes: [],
      InitCards: [0, 0, 1, 1],
      IsHidden: false,
      LockedTurn: 0,
      IsCardsHidden: false,
    };
    onUpdateSpawnerNode({
      ...spawnerNode,
      SpawnBoxes: [...spawnerNode.SpawnBoxes, newBox],
    });
  };

  const handleRemoveSpawnBox = (idx: number) => {
    if (!spawnerNode || !onUpdateSpawnerNode) return;
    const updated = [...spawnerNode.SpawnBoxes];
    updated.splice(idx, 1);
    onUpdateSpawnerNode({
      ...spawnerNode,
      SpawnBoxes: updated,
    });
  };

  return (
    <div className="w-84 h-full bg-slate-900/95 backdrop-blur-md border-l border-slate-800 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
            style={{ backgroundColor: getColor(currentBox.BoxColor).hex }}
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                Layer {boardNode.TileMapId}
              </span>
              {isSpawner && (
                <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1 rounded font-bold uppercase">
                  Spawner Portal
                </span>
              )}
            </div>
            <h2 className="text-sm font-bold text-slate-100 font-mono">
              {boardNode.Id}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDuplicateNode(boardNode.Id)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-sky-300 transition"
            title="Duplicate Node"
          >
            <Copy size={15} />
          </button>
          <button
            onClick={() => onDeleteNode(boardNode.Id)}
            className="p-1.5 hover:bg-rose-950/60 rounded-lg text-slate-400 hover:text-rose-400 transition"
            title="Delete Node"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-5 flex-1">
        
        {/* Section 1: Box Appearance & Type */}
        <div className="space-y-3 bg-slate-850/50 p-3 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers size={13} className="text-sky-400" />
            Box Appearance & Type
          </label>

          {/* Box Type Selector */}
          <div>
            <span className="text-[11px] text-slate-400 mb-1 block">Box Type</span>
            <select
              value={currentBox.TypeId}
              onChange={(e) => {
                const newTypeId = Number(e.target.value);
                if (boxNode) onUpdateBoxNode({ ...boxNode, TypeId: newTypeId });
                else if (spawnerNode && onUpdateSpawnerNode && spawnerNode.SpawnBoxes[0]) {
                  const updatedBoxes = [...spawnerNode.SpawnBoxes];
                  updatedBoxes[0] = { ...updatedBoxes[0], TypeId: newTypeId };
                  onUpdateSpawnerNode({ ...spawnerNode, SpawnBoxes: updatedBoxes });
                }
              }}
              className="w-full bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500 font-medium"
            >
              {BOX_TYPE_OPTIONS.map(bt => (
                <option key={`bt-${bt.id}`} value={bt.id}>
                  Type {bt.id}: {bt.name} ({bt.capacity} max)
                </option>
              ))}
            </select>
          </div>

          {/* Box Color Selector (8 Colors Grid) */}
          <div>
            <span className="text-[11px] text-slate-400 mb-1.5 block">Box Color Theme</span>
            <div className="grid grid-cols-4 gap-1.5">
              {COLOR_LIST.map(c => {
                const isSelectedColor = currentBox.BoxColor === c.id;
                return (
                  <button
                    key={`boxcol-${c.id}`}
                    onClick={() => {
                      if (boxNode) onUpdateBoxNode({ ...boxNode, BoxColor: c.id });
                      else if (spawnerNode && onUpdateSpawnerNode && spawnerNode.SpawnBoxes[0]) {
                        const updatedBoxes = [...spawnerNode.SpawnBoxes];
                        updatedBoxes[0] = { ...updatedBoxes[0], BoxColor: c.id };
                        onUpdateSpawnerNode({ ...spawnerNode, SpawnBoxes: updatedBoxes });
                      }
                    }}
                    className={`h-7 rounded-lg border flex items-center justify-center transition active:scale-95 text-[10px] font-bold text-white shadow-sm ${
                      isSelectedColor ? 'ring-2 ring-sky-400 border-white shadow-lg scale-105' : 'border-transparent opacity-85 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={`${c.id}: ${c.name}`}
                  >
                    {isSelectedColor ? <Check size={13} className="text-white drop-shadow" /> : c.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extra Flags: LockedTurn, IsPaperBox, IsRainbowBox */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 mb-1 block">Locked Turn</span>
              <input
                type="number"
                min="0"
                value={currentBox.LockedTurn || 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (boxNode) onUpdateBoxNode({ ...boxNode, LockedTurn: val });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 font-mono focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 mb-1 block">Paper Box (Tray)</span>
              <button
                onClick={() => {
                  if (boxNode) onUpdateBoxNode({ ...boxNode, IsPaperBox: !boxNode.IsPaperBox });
                }}
                className={`w-full py-1 px-1.5 rounded-lg text-[11px] font-medium border flex items-center justify-center gap-1 transition ${
                  currentBox.IsPaperBox
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-300'
                }`}
                title="Sets whether this box acts as a paper tray"
              >
                {currentBox.IsPaperBox ? 'Tray Box' : 'Standard'}
              </button>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 mb-1 block">Rainbow Box</span>
              <button
                onClick={() => {
                  if (boxNode) onUpdateBoxNode({ ...boxNode, IsRainbowBox: !boxNode.IsRainbowBox, IsHidden: false });
                }}
                className={`w-full py-1 px-1.5 rounded-lg text-[11px] font-medium border flex items-center justify-center gap-1 transition ${
                  currentBox.IsRainbowBox
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-300'
                }`}
                title="Sets whether this box is a rainbow/mystery box"
              >
                {currentBox.IsRainbowBox ? 'Rainbow (?)' : 'Standard'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Spatial Coordinates & Transform */}
        <div className="space-y-3 bg-slate-850/50 p-3 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Compass size={13} className="text-sky-400" />
            Position & Transform (Layer 0 = Base)
          </label>

          {/* Layer / LayerId */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Layer ID</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map(layerId => {
                const currentLayer = boardNode.LayerId ?? boardNode.TileMapId ?? 0;
                return (
                  <button
                    key={`layer-${layerId}`}
                    onClick={() => onUpdateBoardNode({
                      ...boardNode,
                      LayerId: layerId,
                      TileMapId: layerId
                    })}
                    className={`w-7 h-6 rounded text-xs font-bold font-mono transition ${
                      currentLayer === layerId
                        ? 'bg-sky-500 text-white shadow'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {layerId}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Position (XPosition, ZPosition) */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[11px] text-slate-400 mb-1 block">XPosition</span>
              <input
                type="number"
                step="0.1"
                value={boardNode.XPosition ?? 0}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  onUpdateBoardNode({
                    ...boardNode,
                    XPosition: val,
                    MapPosX: Math.floor(val),
                  });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:border-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 mb-1 block">ZPosition</span>
              <input
                type="number"
                step="0.1"
                value={boardNode.ZPosition ?? 0}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  onUpdateBoardNode({
                    ...boardNode,
                    ZPosition: val,
                    YPosition: Number((val - Math.floor(val)).toFixed(3)),
                    MapPosY: Math.floor(val),
                  });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* YRotation */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">YRotation (Degrees)</span>
              <span className="text-xs font-mono font-bold text-sky-400">
                {boardNode.YRotation ?? boardNode.ZRotation ?? 0}°
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
                const currentRot = boardNode.YRotation ?? boardNode.ZRotation ?? 0;
                return (
                  <button
                    key={`deg-${deg}`}
                    onClick={() => onUpdateBoardNode({
                      ...boardNode,
                      YRotation: deg,
                      ZRotation: deg
                    })}
                    className={`py-1 text-[10px] font-mono rounded border transition ${
                      Math.abs((currentRot % 360) - deg) < 1
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    {deg}°
                  </button>
                );
              })}
            </div>

            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={boardNode.YRotation ?? boardNode.ZRotation ?? 0}
              onChange={(e) => {
                const val = Number(e.target.value);
                onUpdateBoardNode({
                  ...boardNode,
                  YRotation: val,
                  ZRotation: val
                });
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>
        </div>

        {/* Section 3: Spawner Queue (If Spawner Node) */}
        {isSpawner && spawnerNode && (
          <div className="space-y-3 bg-slate-850/50 p-3 rounded-xl border border-amber-500/30">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <PackagePlus size={13} />
                Spawner Queue ({spawnerNode.SpawnBoxes.length} Boxes)
              </label>
              <button
                onClick={handleAddSpawnBox}
                className="py-1 px-2 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
              >
                <Plus size={11} />
                <span>Add Box</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {spawnerNode.SpawnBoxes.map((sb, idx) => (
                <div
                  key={`spbox-${idx}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-700/80"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400">#{idx + 1}</span>
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: getColor(sb.BoxColor).hex }}
                    />
                    <span className="text-xs font-medium text-slate-200">
                      Type {sb.TypeId} ({sb.InitCards.length} cards)
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSpawnBox(idx)}
                    className="p-1 hover:bg-rose-950/60 rounded text-slate-400 hover:text-rose-400 transition"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Cards Stack Editor */}
        <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-800">
          <CardStackEditor
            cards={currentBox.InitCards}
            boxColor={currentBox.BoxColor}
            boxType={boxType}
            onChange={(newCards) => {
              if (boxNode) onUpdateBoxNode({ ...boxNode, InitCards: newCards });
              else if (spawnerNode && onUpdateSpawnerNode && spawnerNode.SpawnBoxes[0]) {
                const updatedBoxes = [...spawnerNode.SpawnBoxes];
                updatedBoxes[0] = { ...updatedBoxes[0], InitCards: newCards };
                onUpdateSpawnerNode({ ...spawnerNode, SpawnBoxes: updatedBoxes });
              }
            }}
          />
        </div>

        {/* Section 5: Blocked Nodes Dependency Manager */}
        <div className="space-y-3 bg-slate-850/50 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Link size={13} className="text-amber-400" />
              Blocks ({currentBox.BlockedNodes.length})
            </label>
            {blockersOfThisNode.length > 0 && (
              <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-1.5 py-0.5 rounded">
                Blocked by {blockersOfThisNode.length}
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-400">
            Select which lower-layer boxes this node physically covers and blocks:
          </p>

          <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
            {levelData.BoardNodes.filter(bn => bn.Id !== boardNode.Id).map(otherNode => {
              const otherBox = levelData.BoxNodes.find(b => b.Id === otherNode.Id);
              const isBlocked = (currentBox.BlockedNodes || []).includes(otherNode.Id);
              const otherLayer = otherNode.LayerId ?? otherNode.TileMapId ?? 0;
              const myLayer = boardNode.LayerId ?? boardNode.TileMapId ?? 0;
              const isLowerLayer = otherLayer < myLayer;

              return (
                <button
                  key={`dep-${otherNode.Id}`}
                  onClick={() => handleToggleBlockedNode(otherNode.Id)}
                  className={`w-full flex items-center justify-between p-1.5 rounded-lg border text-left transition ${
                    isBlocked
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className={`w-2 h-2 rounded-full ${isLowerLayer ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                    <span>L{otherLayer}:{otherNode.Id}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {otherBox && (
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: getColor(otherBox.BoxColor).hex }}
                      />
                    )}
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isBlocked ? 'bg-amber-500 border-amber-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isBlocked && <Check size={10} strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
