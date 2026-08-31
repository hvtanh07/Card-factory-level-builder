import { LevelData, BoardNode, BoxNode, SpawnerNode, SpawnBox } from '../types/level';
import JSZip from 'jszip';

export function parseLevelData(rawInput: string | ArrayBuffer | Uint8Array): LevelData {
  let jsonString = '';

  if (typeof rawInput === 'string') {
    jsonString = rawInput.trim();
  } else if (rawInput instanceof ArrayBuffer || rawInput instanceof Uint8Array) {
    const decoder = new TextDecoder('utf-8');
    const bytes = rawInput instanceof Uint8Array ? rawInput : new Uint8Array(rawInput);
    
    let text = decoder.decode(bytes);
    if (text.charCodeAt(0) === 0xFEFF) {
      text = text.substring(1);
    }
    jsonString = text.trim();
  }

  const firstBrace = jsonString.indexOf('{');
  const lastBrace = jsonString.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    jsonString = jsonString.substring(firstBrace, lastBrace + 1);
  }

  let parsed: any;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err: any) {
    throw new Error(`Failed to parse level data JSON: ${err.message}`);
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid level data format: Root must be an object.');
  }

  const levelData: LevelData = {
    Id: parsed.Id ?? 1,
    BoardOffsetX: Number(parsed.BoardOffsetX ?? 0),
    BoardOffsetZ: Number(parsed.BoardOffsetZ ?? 0),
    BoardNodes: Array.isArray(parsed.BoardNodes)
      ? parsed.BoardNodes.map((n: any, idx: number): BoardNode => {
          const layerId = Number(n.LayerId ?? n.TileMapId ?? 0);
          const yRot = Number(n.YRotation ?? n.ZRotation ?? 0);
          const xPos = Number(n.XPosition ?? ((n.MapPosX ?? 0) + (n.XPosition ?? 0)));
          const zPos = Number(n.ZPosition ?? ((n.MapPosY ?? 0) + (n.YPosition ?? 0)));
          return {
            Id: String(n.Id ?? `node_${idx}`),
            NodeId: Number(n.NodeId ?? 1),
            LayerId: layerId,
            YRotation: yRot,
            XPosition: xPos,
            ZPosition: zPos,
            TileMapId: layerId,
            ZRotation: yRot,
            MapPosX: Math.floor(xPos),
            MapPosY: Math.floor(zPos),
            YPosition: zPos - Math.floor(zPos),
          };
        })
      : [],
    BoxNodes: Array.isArray(parsed.BoxNodes)
      ? parsed.BoxNodes.map((b: any, idx: number): BoxNode => ({
          Id: String(b.Id ?? (parsed.BoardNodes?.[idx]?.Id ?? `node_${idx}`)),
          TypeId: Number(b.TypeId ?? 1),
          BoxColor: Number(b.BoxColor ?? 0),
          BlockedNodes: Array.isArray(b.BlockedNodes) ? b.BlockedNodes.map(String) : [],
          InitCards: Array.isArray(b.InitCards) ? b.InitCards.map(Number) : [],
          IsHidden: Boolean(b.IsHidden ?? false),
          LockedTurn: Number(b.LockedTurn ?? 0),
          IsCardsHidden: Boolean(b.IsCardsHidden ?? false),
        }))
      : [],
    SpawnerNodes: Array.isArray(parsed.SpawnerNodes)
      ? parsed.SpawnerNodes.map((sn: any): SpawnerNode => ({
          Id: String(sn.Id ?? ''),
          BlockedNodes: Array.isArray(sn.BlockedNodes) ? sn.BlockedNodes.map(String) : [],
          SpawnBoxes: Array.isArray(sn.SpawnBoxes)
            ? sn.SpawnBoxes.map((sb: any): SpawnBox => ({
                Id: String(sb.Id ?? ''),
                TypeId: Number(sb.TypeId ?? 3),
                BoxColor: Number(sb.BoxColor ?? 0),
                BlockedNodes: Array.isArray(sb.BlockedNodes) ? sb.BlockedNodes.map(String) : [],
                InitCards: Array.isArray(sb.InitCards) ? sb.InitCards.map(Number) : [],
                IsHidden: Boolean(sb.IsHidden ?? false),
                LockedTurn: Number(sb.LockedTurn ?? 0),
                IsCardsHidden: Boolean(sb.IsCardsHidden ?? false),
              }))
            : [],
        }))
      : [],
    TurnSpawnerNodes: Array.isArray(parsed.TurnSpawnerNodes) ? parsed.TurnSpawnerNodes : [],
    LinkedBoxes: Array.isArray(parsed.LinkedBoxes) ? parsed.LinkedBoxes : [],
    IsOddSize: Boolean(parsed.IsOddSize ?? false),
    Version: Number(parsed.Version ?? 2),
  };

  return levelData;
}

