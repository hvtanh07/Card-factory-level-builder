code = r"""import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { LevelData, BoardNode, BoxNode, SpawnerNode, SpawnBox } from '../../types/level';
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
  Lock
} from 'lucide-react';

interface PlaytestModalProps {
  levelData: LevelData;
  onClose: () => void;
}

interface DockedBox {
  instanceId: string;
  slotIdx: number;
  id: string;
  boardNode: BoardNode;
  boxColor: number;
  capacity: number;
  currentCards: number[];
  incomingCount: number;
  timestamp: number;
  isFull: boolean;
  isClearing?: boolean;
}

interface ConveyorCard {
  uid: string;
  color: number;
  dist: number;
}

interface FlyingCard {
  uid: string;
  color: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  targetInstanceId: string;
  progress: number;
  duration: number;
}

const MAX_BOX_SLOTS = 4;
const BELT_SPEED = 185.0;
const MIN_CARD_DISTANCE = 32.0;

// Racetrack Conveyor Geometry
const TOP_Y = 105.0;
const BOTTOM_Y = 185.0;
const RADIUS = 40.0;
const LEFT_X = 110.0;
const RIGHT_X = 750.0;

const L_STRAIGHT = RIGHT_X - LEFT_X;
const L_ARC = Math.PI * RADIUS;
const L_TOTAL = 2 * L_STRAIGHT + 2 * L_ARC;

const BOX_X_POSITIONS = [235.0, 365.0, 495.0, 625.0];
const BOX_CHECKPOINTS = BOX_X_POSITIONS.map(bx => bx - LEFT_X);

function resolveCardOverlaps(cards: ConveyorCard[]): void {
  if (cards.length <= 1) return;

  cards.sort((a, b) => a.dist - b.dist);

  for (let iter = 0; iter < 4; iter++) {
    for (let i = 0; i < cards.length - 1; i++) {
      const diff = cards[i + 1].dist - cards[i].dist;
      if (diff < MIN_CARD_DISTANCE) {
        cards[i + 1].dist = (cards[i].dist + MIN_CARD_DISTANCE) % L_TOTAL;
      }
    }

    const wrapGap = (cards[0].dist + L_TOTAL) - cards[cards.length - 1].dist;
    if (wrapGap < MIN_CARD_DISTANCE) {
      const shift = MIN_CARD_DISTANCE - wrapGap;
      for (let i = 0; i < cards.length; i++) {
        cards[i].dist = (cards[i].dist + shift / 2) % L_TOTAL;
      }
      cards.sort((a, b) => a.dist - b.dist);
    }
  }
}

function getTrackCoords(distance: number) {
  const d = ((distance % L_TOTAL) + L_TOTAL) % L_TOTAL;
  if (d < L_STRAIGHT) {
    return {
      x: LEFT_X + d,
      y: TOP_Y,
      angle: 0.0,
    };
  } else if (d < L_STRAIGHT + L_ARC) {
    const arcD = d - L_STRAIGHT;
    const theta = -Math.PI / 2.0 + (arcD / L_ARC) * Math.PI;
    return {
      x: RIGHT_X + RADIUS * Math.cos(theta),
      y: (TOP_Y + BOTTOM_Y) / 2.0 + RADIUS * Math.sin(theta),
      angle: 90.0 + (arcD / L_ARC) * 180.0,
    };
  } else if (d < 2 * L_STRAIGHT + L_ARC) {
    const straightD = d - (L_STRAIGHT + L_ARC);
    return {
      x: RIGHT_X - straightD,
      y: BOTTOM_Y,
      angle: 180.0,
    };
  } else {
    const arcD = d - (2 * L_STRAIGHT + L_ARC);
    const theta = Math.PI / 2.0 + (arcD / L_ARC) * Math.PI;
    return {
      x: LEFT_X + RADIUS * Math.cos(theta),
      y: (TOP_Y + BOTTOM_Y) / 2.0 + RADIUS * Math.sin(theta),
      angle: 270.0 + (arcD / L_ARC) * 180.0,
    };
  }
}

export const PlaytestModal: React.FC<PlaytestModalProps> = ({ levelData, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const [boxSlots, setBoxSlots] = useState<(DockedBox | null)[]>([null, null, null, null]);
  const [clearedNodes, setClearedNodes] = useState<Set<string>>(new Set());
  const [spawnerQueues, setSpawnerQueues] = useState<Map<string, SpawnBox[]>>(new Map());
  const [deliveredCardsCount, setDeliveredCardsCount] = useState<number>(0);
  const [deliveredBoxesCount, setDeliveredBoxesCount] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const conveyorCardsRef = useRef<ConveyorCard[]>([]);
  const flyingCardsRef = useRef<FlyingCard[]>([]);
  const boxSlotsRef = useRef<(DockedBox | null)[]>([null, null, null, null]);
  const clearedNodesRef = useRef<Set<string>>(new Set());

  const [, setFrameTick] = useState(0);
  const lastTimeRef = useRef<number>(performance.now());
  const animationFrameRef = useRef<number | null>(null);

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

  const resetGame = useCallback(() => {
    conveyorCardsRef.current = [];
    flyingCardsRef.current = [];
    boxSlotsRef.current = [null, null, null, null];
    clearedNodesRef.current = new Set();

    setBoxSlots([null, null, null, null]);
    setClearedNodes(new Set());
    
    const initialSpawners = new Map<string, SpawnBox[]>();
    for (const sn of (levelData.SpawnerNodes || [])) {
      initialSpawners.set(sn.Id, [...sn.SpawnBoxes]);
    }
    setSpawnerQueues(initialSpawners);

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
  }, [levelData]);

  useEffect(() => {
    resetGame();
  }, [levelData, resetGame]);

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

  const liveBlockedByMap = useMemo(() => {
    const remainingBoxNodes = levelData.BoxNodes.filter(b => !clearedNodes.has(b.Id));
    return getBlockedByMap(remainingBoxNodes);
  }, [levelData.BoxNodes, clearedNodes]);

  useEffect(() => {
    const updateLoop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      let hasStateChanges = false;
      const currentConveyor = conveyorCardsRef.current;
      const currentFlying = flyingCardsRef.current;
      const currentSlots = [...boxSlotsRef.current];

      for (let i = 0; i < currentConveyor.length; i++) {
        currentConveyor[i].dist = (currentConveyor[i].dist + BELT_SPEED * dt) % L_TOTAL;
      }

      resolveCardOverlaps(currentConveyor);

      const remainingConveyor: ConveyorCard[] = [];

      for (let i = 0; i < currentConveyor.length; i++) {
        const card = currentConveyor[i];
        let triggeredFly = false;

        if (card.dist <= L_STRAIGHT + 25.0) {
          for (let slotIdx = 0; slotIdx < MAX_BOX_SLOTS; slotIdx++) {
            const box = currentSlots[slotIdx];
            if (!box || box.isClearing || box.boxColor !== card.color) {
              continue;
            }

            const checkpoint = BOX_CHECKPOINTS[slotIdx];
            const neededCards = box.capacity - (box.currentCards.length + box.incomingCount);

            if (neededCards > 0) {
              const distDiff = Math.abs(card.dist - checkpoint);
              if (distDiff < BELT_SPEED * dt * 1.5 || (card.dist >= checkpoint && card.dist - checkpoint < 20.0)) {
                const cardPos = getTrackCoords(card.dist);
                const targetX = BOX_X_POSITIONS[slotIdx];
                const targetY = 42.0;

                box.incomingCount += 1;
                currentFlying.push({
                  uid: `fly_${card.uid}_${Date.now()}`,
                  color: card.color,
                  startX: cardPos.x,
                  startY: cardPos.y,
                  targetX,
                  targetY,
                  targetInstanceId: box.instanceId,
                  progress: 0,
                  duration: 0.30,
                });

                triggeredFly = true;
                hasStateChanges = true;
                break;
              }
            }
          }
        }

        if (!triggeredFly) {
          remainingConveyor.push(card);
        }
      }

      conveyorCardsRef.current = remainingConveyor;

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

    // === TRAY LOGIC ===
    if (isTray) {
      const entryBase = 620.0;
      const newCards: ConveyorCard[] = activeBox.InitCards.map((col, idx) => ({
        uid: `card_tray_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
        color: col,
        dist: ((entryBase - idx * MIN_CARD_DISTANCE) % L_TOTAL + L_TOTAL) % L_TOTAL,
      }));
      conveyorCardsRef.current = [...conveyorCardsRef.current, ...newCards];
      resolveCardOverlaps(conveyorCardsRef.current);

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
      showWarning('All 4 box slots are occupied! Clear a matching box first.');
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

    const entryBase = 620.0;
    const newCards: ConveyorCard[] = unmatchedInBox.map((col, idx) => ({
      uid: `card_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
      color: col,
      dist: ((entryBase - idx * MIN_CARD_DISTANCE) % L_TOTAL + L_TOTAL) % L_TOTAL,
    }));

    conveyorCardsRef.current = [...conveyorCardsRef.current, ...newCards];
    resolveCardOverlaps(conveyorCardsRef.current);

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
                  Feeder Trays & Strict Sorting • 60 FPS
                </span>
                {levelData.IsHardLvl && (
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                    ⚡ Hard Level
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Trays feed spare cards directly to the conveyor and disappear immediately!
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
          
          {/* TOP SECTION: 4 DOCKED BOXES & REAL-TIME ANIMATED CONVEYOR BELT */}
          <div className="w-full bg-[#5287aa] border-b-2 border-[#8ebfda]/40 p-2 flex flex-col items-center gap-1 shadow-lg shrink-0 z-20">
            
            <div className="w-full max-w-4xl flex items-center justify-between px-2 text-[11px] font-bold text-white uppercase tracking-wider">
              <span className="drop-shadow">
                Docked Boxes ({boxSlots.filter(b => b !== null && !b.isClearing).length}/4) • Conveyor Cards ({currentConveyorCount})
              </span>
              <div className="bg-slate-950/80 border border-slate-700 px-3 py-1 rounded-xl text-xs font-mono text-sky-400 shadow">
                Delivered: {deliveredCardsCount}/{totalCardsInLevel}
              </div>
            </div>

            <div className="w-full max-w-4xl h-48 bg-slate-950/40 rounded-2xl border border-slate-700/50 relative overflow-hidden flex items-center justify-center shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 860 230">
                <defs>
                  <linearGradient id="beltGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>

                {/* Conveyor Track Rail */}
                <path
                  d={`M ${LEFT_X} ${TOP_Y} L ${RIGHT_X} ${TOP_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${RIGHT_X} ${BOTTOM_Y} L ${LEFT_X} ${BOTTOM_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${LEFT_X} ${TOP_Y} Z`}
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="42"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={`M ${LEFT_X} ${TOP_Y} L ${RIGHT_X} ${TOP_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${RIGHT_X} ${BOTTOM_Y} L ${LEFT_X} ${BOTTOM_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${LEFT_X} ${TOP_Y} Z`}
                  fill="none"
                  stroke="url(#beltGradient)"
                  strokeWidth="32"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={`M ${LEFT_X} ${TOP_Y} L ${RIGHT_X} ${TOP_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${RIGHT_X} ${BOTTOM_Y} L ${LEFT_X} ${BOTTOM_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${LEFT_X} ${TOP_Y} Z`}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="24"
                  strokeDasharray="6,6"
                />
                <path
                  d={`M ${LEFT_X} ${TOP_Y} L ${RIGHT_X} ${TOP_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${RIGHT_X} ${BOTTOM_Y} L ${LEFT_X} ${BOTTOM_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${LEFT_X} ${TOP_Y} Z`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  opacity="0.5"
                />

                {/* Docked Box Slots */}
                {BOX_X_POSITIONS.map((bx, slotIdx) => {
                  const box = boxSlots[slotIdx];
                  const colorDef = box ? getColor(box.boxColor) : null;
                  const isClearing = box?.isClearing;

                  return (
                    <g key={`docked-slot-${slotIdx}`} transform={`translate(${bx}, 44)`}>
                      <rect
                        x="-32"
                        y="-30"
                        width="64"
                        height="60"
                        rx="12"
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeDasharray={box ? 'none' : '4,3'}
                      />

                      {box && colorDef ? (
                        <g
                          className={`transition-all duration-300 ${
                            isClearing ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                          }`}
                        >
                          <rect
                            x="-30"
                            y="-28"
                            width="60"
                            height="56"
                            rx="10"
                            fill={colorDef.hex}
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <rect
                            x="-26"
                            y="-12"
                            width="52"
                            height="36"
                            rx="6"
                            fill={colorDef.darkHex}
                            opacity="0.4"
                          />
                          <text
                            x="0"
                            y="-16"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="900"
                            fontFamily="monospace"
                          >
                            {box.currentCards.length}/{box.capacity}
                          </text>

                          {box.currentCards.map((cCol, cIdx) => {
                            const cColor = getColor(cCol);
                            const cardH = 4.5;
                            const cardY = 18 - cIdx * (cardH + 1);

                            return (
                              <rect
                                key={`stacked-card-${cIdx}`}
                                x="-22"
                                y={cardY}
                                width="44"
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
                          y="4"
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

                {/* Cards Riding along Conveyor */}
                {conveyorCardsRef.current.map((card) => {
                  const pt = getTrackCoords(card.dist);
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
                        fill="rgba(255, 255, 255, 0.6)"
                      />
                    </g>
                  );
                })}

                {/* Flying Cards to Docked Boxes */}
                {flyingCardsRef.current.map((fc) => {
                  const colorDef = getColor(fc.color);
                  const curX = fc.startX + (fc.targetX - fc.startX) * fc.progress;
                  const curY = fc.startY + (fc.targetY - fc.startY) * fc.progress - Math.sin(fc.progress * Math.PI) * 35;
                  const scale = 1.0 + Math.sin(fc.progress * Math.PI) * 0.25;

                  return (
                    <g
                      key={`flying-${fc.uid}`}
                      transform={`translate(${curX}, ${curY}) scale(${scale})`}
                    >
                      <rect
                        x="-9"
                        y="-12"
                        width="18"
                        height="24"
                        rx="4"
                        fill={colorDef.hex}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <rect
                        x="-7"
                        y="-10"
                        width="14"
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

                      const isSpawner = !bx && !!spawnerBoxes && spawnerBoxes.length > 0;
                      const isTray = Boolean(activeBox.IsPaperBox);
                      const boxType = getBoxType(activeBox.TypeId, isTray);
                      const colorDef = getColor(activeBox.BoxColor);
                      const blockers = liveBlockedByMap.get(bn.Id) || [];
                      const isBlocked = blockers.length > 0;

                      const isHidden = (activeBox.IsRainbowBox || activeBox.IsHidden) && isBlocked;
                      const areCardsHidden = activeBox.IsCardsHidden;

                      const unityX = bn.XPosition !== undefined ? bn.XPosition : (bn.MapPosX ?? 0);
                      const unityZ = bn.ZPosition !== undefined ? bn.ZPosition : ((bn.MapPosY ?? 0) + (bn.YPosition ?? 0));

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
                          key={`board-box-${bn.Id}`}
                          transform={`translate(${cx}, ${cy}) rotate(${svgAngle})`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBoardBoxClick(bn.Id);
                          }}
                          className={`cursor-pointer transition-transform duration-150 ${
                            isBlocked
                              ? 'opacity-85 brightness-75'
                              : 'hover:scale-105 active:scale-95'
                          }`}
                        >
                          {/* Drop Shadow */}
                          <rect
                            x={-w / 2}
                            y={-h / 2 + shadowY}
                            width={w}
                            height={h}
                            rx={12}
                            fill="rgba(0,0,0,0.35)"
                          />

                          {/* Outer Box Body */}
                          <rect
                            x={-w / 2}
                            y={-h / 2}
                            width={w}
                            height={h}
                            rx={12}
                            fill={isTray ? '#f8fafc' : isHidden ? '#64748b' : colorDef.hex}
                            stroke={isBlocked ? '#475569' : '#ffffff'}
                            strokeWidth={isBlocked ? 2 : 2.5}
                          />

                          {/* Inner Inset */}
                          <rect
                            x={-w / 2 + 6}
                            y={-h / 2 + 6}
                            width={w - 12}
                            height={h - 12}
                            rx={8}
                            fill={isTray ? '#e2e8f0' : isHidden ? '#475569' : colorDef.darkHex}
                            opacity={0.5}
                          />

                          {/* Stored Cards inside Box */}
                          {!areCardsHidden && activeBox.InitCards.map((cCol, cIdx) => {
                            const cColor = getColor(cCol);
                            const cardW = 16;
                            const cardH = 22;
                            const totalCards = activeBox.InitCards.length;
                            const spacing = Math.min(18, (w - 24) / Math.max(totalCards, 1));
                            const startX = -((totalCards - 1) * spacing) / 2;
                            const cardX = startX + cIdx * spacing;

                            return (
                              <g key={`box-card-${cIdx}`} transform={`translate(${cardX}, 0)`}>
                                <rect
                                  x={-cardW / 2}
                                  y={-cardH / 2}
                                  width={cardW}
                                  height={cardH}
                                  rx={3}
                                  fill={cColor.hex}
                                  stroke="#ffffff"
                                  strokeWidth={1}
                                />
                              </g>
                            );
                          })}

                          {/* Spawner Multiplier Badge */}
                          {isSpawner && spawnerBoxes.length > 1 && (
                            <g transform={`translate(${-w / 2 + 10}, ${-h / 2 + 10})`}>
                              <rect x="-10" y="-8" width="20" height="16" rx="4" fill="#a855f7" stroke="#ffffff" strokeWidth="1" />
                              <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                                x{spawnerBoxes.length}
                              </text>
                            </g>
                          )}

                          {/* Lock Overlay if Blocked */}
                          {isBlocked && (
                            <g transform="translate(0, 0)">
                              <circle cx="0" cy="0" r="14" fill="rgba(15, 23, 42, 0.75)" stroke="#ef4444" strokeWidth="1.5" />
                              <text x="0" y="4" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">
                                🔒
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}
                </g>
              </svg>
            </div>

            {/* Floating Zoom & Pan Controls (Bottom-Left) */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-xl pointer-events-auto">
              <button
                onClick={() => setZoom(z => Math.min(z * 1.2, 2.5))}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => setZoom(z => Math.max(z / 1.2, 0.4))}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
                title="Reset Zoom & Pan"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Level Win Modal Overlay */}
        {isWon && (
          <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/10 animate-bounce">
                <Trophy size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-100 uppercase tracking-wider mb-1">
                Level Complete!
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                All {levelData.BoardNodes.length} boxes cleared successfully.
              </p>
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={resetGame}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw size={14} />
                  <span>Replay</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/30"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
"""

with open('src/components/Playtest/PlaytestModal.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print("Successfully generated clean PlaytestModal.tsx!")
