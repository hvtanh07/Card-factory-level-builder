import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { ConveyorData, ConveyorNode, ConveyorSlot } from '../../types/conveyor';
import { LevelData, ViewportTransform } from '../../types/level';
import { DEFAULT_GRID_UNIT, Point } from '../../utils/geometry';
import { GridBackground } from '../Canvas/GridBackground';
import { BoxNodeVisual } from '../Canvas/BoxNodeVisual';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Lock, 
  Tv, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  EyeOff,
  Layers
} from 'lucide-react';

interface ConveyorCanvasProps {
  conveyorData: ConveyorData;
  levelData: LevelData;
  selectedId: string | null;
  selectedType: 'node' | 'slot' | null;
  showGrid: boolean;
  showCoordinates: boolean;
  snapToGrid: boolean;
  showGhostLevel: boolean;
  onToggleGhostLevel: () => void;
  onSelectItem: (id: string | null, type: 'node' | 'slot' | null) => void;
  onUpdateConveyorData: (data: ConveyorData) => void;
}

export const ConveyorCanvas: React.FC<ConveyorCanvasProps> = ({
  conveyorData,
  levelData,
  selectedId,
  selectedType,
  showGrid,
  showCoordinates,
  snapToGrid,
  showGhostLevel,
  onToggleGhostLevel,
  onSelectItem,
  onUpdateConveyorData,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [viewport, setViewport] = useState<ViewportTransform>({ x: 400, y: 300, zoom: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Point>({ x: 0, y: 0 });

  // Dragging state for node or slot
  const [draggingItem, setDraggingItem] = useState<{ id: string; type: 'node' | 'slot' } | null>(null);
  const [dragStartMouse, setDragStartMouse] = useState<Point>({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState<{ x: number; z: number }>({ x: 0, z: 0 });

  // Resize observer
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

  const nodeMap = useMemo(() => new Map(conveyorData.ConveyorNodes.map(n => [n.Id, n])), [conveyorData.ConveyorNodes]);

  // Coordinate conversion helpers
  const unityToScreen = useCallback((ux: number, uz: number): Point => {
    const screenX = viewport.x + ux * DEFAULT_GRID_UNIT * viewport.zoom;
    const screenY = viewport.y - uz * DEFAULT_GRID_UNIT * viewport.zoom;
    return { x: screenX, y: screenY };
  }, [viewport]);

  const screenToUnity = useCallback((sx: number, sy: number): { x: number; z: number } => {
    const ux = (sx - viewport.x) / (DEFAULT_GRID_UNIT * viewport.zoom);
    const uz = -(sy - viewport.y) / (DEFAULT_GRID_UNIT * viewport.zoom);
    return { x: ux, z: uz };
  }, [viewport]);

  // Fit to screen helper
  const fitToScreen = useCallback(() => {
    const allX: number[] = [];
    const allZ: number[] = [];

    for (const n of conveyorData.ConveyorNodes) {
      allX.push(n.XPosition);
      allZ.push(n.ZPosition);
    }
    for (const s of conveyorData.ConveyorSlots) {
      allX.push(s.XPosition);
      allZ.push(s.ZPosition);
    }
    for (const bn of levelData.BoardNodes) {
      allX.push(bn.XPosition !== undefined ? bn.XPosition : (bn.MapPosX ?? 0));
      allZ.push(bn.ZPosition !== undefined ? bn.ZPosition : ((bn.MapPosY ?? 0) + (bn.YPosition ?? 0)));
    }

    if (allX.length === 0) {
      setViewport({ x: dimensions.width / 2, y: dimensions.height / 2, zoom: 1 });
      return;
    }

    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minZ = Math.min(...allZ);
    const maxZ = Math.max(...allZ);

    const spanX = (maxX - minX + 3) * DEFAULT_GRID_UNIT;
    const spanY = (maxZ - minZ + 3) * DEFAULT_GRID_UNIT;

    const scaleX = (dimensions.width * 0.75) / Math.max(spanX, 100);
    const scaleY = (dimensions.height * 0.75) / Math.max(spanY, 100);
    const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY), 0.4), 2.2);

    const midUnityX = (minX + maxX) / 2;
    const midUnityZ = (minZ + maxZ) / 2;

    const newX = dimensions.width / 2 - midUnityX * DEFAULT_GRID_UNIT * newZoom;
    const newY = dimensions.height / 2 + midUnityZ * DEFAULT_GRID_UNIT * newZoom;

    setViewport({ x: newX, y: newY, zoom: newZoom });
  }, [conveyorData, levelData, dimensions]);

  useEffect(() => {
    fitToScreen();
  }, [dimensions.width, dimensions.height]);

  // Zoom handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.min(Math.max(viewport.zoom * zoomFactor, 0.3), 3.0);

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - (mouseX - viewport.x) * (newZoom / viewport.zoom);
    const newY = mouseY - (mouseY - viewport.y) * (newZoom / viewport.zoom);

    setViewport({ x: newX, y: newY, zoom: newZoom });
  };

  // Pan & Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && (e.altKey || (e.shiftKey && !draggingItem))) || (e.button === 0 && e.target === e.currentTarget)) {
      onSelectItem(null, null);
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
    }
  };

  const handleStartDrag = (id: string, type: 'node' | 'slot', currentX: number, currentZ: number, e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelectItem(id, type);
    setDraggingItem({ id, type });
    setDragStartMouse({ x: e.clientX, y: e.clientY });
    setDragStartPos({ x: currentX, z: currentZ });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setViewport(prev => ({
        ...prev,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      }));
    } else if (draggingItem) {
      const dx = (e.clientX - dragStartMouse.x) / (DEFAULT_GRID_UNIT * viewport.zoom);
      const dz = -(e.clientY - dragStartMouse.y) / (DEFAULT_GRID_UNIT * viewport.zoom);

      let newX = dragStartPos.x + dx;
      let newZ = dragStartPos.z + dz;

      if (snapToGrid) {
        newX = Math.round(newX * 10) / 10;
        newZ = Math.round(newZ * 10) / 10;
      } else {
        newX = Number(newX.toFixed(2));
        newZ = Number(newZ.toFixed(2));
      }

      if (draggingItem.type === 'node') {
        const updatedNodes = conveyorData.ConveyorNodes.map(n =>
          n.Id === draggingItem.id ? { ...n, XPosition: newX, ZPosition: newZ } : n
        );
        onUpdateConveyorData({ ...conveyorData, ConveyorNodes: updatedNodes });
      } else if (draggingItem.type === 'slot') {
        const updatedSlots = conveyorData.ConveyorSlots.map(s =>
          s.Id === draggingItem.id ? { ...s, XPosition: newX, ZPosition: newZ } : s
        );
        onUpdateConveyorData({ ...conveyorData, ConveyorSlots: updatedSlots });
      }
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingItem(null);
  };

  // Route path points calculation
  const routePoints = useMemo(() => {
    const pts: Point[] = [];
    for (const nodeId of conveyorData.ConveyorRoute) {
      const n = nodeMap.get(nodeId);
      if (n) {
        pts.push(unityToScreen(n.XPosition, n.ZPosition));
      }
    }
    return pts;
  }, [conveyorData.ConveyorRoute, nodeMap, unityToScreen]);

  // Construct SVG Path string
  const pathD = useMemo(() => {
    if (routePoints.length === 0) return '';
    if (routePoints.length === 1) return `M ${routePoints[0].x} ${routePoints[0].y}`;

    let d = `M ${routePoints[0].x} ${routePoints[0].y}`;
    for (let i = 1; i < routePoints.length; i++) {
      d += ` L ${routePoints[i].x} ${routePoints[i].y}`;
    }
    if (conveyorData.IsLoop && routePoints.length > 2) {
      d += ' Z';
    }
    return d;
  }, [routePoints, conveyorData.IsLoop]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#527d9c] overflow-hidden select-none cursor-default"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* SVG Canvas */}
      <svg className="w-full h-full absolute inset-0">
        <defs>
          {/* Track shadow filter */}
          <filter id="track-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.4" />
          </filter>

          {/* Slot Bay Gradient */}
          <linearGradient id="slotBayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
          </linearGradient>

          {/* Active Track Rail Pattern */}
          <pattern id="conveyor-chevrons" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 4 12 L 12 6 L 12 18 Z" fill="#60a5fa" fillOpacity="0.5" />
          </pattern>
        </defs>

        {/* Background Grid */}
        <GridBackground
          origin={{ x: viewport.x, y: viewport.y }}
          gridUnit={DEFAULT_GRID_UNIT * viewport.zoom}
          width={dimensions.width}
          height={dimensions.height}
          showGrid={showGrid}
          showCoordinates={showCoordinates}
        />

        {/* Ghost Preview of Underlying Level Boxes */}
        {showGhostLevel && (
          <g id="ghost-level" opacity="0.3" className="pointer-events-none">
            {levelData.BoardNodes.map(bn => {
              const bx = levelData.BoxNodes.find(b => b.Id === bn.Id) || {
                Id: bn.Id,
                TypeId: 1,
                BoxColor: 0,
                BlockedNodes: [],
                InitCards: [],
                IsHidden: false,
              };
              const ux = bn.XPosition !== undefined ? bn.XPosition : (bn.MapPosX ?? 0);
              const uz = bn.ZPosition !== undefined ? bn.ZPosition : ((bn.MapPosY ?? 0) + (bn.YPosition ?? 0));
              const center = unityToScreen(ux, uz);
              return (
                <BoxNodeVisual
                  key={`ghost-${bn.Id}`}
                  boardNode={bn}
                  boxNode={bx}
                  center={center}
                  scaleMultiplier={viewport.zoom}
                  isSelected={false}
                  isHovered={false}
                  isBlocked={false}
                  isBlockedBySelection={false}
                  blocksSelected={false}
                  layerOpacity={0.6}
                  showLabels={false}
                  onSelect={() => {}}
                  onMouseDown={() => {}}
                  onRotateStart={() => {}}
                />
              );
            })}
          </g>
        )}

        {/* Conveyor Track Path */}
        {pathD && (
          <g id="conveyor-track">
            {/* Outer Rail Bed */}
            <path
              d={pathD}
              fill="none"
              stroke="#1e293b"
              strokeWidth={44 * viewport.zoom}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#track-shadow)"
            />
            {/* Inner Metallic Rail */}
            <path
              d={pathD}
              fill="none"
              stroke="#475569"
              strokeWidth={36 * viewport.zoom}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center Belt Surface */}
            <path
              d={pathD}
              fill="none"
              stroke="#0f172a"
              strokeWidth={28 * viewport.zoom}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Dashed Center Guide Line */}
            <path
              d={pathD}
              fill="none"
              stroke="#38bdf8"
              strokeWidth={3 * viewport.zoom}
              strokeDasharray={`${8 * viewport.zoom} ${8 * viewport.zoom}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </g>
        )}

        {/* Portal Tunnels on Endpoints if not Loop (Matching game screenshot!) */}
        {!conveyorData.IsLoop && routePoints.length >= 2 && (
          <g id="conveyor-portals">
            {/* Entrance Portal (Start Node) */}
            <g transform={`translate(${routePoints[0].x}, ${routePoints[0].y}) scale(${viewport.zoom})`}>
              <rect x="-24" y="-32" width="48" height="64" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="3" />
              <rect x="-18" y="-24" width="36" height="48" rx="6" fill="#0f172a" />
              <text x="0" y="4" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">IN</text>
            </g>

            {/* Exit Portal (End Node) */}
            <g transform={`translate(${routePoints[routePoints.length - 1].x}, ${routePoints[routePoints.length - 1].y}) scale(${viewport.zoom})`}>
              <rect x="-24" y="-32" width="48" height="64" rx="8" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="3" />
              <rect x="-18" y="-24" width="36" height="48" rx="6" fill="#0f172a" />
              <text x="0" y="4" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">OUT</text>
            </g>
          </g>
        )}

        {/* Connector Lines between Slots and Target Nodes */}
        <g id="slot-connectors">
          {conveyorData.ConveyorSlots.map(slot => {
            const targetNode = nodeMap.get(slot.TargetNodeId);
            if (!targetNode) return null;
            const slotPos = unityToScreen(slot.XPosition, slot.ZPosition);
            const targetPos = unityToScreen(targetNode.XPosition, targetNode.ZPosition);
            const isSelected = selectedType === 'slot' && selectedId === slot.Id;

            return (
              <line
                key={`conn-${slot.Id}`}
                x1={slotPos.x}
                y1={slotPos.y}
                x2={targetPos.x}
                y2={targetPos.y}
                stroke={isSelected ? '#38bdf8' : '#64748b'}
                strokeWidth={isSelected ? 2.5 * viewport.zoom : 1.5 * viewport.zoom}
                strokeDasharray={`${4 * viewport.zoom} ${4 * viewport.zoom}`}
                opacity={isSelected ? 1.0 : 0.6}
              />
            );
          })}
        </g>

        {/* Conveyor Docking Slots (Bays) */}
        <g id="conveyor-slots">
          {conveyorData.ConveyorSlots.map((slot, idx) => {
            const pos = unityToScreen(slot.XPosition, slot.ZPosition);
            const isSelected = selectedType === 'slot' && selectedId === slot.Id;
            const isDragging = draggingItem?.type === 'slot' && draggingItem.id === slot.Id;

            const bayWidth = 68 * viewport.zoom;
            const bayHeight = 98 * viewport.zoom;

            return (
              <g
                key={`slot-${slot.Id}`}
                transform={`translate(${pos.x}, ${pos.y}) rotate(${slot.YRotation - 90})`}
                className="cursor-pointer group"
                onMouseDown={(e) => handleStartDrag(slot.Id, 'slot', slot.XPosition, slot.ZPosition, e)}
              >
                {/* Slot Docking Bay Outer Box */}
                <rect
                  x={-bayWidth / 2}
                  y={-bayHeight / 2}
                  width={bayWidth}
                  height={bayHeight}
                  rx={12 * viewport.zoom}
                  fill="url(#slotBayGradient)"
                  stroke={isSelected ? '#38bdf8' : slot.UnlockedByAd ? '#fbbf24' : slot.LockedTurn > 0 ? '#f43f5e' : '#3b82f6'}
                  strokeWidth={isSelected ? 3.5 * viewport.zoom : 2 * viewport.zoom}
                  className="transition-colors drop-shadow-lg"
                />

                {/* Inner Slot Target Area */}
                <rect
                  x={-bayWidth / 2 + 5 * viewport.zoom}
                  y={-bayHeight / 2 + 5 * viewport.zoom}
                  width={bayWidth - 10 * viewport.zoom}
                  height={bayHeight - 10 * viewport.zoom}
                  rx={8 * viewport.zoom}
                  fill="#1e293b"
                  stroke="#334155"
                  strokeWidth={1 * viewport.zoom}
                  strokeDasharray={`${4 * viewport.zoom} ${4 * viewport.zoom}`}
                />

                {/* Slot Label & Info */}
                <text
                  x="0"
                  y={-14 * viewport.zoom}
                  fill="#94a3b8"
                  fontSize={11 * viewport.zoom}
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  Slot {slot.Id}
                </text>

                {/* Lock Status Badge */}
                {slot.UnlockedByAd ? (
                  <g transform={`translate(0, ${12 * viewport.zoom})`}>
                    <rect
                      x={-28 * viewport.zoom}
                      y={-10 * viewport.zoom}
                      width={56 * viewport.zoom}
                      height={20 * viewport.zoom}
                      rx={6 * viewport.zoom}
                      fill="#b45309"
                      stroke="#f59e0b"
                      strokeWidth={1 * viewport.zoom}
                    />
                    <text
                      x="0"
                      y={4 * viewport.zoom}
                      fill="#fef3c7"
                      fontSize={10 * viewport.zoom}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      📺 Ad Lock
                    </text>
                  </g>
                ) : slot.LockedTurn > 0 ? (
                  <g transform={`translate(0, ${12 * viewport.zoom})`}>
                    <rect
                      x={-28 * viewport.zoom}
                      y={-10 * viewport.zoom}
                      width={56 * viewport.zoom}
                      height={20 * viewport.zoom}
                      rx={6 * viewport.zoom}
                      fill="#881337"
                      stroke="#f43f5e"
                      strokeWidth={1 * viewport.zoom}
                    />
                    <text
                      x="0"
                      y={4 * viewport.zoom}
                      fill="#ffe4e6"
                      fontSize={10 * viewport.zoom}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      🔒 Move {slot.LockedTurn}
                    </text>
                  </g>
                ) : (
                  <g transform={`translate(0, ${12 * viewport.zoom})`}>
                    <rect
                      x={-24 * viewport.zoom}
                      y={-9 * viewport.zoom}
                      width={48 * viewport.zoom}
                      height={18 * viewport.zoom}
                      rx={5 * viewport.zoom}
                      fill="#064e3b"
                      stroke="#10b981"
                      strokeWidth={1 * viewport.zoom}
                    />
                    <text
                      x="0"
                      y={3.5 * viewport.zoom}
                      fill="#d1fae5"
                      fontSize={9 * viewport.zoom}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ✓ Unlocked
                    </text>
                  </g>
                )}

                {/* Target Node Tag */}
                <text
                  x="0"
                  y={34 * viewport.zoom}
                  fill="#64748b"
                  fontSize={9 * viewport.zoom}
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  Node → {slot.TargetNodeId}
                </text>
              </g>
            );
          })}
        </g>

        {/* Conveyor Waypoint Nodes */}
        <g id="conveyor-nodes">
          {conveyorData.ConveyorNodes.map((node, idx) => {
            const pos = unityToScreen(node.XPosition, node.ZPosition);
            const isSelected = selectedType === 'node' && selectedId === node.Id;
            const isDragging = draggingItem?.type === 'node' && draggingItem.id === node.Id;
            const routeOrder = conveyorData.ConveyorRoute.indexOf(node.Id);

            return (
              <g
                key={`node-${node.Id}`}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer group"
                onMouseDown={(e) => handleStartDrag(node.Id, 'node', node.XPosition, node.ZPosition, e)}
              >
                {/* Node Ring */}
                <circle
                  r={16 * viewport.zoom}
                  fill={isSelected ? '#0284c7' : '#0f172a'}
                  stroke={isSelected ? '#38bdf8' : '#38bdf8'}
                  strokeWidth={isSelected ? 3 * viewport.zoom : 2 * viewport.zoom}
                  className="drop-shadow-md"
                />

                {/* Inner Dot */}
                <circle
                  r={5 * viewport.zoom}
                  fill="#ffffff"
                />

                {/* Node Order / ID Badge */}
                <text
                  x="0"
                  y={4 * viewport.zoom}
                  fill="#ffffff"
                  fontSize={10 * viewport.zoom}
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {node.Id}
                </text>

                {/* Coordinate label below */}
                <g transform={`translate(0, ${26 * viewport.zoom})`}>
                  <rect
                    x={-28 * viewport.zoom}
                    y={-7 * viewport.zoom}
                    width={56 * viewport.zoom}
                    height={14 * viewport.zoom}
                    rx={4 * viewport.zoom}
                    fill="#0f172a"
                    fillOpacity="0.8"
                  />
                  <text
                    x="0"
                    y={3 * viewport.zoom}
                    fill="#94a3b8"
                    fontSize={8 * viewport.zoom}
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {node.XPosition.toFixed(1)}, {node.ZPosition.toFixed(1)}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Canvas Controls (Bottom-Left) */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 shadow-xl">
        <button
          onClick={() => setViewport(v => ({ ...v, zoom: Math.min(v.zoom * 1.2, 3.0) }))}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={() => setViewport(v => ({ ...v, zoom: Math.max(v.zoom / 1.2, 0.3) }))}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={fitToScreen}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
          title="Fit Conveyor to Screen"
        >
          <Maximize2 size={18} />
        </button>
        <div className="h-5 w-px bg-slate-700 mx-1"></div>
        <button
          onClick={onToggleGhostLevel}
          className={`p-2 rounded-lg transition flex items-center gap-1 text-xs font-semibold ${
            showGhostLevel ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle ghost view of current level box layout"
        >
          {showGhostLevel ? <Eye size={16} /> : <EyeOff size={16} />}
          <span>Level Ghost</span>
        </button>
        <div className="h-5 w-px bg-slate-700 mx-1"></div>
        <span className="text-xs font-mono text-slate-400 px-1">
          {Math.round(viewport.zoom * 100)}%
        </span>
      </div>

      {/* Mode & Hotkey hints badge (Bottom-Right) */}
      <div className="absolute bottom-6 right-6 z-20 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60 text-xs text-slate-400 flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200">Drag Node/Slot</kbd>
          <span>Move</span>
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200">Click Item</kbd>
          <span>Select & Inspect</span>
        </span>
      </div>
    </div>
  );
};
