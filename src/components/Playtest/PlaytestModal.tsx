import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { LevelData, BoardNode, BoxNode, SpawnerNode, SpawnBox } from '../../types/level';
import { ConveyorData, ConveyorSlot, ConveyorNode } from '../../types/conveyor';
import { DEFAULT_CONVEYOR_DATA } from '../../constants/defaultConveyor';
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
  Lock,
  Tv,
  Workflow,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface PlaytestModalProps {
  levelData: LevelData;
  conveyorData?: ConveyorData;
  onClose: () => void;
}

interface DockedBox {
  instanceId: string;
  slotIdx: number;
  slotId: string;
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
  dist: number; // Distance along track (0 to L_TOTAL)
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

interface RoutePoint {
  x: number;
  y: number;
  dist: number;
  angle: number;
}

const BELT_SPEED = 190.0; // pixels per second
const MIN_CARD_DISTANCE = 32.0;
const GRID_SCALE = 62.0; // Screen pixels per unity unit

function resolveCardOverlaps(cards: ConveyorCard[], totalLength: number): void {
  if (cards.length <= 1 || totalLength <= 0) return;

  cards.sort((a, b) => a.dist - b.dist);

  for (let iter = 0; iter < 4; iter++) {
    for (let i = 0; i < cards.length - 1; i++) {
      const diff = cards[i + 1].dist - cards[i].dist;
      if (diff < MIN_CARD_DISTANCE) {
        cards[i + 1].dist = (cards[i].dist + MIN_CARD_DISTANCE) % totalLength;
      }
    }

    const wrapGap = (cards[0].dist + totalLength) - cards[cards.length - 1].dist;
    if (wrapGap < MIN_CARD_DISTANCE) {
      const shift = MIN_CARD_DISTANCE - wrapGap;
      for (let i = 0; i < cards.length; i++) {
        cards[i].dist = (cards[i].dist + shift / 2) % totalLength;
      }
      cards.sort((a, b) => a.dist - b.dist);
    }
  }
}

export const PlaytestModal: React.FC<PlaytestModalProps> = ({
  levelData,
  conveyorData = DEFAULT_CONVEYOR_DATA,
  onClose,
}) => {
  // Zoom & Pan state for unified level area
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Conveyor definitions
  const activeSlots = useMemo(() => {
    return conveyorData.ConveyorSlots && conveyorData.ConveyorSlots.length > 0
      ? conveyorData.ConveyorSlots
      : DEFAULT_CONVEYOR_DATA.ConveyorSlots;
  }, [conveyorData]);

  const activeNodes = useMemo(() => {
    return conveyorData.ConveyorNodes && conveyorData.ConveyorNodes.length > 0
      ? conveyorData.ConveyorNodes
      : DEFAULT_CONVEYOR_DATA.ConveyorNodes;
  }, [conveyorData]);

  const activeRoute = useMemo(() => {
    return conveyorData.ConveyorRoute && conveyorData.ConveyorRoute.length > 0
      ? conveyorData.ConveyorRoute
      : activeNodes.map(n => n.Id);
  }, [conveyorData, activeNodes]);

  const isLoopTrack = conveyorData.IsLoop ?? false;

  // Game state
  const [boxSlots, setBoxSlots] = useState<(DockedBox | null)[]>(() => new Array(activeSlots.length).fill(null));
  const [clearedNodes, setClearedNodes] = useState<Set<string>>(new Set());
  const [spawnerQueues, setSpawnerQueues] = useState<Map<string, SpawnBox[]>>(new Map());
  const [deliveredCardsCount, setDeliveredCardsCount] = useState<number>(0);
  const [deliveredBoxesCount, setDeliveredBoxesCount] = useState<number>(0);
  const [boxesSentUpCount, setBoxesSentUpCount] = useState<number>(0);
  const [adUnlockedSlots, setAdUnlockedSlots] = useState<Set<string>>(new Set());
  const [isWon, setIsWon] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  // Simulation Refs
  const conveyorCardsRef = useRef<ConveyorCard[]>([]);
  const flyingCardsRef = useRef<FlyingCard[]>([]);
  const boxSlotsRef = useRef<(DockedBox | null)[]>([]);
  const clearedNodesRef = useRef<Set<string>>(new Set());
  const boxesSentUpRef = useRef<number>(0);
  const adUnlockedSlotsRef = useRef<Set<string>>(new Set());

  const [, setFrameTick] = useState(0);
  const lastTimeRef = useRef<number>(performance.now());
  const animationFrameRef = useRef<number | null>(null);

  // === UNIFIED SCENE LAYOUT & SPATIAL POSITIONING ===
  // Position Conveyor at the top and Board in the middle/lower area with clean separation distance
  const sceneLayout = useMemo(() => {
    // 1. Conveyor bounds
    const convX = [...activeNodes.map(n => n.XPosition), ...activeSlots.map(s => s.XPosition)];
    const convZ = [...activeNodes.map(n => n.ZPosition), ...activeSlots.map(s => s.ZPosition)];

    const minConvX = convX.length > 0 ? Math.min(...convX) : -3.5;
    const maxConvX = convX.length > 0 ? Math.max(...convX) : 3.5;
    const minConvZ = convZ.length > 0 ? Math.min(...convZ) : 0;
    const maxConvZ = convZ.length > 0 ? Math.max(...convZ) : 2.5;

    // 2. Board bounds
    const boardNodes = levelData.BoardNodes || [];
    const bX = boardNodes.map(b => b.XPosition !== undefined ? b.XPosition : (b.MapPosX ?? 0));
    const bZ = boardNodes.map(b => b.ZPosition !== undefined ? b.ZPosition : ((b.MapPosY ?? 0) + (b.YPosition ?? 0)));

    const minBX = bX.length > 0 ? Math.min(...bX) : -2.0;
    const maxBX = bX.length > 0 ? Math.max(...bX) : 2.0;
    const minBZ = bZ.length > 0 ? Math.min(...bZ) : -2.0;
    const maxBZ = bZ.length > 0 ? Math.max(...bZ) : 1.0;

    // Vertical distance margin between conveyor bottom and board top
    const userOffsetZ = conveyorData.BoardOffsetZ !== undefined ? conveyorData.BoardOffsetZ : 2.0;
    const userOffsetX = conveyorData.BoardOffsetX !== undefined ? conveyorData.BoardOffsetX : 0.0;

    // Ensure minimum clear separation gap (e.g. at least 2.2 units between conveyor bottom and board top)
    const requiredGap = Math.max(userOffsetZ, 2.2);
    // Board shift downwards so board top sits at (minConvZ - requiredGap)
    const boardZShift = (minConvZ - maxBZ - requiredGap);

    // Combined bounds
    const totalMinX = Math.min(minConvX, minBX + userOffsetX) - 1.2;
    const totalMaxX = Math.max(maxConvX, maxBX + userOffsetX) + 1.2;
    const totalMinZ = Math.min(minConvZ - 0.5, minBZ + boardZShift) - 1.2;
    const totalMaxZ = Math.max(maxConvZ + 0.8, maxBZ + boardZShift) + 0.8;

    const centerX = (totalMinX + totalMaxX) / 2;
    const centerZ = (totalMinZ + totalMaxZ) / 2;

    // Coordinate converters
    const unityToScreen = (ux: number, uz: number) => {
      const sx = (ux - centerX) * GRID_SCALE;
      const sy = -(uz - centerZ) * GRID_SCALE;
      return { x: sx, y: sy };
    };

    // Build dense track points along ConveyorRoute
    const nodeMap = new Map(activeNodes.map(n => [n.Id, n]));
    const orderedNodes: ConveyorNode[] = [];
    for (const id of activeRoute) {
      const n = nodeMap.get(id);
      if (n) orderedNodes.push(n);
    }
    if (orderedNodes.length === 0) {
      orderedNodes.push(...activeNodes);
    }

    const fullRouteNodes = [...orderedNodes];
    if (isLoopTrack && fullRouteNodes.length > 2) {
      fullRouteNodes.push(fullRouteNodes[0]);
    }

    const densePoints: RoutePoint[] = [];
    let accumDist = 0;

    for (let i = 0; i < fullRouteNodes.length - 1; i++) {
      const p1 = unityToScreen(fullRouteNodes[i].XPosition, fullRouteNodes[i].ZPosition);
      const p2 = unityToScreen(fullRouteNodes[i + 1].XPosition, fullRouteNodes[i + 1].ZPosition);

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const segLen = Math.sqrt(dx * dx + dy * dy);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      const steps = Math.max(Math.ceil(segLen / 4), 1);
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        densePoints.push({
          x: p1.x + dx * t,
          y: p1.y + dy * t,
          dist: accumDist + segLen * t,
          angle,
        });
      }
      accumDist += segLen;
    }

    const totalLen = accumDist > 0 ? accumDist : 1000;

    // Slot Checkpoints on track
    const checkpoints = activeSlots.map(slot => {
      const targetNode = nodeMap.get(slot.TargetNodeId);
      if (targetNode) {
        const targetSvg = unityToScreen(targetNode.XPosition, targetNode.ZPosition);
        let closestDist = 0;
        let minDistSq = Infinity;
        for (const pt of densePoints) {
          const dSq = (pt.x - targetSvg.x) ** 2 + (pt.y - targetSvg.y) ** 2;
          if (dSq < minDistSq) {
            minDistSq = dSq;
            closestDist = pt.dist;
          }
        }
        return closestDist;
      }
      return 0;
    });

    return {
      unityToScreen,
      boardZShift,
      userOffsetX,
      trackPoints: densePoints,
      totalTrackLength: totalLen,
      slotCheckpoints: checkpoints,
      orderedNodes,
    };
  }, [activeNodes, activeSlots, activeRoute, isLoopTrack, levelData.BoardNodes, conveyorData.BoardOffsetX, conveyorData.BoardOffsetZ]);

