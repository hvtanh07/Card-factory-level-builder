import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { LevelData, BoardNode, BoxNode, SpawnerNode, SpawnBox } from '../../types/level';
import { ConveyorData, ConveyorNode, ConveyorSlot } from '../../types/conveyor';
import { DEFAULT_CONVEYOR_DEMO } from '../../constants/sampleConveyors';
import { getColor } from '../../constants/colors';
import { getBoxType } from '../../constants/boxTypes';
import { getBlockedByMap } from '../../utils/autoBlocker';
import { 
  X, 
  RotateCcw, 
  Trophy, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  AlertTriangle,
  Layers,
  Move,
  Lock,
  Tv
} from 'lucide-react';

interface PlaytestModalProps {
  levelData: LevelData;
  conveyorData?: ConveyorData;
  onClose: () => void;
}

interface DockedBox {
  instanceId: string; // Unique instance ID
  slotIdx: number;     // Slot index 0..(numSlots - 1)
  id: string;
  boardNode: BoardNode;
  boxColor: number;
  capacity: number;
  currentCards: number[];
  incomingCount: number; // Reserved cards currently flying to this box
  timestamp: number;
  isFull: boolean;
  isClearing?: boolean;
}

interface ConveyorCard {
  uid: string;
  color: number;
  dist: number; // Distance along track (0 to totalLen)
}

interface FlyingCard {
  uid: string;
  color: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  targetInstanceId: string;
  progress: number; // 0 to 1
  duration: number; // in seconds
}

const BELT_SPEED = 185.0; // pixels per second
const MIN_CARD_DISTANCE = 32.0; // Fixed separation distance to prevent overlap

interface TrackSegment {
  p1: { id?: string; x: number; y: number };
  p2: { id?: string; x: number; y: number };
  len: number;
  cumStart: number;
}

interface SlotGeometry {
  slot: ConveyorSlot;
  idx: number;
  x: number;
  y: number;
  checkpointDist: number;
}

interface ConveyorGeometry {
  toScreenX: (x: number) => number;
  toScreenY: (z: number) => number;
  screenPts: { id: string; x: number; y: number }[];
  segments: TrackSegment[];
  totalLen: number;
  slotData: SlotGeometry[];
  isLoop: boolean;
}

function computeConveyorGeometry(conveyor: ConveyorData): ConveyorGeometry {
  const nodeMap = new Map(conveyor.ConveyorNodes.map(n => [n.Id, n]));
  const routeNodes: ConveyorNode[] = [];
  for (const id of conveyor.ConveyorRoute) {
    const node = nodeMap.get(id);
    if (node) routeNodes.push(node);
  }

  // Fallback if route is empty
  if (routeNodes.length < 2) {
    routeNodes.push(
      { Id: "0", XPosition: -3.0, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 },
      { Id: "1", XPosition: 3.0, ZPosition: 0.0, TangentMode: 1, YRotation: 90.0 }
    );
  }

  // Bounds
  let minX = Infinity, maxX = -Infinity;
  for (const n of conveyor.ConveyorNodes) {
    minX = Math.min(minX, n.XPosition);
    maxX = Math.max(maxX, n.XPosition);
  }
  for (const s of conveyor.ConveyorSlots) {
    minX = Math.min(minX, s.XPosition);
    maxX = Math.max(maxX, s.XPosition);
  }

  const spanX = Math.max(maxX - minX, 4.0);
  const scale = Math.min(620 / spanX, 100);
  const midX = (minX + maxX) / 2;

  const toScreenX = (x: number) => 430 + (x - midX) * scale;
  const toScreenY = (z: number) => 140 - z * (scale * 0.46);

  const screenPts = routeNodes.map(n => ({
    id: n.Id,
    x: toScreenX(n.XPosition),
    y: toScreenY(n.ZPosition),
  }));

  if (conveyor.IsLoop) {
    screenPts.push({ ...screenPts[0] });
  }

  const segments: TrackSegment[] = [];
  let totalLen = 0;
  for (let i = 0; i < screenPts.length - 1; i++) {
    const p1 = screenPts[i];
    const p2 = screenPts[i + 1];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 0.001;
    segments.push({ p1, p2, len, cumStart: totalLen });
    totalLen += len;
  }

  const slotData: SlotGeometry[] = conveyor.ConveyorSlots.map((slot, idx) => {
    const slotX = toScreenX(slot.XPosition);
    const slotY = toScreenY(slot.ZPosition);

    let checkpointDist = 0;
    let found = false;
    for (const seg of segments) {
      if (seg.p1.id === slot.TargetNodeId) {
        checkpointDist = seg.cumStart;
        found = true;
        break;
      }
    }
    if (!found) {
      checkpointDist = (totalLen / Math.max(conveyor.ConveyorSlots.length, 1)) * idx;
    }

    return {
      slot,
      idx,
      x: slotX,
      y: slotY,
      checkpointDist,
    };
  });

  return {
    toScreenX,
    toScreenY,
    screenPts,
    segments,
    totalLen: Math.max(totalLen, 100),
    slotData,
    isLoop: conveyor.IsLoop,
  };
}

