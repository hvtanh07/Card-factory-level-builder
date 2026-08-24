# Card Factory Level Builder Tool

A dedicated, visual web-based Level Builder and Editor for **Card Factory** mobile puzzle game levels, supporting Unity `.bytes` files and `.json` data payloads.

![Screenshot Reference](sample_screenshot.png)

## Features

- **Unity `.bytes` & `.json` File I/O**:
  - Open & load `.bytes` TextAsset files directly (drag-and-drop or file picker).
  - Export and download ready-to-use `.bytes` and `.json` files.
  - Live JSON code viewer & editor with instant validation.
- **Visual Game Fidelity**:
  - Accurate mobile game layout matching screenshot: top conveyor belt with S-curve track, dispenser machine, 6 delivery slots, and score badge.
  - Multi-layer 2D/3D board rendering with depth shadows, elevation indicators, and box type geometries (4-slot, 6-slot, 8-slot trays and colored boxes).
  - Glossy colored cards stacked inside each box with distinct color coding (Red, Blue, Green, Purple, Orange, Tray).
  - 360° rotation support with 45° quick angle buttons and interactive rotation handles.
- **Dependency Hierarchy & Auto-Blockers**:
  - Visual glowing bezier arrows connecting upper-layer blocking boxes to lower-layer blocked boxes.
  - **Auto-Blockers Engine**: Automatically computes physical spatial collision between layers and sets `BlockedNodes` dependencies.
- **Card Deck Inspector**:
  - Visual card array builder with add, remove, reorder, and color toggles.
  - Quick fill presets (Monocolor, Pairs, Alternating, Clear).
- **Playtest Simulation**:
  - Playable game simulator right in the editor! Test unblocking cascades, conveyor mechanics, and level win conditions.
- **Deck & Card Balance Analytics**:
  - Real-time deck breakdown by color, total box count, capacity limits, and circular dependency checks.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```

## Level Data Structure (`.bytes` / `.json`)

```json
{
  "BoardNodes": [
    {
      "Id": "0_-2_2",
      "NodeId": 0,
      "TileMapId": 0,
      "MapPosX": -2,
      "MapPosY": 2,
      "ZRotation": 315.0,
      "XPosition": -0.178,
      "YPosition": -0.432
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-2_2",
      "TypeId": 1,
      "BoxColor": 3,
      "BlockedNodes": ["2_-1_1"],
      "InitCards": [1, 1, 1, 1],
      "IsHidden": false
    }
  ],
  "SpawnerNodes": [],
  "IsOddSize": false,
  "Version": 2
}
```