  // Sync refs
  useEffect(() => {
    boxSlotsRef.current = boxSlots;
  }, [boxSlots]);

  useEffect(() => {
    clearedNodesRef.current = clearedNodes;
  }, [clearedNodes]);

  useEffect(() => {
    boxesSentUpRef.current = boxesSentUpCount;
  }, [boxesSentUpCount]);

  useEffect(() => {
    adUnlockedSlotsRef.current = adUnlockedSlots;
  }, [adUnlockedSlots]);

  const showWarning = (msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(null), 3000);
  };

  const isSlotUnlocked = useCallback((slot: ConveyorSlot, sentUp: number, adUnlocked: Set<string>): boolean => {
    if (slot.UnlockedByAd && !adUnlocked.has(slot.Id)) {
      return false;
    }
    if (slot.LockedTurn > 0 && sentUp < slot.LockedTurn) {
      return false;
    }
    return true;
  }, []);

  const handleUnlockAdSlot = (slotId: string) => {
    setAdUnlockedSlots(prev => {
      const next = new Set(prev);
      next.add(slotId);
      return next;
    });
    showWarning(`Slot ${slotId} unlocked!`);
  };

  // Reset entire simulation
  const resetGame = useCallback(() => {
    conveyorCardsRef.current = [];
    flyingCardsRef.current = [];
    boxSlotsRef.current = new Array(activeSlots.length).fill(null);
    clearedNodesRef.current = new Set();
    boxesSentUpRef.current = 0;
    adUnlockedSlotsRef.current = new Set();

    setBoxSlots(new Array(activeSlots.length).fill(null));
    setClearedNodes(new Set());
    setBoxesSentUpCount(0);
    setAdUnlockedSlots(new Set());
    
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
  }, [levelData, activeSlots]);

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

  // Track position helper
  const getTrackCoords = useCallback((distance: number): RoutePoint => {
    const { trackPoints, totalTrackLength } = sceneLayout;
    if (!trackPoints || trackPoints.length === 0) {
      return { x: 0, y: 0, dist: 0, angle: 0 };
    }
    const d = ((distance % totalTrackLength) + totalTrackLength) % totalTrackLength;
    
    let low = 0;
    let high = trackPoints.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (trackPoints[mid].dist < d) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    const idx = Math.min(Math.max(low, 0), trackPoints.length - 1);
    return trackPoints[idx];
  }, [sceneLayout]);

  // Main 60FPS Continuous Animation & Physics Loop
  useEffect(() => {
    const updateLoop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      let hasStateChanges = false;
      const { totalTrackLength, slotCheckpoints, unityToScreen } = sceneLayout;
      const currentConveyor = conveyorCardsRef.current;
      const currentFlying = flyingCardsRef.current;
      const currentSlots = [...boxSlotsRef.current];

      // 1. Advance cards along conveyor track
      for (let i = 0; i < currentConveyor.length; i++) {
        currentConveyor[i].dist = (currentConveyor[i].dist + BELT_SPEED * dt) % totalTrackLength;
      }

      resolveCardOverlaps(currentConveyor, totalTrackLength);

      // 2. Check Proximity Flying for Each Card to matching Docked Box
      const remainingConveyor: ConveyorCard[] = [];

      for (let i = 0; i < currentConveyor.length; i++) {
        const card = currentConveyor[i];
        let triggeredFly = false;

        for (let slotIdx = 0; slotIdx < activeSlots.length; slotIdx++) {
          const slot = activeSlots[slotIdx];
          const box = currentSlots[slotIdx];

          if (!box || box.isClearing || box.boxColor !== card.color) {
            continue;
          }

          const checkpoint = slotCheckpoints[slotIdx] || 0;
          const neededCards = box.capacity - (box.currentCards.length + box.incomingCount);

          if (neededCards > 0) {
            const distDiff = Math.abs(card.dist - checkpoint);
            if (distDiff < BELT_SPEED * dt * 2.0 || (card.dist >= checkpoint && card.dist - checkpoint < 26.0)) {
              const cardPos = getTrackCoords(card.dist);
              const slotPos = unityToScreen(slot.XPosition, slot.ZPosition);

              box.incomingCount += 1;
              currentFlying.push({
                uid: `fly_${card.uid}_${Date.now()}`,
                color: card.color,
                startX: cardPos.x,
                startY: cardPos.y,
                targetX: slotPos.x,
                targetY: slotPos.y,
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
  }, [levelData, activeSlots, sceneLayout, getTrackCoords]);

  // Handle clicking a box on the board
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
    const { totalTrackLength } = sceneLayout;

    // === TRAY LOGIC ===
    if (isTray) {
      const newCards: ConveyorCard[] = activeBox.InitCards.map((col, idx) => ({
        uid: `card_tray_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
        color: col,
        dist: ((totalTrackLength - idx * MIN_CARD_DISTANCE) % totalTrackLength + totalTrackLength) % totalTrackLength,
      }));
      conveyorCardsRef.current = [...conveyorCardsRef.current, ...newCards];
      resolveCardOverlaps(conveyorCardsRef.current, totalTrackLength);

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
    let availableSlotIdx = -1;

    for (let i = 0; i < activeSlots.length; i++) {
      const slot = activeSlots[i];
      if (isSlotUnlocked(slot, boxesSentUpCount, adUnlockedSlots) && currentSlots[i] === null) {
        availableSlotIdx = i;
        break;
      }
    }

    if (availableSlotIdx === -1) {
      const hasLockedSlots = activeSlots.some(s => !isSlotUnlocked(s, boxesSentUpCount, adUnlockedSlots));
      if (hasLockedSlots) {
        showWarning('All unlocked slots are full! Send more boxes to unlock move-slots or unlock via Ad.');
      } else {
        showWarning('All slots are occupied! Clear a matching box first.');
      }
      return;
    }

    const chosenSlot = activeSlots[availableSlotIdx];

    let matchingInBox: number[] = [];
    let unmatchedInBox: number[] = [];

    for (const c of activeBox.InitCards) {
      if (c === activeBox.BoxColor && matchingInBox.length < boxType.capacity) {
        matchingInBox.push(c);
      } else {
        unmatchedInBox.push(c);
      }
    }

    const newSentUp = boxesSentUpCount + 1;
    setBoxesSentUpCount(newSentUp);
    boxesSentUpRef.current = newSentUp;

    const uniqueInstanceId = `box_${nodeId}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newDockedBox: DockedBox = {
      instanceId: uniqueInstanceId,
      slotIdx: availableSlotIdx,
      slotId: chosenSlot.Id,
      id: nodeId,
      boardNode,
      boxColor: activeBox.BoxColor,
      capacity: boxType.capacity,
      currentCards: matchingInBox,
      incomingCount: 0,
      timestamp: Date.now(),
      isFull: matchingInBox.length >= boxType.capacity,
    };

    const newCards: ConveyorCard[] = unmatchedInBox.map((col, idx) => ({
      uid: `card_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
      color: col,
      dist: ((totalTrackLength - idx * MIN_CARD_DISTANCE) % totalTrackLength + totalTrackLength) % totalTrackLength,
    }));

    conveyorCardsRef.current = [...conveyorCardsRef.current, ...newCards];
    resolveCardOverlaps(conveyorCardsRef.current, totalTrackLength);

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

  // SVG Track Path calculation for Unified Conveyor Rail
  const trackSvgPath = useMemo(() => {
    const { trackPoints } = sceneLayout;
    if (!trackPoints || trackPoints.length === 0) return '';
    let d = `M ${trackPoints[0].x} ${trackPoints[0].y}`;
    for (let i = 1; i < trackPoints.length; i += 2) {
      d += ` L ${trackPoints[i].x} ${trackPoints[i].y}`;
    }
    if (isLoopTrack) {
      d += ' Z';
    }
    return d;
  }, [sceneLayout, isLoopTrack]);

  const currentConveyorCount = conveyorCardsRef.current.length;
  const occupiedSlotsCount = boxSlots.filter(b => b !== null && !b.isClearing).length;

  const { unityToScreen, boardZShift, userOffsetX, orderedNodes } = sceneLayout;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none">
      <div className="relative w-full max-w-5xl h-[94vh] bg-[#759ebb] rounded-3xl overflow-hidden border-4 border-slate-700 shadow-2xl flex flex-col">
        
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
                <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                  <Workflow size={11} /> Unified Level Simulation
                </span>
                {levelData.IsHardLvl && (
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                    ⚡ Hard Level
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Docked Boxes: {occupiedSlotsCount}/{activeSlots.length} • Delivered: {deliveredCardsCount}/{totalCardsInLevel} Cards
              </span>
            </div>
          </div>

          {/* Right Controls: Reset & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={resetGame}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition active:scale-95"
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

        {/* SINGLE UNIFIED PLAYTEST CANVAS (CONVEYOR & BOARD IN ONE SCENE) */}
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
            <svg className="w-[1000px] h-[900px] pointer-events-auto" viewBox="-500 -450 1000 900">
              <defs>
                <linearGradient id="unifiedBeltGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#293548" />
                  <stop offset="50%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#293548" />
                </linearGradient>
                <linearGradient id="portalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#172554" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. CONVEYOR DOCKING PARKING SLOTS (Positioned above/behind track) */}
              <g id="conveyor-docking-slots">
                {activeSlots.map((slot, slotIdx) => {
                  const svgPos = unityToScreen(slot.XPosition, slot.ZPosition);
                  const box = boxSlots[slotIdx];
                  const colorDef = box ? getColor(box.boxColor) : null;
                  const isClearing = box?.isClearing;

                  const isAdLocked = slot.UnlockedByAd && !adUnlockedSlots.has(slot.Id);
                  const isMoveLocked = slot.LockedTurn > 0 && boxesSentUpCount < slot.LockedTurn;
                  const remainingMoves = Math.max(0, slot.LockedTurn - boxesSentUpCount);

                  const slotW = 68;
                  const slotH = 92;

                  return (
                    <g key={`unified-slot-${slot.Id}-${slotIdx}`} transform={`translate(${svgPos.x}, ${svgPos.y})`}>
                      {/* Slot Docking Base Plate */}
                      <rect
                        x={-slotW / 2}
                        y={-slotH / 2}
                        width={slotW}
                        height={slotH}
                        rx={14}
                        fill={isAdLocked ? '#450a0a' : isMoveLocked ? '#2e1065' : '#1e293b'}
                        stroke={isAdLocked ? '#ef4444' : isMoveLocked ? '#a855f7' : '#ffffff'}
                        strokeWidth={2.5}
                        strokeDasharray={box ? 'none' : '5,4'}
                        className="transition-colors duration-300"
                      />

                      {/* Docked Box Body */}
                      {box && colorDef ? (
                        <g
                          className={`transition-all duration-300 ${
                            isClearing ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
                          }`}
                        >
                          <rect
                            x={-slotW / 2 + 2}
                            y={-slotH / 2 + 2}
                            width={slotW - 4}
                            height={slotH - 4}
                            rx={12}
                            fill={colorDef.hex}
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                          <rect
                            x={-slotW / 2 + 6}
                            y={-slotH / 2 + 6}
                            width={slotW - 12}
                            height={slotH - 12}
                            rx={8}
                            fill={colorDef.darkHex}
                            opacity={0.35}
                          />

                          {/* Capacity Label */}
                          <text
                            x="0"
                            y={-slotH / 2 + 16}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="10"
                            fontWeight="900"
                            fontFamily="monospace"
                          >
                            {box.currentCards.length}/{box.capacity}
                          </text>

                          {/* Cards / Slots inside Docked Box (2 Rows x N Cols) */}
                          {(() => {
                            const rows = 2;
                            const cols = Math.max(Math.ceil(box.capacity / rows), 1);
                            const totalSlots = cols * rows;

                            const margin = 8;
                            const innerW = slotW - 2 * margin;
                            const innerH = slotH - 34;

                            const cellW = innerW / cols;
                            const cellH = innerH / rows;

                            const cardW = Math.max(cellW - 4, 4);
                            const cardH = Math.max(cellH - 4, 4);
                            const cardRx = Math.min(cardW, cardH) * 0.25;

                            const elements: React.ReactNode[] = [];

                            for (let sIdx = 0; sIdx < totalSlots; sIdx++) {
                              const col = Math.floor(sIdx / rows);
                              const row = sIdx % rows;

                              const slotCenterX = -slotW / 2 + margin + (col + 0.5) * cellW;
                              const slotCenterY = -slotH / 2 + 20 + (row + 0.5) * cellH;

                              const hasCard = sIdx < box.currentCards.length;
                              const cCol = hasCard ? box.currentCards[sIdx] : null;
                              const cColor = cCol !== null ? getColor(cCol) : null;

                              if (hasCard && cColor) {
                                elements.push(
                                  <g key={`docked-card-${sIdx}`}>
                                    <rect
                                      x={slotCenterX - cardW / 2 + 1}
                                      y={slotCenterY - cardH / 2 + 1}
                                      width={cardW}
                                      height={cardH}
                                      rx={cardRx}
                                      fill="rgba(0, 0, 0, 0.25)"
                                    />
                                    <rect
                                      x={slotCenterX - cardW / 2}
                                      y={slotCenterY - cardH / 2}
                                      width={cardW}
                                      height={cardH}
                                      rx={cardRx}
                                      fill={cColor.hex}
                                      stroke="#ffffff"
                                      strokeWidth={1}
                                    />
                                    <rect
                                      x={slotCenterX - cardW / 2 + 1.5}
                                      y={slotCenterY - cardH / 2 + 1.5}
                                      width={cardW - 3}
                                      height={Math.max(cardH * 0.35, 2)}
                                      rx={cardRx / 2}
                                      fill="rgba(255, 255, 255, 0.4)"
                                    />
                                  </g>
                                );
                              } else {
                                elements.push(
                                  <rect
                                    key={`empty-docked-slot-${sIdx}`}
                                    x={slotCenterX - cardW / 2}
                                    y={slotCenterY - cardH / 2}
                                    width={cardW}
                                    height={cardH}
                                    rx={cardRx}
                                    fill="rgba(0, 0, 0, 0.15)"
                                    stroke="rgba(255, 255, 255, 0.2)"
                                    strokeWidth={0.8}
                                    strokeDasharray="2,2"
                                  />
                                );
                              }
                            }

                            return elements;
                          })()}
                        </g>
                      ) : isAdLocked ? (
                        /* Ad Locked Slot UI */
                        <g
                          className="cursor-pointer group"
                          onClick={() => handleUnlockAdSlot(slot.Id)}
                        >
                          <circle cx="0" cy="-6" r="14" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.5" />
                          <text x="0" y="-1" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">
                            📺
                          </text>
                          <rect
                            x="-28"
                            y="14"
                            width="56"
                            height="16"
                            rx="5"
                            fill="#ef4444"
                            className="group-hover:fill-rose-400 transition"
                          />
                          <text
                            x="0"
                            y="25"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="bold"
                          >
                            UNLOCK AD
                          </text>
                        </g>
                      ) : isMoveLocked ? (
                        /* Move Locked Slot UI */
                        <g>
                          <circle cx="0" cy="-6" r="14" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
                          <text x="0" y="-1" textAnchor="middle" fill="#e9d5ff" fontSize="12" fontWeight="bold">
                            🔒
                          </text>
                          <rect
                            x="-28"
                            y="14"
                            width="56"
                            height="16"
                            rx="5"
                            fill="#7e22ce"
                          />
                          <text
                            x="0"
                            y="25"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="bold"
                          >
                            MOVE {remainingMoves}
                          </text>
                        </g>
                      ) : (
                        /* Unlocked Empty Slot */
                        <g>
                          <text
                            x="0"
                            y="4"
                            textAnchor="middle"
                            fill="#94a3b8"
                            fontSize="11"
                            fontWeight="800"
                          >
                            Slot {slotIdx + 1}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* 2. CONVEYOR RAIL TRACK */}
              {trackSvgPath && (
                <g id="conveyor-track-system">
                  <path
                    d={trackSvgPath}
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="42"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={trackSvgPath}
                    fill="none"
                    stroke="url(#unifiedBeltGradient)"
                    strokeWidth="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={trackSvgPath}
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="22"
                    strokeDasharray="8,6"
                  />
                  <path
                    d={trackSvgPath}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    opacity="0.5"
                  />

                  {/* Left & Right Portal Casings (if not loop) */}
                  {!isLoopTrack && orderedNodes.length >= 2 && (
                    <>
                      {/* Entry Portal (First Node) */}
                      {(() => {
                        const p0 = unityToScreen(orderedNodes[0].XPosition, orderedNodes[0].ZPosition);
                        return (
                          <g transform={`translate(${p0.x - 12}, ${p0.y})`}>
                            <rect x="-16" y="-28" width="32" height="56" rx="8" fill="url(#portalGrad)" stroke="#60a5fa" strokeWidth="2.5" />
                            <ellipse cx="0" cy="0" rx="6" ry="18" fill="#0f172a" />
                            <text x="0" y="-32" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">
                              IN
                            </text>
                          </g>
                        );
                      })()}

                      {/* Exit Portal (Last Node) */}
                      {(() => {
                        const pN = unityToScreen(orderedNodes[orderedNodes.length - 1].XPosition, orderedNodes[orderedNodes.length - 1].ZPosition);
                        return (
                          <g transform={`translate(${pN.x + 12}, ${pN.y})`}>
                            <rect x="-16" y="-28" width="32" height="56" rx="8" fill="url(#portalGrad)" stroke="#60a5fa" strokeWidth="2.5" />
                            <ellipse cx="0" cy="0" rx="6" ry="18" fill="#0f172a" />
                            <text x="0" y="-32" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">
                              OUT
                            </text>
                          </g>
                        );
                      })()}
                    </>
                  )}
                </g>
              )}

              {/* 3. CARDS RIDING ALONG CONVEYOR TRACK */}
              <g id="conveyor-riding-cards">
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
                        y="-14"
                        width="20"
                        height="28"
                        rx="4"
                        fill="rgba(0, 0, 0, 0.45)"
                      />
                      <rect
                        x="-9"
                        y="-13"
                        width="18"
                        height="26"
                        rx="4"
                        fill={colorDef.hex}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="-7"
                        y="-11"
                        width="14"
                        height="4"
                        rx="2"
                        fill="rgba(255, 255, 255, 0.6)"
                      />
                    </g>
                  );
                })}
              </g>

              {/* 4. BOARD LEVEL BOXES (Rendered with exact visual and spacing) */}
              <g id="board-level-boxes">
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

                    const unityX = (bn.XPosition !== undefined ? bn.XPosition : (bn.MapPosX ?? 0)) + userOffsetX;
                    const unityZ = (bn.ZPosition !== undefined ? bn.ZPosition : ((bn.MapPosY ?? 0) + (bn.YPosition ?? 0))) + boardZShift;

                    const pos = unityToScreen(unityX, unityZ);
                    const rot = bn.YRotation ?? bn.ZRotation ?? 0;
                    const svgAngle = (-rot + 360) % 360;

                    // Box dimensions matching editor (scale ~ 0.65 to fit seamlessly in unified view)
                    const boxScale = 0.65;
                    const w = boxType.width * boxScale;
                    const h = boxType.height * boxScale;
                    const layerId = bn.LayerId ?? bn.TileMapId ?? 0;
                    const layerElev = Math.min(Math.max(layerId, 0), 4);
                    const shadowY = layerElev * 3 + 3;

                    const cardCount = activeBox.InitCards.length;
                    const slotCount = Math.max(boxType.capacity, cardCount || 1);

                    return (
                      <g
                        key={`board-box-${bn.Id}`}
                        transform={`translate(${pos.x}, ${pos.y}) rotate(${svgAngle})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBoardBoxClick(bn.Id);
                        }}
                        className={`cursor-pointer transition-opacity duration-150 ${
                          isBlocked ? 'opacity-85 brightness-75' : ''
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
                        {isTray ? (
                          <g>
                            <rect
                              x={-w / 2}
                              y={-h / 2}
                              width={w}
                              height={h}
                              rx={12}
                              fill="#e2e8f0"
                              stroke={isBlocked ? '#475569' : '#ffffff'}
                              strokeWidth={2}
                            />
                            <rect
                              x={-w / 2 + 3}
                              y={-h / 2 + 3}
                              width={w - 6}
                              height={h - 6}
                              rx={9}
                              fill="#cbd5e1"
                              stroke="#94a3b8"
                              strokeWidth={1}
                            />
                          </g>
                        ) : (
                          <g>
                            <rect
                              x={-w / 2}
                              y={-h / 2}
                              width={w}
                              height={h}
                              rx={12}
                              fill={isHidden ? '#64748b' : colorDef.hex}
                              stroke={isBlocked ? '#475569' : '#ffffff'}
                              strokeWidth={2}
                            />
                            <rect
                              x={-w / 2 + 4}
                              y={-h / 2 + 4}
                              width={w - 8}
                              height={h - 8}
                              rx={8}
                              fill={isHidden ? '#475569' : colorDef.darkHex}
                              opacity={0.35}
                            />
                          </g>
                        )}

                        {/* Internal Cards or Slots Grid (2 Rows x N Cols) */}
                        <g>
                          {(() => {
                            const rows = 2;
                            const cols = Math.max(Math.ceil(boxType.capacity / rows), 1);
                            const totalSlots = cols * rows;

                            const margin = 6;
                            const innerW = w - 2 * margin;
                            const innerH = h - 2 * margin;

                            const cellW = innerW / cols;
                            const cellH = innerH / rows;

                            const padX = 2;
                            const padY = 2;
                            const cardW = Math.max(cellW - padX * 2, 3);
                            const cardH = Math.max(cellH - padY * 2, 3);
                            const cardRx = Math.min(cardW, cardH) * 0.25;

                            const elements: React.ReactNode[] = [];

                            for (let slotIdx = 0; slotIdx < totalSlots; slotIdx++) {
                              const col = Math.floor(slotIdx / rows);
                              const row = slotIdx % rows;

                              const slotCenterX = -w / 2 + margin + (col + 0.5) * cellW;
                              const slotCenterY = -h / 2 + margin + (row + 0.5) * cellH;

                              const hasCard = slotIdx < cardCount;
                              const cardColorId = hasCard ? activeBox.InitCards[slotIdx] : null;
                              const cardColor = cardColorId !== null ? getColor(cardColorId) : null;

                              if (hasCard && cardColor) {
                                elements.push(
                                  <g key={`box-card-${slotIdx}`}>
                                    {/* Card Drop Shadow */}
                                    <rect
                                      x={slotCenterX - cardW / 2 + 1}
                                      y={slotCenterY - cardH / 2 + 1}
                                      width={cardW}
                                      height={cardH}
                                      rx={cardRx}
                                      fill="rgba(0, 0, 0, 0.25)"
                                    />
                                    {/* Card Base */}
                                    <rect
                                      x={slotCenterX - cardW / 2}
                                      y={slotCenterY - cardH / 2}
                                      width={cardW}
                                      height={cardH}
                                      rx={cardRx}
                                      fill={areCardsHidden ? '#334155' : isHidden ? '#64748b' : cardColor.hex}
                                      stroke={areCardsHidden ? '#64748b' : '#ffffff'}
                                      strokeWidth={1}
                                    />
                                    {/* Card Gloss / Question Mark if hidden */}
                                    {areCardsHidden ? (
                                      <text
                                        x={slotCenterX}
                                        y={slotCenterY + 3}
                                        textAnchor="middle"
                                        fill="#94a3b8"
                                        fontSize={8}
                                        fontWeight="bold"
                                      >
                                        ?
                                      </text>
                                    ) : (
                                      <rect
                                        x={slotCenterX - cardW / 2 + 1}
                                        y={slotCenterY - cardH / 2 + 1}
                                        width={Math.max(cardW - 2, 1)}
                                        height={Math.max(cardH * 0.35, 2)}
                                        rx={cardRx / 2}
                                        fill="rgba(255, 255, 255, 0.35)"
                                      />
                                    )}
                                  </g>
                                );
                              } else {
                                // Empty Slot Placeholder
                                elements.push(
                                  <rect
                                    key={`empty-slot-${slotIdx}`}
                                    x={slotCenterX - cardW / 2}
                                    y={slotCenterY - cardH / 2}
                                    width={cardW}
                                    height={cardH}
                                    rx={cardRx}
                                    fill="rgba(0, 0, 0, 0.12)"
                                    stroke="rgba(255, 255, 255, 0.18)"
                                    strokeWidth={0.8}
                                    strokeDasharray="2,2"
                                  />
                                );
                              }
                            }

                            return elements;
                          })()}
                        </g>

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

              {/* 5. FLYING CARDS TO DOCKED BOXES */}
              <g id="flying-cards">
                {flyingCardsRef.current.map((fc) => {
                  const t = fc.progress;
                  const curX = fc.startX + (fc.targetX - fc.startX) * t;
                  const curY = fc.startY + (fc.targetY - fc.startY) * t - Math.sin(t * Math.PI) * 45;
                  const scale = 1.0 + Math.sin(t * Math.PI) * 0.3;
                  const colorDef = getColor(fc.color);

                  return (
                    <g
                      key={`flying-${fc.uid}`}
                      transform={`translate(${curX}, ${curY}) scale(${scale})`}
                      filter="url(#glow)"
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
