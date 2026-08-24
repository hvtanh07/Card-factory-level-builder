import React from 'react';
import { Point } from '../../utils/geometry';

interface GridBackgroundProps {
  origin: Point;
  gridUnit: number;
  width: number;
  height: number;
  showGrid: boolean;
  showCoordinates: boolean;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({
  origin,
  gridUnit,
  width,
  height,
  showGrid,
  showCoordinates,
}) => {
  if (!showGrid) return null;

  // Calculate range of grid lines visible
  const minXIndex = Math.floor(-origin.x / gridUnit) - 1;
  const maxXIndex = Math.ceil((width - origin.x) / gridUnit) + 1;
  const minYIndex = Math.floor(-origin.y / gridUnit) - 1;
  const maxYIndex = Math.ceil((height - origin.y) / gridUnit) + 1;

  const verticalLines: { x: number; gridVal: number; isMajor: boolean }[] = [];
  for (let i = minXIndex; i <= maxXIndex; i++) {
    verticalLines.push({
      x: origin.x + i * gridUnit,
      gridVal: i,
      isMajor: i === 0,
    });
  }

  const horizontalLines: { y: number; gridVal: number; isMajor: boolean }[] = [];
  for (let i = minYIndex; i <= maxYIndex; i++) {
    horizontalLines.push({
      y: origin.y + i * gridUnit,
      gridVal: -i, // Unity Y is inverted relative to screen Y
      isMajor: i === 0,
    });
  }

  return (
    <g className="pointer-events-none select-none">
      {/* Minor & Major Vertical Lines */}
      {verticalLines.map(line => (
        <g key={`v-${line.gridVal}`}>
          <line
            x1={line.x}
            y1={0}
            x2={line.x}
            y2={height}
            stroke={line.isMajor ? '#38bdf8' : 'rgba(148, 163, 184, 0.15)'}
            strokeWidth={line.isMajor ? 2 : 1}
            strokeDasharray={line.isMajor ? undefined : '3,3'}
          />
          {showCoordinates && (
            <text
              x={line.x + 4}
              y={origin.y - 6}
              fill={line.isMajor ? '#38bdf8' : 'rgba(148, 163, 184, 0.4)'}
              fontSize="10"
              fontWeight={line.isMajor ? 'bold' : 'normal'}
              fontFamily="JetBrains Mono, monospace"
            >
              {line.gridVal}
            </text>
          )}
        </g>
      ))}

      {/* Minor & Major Horizontal Lines */}
      {horizontalLines.map(line => (
        <g key={`h-${line.gridVal}`}>
          <line
            x1={0}
            y1={line.y}
            x2={width}
            y2={line.y}
            stroke={line.isMajor ? '#38bdf8' : 'rgba(148, 163, 184, 0.15)'}
            strokeWidth={line.isMajor ? 2 : 1}
            strokeDasharray={line.isMajor ? undefined : '3,3'}
          />
          {showCoordinates && (
            <text
              x={origin.x + 6}
              y={line.y - 4}
              fill={line.isMajor ? '#38bdf8' : 'rgba(148, 163, 184, 0.4)'}
              fontSize="10"
              fontWeight={line.isMajor ? 'bold' : 'normal'}
              fontFamily="JetBrains Mono, monospace"
            >
              {line.gridVal}
            </text>
          )}
        </g>
      ))}

      {/* Origin Marker */}
      <circle cx={origin.x} cy={origin.y} r={4} fill="#38bdf8" />
    </g>
  );
};