export function levelDataToJson(data: LevelData, pretty = true): string {
  const output = {
    Id: data.Id ?? 1,
    BoardOffsetX: data.BoardOffsetX ?? 0,
    BoardOffsetZ: data.BoardOffsetZ ?? 0,
    BoardNodes: data.BoardNodes.map(b => ({
      Id: b.Id,
      NodeId: b.NodeId,
      LayerId: b.LayerId ?? b.TileMapId ?? 0,
      YRotation: b.YRotation ?? b.ZRotation ?? 0,
      XPosition: b.XPosition !== undefined && b.MapPosX === undefined ? b.XPosition : Number(((b.MapPosX ?? 0) + (b.XPosition ?? 0)).toFixed(3)),
      ZPosition: b.ZPosition !== undefined && b.MapPosY === undefined ? b.ZPosition : Number(((b.MapPosY ?? 0) + (b.YPosition ?? (b.ZPosition ?? 0))).toFixed(3)),
    })),
    BoxNodes: data.BoxNodes.map(b => ({
      Id: b.Id,
      TypeId: b.TypeId,
      BoxColor: b.BoxColor,
      BlockedNodes: b.BlockedNodes || [],
      InitCards: b.InitCards || [],
      IsHidden: Boolean(b.IsHidden),
      LockedTurn: b.LockedTurn ?? 0,
      IsCardsHidden: Boolean(b.IsCardsHidden),
    })),
    SpawnerNodes: data.SpawnerNodes || [],
    TurnSpawnerNodes: data.TurnSpawnerNodes || [],
    LinkedBoxes: data.LinkedBoxes || [],
    IsOddSize: Boolean(data.IsOddSize),
    Version: data.Version ?? 2,
  };

  return pretty ? JSON.stringify(output, null, 2) : JSON.stringify(output);
}

export function downloadLevelFile(data: LevelData, filename: string, asBytes = true) {
  const jsonStr = levelDataToJson(data, false);
  const encoder = new TextEncoder();
  const bytes = encoder.encode(jsonStr);

  const mimeType = asBytes ? 'application/octet-stream' : 'application/json';
  const blob = new Blob([bytes], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  const ext = asBytes ? '.bytes' : '.json';
  a.download = filename.endsWith('.bytes') || filename.endsWith('.json') ? filename : `${filename}${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function parseMultipleFiles(files: FileList | File[]): Promise<{ name: string; data: LevelData }[]> {
  const results: { name: string; data: LevelData }[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.name.endsWith('.zip')) {
      try {
        const zip = await JSZip.loadAsync(file);
        for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
          if (!zipEntry.dir && (relativePath.endsWith('.bytes') || relativePath.endsWith('.json') || relativePath.endsWith('.txt'))) {
            const buffer = await zipEntry.async('arraybuffer');
            try {
              const parsed = parseLevelData(buffer);
              const baseName = relativePath.split('/').pop()?.replace(/\.[^/.]+$/, "") || relativePath;
              results.push({ name: baseName, data: parsed });
            } catch (e) {
              console.error(`Error parsing zip entry ${relativePath}:`, e);
            }
          }
        }
      } catch (err) {
        console.error(`Failed to process zip file ${file.name}:`, err);
      }
    } else {
      try {
        const buffer = await file.arrayBuffer();
        const parsed = parseLevelData(buffer);
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        results.push({ name: baseName, data: parsed });
      } catch (err) {
        console.error(`Failed to parse file ${file.name}:`, err);
      }
    }
  }

  return results;
}

export async function exportAllLevelsAsZip(levels: { name: string; data: LevelData }[], zipFilename = 'card_factory_levels.zip') {
  const zip = new JSZip();
  const encoder = new TextEncoder();

  for (const lvl of levels) {
    const jsonStr = levelDataToJson(lvl.data, false);
    const bytes = encoder.encode(jsonStr);
    const safeName = lvl.name.replace(/[/\\?%*:|"<>]/g, '_');
    zip.file(`${safeName}.bytes`, bytes);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = zipFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
