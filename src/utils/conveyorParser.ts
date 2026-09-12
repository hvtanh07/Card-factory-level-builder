import { ConveyorData, ConveyorNode, ConveyorSlot } from '../types/conveyor';
import { DEFAULT_CONVEYOR_DATA } from '../constants/defaultConveyor';

export function parseConveyorData(rawInput: string | any): ConveyorData {
  let parsed: any;

  if (typeof rawInput === 'string') {
    let jsonString = rawInput.trim();
    const firstBrace = jsonString.indexOf('{');
    const lastBrace = jsonString.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonString = jsonString.substring(firstBrace, lastBrace + 1);
    }
    try {
      parsed = JSON.parse(jsonString);
    } catch (err: any) {
      throw new Error(`Failed to parse conveyor JSON: ${err.message}`);
    }
  } else {
    parsed = rawInput;
  }

  if (Array.isArray(parsed) && parsed.length > 0) {
    parsed = parsed[0].data || parsed[0];
  }
  if (parsed && typeof parsed === 'object' && parsed.data && typeof parsed.data === 'object') {
    parsed = parsed.data;
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid conveyor JSON format: Root must be an object.');
  }

  const nodes: ConveyorNode[] = Array.isArray(parsed.ConveyorNodes)
    ? parsed.ConveyorNodes.map((n: any, idx: number): ConveyorNode => ({
        Id: String(n.Id ?? `${idx}`),
        XPosition: Number(n.XPosition ?? 0),
        ZPosition: Number(n.ZPosition ?? 0),
        TangentMode: Number(n.TangentMode ?? 1),
        YRotation: Number(n.YRotation ?? 90.0),
      }))
    : DEFAULT_CONVEYOR_DATA.ConveyorNodes;

  const route: string[] = Array.isArray(parsed.ConveyorRoute)
    ? parsed.ConveyorRoute.map(String)
    : nodes.map(n => n.Id);

  const slots: ConveyorSlot[] = Array.isArray(parsed.ConveyorSlots)
    ? parsed.ConveyorSlots.map((s: any, idx: number): ConveyorSlot => ({
        Id: String(s.Id ?? `${idx}`),
        TargetNodeId: String(s.TargetNodeId ?? (nodes[idx]?.Id || nodes[0]?.Id || '0')),
        YRotation: Number(s.YRotation ?? 90.0),
        XPosition: Number(s.XPosition ?? 0),
        ZPosition: Number(s.ZPosition ?? 2.0),
        LockedTurn: Number(s.LockedTurn ?? 0),
        UnlockedByAd: Boolean(s.UnlockedByAd ?? false),
      }))
    : DEFAULT_CONVEYOR_DATA.ConveyorSlots;

  return {
    Id: Number(parsed.Id ?? 1),
    ConveyorNodes: nodes,
    ConveyorRoute: route,
    ConveyorSlots: slots,
    IsLoop: Boolean(parsed.IsLoop ?? false),
    BoardOffsetX: Number(parsed.BoardOffsetX ?? 0.0),
    BoardOffsetZ: Number(parsed.BoardOffsetZ ?? 2.0),
    NumberOfArrows: Number(parsed.NumberOfArrows ?? 3),
  };
}

export function conveyorDataToJson(data: ConveyorData, pretty = true): string {
  const output = {
    Id: data.Id ?? 1,
    ConveyorNodes: data.ConveyorNodes.map(n => ({
      Id: n.Id,
      XPosition: Number(n.XPosition.toFixed(3)),
      ZPosition: Number(n.ZPosition.toFixed(3)),
      TangentMode: n.TangentMode ?? 1,
      YRotation: Number(n.YRotation.toFixed(1)),
    })),
    ConveyorRoute: data.ConveyorRoute,
    ConveyorSlots: data.ConveyorSlots.map(s => ({
      Id: s.Id,
      TargetNodeId: s.TargetNodeId,
      YRotation: Number(s.YRotation.toFixed(1)),
      XPosition: Number(s.XPosition.toFixed(3)),
      ZPosition: Number(s.ZPosition.toFixed(3)),
      LockedTurn: Number(s.LockedTurn ?? 0),
      UnlockedByAd: Boolean(s.UnlockedByAd ?? false),
    })),
    IsLoop: Boolean(data.IsLoop),
    BoardOffsetX: Number((data.BoardOffsetX ?? 0).toFixed(3)),
    BoardOffsetZ: Number((data.BoardOffsetZ ?? 2.0).toFixed(3)),
    NumberOfArrows: Number(data.NumberOfArrows ?? 3),
  };

  return pretty ? JSON.stringify(output, null, 2) : JSON.stringify(output);
}

export function downloadConveyorJson(data: ConveyorData, filename = 'conveyor.json') {
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
