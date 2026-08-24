import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  PackageCheck, 
  AlertTriangle,
  Sparkles,
  Layers,
  Inbox,
  Move
} from 'lucide-react';

interface PlaytestModalProps {
  levelData: LevelData;
  onClose: () => void;
}

interface DockedBox {
  id: string;
  boardNode: BoardNode;
  boxColor: number;
  capacity: number;
  currentCards: number[];
  timestamp: number;
  isFull: boolean;
}

const MAX_BOX_SLOTS = 5;
const MAX_CARD_SLOTS = 24;

export const PlaytestModal: React.FC<PlaytestModalProps> = ({ levelData, onClose }) => {
  // Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Game state
  const [dockedBoxes, setDockedBoxes] = useState<DockedBox[]>([]);
  const [cardList, setCardList] = useState<number[]>([]);
  const [clearedNodes, setClearedNodes] = useState<Set<string>>(new Set());
  const [spawnerQueues, setSpawnerQueues] = useState<Map<string, SpawnBox[]>>(new Map());
  const [deliveredCardsCount, setDeliveredCardsCount] = useState<number>(0);
  const [deliveredBoxesCount, setDeliveredBoxesCount] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const showWarning = (msg: string) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(null), 3000);
  };

  // Reset entire level playtest
  const resetGame = useCallback(() => {
    setDockedBoxes([]);
    setCardList([]);
    setClearedNodes(new Set());
    
    // Initialize spawner queues
    const initialSpawners = new Map<string, SpawnBox[]>();
    for (const sn of (levelData.SpawnerNodes || [])) {
      initialSpawners.set(sn.Id, [...sn.SpawnBoxes]);
    }
    setSpawnerQueues(initialSpawners);

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
    return count;
  }, [levelData]);

  // Live blocked nodes on the board
  const liveBlockedByMap = useMemo(() => {
    const remainingBoxNodes = levelData.BoxNodes.filter(b => !clearedNodes.has(b.Id));
    return getBlockedByMap(remainingBoxNodes);
  }, [levelData.BoxNodes, clearedNodes]);

  // Process matching cards from the card list into docked boxes (FIFO order)
  const processCardMatches = useCallback(
    (
      currentDocked: DockedBox[],
      cardsToProcess: number[]
    ): { updatedBoxes: DockedBox[]; remainingCards: number[]; cardsMoved: number; boxesCompleted: number } => {
      let boxes = currentDocked.map(b => ({ ...b, currentCards: [...b.currentCards] }));
      let cards = [...cardsToProcess];
      let cardsMoved = 0;
      let boxesCompleted = 0;

      let matched = true;
      while (matched) {
        matched = false;
        const nextRemainingCards: number[] = [];

        for (const cardColor of cards) {
          let absorbed = false;

          // Scan docked boxes from oldest (index 0) to latest
          for (let i = 0; i < boxes.length; i++) {
            const b = boxes[i];
            if (
              b.boxColor !== 5 &&
              b.boxColor === cardColor &&
              b.currentCards.length < b.capacity
            ) {
              b.currentCards.push(cardColor);
              absorbed = true;
              matched = true;
              cardsMoved++;
              break;
            }
          }

          if (!absorbed) {
            nextRemainingCards.push(cardColor);
          }
        }

        cards = nextRemainingCards;

        // Check for completed full boxes or emptied neutral trays
        const activeBoxes: DockedBox[] = [];
        for (const b of boxes) {
          if (b.boxColor !== 5 && b.currentCards.length >= b.capacity) {
            boxesCompleted++;
            matched = true;
          } else if (b.boxColor === 5) {
            boxesCompleted++;
            matched = true;
          } else {
            activeBoxes.push(b);
          }
        }

        boxes = activeBoxes;
      }

      return {
        updatedBoxes: boxes,
        remainingCards: cards,
        cardsMoved,
        boxesCompleted,
      };
    },
    []
  );

  // Handle clicking an unblocked box or spawner on the board with Swap-First evaluation
  const handleBoardBoxClick = (nodeId: string) => {
    const blockers = liveBlockedByMap.get(nodeId) || [];
    if (blockers.length > 0) return;

    const boardNode = levelData.BoardNodes.find(n => n.Id === nodeId);
    const boxNode = levelData.BoxNodes.find(b => b.Id === nodeId);
    const spawnerBoxes = spawnerQueues.get(nodeId);

    if (!boardNode || (!boxNode && (!spawnerBoxes || spawnerBoxes.length === 0))) return;

    // 1. Check 5 box slots capacity
    if (dockedBoxes.length >= MAX_BOX_SLOTS) {
      showWarning('All 5 box slots are occupied! Clear a matching box first.');
      return;
    }

    const activeBox = boxNode || (spawnerBoxes ? spawnerBoxes[0] : null);
    if (!activeBox) return;

    const boxType = getBoxType(activeBox.TypeId);
    const isTray = activeBox.BoxColor === 5 || boxType.isTray;

    // Separate matching cards that stay in the box from unmatched cards entering the card list
    let matchingInBox: number[] = [];
    let unmatchedInBox: number[] = [];

    if (isTray) {
      unmatchedInBox = [...activeBox.InitCards];
    } else {
      for (const c of activeBox.InitCards) {
        if (c === activeBox.BoxColor && matchingInBox.length < boxType.capacity) {
          matchingInBox.push(c);
        } else {
          unmatchedInBox.push(c);
        }
      }
    }

    const newDockedBox: DockedBox = {
      id: nodeId,
      boardNode,
      boxColor: activeBox.BoxColor,
      capacity: boxType.capacity,
      currentCards: matchingInBox,
      timestamp: Date.now(),
      isFull: matchingInBox.length >= boxType.capacity,
    };

    // Swap-First Simulation Check:
    // Append the new box to docked boxes and unmatched cards to the card queue
    const simulatedDockedList = [...dockedBoxes, newDockedBox];
    const simulatedCardQueue = [...cardList, ...unmatchedInBox];

    // Run the atomic matching & card absorption process
    const result = processCardMatches(simulatedDockedList, simulatedCardQueue);

    // If the resulting card list after all immediate swaps/matches exceeds MAX_CARD_SLOTS (24), reject
    if (result.remainingCards.length > MAX_CARD_SLOTS) {
      showWarning(
        `Card list full! (Would result in ${result.remainingCards.length}/${MAX_CARD_SLOTS} cards). Match cards before sending more.`
      );
      return;
    }

    // Move is VALID! Apply the transaction
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

    setDockedBoxes(result.updatedBoxes);
    setCardList(result.remainingCards);
    setClearedNodes(newClearedNodes);
    setDeliveredCardsCount(prev => prev + result.cardsMoved);
    setDeliveredBoxesCount(prev => prev + result.boxesCompleted);

    // Check Win condition
    if (
      newClearedNodes.size >= levelData.BoardNodes.length &&
      result.remainingCards.length === 0 &&
      result.updatedBoxes.length === 0
    ) {
      setIsWon(true);
    }
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
                  Swap-First Matching • Max 24 Cards
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Click unblocked boxes to dock them. Cards match and swap dynamically with the 24-slot queue!
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
          
          {/* TOP SECTION: 5 BOX SLOTS & 24 CARD SLOTS QUEUE */}
          <div className="w-full bg-[#5287aa] border-b-2 border-[#8ebfda]/40 p-3 flex flex-col items-center gap-3 shadow-lg shrink-0 z-20">
            
            {/* Row 1: 5 Box Holding Slots */}
            <div className="w-full max-w-4xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-white uppercase tracking-wider drop-shadow">
                  Box Slots ({dockedBoxes.length}/5):
                </span>
              </div>

              {/* 5 Box Slots Grid */}
              <div className="flex items-center justify-center gap-3 flex-1">
                {[0, 1, 2, 3, 4].map(slotIdx => {
                  const box = dockedBoxes[slotIdx];
                  const colorDef = box ? getColor(box.boxColor) : null;

                  return (
                    <div
                      key={`box-slot-${slotIdx}`}
                      className="w-20 h-20 rounded-2xl bg-[#3b6685]/80 border-2 border-dashed border-[#8ebfda] relative flex flex-col items-center justify-center shadow-md overflow-hidden transition-all"
                    >
                      {/* Corner Rivets */}
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-slate-100/80"></div>
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-100/80"></div>
                      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-slate-100/80"></div>
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-slate-100/80"></div>

                      {box && colorDef ? (
                        <div
                          className="w-full h-full p-1.5 rounded-xl flex flex-col justify-between items-center shadow-inner"
                          style={{
                            backgroundColor: colorDef.hex,
                            border: `2px solid #ffffff`,
                          }}
                        >
                          <div className="flex items-center justify-between w-full px-0.5">
                            <span className="text-[9px] font-mono font-bold text-white truncate">
                              {box.id}
                            </span>
                            <span className="text-[9px] font-mono font-black text-white bg-slate-900/60 px-1 rounded">
                              {box.currentCards.length}/{box.capacity}
                            </span>
                          </div>

                          {/* Inner Card Stack */}
                          <div className="w-full flex-1 flex flex-col justify-center gap-0.5 px-0.5">
                            {box.currentCards.map((cCol, idx) => (
                              <div
                                key={idx}
                                className="w-full h-2 rounded border border-white/40 shadow-sm"
                                style={{ backgroundColor: getColor(cCol).hex }}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-white/30 font-bold text-xs">
                          <span>Slot {slotIdx + 1}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress badge */}
              <div className="bg-slate-950/80 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-sky-400 shrink-0 shadow">
                Delivered: {deliveredCardsCount}/{totalCardsInLevel}
              </div>
            </div>

            {/* Row 2: 24 Card Slots Queue Grid */}
            <div className="w-full max-w-4xl bg-slate-950/40 p-2 rounded-2xl border border-slate-700/50 flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-sky-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Inbox size={12} className="text-sky-400" />
                  Card Queue ({cardList.length}/24 slots):
                </span>
                <span className="text-[10px] text-slate-300 font-mono">
                  Scanned Oldest → Latest
                </span>
              </div>

              {/* 24 Card Slots Grid (2 rows x 12 columns) */}
              <div className="grid grid-cols-12 gap-1.5">
                {Array.from({ length: MAX_CARD_SLOTS }).map((_, slotIdx) => {
                  const cardColor = cardList[slotIdx];
                  const hasCard = cardColor !== undefined;
                  const colorDef = hasCard ? getColor(cardColor) : null;

                  return (
                    <div
                      key={`card-slot-${slotIdx}`}
                      className={`h-7 rounded-lg border flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                        hasCard && colorDef
                          ? 'border-white text-white shadow-md animate-fadeIn'
                          : 'bg-slate-900/60 border-slate-800 text-slate-600'
                      }`}
                      style={{
                        backgroundColor: colorDef ? colorDef.hex : undefined,
                      }}
                      title={hasCard && colorDef ? `${colorDef.name} Card` : `Empty Slot ${slotIdx + 1}`}
                    >
                      {hasCard ? '' : slotIdx + 1}
                    </div>
                  );
                })}
              </div>
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
                    .sort((a, b) => b.TileMapId - a.TileMapId)
                    .map(bn => {
                      if (clearedNodes.has(bn.Id)) return null;

                      const bx = levelData.BoxNodes.find(b => b.Id === bn.Id);
                      const spawnerBoxes = spawnerQueues.get(bn.Id);
                      const activeBox = bx || (spawnerBoxes && spawnerBoxes.length > 0 ? spawnerBoxes[0] : null);

                      if (!activeBox) return null;

                      const isSpawner = !!spawnerBoxes && spawnerBoxes.length > 0;
                      const boxType = getBoxType(activeBox.TypeId);
                      const colorDef = getColor(activeBox.BoxColor);
                      const blockers = liveBlockedByMap.get(bn.Id) || [];
                      const isBlocked = blockers.length > 0;

                      const cx = (bn.MapPosX + bn.XPosition) * 74;
                      const cy = -(bn.MapPosY + bn.YPosition) * 74;
                      const svgAngle = (-bn.ZRotation + 360) % 360;

                      const w = boxType.width;
                      const h = boxType.height;
                      const isTray = boxType.isTray || activeBox.BoxColor === 5;
                      const layerElev = 4 - Math.min(bn.TileMapId, 4);
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
                                rx={12}
                                fill="#e2e8f0"
                                stroke={isBlocked ? '#64748b' : '#ffffff'}
                                strokeWidth={isBlocked ? 1.5 : 2.5}
                              />
                              <rect
                                x={-w / 2 + 3}
                                y={-h / 2 + 3}
                                width={w - 6}
                                height={h - 6}
                                rx={9}
                                fill="#cbd5e1"
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
                                fill={colorDef.hex}
                                stroke={isBlocked ? '#64748b' : '#ffffff'}
                                strokeWidth={isBlocked ? 1.5 : 2.5}
                              />
                              <rect
                                x={-w / 2 + 4}
                                y={-h / 2 + 4}
                                width={w - 8}
                                height={h - 8}
                                rx={8}
                                fill={colorDef.darkHex}
                                opacity={0.35}
                              />
                            </g>
                          )}

                          {/* Cards Stack inside Box */}
                          {activeBox.InitCards.map((cCol, cIdx) => {
                            const spacing = (h - 16) / Math.max(activeBox.InitCards.length, 1);
                            const cardY = -h / 2 + 8 + cIdx * spacing;
                            const cardW = w - 12;
                            const cColorDef = getColor(cCol);

                            return (
                              <g key={`play-box-card-${cIdx}`}>
                                <rect
                                  x={-cardW / 2}
                                  y={cardY}
                                  width={cardW}
                                  height={Math.min(spacing - 2, 14)}
                                  rx={3}
                                  fill={cColorDef.hex}
                                  stroke={cColorDef.borderHex}
                                  strokeWidth={1}
                                />
                                <rect
                                  x={-cardW / 2 + 2}
                                  y={cardY + 1}
                                  width={cardW - 4}
                                  height={3}
                                  rx={1.5}
                                  fill="rgba(255, 255, 255, 0.4)"
                                />
                              </g>
                            );
                          })}

                          {/* Spawner Badge */}
                          {isSpawner && (
                            <g transform={`translate(${-w / 2 + 8}, ${-h / 2 - 6})`}>
                              <rect x="-12" y="-6" width="24" height="12" rx="3" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                              <text x="0" y="3" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="900">
                                x{spawnerBoxes.length}
                              </text>
                            </g>
                          )}

                          {/* Lock Icon Badge if Blocked */}
                          {isBlocked && (
                            <g transform={`translate(${w / 2 - 14}, ${-h / 2 + 4})`}>
                              <circle cx="6" cy="6" r="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                              <path
                                d="M 4 6 L 4 4.5 C 4 3 5 2 6 2 C 7 2 8 3 8 4.5 L 8 6 M 3 6 L 9 6 L 9 9.5 L 3 9.5 Z"
                                fill="none"
                                stroke="#f43f5e"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
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
                onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
                title="Reset View & Center"
              >
                <Maximize2 size={16} />
              </button>
              <span className="text-[11px] font-mono text-slate-400 px-1">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Pan & Drag Hint Badge (Bottom-Right) */}
            <div className="absolute bottom-4 right-4 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-[11px] text-slate-400 flex items-center gap-2 pointer-events-none">
              <Move size={12} className="text-sky-400" />
              <span>Drag background to Pan • Scroll to Zoom</span>
            </div>

            {/* Win Celebration Banner */}
            {isWon && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn z-40 pointer-events-auto">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-2xl shadow-amber-400/40 mb-4 animate-bounce">
                  <Trophy size={42} className="text-slate-950" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
                  Level Complete!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mb-6">
                  All boxes and cards have been sorted and cleared through the 5 box slots!
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={resetGame}
                    className="py-2.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg transition active:scale-95 flex items-center gap-2"
                  >
                    <RotateCcw size={16} />
                    <span>Replay Level</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition"
                  >
                    Return to Builder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
