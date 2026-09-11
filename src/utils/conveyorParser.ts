import { ConveyorData, ConveyorNode, ConveyorSlot } from '../types/conveyor';

export function parseConveyorData(rawInput: string | ArrayBuffer | Uint8Array): ConveyorData {
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
    throw new Error(`Failed to parse conveyor JSON: ${err.message}`);
  }

  if (Array.isArray(parsed) && parsed.length > 0) {
    parsed = parsed[0].data || parsed[0];
  }

  if (parsed && typeof parsed === 'object' && parsed.data && typeof parsed.data === 'object') {
    parsed = parsed.data;
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid conveyor data format: Root must be a JSON object.');
  }

  const nodes: ConveyorNode[] = Array.isArray(parsed.ConveyorNodes)
    ? parsed.ConveyorNodes.map((n: any, idx: number): ConveyorNode => ({
        Id: String(n.Id ?? `${idx}`),
        XPosition: Number(n.XPosition ?? 0),
        ZPosition: Number(n.ZPosition ?? 0),
        TangentMode: Number(n.TangentMode ?? 1),
        YRotation: Number(n.YRotation ?? 90.0)
      }))
    : [];

  const route: string[] = Array.isArray(parsed.ConveyorRoute)
    ? parsed.ConveyorRoute.map((r: any) => String(r))
    : nodes.map(n => n.Id);

  const slots: ConveyorSlot[] = Array.isArray(parsed.ConveyorSlots)
    ? parsed.ConveyorSlots.map((s: any, idx: number): ConveyorSlot => ({
        Id: String(s.Id ?? `${idx}`),
        TargetNodeId: String(s.TargetNodeId ?? (nodes[0]?.Id || '0')),
        YRotation: Number(s.YRotation ?? 90.0),
        XPosition: Number(s.XPosition ?? 0),
        ZPosition: Number(s.ZPosition ?? 2.0),
        LockedTurn: Number(s.LockedTurn ?? 0),
        UnlockedByAd: Boolean(s.UnlockedByAd ?? false)
      }))
    : [];

  return {
    Id: parsed.Id ?? 1,
    ConveyorNodes: nodes,
    ConveyorRoute: route,
    ConveyorSlots: slots,
    IsLoop: Boolean(parsed.IsLoop ?? false),
    BoardOffsetX: Number(parsed.BoardOffsetX ?? 0.0),
    BoardOffsetZ: Number(parsed.BoardOffsetZ ?? 2.0),
    NumberOfArrows: Number(parsed.NumberOfArrows ?? 3)
  };
}

export function conveyorDataToJson(data: ConveyorData, pretty = true): string {
  const cleanData: ConveyorData = {
    Id: data.Id,
    ConveyorNodes: data.ConveyorNodes.map(n => ({
      Id: String(n.Id),
      XPosition: Math.round(n.XPosition * 1000) / 1000,
      ZPosition: Math.round(n.ZPosition * 1000) / 1000,
      TangentMode: n.TangentMode ?? 1,
      YRotation: Math.round(n.YRotation * 10) / 10
    })),
    ConveyorRoute: data.ConveyorRoute.map(r => String(r)),
    ConveyorSlots: data.ConveyorSlots.map(s => ({
      Id: String(s.Id),
      TargetNodeId: String(s.TargetNodeId),
      YRotation: Math.round(s.YRotation * 10) / 10,
      XPosition: Math.round(s.XPosition * 1000) / 1000,
      ZPosition: Math.round(s.ZPosition * 1000) / 1000,
      LockedTurn: s.LockedTurn ?? 0,
      UnlockedByAd: Boolean(s.UnlockedByAd)
    })),
    IsLoop: Boolean(data.IsLoop),
    BoardOffsetX: Math.round(data.BoardOffsetX * 1000) / 1000,
    BoardOffsetZ: Math.round(data.BoardOffsetZ * 1000) / 1000,
    NumberOfArrows: data.NumberOfArrows ?? 3
  };

  return pretty ? JSON.stringify(cleanData, null, 2) : JSON.stringify(cleanData);
}

export function downloadConveyorFile(data: ConveyorData, filename = 'conveyor.json'): void {
  const jsonStr = conveyorDataToJson(data, true);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function validateConveyor(data: ConveyorData): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  const nodeMap = new Map(data.ConveyorNodes.map(n => [n.Id, n]));

  if (data.ConveyorNodes.length < 2) {
    errors.push('Conveyor must have at least 2 nodes to form a track path.');
  }

  // Check route
  if (data.ConveyorRoute.length < 2) {
    errors.push('ConveyorRoute must contain at least 2 nodes.');
  }

  for (const rId of data.ConveyorRoute) {
    if (!nodeMap.has(rId)) {
      errors.push(`Route references node ID "${rId}" which does not exist in ConveyorNodes.`);
    }
  }

  // Check slots
  for (const slot of data.ConveyorSlots) {
    if (!nodeMap.has(slot.TargetNodeId)) {
      warnings.push(`Slot "${slot.Id}" targets node "${slot.TargetNodeId}" which does not exist.`);
    }
  }

  if (data.ConveyorSlots.length === 0) {
    warnings.push('Conveyor has 0 slots. Boxes will have nowhere to dock!');
  }

  return { errors, warnings };
}
