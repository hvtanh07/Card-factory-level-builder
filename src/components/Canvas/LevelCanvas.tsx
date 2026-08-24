import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { LevelData, BoardNode, BoxNode, ViewportTransform } from '../../types/level';
import { nodeToScreenPos, DEFAULT_GRID_UNIT, Point } from '../../utils/geometry';
import { getBlockedByMap } from '../../utils/autoBlocker';
import { BoxNodeVisual } from './BoxNodeVisual';
import { DependencyOverlay } from './DependencyOverlay';
import { GridBackground } from './GridBackground';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Grid, 
  Layers, 
  Eye, 
  EyeOff, 
  Move, 
  ArrowUpRight,
  Sparkles,
  Scaling
} from 'lucide-react';

interface LevelCanvasProps {
  levelData: LevelData;
  selectedNodeId: string | null;
  visibleLayers: Set<number>;
  isolatedLayer: number | null;
  realBoxSize: boolean;
  showGrid: boolean;
  showCoordinates: boolean;
  showAllDependencies: boolean;
  snapToGrid: boolean;
  onSelectNode: (id: string | null) => void;
  onUpdateBoardNode: (node: BoardNode) => void;
  onUpdateBoxNode: (box: BoxNode) => void;
}

export const LevelCanvas: React.FC<LevelCanvasProps> = ({
  levelData,
  selectedNodeId,
  visibleLayers,
  isolatedLayer,
  realBoxSize,
  showGrid,
  showCoordinates,
  showAllDependencies,
  snapToGrid,
  onSelectNode,
  onUpdateBoardNode,
  onUpdateBoxNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [viewport, setViewport] = useState<ViewportTransform>({ x: 400, y: 300, zoom: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Point>({ x: 0, y: 0 });

  // Drag state for moving nodes
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragStartMouse, setDragStartMouse] = useState<Point>({ x: 0, y: 0 });
  const [dragStartNodePos, setDragStartNodePos] = useState<{ mapPosX: number; mapPosY: number; xPos: number; yPos: number }>({
    mapPosX: 0,
    mapPosY: 0,
    xPos: 0,
    yPos: 0,
  });

  // Drag state for rotating nodes
  const [rotatingNodeId, setRotatingNodeId] = useState<string | null>(null);
  const [rotateStartAngle, setRotateStartAngle] = useState(0);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

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

  // Compute node maps and centers
  const boardMap = useMemo(() => new Map(levelData.BoardNodes.map(n => [n.Id, n])), [levelData.BoardNodes]);
  const boxMap = useMemo(() => new Map(levelData.BoxNodes.map(b => [b.Id, b])), [levelData.BoxNodes]);
  const spawnerMap = useMemo(() => new Map((levelData.SpawnerNodes || []).map(s => [s.Id, s])), [levelData.SpawnerNodes]);
  const blockedByMap = useMemo(() => getBlockedByMap(levelData.BoxNodes), [levelData.BoxNodes]);

  const nodeCenters = useMemo(() => {
    const map = new Map<string, Point>();
    for (const bn of levelData.BoardNodes) {
      map.set(bn.Id, nodeToScreenPos(bn, viewport.x, viewport.y, DEFAULT_GRID_UNIT * viewport.zoom));
    }
    return map;
  }, [levelData.BoardNodes, viewport]);

  // Selected node blockers & blocked lists
  const selectedBox = selectedNodeId ? boxMap.get(selectedNodeId) : null;
  const selectedSpawner = selectedNodeId ? spawnerMap.get(selectedNodeId) : null;
  const nodesBlockedBySelection = useMemo(
    () => new Set([...(selectedBox?.BlockedNodes || []), ...(selectedSpawner?.BlockedNodes || [])]),
    [selectedBox, selectedSpawner]
  );
  const nodesBlockingSelection = useMemo(
    () => new Set(selectedNodeId ? blockedByMap.get(selectedNodeId) || [] : []),
    [selectedNodeId, blockedByMap]
  );

  // Fit to screen helper
  const fitToScreen = useCallback(() => {
    if (levelData.BoardNodes.length === 0) {
      setViewport({ x: dimensions.width / 2, y: dimensions.height / 2, zoom: 1 });
      return;
    }

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const bn of levelData.BoardNodes) {
      const ux = bn.MapPosX + bn.XPosition;
      const uy = bn.MapPosY + bn.YPosition;
      if (ux < minX) minX = ux;
      if (ux > maxX) maxX = ux;
      if (uy < minY) minY = uy;
      if (uy > maxY) maxY = uy;
    }

    const spanX = (maxX - minX + 2) * DEFAULT_GRID_UNIT;
    const spanY = (maxY - minY + 2) * DEFAULT_GRID_UNIT;

    const scaleX = (dimensions.width * 0.8) / Math.max(spanX, 100);
    const scaleY = (dimensions.height * 0.8) / Math.max(spanY, 100);
    const newZoom = Math.min(Math.max(Math.min(scaleX, scaleY), 0.5), 2.0);

    const midUnityX = (minX + maxX) / 2;
    const midUnityY = (minY + maxY) / 2;

    const newX = dimensions.width / 2 - midUnityX * DEFAULT_GRID_UNIT * newZoom;
    const newY = dimensions.height / 2 + midUnityY * DEFAULT_GRID_UNIT * newZoom;

    setViewport({ x: newX, y: newY, zoom: newZoom });
  }, [levelData.BoardNodes, dimensions]);

  // Center once on mount
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
    if (e.button === 1 || (e.button === 0 && (e.altKey || (e.shiftKey && !draggingNodeId))) || (e.button === 0 && e.target === e.currentTarget)) {
      onSelectNode(null);
      setIsPanning(true);
      setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
    }
  };

  const handleNodeMouseDown = (id: string, e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelectNode(id);

    const bn = boardMap.get(id);
    if (!bn) return;

    setDraggingNodeId(id);
    setDragStartMouse({ x: e.clientX, y: e.clientY });
    setDragStartNodePos({
      mapPosX: bn.MapPosX,
      mapPosY: bn.MapPosY,
      xPos: bn.XPosition,
      yPos: bn.YPosition,
    });
  };

  const handleRotateStart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const bn = boardMap.get(id);
    if (!bn) return;
    setRotatingNodeId(id);
    setRotateStartAngle(bn.ZRotation);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setViewport(prev => ({
        ...prev,
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      }));
    } else if (draggingNodeId) {
      const bn = boardMap.get(draggingNodeId);
      if (!bn) return;

      const dx = (e.clientX - dragStartMouse.x) / (DEFAULT_GRID_UNIT * viewport.zoom);
      const dy = -(e.clientY - dragStartMouse.y) / (DEFAULT_GRID_UNIT * viewport.zoom);

      const newTotalX = dragStartNodePos.mapPosX + dragStartNodePos.xPos + dx;
      const newTotalY = dragStartNodePos.mapPosY + dragStartNodePos.yPos + dy;

      if (snapToGrid) {
        const mapPosX = Math.round(newTotalX);
        const mapPosY = Math.round(newTotalY);
        onUpdateBoardNode({
          ...bn,
          MapPosX: mapPosX,
          MapPosY: mapPosY,
          XPosition: 0,
          YPosition: 0,
        });
      } else {
        const mapPosX = Math.floor(newTotalX + 0.5);
        const mapPosY = Math.floor(newTotalY + 0.5);
        const xPos = Number((newTotalX - mapPosX).toFixed(3));
        const yPos = Number((newTotalY - mapPosY).toFixed(3));
        onUpdateBoardNode({
          ...bn,
          MapPosX: mapPosX,
          MapPosY: mapPosY,
          XPosition: xPos,
          YPosition: yPos,
        });
      }
    } else if (rotatingNodeId) {
      const bn = boardMap.get(rotatingNodeId);
      const center = nodeCenters.get(rotatingNodeId);
      if (!bn || !center) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseCanvasX = e.clientX - rect.left;
      const mouseCanvasY = e.clientY - rect.top;

      const deltaX = mouseCanvasX - center.x;
      const deltaY = mouseCanvasY - center.y;

      let deg = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
      let unityAngle = (-(deg + 90) + 360) % 360;

      if (snapToGrid || e.shiftKey) {
        unityAngle = Math.round(unityAngle / 45) * 45;
      }

      onUpdateBoardNode({
        ...bn,
        ZRotation: Number(unityAngle.toFixed(1)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
    setRotatingNodeId(null);
  };

  // Sort nodes by TileMapId descending
  const sortedBoardNodes = useMemo(() => {
    return [...levelData.BoardNodes].sort((a, b) => b.TileMapId - a.TileMapId);
  }, [levelData.BoardNodes]);

  const boxScaleMultiplier = realBoxSize ? viewport.zoom : 1.0;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#629fc9] overflow-hidden select-none cursor-default"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* SVG Canvas for Board Rendering */}
      <svg className="w-full h-full absolute inset-0">
        {/* Background Grid */}
        <GridBackground
          origin={{ x: viewport.x, y: viewport.y }}
          gridUnit={DEFAULT_GRID_UNIT * viewport.zoom}
          width={dimensions.width}
          height={dimensions.height}
          showGrid={showGrid}
          showCoordinates={showCoordinates}
        />

        {/* Board & Box Nodes Layer */}
        <g id="nodes-layer">
          {sortedBoardNodes.map(bn => {
            const bx = boxMap.get(bn.Id) || {
              Id: bn.Id,
              TypeId: 1,
              BoxColor: 0,
              BlockedNodes: [],
              InitCards: [],
              IsHidden: false,
            };
            const sn = spawnerMap.get(bn.Id);

            const isVisible = visibleLayers.has(bn.TileMapId);
            if (!isVisible) return null;

            const isIsolated = isolatedLayer !== null;
            const isTargetLayer = isolatedLayer === bn.TileMapId;
            const layerOpacity = isIsolated ? (isTargetLayer ? 1.0 : 0.2) : 1.0;

            const center = nodeCenters.get(bn.Id) || { x: 0, y: 0 };
            const isSelected = selectedNodeId === bn.Id;
            const isHovered = hoveredNodeId === bn.Id;
            const isBlocked = (blockedByMap.get(bn.Id) || []).length > 0;
            const isBlockedBySelection = nodesBlockedBySelection.has(bn.Id);
            const blocksSelected = nodesBlockingSelection.has(bn.Id);

            return (
              <BoxNodeVisual
                key={`visual-${bn.Id}`}
                boardNode={bn}
                boxNode={bx}
                spawnerNode={sn}
                center={center}
                scaleMultiplier={boxScaleMultiplier}
                isSelected={isSelected}
                isHovered={isHovered}
                isBlocked={isBlocked}
                isBlockedBySelection={isBlockedBySelection}
                blocksSelected={blocksSelected}
                layerOpacity={layerOpacity}
                showLabels={true}
                onSelect={onSelectNode}
                onMouseDown={handleNodeMouseDown}
                onRotateStart={handleRotateStart}
              />
            );
          })}
        </g>

        {/* Blocking Dependency Curved Arrows */}
        <DependencyOverlay
          boardNodes={levelData.BoardNodes}
          boxNodes={levelData.BoxNodes}
          nodeCenters={nodeCenters}
          selectedNodeId={selectedNodeId}
          showAllDependencies={showAllDependencies}
        />
      </svg>

      {/* Floating Canvas Controls Toolbar (Bottom-Left) */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 shadow-xl">
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
          title="Fit Level to Screen"
        >
          <Maximize2 size={18} />
        </button>
        <div className="h-5 w-px bg-slate-700 mx-1"></div>
        <span className="text-xs font-mono text-slate-400 px-1">
          {Math.round(viewport.zoom * 100)}%
        </span>
      </div>

      {/* Mode & Hotkey hints badge (Bottom-Right) */}
      <div className="absolute bottom-6 right-6 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60 text-xs text-slate-400 flex items-center gap-3">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200">Drag Canvas</kbd>
          <span>Pan</span>
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200">Drag Node</kbd>
          <span>Move</span>
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-200">Top Handle</kbd>
          <span>Rotate</span>
        </span>
      </div>
    </div>
  );
};