function getTrackCoords(distance: number, geom: ConveyorGeometry) {
  const { segments, totalLen } = geom;
  if (totalLen <= 0 || segments.length === 0) {
    return { x: 430, y: 140, angle: 0 };
  }

  const d = ((distance % totalLen) + totalLen) % totalLen;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (d <= seg.cumStart + seg.len || i === segments.length - 1) {
      const segD = d - seg.cumStart;
      const t = Math.max(0, Math.min(1, segD / seg.len));
      const x = seg.p1.x + (seg.p2.x - seg.p1.x) * t;
      const y = seg.p1.y + (seg.p2.y - seg.p1.y) * t;
      const angle = (Math.atan2(seg.p2.y - seg.p1.y, seg.p2.x - seg.p1.x) * 180) / Math.PI;
      return { x, y, angle };
    }
  }

  const last = segments[segments.length - 1];
  return { x: last.p2.x, y: last.p2.y, angle: 0 };
}

function resolveCardOverlaps(cards: ConveyorCard[], totalLen: number): void {
  if (cards.length <= 1) return;

  cards.sort((a, b) => a.dist - b.dist);

  for (let iter = 0; iter < 4; iter++) {
    for (let i = 0; i < cards.length - 1; i++) {
      const diff = cards[i + 1].dist - cards[i].dist;
      if (diff < MIN_CARD_DISTANCE) {
        cards[i + 1].dist = (cards[i].dist + MIN_CARD_DISTANCE) % totalLen;
      }
    }

    const wrapGap = (cards[0].dist + totalLen) - cards[cards.length - 1].dist;
    if (wrapGap < MIN_CARD_DISTANCE) {
      const shift = MIN_CARD_DISTANCE - wrapGap;
      for (let i = 0; i < cards.length; i++) {
        cards[i].dist = (cards[i].dist + shift / 2) % totalLen;
      }
      cards.sort((a, b) => a.dist - b.dist);
    }
  }
}

