import React from 'react';
import { BoardNode, BoxNode, SpawnerNode } from '../../types/level';
import { getColor } from '../../constants/colors';
import { getBoxType } from '../../constants/boxTypes';
import { Point } from '../../utils/geometry';

interface BoxNodeVisualProps {
  boardNode: BoardNode;
  boxNode: BoxNode;
  spawnerNode?: SpawnerNode;
  center: Point;
  scaleMultiplier?: number;
  isSelected: boolean;
  isHovered: boolean;
  isBlocked: boolean;
  isBlockedBySelection: boolean;
  blocksSelected: boolean;
  layerOpacity: number;
  showLabels?: boolean;
  onSelect: (id: string, e: React.MouseEvent) => void;
  onMouseDown: (id: string, e: React.MouseEvent) => void;
  onRotateStart?: (id: string, e: React.MouseEvent) => void;
}

export const BoxNodeVisual: React.FC<BoxNodeVisualProps> = ({
  boardNode,
  boxNode,
  spawnerNode,
  center,
  scaleMultiplier = 1.0,
  isSelected,
  isHovered,
  isBlocked,
  isBlockedBySelection,
  blocksSelected,
  layerOpacity,
  showLabels = true,
  onSelect,
  onMouseDown,
  onRotateStart,
}) => {
  const isSpawner = !!spawnerNode;
  const activeBox = isSpawner && spawnerNode.SpawnBoxes.length > 0 ? spawnerNode.SpawnBoxes[0] : boxNode;

  const boxType = getBoxType(activeBox.TypeId);
  const boxColorDef = getColor(activeBox.BoxColor);
  const rot = boardNode.YRotation ?? boardNode.ZRotation ?? 0;
  const svgAngle = (-rot + 360) % 360;

  const w = boxType.width * scaleMultiplier;
  const h = boxType.height * scaleMultiplier;
  const halfW = w / 2;
  const halfH = h / 2;

  const isTray = boxType.isTray || activeBox.BoxColor === 5;
  const cardCount = activeBox.InitCards.length;
  const capacity = boxType.capacity;
  const slotCount = Math.max(capacity, cardCount || 1);
  const isCardsHidden = activeBox.IsCardsHidden;
  const lockedTurn = activeBox.LockedTurn || 0;

  // Elevation shadow based on layer (higher LayerId has higher elevation)
  const layerElevation = Math.min(Math.max(boardNode.LayerId ?? boardNode.TileMapId ?? 0, 0), 4);
  const shadowOffsetY = (layerElevation * 3 + 2) * scaleMultiplier;

  // Handle color calculations
  const strokeColor = isSelected
    ? '#38bdf8'
    : isSpawner
    ? '#f59e0b'
    : blocksSelected
    ? '#f59e0b'
    : isBlockedBySelection
    ? '#ec4899'
    : isHovered
    ? '#93c5fd'
    : boxColorDef.borderHex;

  const strokeWidth = (isSelected ? 3 : isHovered || isSpawner || blocksSelected || isBlockedBySelection ? 2.5 : 1.5) * Math.min(Math.max(scaleMultiplier, 0.7), 1.5);

  return (
    <g
      id={`node-${boardNode.Id}`}
      transform={`translate(${center.x}, ${center.y}) rotate(${svgAngle})`}
      opacity={layerOpacity}
      className="cursor-pointer transition-opacity duration-200"
      onClick={(e) => onSelect(boardNode.Id, e)}
      onMouseDown={(e) => onMouseDown(boardNode.Id, e)}
    >
      {/* 3D Drop Shadow */}
      <rect
        x={-halfW + 2 * scaleMultiplier}
        y={-halfH + shadowOffsetY}
        width={w}
        height={h}
        rx={12 * scaleMultiplier}
        fill="rgba(0, 0, 0, 0.45)"
        pointerEvents="none"
      />

      {/* Spawner Outer Glow Base Plate */}
      {isSpawner && (
        <rect
          x={-halfW - 6 * scaleMultiplier}
          y={-halfH - 6 * scaleMultiplier}
          width={w + 12 * scaleMultiplier}
          height={h + 12 * scaleMultiplier}
          rx={16 * scaleMultiplier}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="6,3"
          className="animate-pulse"
        />
      )}

      {/* Outer Box Body */}
      {isTray ? (
        <g>
          <rect
            x={-halfW}
            y={-halfH}
            width={w}
            height={h}
            rx={12 * scaleMultiplier}
            fill="#e2e8f0"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <rect
            x={-halfW + 3 * scaleMultiplier}
            y={-halfH + 3 * scaleMultiplier}
            width={w - 6 * scaleMultiplier}
            height={h - 6 * scaleMultiplier}
            rx={9 * scaleMultiplier}
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth={1}
          />
        </g>
      ) : (
        <g>
          <rect
            x={-halfW}
            y={-halfH}
            width={w}
            height={h}
            rx={12 * scaleMultiplier}
            fill={boxColorDef.hex}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          <rect
            x={-halfW + 4 * scaleMultiplier}
            y={-halfH + 4 * scaleMultiplier}
            width={w - 8 * scaleMultiplier}
            height={h - 8 * scaleMultiplier}
            rx={8 * scaleMultiplier}
            fill={boxColorDef.darkHex}
            opacity={0.35}
          />
        </g>
      )}

      {/* Internal Cards or Slots */}
      <g>
        {cardCount > 0 ? (
          (() => {
            const availableHeight = h - 16 * scaleMultiplier;
            const cardSpacing = availableHeight / Math.max(cardCount, 1);
            const cardThickness = Math.min(cardSpacing - 2 * scaleMultiplier, 14 * scaleMultiplier);

            return activeBox.InitCards.map((cardColorId, idx) => {
              const cardColor = getColor(cardColorId);
              const cardY = -halfH + 8 * scaleMultiplier + idx * cardSpacing;
              const cardW = w - 12 * scaleMultiplier;

              return (
                <g key={`card-${idx}`}>
                  {/* Card Drop Shadow */}
                  <rect
                    x={-cardW / 2 + 1}
                    y={cardY + 1}
                    width={cardW}
                    height={cardThickness}
                    rx={cardThickness / 2}
                    fill="rgba(0, 0, 0, 0.25)"
                  />
                  {/* Card Base */}
                  <rect
                    x={-cardW / 2}
                    y={cardY}
                    width={cardW}
                    height={cardThickness}
                    rx={cardThickness / 2}
                    fill={isCardsHidden ? '#334155' : cardColor.hex}
                    stroke={isCardsHidden ? '#64748b' : cardColor.borderHex}
                    strokeWidth={1}
                  />
                  {/* Card Gloss / Question Mark if hidden */}
                  {isCardsHidden ? (
                    <text
                      x="0"
                      y={cardY + cardThickness / 2 + 3}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      ?
                    </text>
                  ) : (
                    <rect
                      x={-cardW / 2 + 2 * scaleMultiplier}
                      y={cardY + 1}
                      width={cardW - 4 * scaleMultiplier}
                      height={Math.max(cardThickness / 2 - 1, 1)}
                      rx={cardThickness / 4}
                      fill="rgba(255, 255, 255, 0.4)"
                    />
                  )}
                </g>
              );
            });
          })()
        ) : (
          (() => {
            const lines: React.ReactNode[] = [];
            const step = (h - 16 * scaleMultiplier) / slotCount;
            for (let i = 1; i < slotCount; i++) {
              lines.push(
                <line
                  key={`slot-${i}`}
                  x1={-halfW + 8 * scaleMultiplier}
                  y1={-halfH + 8 * scaleMultiplier + i * step}
                  x2={halfW - 8 * scaleMultiplier}
                  y2={-halfH + 8 * scaleMultiplier + i * step}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeDasharray="2,2"
                />
              );
            }
            return lines;
          })()
        )}
      </g>

      {/* Spawner Queue Badge */}
      {isSpawner && (
        <g transform={`translate(${-halfW + 8 * scaleMultiplier}, ${-halfH - 8 * scaleMultiplier})`}>
          <rect x="-14" y="-7" width="28" height="14" rx="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.2" />
          <text x="0" y="3.5" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="900">
            x{spawnerNode.SpawnBoxes.length}
          </text>
        </g>
      )}

      {/* IsHidden Mystery Box Badge */}
      {activeBox.IsHidden && (
        <g transform={`translate(${-halfW + 12 * scaleMultiplier}, ${halfH - 8 * scaleMultiplier})`}>
          <rect x="-10" y="-7" width="20" height="14" rx="4" fill="#a855f7" stroke="#ffffff" strokeWidth="1.2" />
          <text x="0" y="3.5" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">
            ?
          </text>
        </g>
      )}

      {/* IsCardsHidden Badge */}
      {activeBox.IsCardsHidden && (
        <g transform={`translate(${halfW - 30 * scaleMultiplier}, ${halfH - 8 * scaleMultiplier})`}>
          <rect x="-10" y="-7" width="20" height="14" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="bold">
            🔒
          </text>
        </g>
      )}

      {/* Lock Turn Badge */}
      {lockedTurn > 0 && (
        <g transform={`translate(${halfW - 10 * scaleMultiplier}, ${halfH - 8 * scaleMultiplier})`}>
          <rect x="-16" y="-7" width="32" height="14" rx="4" fill="#6366f1" stroke="#ffffff" strokeWidth="1.2" />
          <text x="0" y="3.5" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
            T:{lockedTurn}
          </text>
        </g>
      )}

      {/* Lock Indicator if Blocked */}
      {isBlocked && (
        <g transform={`translate(${halfW - 14 * scaleMultiplier}, ${-halfH + 4 * scaleMultiplier})`}>
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

      {/* Selected Indicator Outline & Pulse */}
      {isSelected && (
        <rect
          x={-halfW - 4 * scaleMultiplier}
          y={-halfH - 4 * scaleMultiplier}
          width={w + 8 * scaleMultiplier}
          height={h + 8 * scaleMultiplier}
          rx={16 * scaleMultiplier}
          fill="none"
          stroke="#38bdf8"
          strokeWidth={2}
          strokeDasharray="4,4"
          className="selected-node-pulse"
        />
      )}

      {/* Rotation Gizmo Handle (when selected) */}
      {isSelected && onRotateStart && (
        <g
          transform={`translate(0, ${-halfH - 22 * scaleMultiplier})`}
          className="cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => {
            e.stopPropagation();
            onRotateStart(boardNode.Id, e);
          }}
        >
          <line x1="0" y1="0" x2="0" y2={18 * scaleMultiplier} stroke="#38bdf8" strokeWidth="2" strokeDasharray="2,2" />
          <circle cx="0" cy="0" r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
          <path
            d="M -3 -1 A 4 4 0 1 1 3 2 M 3 -1 L 3 2 L 0 2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Text Label: ID & Layer */}
      {showLabels && (
        <g transform={`translate(0, ${halfH + 14 * scaleMultiplier})`}>
          <rect
            x={-34}
            y={-9}
            width={68}
            height={18}
            rx={4}
            fill="rgba(15, 23, 42, 0.85)"
            stroke={isSpawner ? 'rgba(245, 158, 11, 0.6)' : 'rgba(148, 163, 184, 0.4)'}
            strokeWidth={1}
          />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fill="#f8fafc"
            fontSize="10"
            fontWeight="bold"
            fontFamily="JetBrains Mono, monospace"
          >
            {isSpawner ? `S:` : `L${boardNode.LayerId ?? boardNode.TileMapId ?? 0}:`}{boardNode.Id}
          </text>
        </g>
      )}
    </g>
  );
};
