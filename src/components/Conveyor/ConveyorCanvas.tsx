import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ConveyorData, ConveyorNode, ConveyorSlot } from '../../types/conveyor';
import { LevelData } from '../../types/level';
import { getColor } from '../../constants/colors';
import { getBoxType } from '../../constants/boxTypes';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Grid, 
  Eye, 
  EyeOff, 
  Plus, 
  Magnet,
  Lock,
  Tv,
  Trash2,
  X
} from 'lucide-react';

interface ConveyorCanvasProps {
  conveyorData: ConveyorData;
  levelData?: LevelData;
  selectedNodeId: string | null;
  selectedSlotId: string | null;
  onSelectNode: (id: string | null) => void;
  onSelectSlot: (id: string | null) => void;
  onUpdateConveyor: (updated: ConveyorData) => void;
}

const DEFAULT_GRID_UNIT = 74;

export const ConveyorCanvas: React.FC<ConveyorCanvasProps> = ({
  conveyorData,
  levelData,
  selectedNodeId,
  selectedSlotId,
  onSelectNode,
  onSelectSlot,
  onUpdateConveyor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 650 });
  const [viewport, setViewport] = useState({ x: 450, y: 280, zoom: 1.0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Display toggles
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [showGhostBoard, setShowGhostBoard] = useState(true);

  // Dragging states
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [draggingSlotId, setDraggingSlotId] = useState<string | null>(null);
  const [dragStartMouse, setDragStartMouse] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState({ x: 0, z: 0 });

  // Hover state
  const [hoveredSlotId, setHoveredSlotId] = useState<string | null>(null);

  // Update container size
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const gridUnit = DEFAULT_GRID_UNIT * viewport.zoom;

  // Screen coordinate conversion
  const unityToScreen = useCallback((x: number, z: number) => {
    return {
      x: viewport.x + x * gridUnit,
      y: viewport.y - z * gridUnit,
    };
  }, [viewport.x, viewport.y, gridUnit]);

  const screenToUnity = useCallback((sx: number, sy: number) => {
    return {
      x: (sx - viewport.x) / gridUnit,
      z: (viewport.y - sy) / gridUnit,
    };
  }, [viewport.x, viewport.y, gridUnit]);

  // Node Map
  const nodeMap = useMemo(() => {
    return new Map<string, ConveyorNode>(conveyorData.ConveyorNodes.map(n => [n.Id, n]));
  }, [conveyorData.ConveyorNodes]);

  // Quick Delete Slot
  const handleDeleteSlot = useCallback((slotId: string) => {
    const updatedSlots = conveyorData.ConveyorSlots.filter(s => s.Id !== slotId);
    onUpdateConveyor({ ...conveyorData, ConveyorSlots: updatedSlots });
    if (selectedSlotId === slotId) onSelectSlot(null);
  }, [conveyorData, onUpdateConveyor, selectedSlotId, onSelectSlot]);

  // Quick Delete Node
  const handleDeleteNode = useCallback((nodeId: string) => {
    if (conveyorData.ConveyorNodes.length <= 2) return;
    const updatedNodes = conveyorData.ConveyorNodes.filter(n => n.Id !== nodeId);
    const updatedRoute = conveyorData.ConveyorRoute.filter(r => r !== nodeId);
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
  }, [conveyorData, onUpdateConveyor, selectedNodeId, onSelectNode]);

  // Keyboard shortcut for Delete / Backspace
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;
        if (selectedSlotId) {
          e.preventDefault();
          handleDeleteSlot(selectedSlotId);
        } else if (selectedNodeId) {
          e.preventDefault();
          handleDeleteNode(selectedNodeId);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSlotId, selectedNodeId, handleDeleteSlot, handleDeleteNode]);

  // Build SVG Path for Conveyor Belt along ConveyorRoute
  const beltPathData = useMemo(() => {
    if (!conveyorData.ConveyorRoute || conveyorData.ConveyorRoute.length < 2) return '';

    const pts: { x: number; y: number }[] = [];
    for (const rId of conveyorData.ConveyorRoute) {
      const node = nodeMap.get(rId);
      if (node) {
        pts.push(unityToScreen(node.XPosition, node.ZPosition));
      }
    }

    if (pts.length < 2) return '';

    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i].x} ${pts[i].y}`;
    }

    if (conveyorData.IsLoop) {
      d += ' Z';
    }

    return d;
  }, [conveyorData.ConveyorRoute, conveyorData.IsLoop, nodeMap, unityToScreen]);

  // Arrow markers along route segments
  const arrowPoints = useMemo(() => {
    if (!conveyorData.ConveyorRoute || conveyorData.ConveyorRoute.length < 2) return [];

    const pts: { x: number; y: number }[] = [];
    for (const rId of conveyorData.ConveyorRoute) {
      const node = nodeMap.get(rId);
      if (node) pts.push(unityToScreen(node.XPosition, node.ZPosition));
    }

    if (conveyorData.IsLoop && pts.length >= 2) {
      pts.push(pts[0]);
    }

    if (pts.length < 2) return [];

    const arrows: { x: number; y: number; angle: number }[] = [];
    const numArrows = conveyorData.NumberOfArrows || 3;

    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 10) continue;

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      arrows.push({ x: midX, y: midY, angle });
    }

    return arrows.slice(0, Math.max(numArrows, 1));
  }, [conveyorData.ConveyorRoute, conveyorData.IsLoop, conveyorData.NumberOfArrows, nodeMap, unityToScreen]);

  // Canvas Panning Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.target === containerRef.current)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
      onSelectNode(null);
      onSelectSlot(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setViewport(v => ({
        ...v,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      }));
      return;
    }

    if (draggingNodeId) {
      const dx = (e.clientX - dragStartMouse.x) / gridUnit;
      const dz = -(e.clientY - dragStartMouse.y) / gridUnit;

      let newX = dragStartPos.x + dx;
      let newZ = dragStartPos.z + dz;

      if (snapToGrid) {
        newX = Math.round(newX * 10) / 10;
        newZ = Math.round(newZ * 10) / 10;
      } else {
        newX = Math.round(newX * 100) / 100;
        newZ = Math.round(newZ * 100) / 100;
      }

      const updatedNodes = conveyorData.ConveyorNodes.map(n =>
        n.Id === draggingNodeId ? { ...n, XPosition: newX, ZPosition: newZ } : n
      );
      onUpdateConveyor({ ...conveyorData, ConveyorNodes: updatedNodes });
      return;
    }

    if (draggingSlotId) {
      const dx = (e.clientX - dragStartMouse.x) / gridUnit;
      const dz = -(e.clientY - dragStartMouse.y) / gridUnit;

      let newX = dragStartPos.x + dx;
      let newZ = dragStartPos.z + dz;

      if (snapToGrid) {
        newX = Math.round(newX * 10) / 10;
        newZ = Math.round(newZ * 10) / 10;
      } else {
        newX = Math.round(newX * 100) / 100;
        newZ = Math.round(newZ * 100) / 100;
      }

      const updatedSlots = conveyorData.ConveyorSlots.map(s =>
        s.Id === draggingSlotId ? { ...s, XPosition: newX, ZPosition: newZ } : s
      );
      onUpdateConveyor({ ...conveyorData, ConveyorSlots: updatedSlots });
      return;
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
    setDraggingSlotId(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    setViewport(v => {
      const newZoom = Math.min(Math.max(v.zoom * factor, 0.35), 2.5);
      return { ...v, zoom: newZoom };
    });
  };

  const startDragNode = (e: React.MouseEvent, node: ConveyorNode) => {
    e.stopPropagation();
    onSelectNode(node.Id);
    onSelectSlot(null);
    setDraggingNodeId(node.Id);
    setDragStartMouse({ x: e.clientX, y: e.clientY });
    setDragStartPos({ x: node.XPosition, z: node.ZPosition });
  };

  const startDragSlot = (e: React.MouseEvent, slot: ConveyorSlot) => {
    e.stopPropagation();
    onSelectSlot(slot.Id);
    onSelectNode(null);
    setDraggingSlotId(slot.Id);
    setDragStartMouse({ x: e.clientX, y: e.clientY });
    setDragStartPos({ x: slot.XPosition, z: slot.ZPosition });
  };

  const handleAddNode = () => {
    const nextIdx = conveyorData.ConveyorNodes.length;
    const newId = `${nextIdx}`;
    const lastNode = conveyorData.ConveyorNodes[conveyorData.ConveyorNodes.length - 1];
    const newNode: ConveyorNode = {
      Id: newId,
      XPosition: lastNode ? Math.round((lastNode.XPosition + 1.2) * 100) / 100 : 0,
      ZPosition: lastNode ? lastNode.ZPosition : 0,
      TangentMode: 1,
      YRotation: 90.0,
    };

    const newNodes = [...conveyorData.ConveyorNodes, newNode];
    const newRoute = [...conveyorData.ConveyorRoute, newId];
    onUpdateConveyor({
      ...conveyorData,
      ConveyorNodes: newNodes,
      ConveyorRoute: newRoute,
    });
    onSelectNode(newId);
  };

  const handleAddSlot = () => {
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
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#162133] select-none cursor-default"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-2xl">
        <button
          onClick={() => setViewport(v => ({ ...v, zoom: Math.min(v.zoom * 1.2, 2.5) }))}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setViewport(v => ({ ...v, zoom: Math.max(v.zoom / 1.2, 0.35) }))}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={() => setViewport({ x: dimensions.width / 2, y: dimensions.height / 2, zoom: 1.0 })}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          title="Reset View"
        >
          <RotateCcw size={15} />
        </button>

        <div className="h-4 w-px bg-slate-800 mx-1"></div>

        {/* Toggle Grid */}
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-1.5 rounded-lg transition ${
            showGrid ? 'bg-sky-500/20 text-sky-400' : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle Grid"
        >
          <Grid size={16} />
        </button>

        {/* Snap to Grid */}
        <button
          onClick={() => setSnapToGrid(!snapToGrid)}
          className={`p-1.5 rounded-lg transition ${
            snapToGrid ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Snap to 0.1 Unit Grid"
        >
          <Magnet size={16} />
        </button>

        {/* Ghost Level Board Toggle */}
        <button
          onClick={() => setShowGhostBoard(!showGhostBoard)}
          className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
            showGhostBoard ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-500 hover:text-slate-300'
          }`}
          title="Toggle Active Level Ghost Preview"
        >
          {showGhostBoard ? <Eye size={14} /> : <EyeOff size={14} />}
          <span>Level Preview</span>
        </button>

        <div className="h-4 w-px bg-slate-800 mx-1"></div>

        {/* Quick Add Node / Slot */}
        <button
          onClick={handleAddNode}
          className="py-1 px-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1 transition active:scale-95 shadow-sm"
        >
          <Plus size={13} />
          <span>Add Node</span>
        </button>

        <button
          onClick={handleAddSlot}
          className="py-1 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition active:scale-95 shadow-sm"
        >
          <Plus size={13} />
          <span>Add Slot</span>
        </button>
      </div>

      {/* Origin Marker & Coordinate HUD */}
      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-4">
        <span>Nodes: <strong className="text-sky-400">{conveyorData.ConveyorNodes.length}</strong></span>
        <span>Slots: <strong className="text-emerald-400">{conveyorData.ConveyorSlots.length}</strong></span>
        <span>Loop: <strong className={conveyorData.IsLoop ? "text-amber-400" : "text-slate-400"}>{conveyorData.IsLoop ? "YES" : "NO"}</strong></span>
        <span>Offset: <strong className="text-slate-200">X:{conveyorData.BoardOffsetX} Z:{conveyorData.BoardOffsetZ}</strong></span>
        <span>Zoom: <strong className="text-slate-200">{Math.round(viewport.zoom * 100)}%</strong></span>
      </div>

      {/* Main SVG Render Area */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none">
        <defs>
          <pattern
            id="conveyorCanvasGrid"
            width={gridUnit}
            height={gridUnit}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${viewport.x}, ${viewport.y})`}
          >
            <rect width={gridUnit} height={gridUnit} fill="none" />
            <path
              d={`M ${gridUnit} 0 L 0 0 0 ${gridUnit}`}
              fill="none"
              stroke="#1e293b"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1.5" fill="#334155" />
          </pattern>

          {/* Smooth Metallic Belt Gradient matching production game */}
          <linearGradient id="beltMetalSurface" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#718296" />
            <stop offset="50%" stopColor="#8da0b5" />
            <stop offset="100%" stopColor="#718296" />
          </linearGradient>
        </defs>

        {/* 1. Grid Background */}
        {showGrid && <rect width="100%" height="100%" fill="url(#conveyorCanvasGrid)" />}

        {/* 2. World Axes */}
        <g opacity="0.3">
          <line x1={viewport.x} y1="0" x2={viewport.x} y2={dimensions.height} stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="0" y1={viewport.y} x2={dimensions.width} y2={viewport.y} stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,4" />
        </g>

        {/* 3. Ghost Level Board Preview (Offset by BoardOffsetX & BoardOffsetZ) */}
        {showGhostBoard && levelData && (
          <g id="ghost-board-group" opacity="0.65">
            {levelData.BoardNodes.map(bn => {
              const bx = levelData.BoxNodes.find(b => b.Id === bn.Id);
              if (!bx) return null;

              const boxType = getBoxType(bx.TypeId, Boolean(bx.IsPaperBox));
              const colorDef = getColor(bx.BoxColor);

              // Unity coordinates with conveyor board offsets
              const uX = (bn.XPosition ?? 0) + (conveyorData.BoardOffsetX || 0);
              const uZ = (bn.ZPosition ?? 0) - (conveyorData.BoardOffsetZ || 0);
              const pt = unityToScreen(uX, uZ);

              // Accurate physical box scale
              const w = (boxType.width / 80) * gridUnit * 0.95;
              const h = (boxType.height / 80) * gridUnit * 0.95;

              return (
                <g
                  key={`ghost-box-${bn.Id}`}
                  transform={`translate(${pt.x}, ${pt.y}) rotate(${bn.YRotation ?? 0})`}
                >
                  {/* Drop Shadow */}
                  <rect
                    x={-w / 2 + 2}
                    y={-h / 2 + 4}
                    width={w}
                    height={h}
                    rx={10}
                    fill="rgba(0,0,0,0.4)"
                  />
                  {/* Box Body */}
                  <rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    rx={10}
                    fill={colorDef.hex}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {/* Recess */}
                  <rect
                    x={-w / 2 + 4}
                    y={-h / 2 + 4}
                    width={w - 8}
                    height={h - 8}
                    rx={7}
                    fill={colorDef.darkHex}
                    opacity="0.3"
                  />
                  {/* Layer Label */}
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    L{bn.LayerId ?? 0}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* 4. Target Connection Lines from Slots to their TargetNodes */}
        <g id="slot-target-lines">
          {conveyorData.ConveyorSlots.map(slot => {
            const targetNode = nodeMap.get(slot.TargetNodeId);
            if (!targetNode) return null;

            const slotPt = unityToScreen(slot.XPosition, slot.ZPosition);
            const nodePt = unityToScreen(targetNode.XPosition, targetNode.ZPosition);
            const isSelected = slot.Id === selectedSlotId;

            return (
              <line
                key={`target-line-${slot.Id}`}
                x1={slotPt.x}
                y1={slotPt.y}
                x2={nodePt.x}
                y2={nodePt.y}
                stroke={isSelected ? '#38bdf8' : '#64748b'}
                strokeWidth={isSelected ? 2 : 1}
                strokeDasharray="4,4"
                opacity={isSelected ? 0.9 : 0.35}
              />
            );
          })}
        </g>

        {/* 5. Production Conveyor Belt Track Path */}
        {beltPathData && (
          <g id="conveyor-track-group">
            {/* Outer Dark Casing / Rails */}
            <path
              d={beltPathData}
              fill="none"
              stroke="#131b2b"
              strokeWidth={46 * viewport.zoom}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Mid Casing Border */}
            <path
              d={beltPathData}
              fill="none"
              stroke="#334155"
              strokeWidth={38 * viewport.zoom}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Smooth Metallic Belt Surface */}
            <path
              d={beltPathData}
              fill="none"
              stroke="url(#beltMetalSurface)"
              strokeWidth={28 * viewport.zoom}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center Subtle Track Guide */}
            <path
              d={beltPathData}
              fill="none"
              stroke="#94a3b8"
              strokeWidth={2 * viewport.zoom}
              opacity="0.4"
            />

            {/* Amber Directional Chevron Arrows matching production game */}
            {arrowPoints.map((ar, idx) => (
              <g
                key={`arrow-${idx}`}
                transform={`translate(${ar.x}, ${ar.y}) rotate(${ar.angle})`}
              >
                <path
                  d="M -7 -6 L 3 0 L -7 6"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                />
              </g>
            ))}

            {/* Inlet Pipe Machine on start node (if not loop) matching production game */}
            {!conveyorData.IsLoop && conveyorData.ConveyorRoute.length > 0 && (
              (() => {
                const startNode = nodeMap.get(conveyorData.ConveyorRoute[0]);
                if (!startNode) return null;
                const pt = unityToScreen(startNode.XPosition, startNode.ZPosition);
                return (
                  <g transform={`translate(${pt.x}, ${pt.y})`}>
                    {/* Blue 3D Housing */}
                    <rect x="-26" y="-24" width="52" height="48" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))" />
                    {/* Top Funnel Collar */}
                    <polygon points="0,-16 16,-6 16,6 0,16 -16,6 -16,-6" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
                    <circle cx="0" cy="0" r="7" fill="#0284c7" />
                  </g>
                );
              })()
            )}

            {/* Outlet Chute Machine on end node (if not loop) matching production game */}
            {!conveyorData.IsLoop && conveyorData.ConveyorRoute.length > 1 && (
              (() => {
                const endNode = nodeMap.get(conveyorData.ConveyorRoute[conveyorData.ConveyorRoute.length - 1]);
                if (!endNode) return null;
                const pt = unityToScreen(endNode.XPosition, endNode.ZPosition);
                return (
                  <g transform={`translate(${pt.x}, ${pt.y})`}>
                    {/* Blue 3D Tunnel Housing */}
                    <rect x="-26" y="-24" width="52" height="48" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))" />
                    {/* Exit Arch */}
                    <rect x="-14" y="-12" width="28" height="24" rx="4" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
                    <line x1="-12" y1="-2" x2="12" y2="-2" stroke="#475569" strokeWidth="2" />
                  </g>
                );
              })()
            )}
          </g>
        )}

        {/* 6. Production-Accurate Conveyor Dock Slots */}
        <g id="conveyor-slots-group">
          {conveyorData.ConveyorSlots.map((slot, idx) => {
            const targetNode = nodeMap.get(slot.TargetNodeId);
            const anchorPt = unityToScreen(slot.XPosition, slot.ZPosition);
            const isSelected = slot.Id === selectedSlotId;
            const isHovered = slot.Id === hoveredSlotId;

            // Target vector
            const nodePt = targetNode ? unityToScreen(targetNode.XPosition, targetNode.ZPosition) : { x: anchorPt.x, y: anchorPt.y + 120 };
            const dx = nodePt.x - anchorPt.x;
            const dy = nodePt.y - anchorPt.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

            // Slot Dimensions: Tall rounded rectangle extending from anchor towards belt!
            const slotW = 1.08 * gridUnit;
            const slotH = Math.max(Math.min(dist - 12 * viewport.zoom, 1.82 * gridUnit), 1.15 * gridUnit);

            // Center of slot body
            const cx = anchorPt.x + (dx / dist) * (slotH / 2);
            const cy = anchorPt.y + (dy / dist) * (slotH / 2);
            const rotAngle = angle - 90;

            return (
              <g
                key={`slot-node-${slot.Id}`}
                transform={`translate(${cx}, ${cy}) rotate(${rotAngle})`}
                className="pointer-events-auto cursor-move"
                onMouseDown={(e) => startDragSlot(e, slot)}
                onMouseEnter={() => setHoveredSlotId(slot.Id)}
                onMouseLeave={() => setHoveredSlotId(null)}
              >
                {/* Selection Aura */}
                {isSelected && (
                  <rect
                    x={-slotW / 2 - 6}
                    y={-slotH / 2 - 6}
                    width={slotW + 12}
                    height={slotH + 12}
                    rx={14 * viewport.zoom}
                    fill="rgba(56, 189, 248, 0.2)"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                )}

                {/* Outer Dock Frame matching production game */}
                <rect
                  x={-slotW / 2}
                  y={-slotH / 2}
                  width={slotW}
                  height={slotH}
                  rx={12 * viewport.zoom}
                  fill="#1e293b"
                  stroke={isSelected ? '#38bdf8' : isHovered ? '#94a3b8' : '#475569'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
                />

                {/* Inner Recessed Bed */}
                <rect
                  x={-slotW / 2 + 5 * viewport.zoom}
                  y={-slotH / 2 + 5 * viewport.zoom}
                  width={slotW - 10 * viewport.zoom}
                  height={slotH - 10 * viewport.zoom}
                  rx={8 * viewport.zoom}
                  fill="#0f172a"
                  stroke="#334155"
                  strokeWidth="1"
                />

                {/* Slot Label */}
                <text
                  x="0"
                  y={-slotH / 2 + 18 * viewport.zoom}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize={Math.max(10 * viewport.zoom, 9)}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Slot {idx + 1}
                </text>

                <text
                  x="0"
                  y={slotH / 2 - 12 * viewport.zoom}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize={Math.max(9 * viewport.zoom, 8)}
                  fontFamily="monospace"
                >
                  Node {slot.TargetNodeId}
                </text>

                {/* Locked Turn Indicator */}
                {slot.LockedTurn > 0 && (
                  <g transform={`translate(${slotW / 2 - 14}, ${-slotH / 2 + 14})`}>
                    <circle cx="0" cy="0" r="8" fill="#b45309" stroke="#fbbf24" strokeWidth="1" />
                    <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                      {slot.LockedTurn}
                    </text>
                  </g>
                )}

                {/* Unlocked by Ad Indicator */}
                {slot.UnlockedByAd && (
                  <g transform={`translate(${-slotW / 2 + 14}, ${-slotH / 2 + 14})`}>
                    <circle cx="0" cy="0" r="8" fill="#7c3aed" stroke="#c084fc" strokeWidth="1" />
                    <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                      AD
                    </text>
                  </g>
                )}

                {/* QUICK DELETE BUTTON (Shows on hover or when selected) */}
                {(isSelected || isHovered) && (
                  <g
                    className="cursor-pointer hover:scale-125 transition-transform pointer-events-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSlot(slot.Id);
                    }}
                    transform={`translate(${slotW / 2 - 2}, ${-slotH / 2 + 2})`}
                  >
                    <title>{`Delete Slot #${slot.Id}`}</title>
                    <circle cx="0" cy="0" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                    <path d="M -3 -3 L 3 3 M 3 -3 L -3 3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* 7. Conveyor Waypoint Nodes */}
        <g id="conveyor-nodes-group">
          {conveyorData.ConveyorNodes.map(node => {
            const pt = unityToScreen(node.XPosition, node.ZPosition);
            const isSelected = node.Id === selectedNodeId;
            const r = 14 * Math.max(viewport.zoom, 0.7);

            return (
              <g
                key={`waypoint-node-${node.Id}`}
                transform={`translate(${pt.x}, ${pt.y})`}
                className="pointer-events-auto cursor-move"
                onMouseDown={(e) => startDragNode(e, node)}
              >
                {/* Selection Halo */}
                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r={r + 8}
                    fill="rgba(56, 189, 248, 0.25)"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx="0"
                  cy="0"
                  r={r}
                  fill={isSelected ? '#0284c7' : '#0f172a'}
                  stroke={isSelected ? '#38bdf8' : '#94a3b8'}
                  strokeWidth={isSelected ? 3 : 2}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                />

                {/* Node ID label */}
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="900"
                  fontFamily="monospace"
                >
                  {node.Id}
                </text>

                {/* Coordinates Pill */}
                {isSelected && (
                  <g transform="translate(0, 26)">
                    <rect
                      x="-38"
                      y="-9"
                      width="76"
                      height="18"
                      rx="6"
                      fill="#0f172a"
                      stroke="#38bdf8"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill="#38bdf8"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      X:{node.XPosition} Z:{node.ZPosition}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