export const PlaytestModal: React.FC<PlaytestModalProps> = ({
  levelData,
  conveyorData = DEFAULT_CONVEYOR_DEMO,
  onClose,
}) => {
  // Zoom & Pan state for board
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Dynamic Conveyor Geometry
  const geom = useMemo(() => computeConveyorGeometry(conveyorData), [conveyorData]);

  const numSlots = conveyorData.ConveyorSlots.length || 4;

  // Game state: dynamic slots array
  const [boxSlots, setBoxSlots] = useState<(DockedBox | null)[]>(() => new Array(numSlots).fill(null));
  const [clearedNodes, setClearedNodes] = useState<Set<string>>(new Set());
  const [spawnerQueues, setSpawnerQueues] = useState<Map<string, SpawnBox[]>>(new Map());
  const [deliveredCardsCount, setDeliveredCardsCount] = useState<number>(0);
  const [deliveredBoxesCount, setDeliveredBoxesCount] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  // High-performance real-time simulation state
  const conveyorCardsRef = useRef<ConveyorCard[]>([]);
  const flyingCardsRef = useRef<FlyingCard[]>([]);
  const boxSlotsRef = useRef<(DockedBox | null)[]>(new Array(numSlots).fill(null));
  const clearedNodesRef = useRef<Set<string>>(new Set());
  const geomRef = useRef<ConveyorGeometry>(geom);

  useEffect(() => {
    geomRef.current = geom;
  }, [geom]);

  // Render trigger for animation frames
  const [, setFrameTick] = useState(0);
  const lastTimeRef = useRef<number>(performance.now());
  const animationFrameRef = useRef<number | null>(null);

  // Sync ref with state
  useEffect(() => {
    boxSlotsRef.current = boxSlots;
  }, [boxSlots]);

  useEffect(() => {
    clearedNodesRef.current = clearedNodes;
  }, [clearedNodes]);

  const showWarning = (msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(null), 3000);
  };

  // Reset entire playtest
  const resetGame = useCallback(() => {
    conveyorCardsRef.current = [];
    flyingCardsRef.current = [];
    boxSlotsRef.current = new Array(numSlots).fill(null);
    clearedNodesRef.current = new Set();

    setBoxSlots(new Array(numSlots).fill(null));
    setClearedNodes(new Set());

    // Initialize spawner queues
    const initialSpawners = new Map<string, SpawnBox[]>();
    for (const sn of (levelData.SpawnerNodes || [])) {
      initialSpawners.set(sn.Id, [...sn.SpawnBoxes]);
    }
    setSpawnerQueues(initialSpawners);

    // Initialize prespawned initial cards on conveyor belt
    const initialBeltCards: ConveyorCard[] = (levelData.InitialCards || []).map((color, idx) => ({
      uid: `init_card_${idx}_${Date.now()}`,
      color,
      dist: idx * MIN_CARD_DISTANCE,
    }));
    conveyorCardsRef.current = initialBeltCards;

    setDeliveredCardsCount(0);
    setDeliveredBoxesCount(0);
    setIsWon(false);
    setWarningMessage(null);
    setPan({ x: 0, y: 0 });
    setZoom(1);
  }, [levelData, numSlots]);

  useEffect(() => {
    resetGame();
  }, [levelData, conveyorData, resetGame]);

  const totalCardsInLevel = useMemo(() => {
    let count = levelData.BoxNodes.reduce((acc, b) => acc + b.InitCards.length, 0);
    for (const sn of (levelData.SpawnerNodes || [])) {
      for (const sb of sn.SpawnBoxes) {
        count += sb.InitCards.length;
      }
    }
    count += (levelData.InitialCards || []).length;
    return count;
  }, [levelData]);

  // Live blocked nodes on board
  const liveBlockedByMap = useMemo(() => {
    const remainingBoxNodes = levelData.BoxNodes.filter(b => !clearedNodes.has(b.Id));
    return getBlockedByMap(remainingBoxNodes);
  }, [levelData.BoxNodes, clearedNodes]);

  // Main 60FPS Continuous Animation & Physics Loop
  useEffect(() => {
    const updateLoop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      let hasStateChanges = false;
      const currentConveyor = conveyorCardsRef.current;
      const currentFlying = flyingCardsRef.current;
      const currentSlots = [...boxSlotsRef.current];
      const curGeom = geomRef.current;
      const totalLen = curGeom.totalLen;

      // 1. Advance each card along the track
      for (let i = 0; i < currentConveyor.length; i++) {
        currentConveyor[i].dist = (currentConveyor[i].dist + BELT_SPEED * dt) % totalLen;
      }

      // Maintain minimum fixed distance between cards
      resolveCardOverlaps(currentConveyor, totalLen);

      // 2. Check Proximity Flying for Each Card
      const remainingConveyor: ConveyorCard[] = [];

      for (let i = 0; i < currentConveyor.length; i++) {
        const card = currentConveyor[i];
        let triggeredFly = false;

        for (let slotIdx = 0; slotIdx < curGeom.slotData.length; slotIdx++) {
          const slotGeom = curGeom.slotData[slotIdx];
          const box = currentSlots[slotIdx];

          if (!box || box.isClearing || box.boxColor !== card.color) {
            continue;
          }

          const checkpoint = slotGeom.checkpointDist;
          const neededCards = box.capacity - (box.currentCards.length + box.incomingCount);

          if (neededCards > 0) {
            const distDiff = Math.abs(card.dist - checkpoint);
            if (distDiff < BELT_SPEED * dt * 1.6 || (card.dist >= checkpoint && card.dist - checkpoint < 22.0)) {
              const cardPos = getTrackCoords(card.dist, curGeom);

              box.incomingCount += 1;
              currentFlying.push({
                uid: `fly_${card.uid}_${Date.now()}`,
                color: card.color,
                startX: cardPos.x,
                startY: cardPos.y,
                targetX: slotGeom.x,
                targetY: slotGeom.y + 40,
                targetInstanceId: box.instanceId,
                progress: 0,
                duration: 0.32,
              });

              triggeredFly = true;
              hasStateChanges = true;
              break;
            }
          }
        }

        if (!triggeredFly) {
          remainingConveyor.push(card);
        }
      }

      conveyorCardsRef.current = remainingConveyor;

      // 3. Update Flying Cards Trajectory & Landing
      const activeFlying: FlyingCard[] = [];

      for (let f = 0; f < currentFlying.length; f++) {
        const fc = currentFlying[f];
        fc.progress += dt / fc.duration;

        if (fc.progress >= 1.0) {
          const targetBox = currentSlots.find(b => b && b.instanceId === fc.targetInstanceId);
          if (targetBox) {
            targetBox.incomingCount = Math.max(0, targetBox.incomingCount - 1);

            if (targetBox.boxColor === fc.color && targetBox.currentCards.length < targetBox.capacity) {
              targetBox.currentCards.push(fc.color);
            }

            if (targetBox.currentCards.length >= targetBox.capacity && !targetBox.isClearing) {
              targetBox.isFull = true;
              targetBox.isClearing = true;
              setDeliveredBoxesCount(prev => prev + 1);

              const slotToClear = targetBox.slotIdx;
              setTimeout(() => {
                setBoxSlots(prev => {
                  const updated = [...prev];
                  updated[slotToClear] = null;
                  return updated;
                });
              }, 380);
            }
          }

          setDeliveredCardsCount(prev => prev + 1);
          hasStateChanges = true;
        } else {
          activeFlying.push(fc);
        }
      }

      flyingCardsRef.current = activeFlying;

      if (hasStateChanges) {
        setBoxSlots(currentSlots);
        boxSlotsRef.current = currentSlots;

        // Check Win condition
        if (
          clearedNodesRef.current.size >= levelData.BoardNodes.length &&
          conveyorCardsRef.current.length === 0 &&
          flyingCardsRef.current.length === 0 &&
          currentSlots.every(b => !b || b.isClearing)
        ) {
          setIsWon(true);
        }
      }

      setFrameTick(t => (t + 1) % 1000000);
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [levelData]);

  // Handle clicking an unblocked box or tray on the board
  const handleBoardBoxClick = (nodeId: string) => {
    const blockers = liveBlockedByMap.get(nodeId) || [];
    if (blockers.length > 0) return;

    const boardNode = levelData.BoardNodes.find(n => n.Id === nodeId);
    const boxNode = levelData.BoxNodes.find(b => b.Id === nodeId);
    const spawnerBoxes = spawnerQueues.get(nodeId);

    if (!boardNode || (!boxNode && (!spawnerBoxes || spawnerBoxes.length === 0))) return;

    const activeBox = boxNode || (spawnerBoxes ? spawnerBoxes[0] : null);
    if (!activeBox) return;

    const isTray = Boolean(activeBox.IsPaperBox);
    const boxType = getBoxType(activeBox.TypeId, isTray);
    const totalLen = geom.totalLen;

    // === TRAY LOGIC ===
    if (isTray) {
      const entryBase = totalLen * 0.45;
      const newCards: ConveyorCard[] = activeBox.InitCards.map((col, idx) => ({
        uid: `card_tray_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
        color: col,
        dist: ((entryBase - idx * MIN_CARD_DISTANCE) % totalLen + totalLen) % totalLen,
      }));
      conveyorCardsRef.current = [...conveyorCardsRef.current, ...newCards];
      resolveCardOverlaps(conveyorCardsRef.current, totalLen);

      const newClearedNodes = new Set(clearedNodes);
      if (spawnerBoxes && spawnerBoxes.length > 0) {
        const remainingSpawnBoxes = spawnerBoxes.slice(1);
        const updatedMap = new Map(spawnerQueues);
        updatedMap.set(nodeId, remainingSpawnBoxes);
        setSpawnerQueues(updatedMap);

        if (remainingSpawnBoxes.length === 0) {
          newClearedNodes.add(nodeId);
        }
      } else {
        newClearedNodes.add(nodeId);
      }

      setClearedNodes(newClearedNodes);
      clearedNodesRef.current = newClearedNodes;
      return;
    }

    // === NORMAL COLORED BOX LOGIC ===
    const currentSlots = boxSlotsRef.current;
    const availableSlotIdx = currentSlots.findIndex(s => s === null);
    if (availableSlotIdx === -1) {
      showWarning(`All ${numSlots} conveyor slots are occupied! Clear a matching box first.`);
      return;
    }

    let matchingInBox: number[] = [];
    let unmatchedInBox: number[] = [];

    for (const c of activeBox.InitCards) {
      if (c === activeBox.BoxColor && matchingInBox.length < boxType.capacity) {
        matchingInBox.push(c);
      } else {
        unmatchedInBox.push(c);
      }
    }

    const uniqueInstanceId = `box_${nodeId}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newDockedBox: DockedBox = {
      instanceId: uniqueInstanceId,
      slotIdx: availableSlotIdx,
      id: nodeId,
      boardNode,
      boxColor: activeBox.BoxColor,
      capacity: boxType.capacity,
      currentCards: matchingInBox,
      incomingCount: 0,
      timestamp: Date.now(),
      isFull: matchingInBox.length >= boxType.capacity,
    };

    const entryBase = totalLen * 0.45;
    const newCards: ConveyorCard[] = unmatchedInBox.map((col, idx) => ({
      uid: `card_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
      color: col,
      dist: ((entryBase - idx * MIN_CARD_DISTANCE) % totalLen + totalLen) % totalLen,
    }));

    conveyorCardsRef.current = [...conveyorCardsRef.current, ...newCards];
    resolveCardOverlaps(conveyorCardsRef.current, totalLen);

    const updatedSlots = [...currentSlots];
    updatedSlots[availableSlotIdx] = newDockedBox;
    setBoxSlots(updatedSlots);
    boxSlotsRef.current = updatedSlots;

    const newClearedNodes = new Set(clearedNodes);
    if (spawnerBoxes && spawnerBoxes.length > 0) {
      const remainingSpawnBoxes = spawnerBoxes.slice(1);
      const updatedMap = new Map(spawnerQueues);
      updatedMap.set(nodeId, remainingSpawnBoxes);
      setSpawnerQueues(updatedMap);

      if (remainingSpawnBoxes.length === 0) {
        newClearedNodes.add(nodeId);
      }
    } else {
      newClearedNodes.add(nodeId);
    }

    setClearedNodes(newClearedNodes);
    clearedNodesRef.current = newClearedNodes;
  };

  // Zoom handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.88;
    setZoom(z => Math.min(Math.max(z * factor, 0.4), 2.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const currentConveyorCount = conveyorCardsRef.current.length;

  // Track path SVG `d`
  const beltPathData = useMemo(() => {
    if (geom.screenPts.length < 2) return '';
    let d = `M ${geom.screenPts[0].x} ${geom.screenPts[0].y}`;
    for (let i = 1; i < geom.screenPts.length; i++) {
      d += ` L ${geom.screenPts[i].x} ${geom.screenPts[i].y}`;
    }
    if (geom.isLoop) d += ' Z';
    return d;
  }, [geom]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none">
      <div className="relative w-full max-w-5xl h-[94vh] bg-[#629fc9] rounded-3xl overflow-hidden border-4 border-slate-700 shadow-2xl flex flex-col">
        
        {/* Top Header Bar */}
        <div className="h-14 bg-slate-950/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Layers size={16} className="text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Playtest Simulator
                </h2>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-bold uppercase">
                  Conveyor #{conveyorData.Id} ({numSlots} Slots)
                </span>
                {levelData.IsHardLvl && (
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                    ⚡ Hard Level
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Live simulation of current level running with active Conveyor #{conveyorData.Id}
              </span>
            </div>
          </div>

          {/* Right Controls: Reset & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={resetGame}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Warning Alert Toast */}
        {warningMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-rose-950/95 border-2 border-rose-500 text-rose-100 px-4 py-2 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-bold animate-bounce">
            <AlertTriangle size={16} className="text-rose-400 shrink-0" />
            <span>{warningMessage}</span>
          </div>
        )}

        {/* Main Playable Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          
          {/* TOP SECTION: CONVEYOR BELT & DOCKED BOXES */}
          <div className="w-full bg-[#5287aa] border-b-2 border-[#8ebfda]/40 p-2 flex flex-col items-center gap-1 shadow-lg shrink-0 z-20">
            
            {/* Header info & score */}
            <div className="w-full max-w-4xl flex items-center justify-between px-2 text-[11px] font-bold text-white uppercase tracking-wider">
              <span className="drop-shadow">
                Docked Boxes ({boxSlots.filter(b => b !== null && !b.isClearing).length}/{numSlots}) • Conveyor Cards ({currentConveyorCount})
              </span>
              <div className="bg-slate-950/80 border border-slate-700 px-3 py-1 rounded-xl text-xs font-mono text-sky-400 shadow">
                Delivered: {deliveredCardsCount}/{totalCardsInLevel}
              </div>
            </div>

            {/* Integrated SVG Conveyor System & Docked Boxes */}
            <div className="w-full max-w-4xl h-48 bg-slate-950/40 rounded-2xl border border-slate-700/50 relative overflow-hidden flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 860 230">
                <defs>
                  <linearGradient id="beltGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>

                {/* 1. Dynamic Conveyor Track Rail */}
                {beltPathData && (
                  <g>
                    {/* Outer Casing */}
                    <path
                      d={beltPathData}
                      fill="none"
                      stroke="#131b2b"
                      strokeWidth="44"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={beltPathData}
                      fill="none"
                      stroke="#334155"
                      strokeWidth="36"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={beltPathData}
                      fill="none"
                      stroke="url(#beltGradient)"
                      strokeWidth="28"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={beltPathData}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      opacity="0.4"
                    />

                    {/* Inlet machine on start node (if not loop) */}
                    {!geom.isLoop && geom.screenPts.length > 0 && (
                      <g transform={`translate(${geom.screenPts[0].x}, ${geom.screenPts[0].y})`}>
                        <rect x="-24" y="-22" width="48" height="44" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                        <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
                      </g>
                    )}

                    {/* Outlet machine on end node (if not loop) */}
                    {!geom.isLoop && geom.screenPts.length > 1 && (
                      <g transform={`translate(${geom.screenPts[geom.screenPts.length - 1].x}, ${geom.screenPts[geom.screenPts.length - 1].y})`}>
                        <rect x="-24" y="-22" width="48" height="44" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                        <rect x="-14" y="-12" width="28" height="24" rx="4" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
                      </g>
                    )}
                  </g>
                )}

                {/* 2. Docked Box Slots dynamically positioned from geom.slotData (Tall Rounded Rectangle) */}
                {geom.slotData.map((sGeom, slotIdx) => {
                  const box = boxSlots[slotIdx];
                  const colorDef = box ? getColor(box.boxColor) : null;
                  const isClearing = box?.isClearing;

                  return (
                    <g key={`docked-slot-${slotIdx}`} transform={`translate(${sGeom.x}, ${sGeom.y})`}>
                      {/* Slot Docking Base Plate (Tall frame extending down to belt) */}
                      <rect
                        x="-30"
                        y="-6"
                        width="60"
                        height="92"
                        rx="12"
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeDasharray={box ? 'none' : '4,3'}
                      />

                      {/* Docked Box Body */}
                      {box && colorDef ? (
                        <g
                          className={`transition-all duration-300 ${
                            isClearing ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                          }`}
                        >
                          <rect
                            x="-28"
                            y="-4"
                            width="56"
                            height="88"
                            rx="10"
                            fill={colorDef.hex}
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <rect
                            x="-24"
                            y="16"
                            width="48"
                            height="64"
                            rx="6"
                            fill={colorDef.darkHex}
                            opacity="0.4"
                          />

                          <text
                            x="0"
                            y="8"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="900"
                            fontFamily="monospace"
                          >
                            {box.currentCards.length}/{box.capacity}
                          </text>

                          {/* Stacked Cards */}
                          {box.currentCards.map((cCol, cIdx) => {
                            const cColor = getColor(cCol);
                            const cardH = 5.0;
                            const cardY = 70 - cIdx * (cardH + 2);

                            return (
                              <rect
                                key={`stacked-card-${cIdx}`}
                                x="-20"
                                y={cardY}
                                width="40"
                                height={cardH}
                                rx="2"
                                fill={cColor.hex}
                                stroke="#ffffff"
                                strokeWidth="0.8"
                              />
                            );
                          })}
                        </g>
                      ) : (
                        <text
                          x="0"
                          y="44"
                          textAnchor="middle"
                          fill="#64748b"
                          fontSize="10"
                          fontWeight="700"
                        >
                          Slot {slotIdx + 1}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* 3. Cards in Motion along Conveyor */}
                {conveyorCardsRef.current.map((card) => {
                  const pt = getTrackCoords(card.dist, geom);
                  const colorDef = getColor(card.color);

                  return (
                    <g
                      key={`riding-card-${card.uid}`}
                      transform={`translate(${pt.x}, ${pt.y}) rotate(${pt.angle})`}
                    >
                      <rect
                        x="-10"
                        y="-13"
                        width="20"
                        height="26"
                        rx="4"
                        fill="rgba(0, 0, 0, 0.45)"
                      />
                      <rect
                        x="-9"
                        y="-12"
                        width="18"
                        height="24"
                        rx="4"
                        fill={colorDef.hex}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="-7"
                        y="-10"
                        width="14"
                        height="4"
                        rx="2"
                        fill="rgba(255, 255, 255, 0.55)"
                      />
                    </g>
                  );
                })}

                {/* 4. Flying Cards to Matching Box */}
                {flyingCardsRef.current.map(fc => {
                  const p = fc.progress;
                  const currX = fc.startX + (fc.targetX - fc.startX) * p;
                  const currY = fc.startY + (fc.targetY - fc.startY) * p - Math.sin(p * Math.PI) * 22;
                  const colorDef = getColor(fc.color);

                  return (
                    <g
                      key={`flying-${fc.uid}`}
                      transform={`translate(${currX}, ${currY}) scale(${1 + 0.2 * Math.sin(p * Math.PI)})`}
                    >
                      <ellipse
                        cx="0"
                        cy="14"
                        rx="12"
                        ry="4"
                        fill="rgba(0, 0, 0, 0.35)"
                        opacity={1 - p * 0.4}
                      />
                      <rect
                        x="-10"
                        y="-13"
                        width="20"
                        height="26"
                        rx="4"
                        fill={colorDef.hex}
                        stroke="#ffffff"
                        strokeWidth="2"
                        filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.3))"
                      />
                      <rect
                        x="-8"
                        y="-10"
                        width="16"
                        height="4"
                        rx="2"
                        fill="rgba(255, 255, 255, 0.6)"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* BOTTOM SECTION: 3D INTERACTIVE BOARD VIEW */}
          <div
            className="flex-1 relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div
              className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isPanning ? 'none' : 'transform 0.05s ease-out',
              }}
            >
              <svg className="w-[700px] h-[700px] pointer-events-auto" viewBox="-350 -350 700 700">
                <g id="board-boxes-system">
                  {[...levelData.BoardNodes]
                    .sort((a, b) => (a.LayerId ?? a.TileMapId ?? 0) - (b.LayerId ?? b.TileMapId ?? 0))
                    .map(bn => {
                      if (clearedNodes.has(bn.Id)) return null;

                      const bx = levelData.BoxNodes.find(b => b.Id === bn.Id);
                      const spawnerBoxes = spawnerQueues.get(bn.Id);
                      const activeBox = bx || (spawnerBoxes && spawnerBoxes.length > 0 ? spawnerBoxes[0] : null);

                      if (!activeBox) return null;

                      const isSpawner = !!spawnerBoxes && spawnerBoxes.length > 0;
                      const isTray = Boolean(activeBox.IsPaperBox);
                      const boxType = getBoxType(activeBox.TypeId, isTray);
                      const colorDef = getColor(activeBox.BoxColor);
                      const blockers = liveBlockedByMap.get(bn.Id) || [];
                      const isBlocked = blockers.length > 0;

                      const isHidden = (activeBox.IsRainbowBox || activeBox.IsHidden) && isBlocked;
                      const areCardsHidden = activeBox.IsCardsHidden;

                      // Position offset by conveyor board offsets
                      const rawX = bn.XPosition !== undefined ? bn.XPosition : (bn.MapPosX ?? 0);
                      const rawZ = bn.ZPosition !== undefined ? bn.ZPosition : ((bn.MapPosY ?? 0) + (bn.YPosition ?? 0));

                      const unityX = rawX + (conveyorData.BoardOffsetX || 0);
                      const unityZ = rawZ - (conveyorData.BoardOffsetZ || 0);

                      const cx = unityX * 74;
                      const cy = -unityZ * 74;
                      const rot = bn.YRotation ?? bn.ZRotation ?? 0;
                      const svgAngle = (-rot + 360) % 360;

                      const w = boxType.width;
                      const h = boxType.height;
                      const layerId = bn.LayerId ?? bn.TileMapId ?? 0;
                      const layerElev = Math.min(Math.max(layerId, 0), 4);
                      const shadowY = layerElev * 3 + 3;

                      return (
                        <g
                          key={`play-board-box-${bn.Id}`}
                          transform={`translate(${cx}, ${cy}) rotate(${svgAngle})`}
                          className={`select-none transition-opacity duration-200 ${
                            isBlocked
                              ? 'opacity-40 grayscale-[50%] cursor-not-allowed'
                              : 'cursor-pointer opacity-100 hover:brightness-110'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBoardBoxClick(bn.Id);
                          }}
                        >
                          {/* 3D Drop Shadow */}
                          <rect
                            x={-w / 2 + 2}
                            y={-h / 2 + shadowY}
                            width={w}
                            height={h}
                            rx={12}
                            fill="rgba(0, 0, 0, 0.45)"
                          />

                          {/* Spawner Portal Glow Outline */}
                          {isSpawner && (
                            <rect
                              x={-w / 2 - 4}
                              y={-h / 2 - 4}
                              width={w + 8}
                              height={h + 8}
                              rx={14}
                              fill="none"
                              stroke="#f59e0b"
                              strokeWidth={2}
                              strokeDasharray="4,2"
                            />
                          )}

                          {/* Box Body */}
                          {isTray ? (
                            <g>
                              <rect
                                x={-w / 2}
                                y={-h / 2}
                                width={w}
                                height={h}
                                rx={10}
                                fill="#d97706"
                                stroke="#fde68a"
                                strokeWidth={2}
                                strokeDasharray="3,2"
                              />
                              <rect
                                x={-w / 2 + 3}
                                y={-h / 2 + 3}
                                width={w - 6}
                                height={h - 6}
                                rx={8}
                                fill="#92400e"
                                opacity={0.6}
                              />
                              <text
                                x="0"
                                y="-18"
                                textAnchor="middle"
                                fill="#fef3c7"
                                fontSize="10"
                                fontWeight="bold"
                                letterSpacing="1"
                              >
                                TRAY
                              </text>
                            </g>
                          ) : (
                            <g>
                              <rect
                                x={-w / 2}
                                y={-h / 2}
                                width={w}
                                height={h}
                                rx={10}
                                fill={isHidden ? '#475569' : colorDef.hex}
                                stroke="#ffffff"
                                strokeWidth={2}
                              />
                              <rect
                                x={-w / 2 + 4}
                                y={-h / 2 + 4}
                                width={w - 8}
                                height={h - 8}
                                rx={7}
                                fill={isHidden ? '#1e293b' : colorDef.darkHex}
                                opacity={0.35}
                              />
                            </g>
                          )}

                          {/* Cards rendering inside board box */}
                          <g transform="translate(0, 0)">
                            {activeBox.InitCards.map((cCol, cIdx) => {
                              const cDef = getColor(cCol);
                              const totalC = activeBox.InitCards.length;
                              const cW = Math.min(w * 0.72, 46);
                              const cH = 6.0;
                              const startY = (totalC * (cH + 2)) / 2 - 8;
                              const cY = startY - cIdx * (cH + 2);

                              return (
                                <g key={`board-box-card-${cIdx}`}>
                                  <rect
                                    x={-cW / 2}
                                    y={cY}
                                    width={cW}
                                    height={cH}
                                    rx={2}
                                    fill={areCardsHidden || isHidden ? '#64748b' : cDef.hex}
                                    stroke="#ffffff"
                                    strokeWidth={0.8}
                                  />
                                </g>
                              );
                            })}
                          </g>

                          {/* Blocked Overlay */}
                          {isBlocked && (
                            <g>
                              <rect
                                x={-w / 2}
                                y={-h / 2}
                                width={w}
                                height={h}
                                rx={10}
                                fill="rgba(15, 23, 42, 0.45)"
                              />
                              <g transform="translate(0, -2)">
                                <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
                                <text x="0" y="3.5" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                                  {blockers.length}
                                </text>
                              </g>
                            </g>
                          )}
                        </g>
                      );
                    })}
                </g>
              </svg>
            </div>
          </div>

          {/* VICTORY OVERLAY */}
          {isWon && (
            <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-2xl shadow-amber-500/30 mb-4 animate-bounce">
                <Trophy size={42} className="text-slate-950" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-md">
                Level Cleared!
              </h1>
              <p className="text-xs sm:text-sm text-sky-200 mb-6 font-medium">
                All boxes delivered successfully with Conveyor #{conveyorData.Id} ({totalCardsInLevel} cards sorted).
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetGame}
                  className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition active:scale-95 shadow-lg"
                >
                  <RotateCcw size={15} />
                  <span>Replay</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition active:scale-95 shadow-lg shadow-emerald-500/20"
                >
                  <span>Finish Playtest</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
