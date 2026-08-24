import React from 'react';
import { BoardNode, BoxNode } from '../../types/level';
import { Point } from '../../utils/geometry';

interface DependencyOverlayProps {
  boardNodes: BoardNode[];
  boxNodes: BoxNode[];
  nodeCenters: Map<string, Point>;
  selectedNodeId: string | null;
  showAllDependencies: boolean;
}

export const DependencyOverlay: React.FC<DependencyOverlayProps> = ({
  boxNodes,
  nodeCenters,
  selectedNodeId,
  showAllDependencies,
}) => {
  // Collect all edges
  const edges: { fromId: string; toId: string; from: Point; to: Point; isHighlighted: boolean; isIncoming: boolean }[] = [];

  for (const box of boxNodes) {
    const fromCenter = nodeCenters.get(box.Id);
    if (!fromCenter) continue;

    for (const blockedId of box.BlockedNodes) {
      const toCenter = nodeCenters.get(blockedId);
      if (!toCenter) continue;

      const isOutgoing = selectedNodeId === box.Id;
      const isIncoming = selectedNodeId === blockedId;
      const isHighlighted = isOutgoing || isIncoming;

      if (showAllDependencies || isHighlighted) {
        edges.push({
          fromId: box.Id,
          toId: blockedId,
          from: fromCenter,
          to: toCenter,
          isHighlighted,
          isIncoming,
        });
      }
    }
  }

  if (edges.length === 0) return null;

  return (
    <g className="pointer-events-none">
      <defs>
        {/* Default Marker */}
        <marker
          id="arrow-default"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" opacity="0.7" />
        </marker>

        {/* Highlighted Outgoing Marker (Amber) */}
        <marker
          id="arrow-outgoing"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
        </marker>

        {/* Highlighted Incoming Marker (Pink) */}
        <marker
          id="arrow-incoming"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ec4899" />
        </marker>
      </defs>

      {edges.map((edge, idx) => {
        const dx = edge.to.x - edge.from.x;
        const dy = edge.to.y - edge.from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Calculate control point for a smooth curve
        const midX = (edge.from.x + edge.to.x) / 2;
        const midY = (edge.from.y + edge.to.y) / 2;
        const curvature = Math.min(dist * 0.15, 30);
        const perpX = -dy / (dist || 1);
        const perpY = dx / (dist || 1);

        const cx = midX + perpX * curvature;
        const cy = midY + perpY * curvature;

        const pathD = `M ${edge.from.x} ${edge.from.y} Q ${cx} ${cy} ${edge.to.x} ${edge.to.y}`;

        const strokeColor = edge.isHighlighted
          ? edge.isIncoming
            ? '#ec4899'
            : '#f59e0b'
          : 'rgba(56, 189, 248, 0.4)';

        const markerId = edge.isHighlighted
          ? edge.isIncoming
            ? 'url(#arrow-incoming)'
            : 'url(#arrow-outgoing)'
          : 'url(#arrow-default)';

        const strokeWidth = edge.isHighlighted ? 3 : 1.5;

        return (
          <g key={`edge-${edge.fromId}-${edge.toId}-${idx}`}>
            {/* Outline / Glow for highlighted lines */}
            {edge.isHighlighted && (
              <path
                d={pathD}
                fill="none"
                stroke={edge.isIncoming ? 'rgba(236, 72, 153, 0.4)' : 'rgba(245, 158, 11, 0.4)'}
                strokeWidth={6}
                strokeLinecap="round"
              />
            )}
            <path
              d={pathD}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={edge.isHighlighted ? undefined : '4,3'}
              markerEnd={markerId}
            />
          </g>
        );
      })}
    </g>
  );
};
