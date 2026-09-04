import React, { useState, useEffect } from 'react';
import { LevelData } from '../../types/level';
import { parseJsonLevelInput, ParsedJsonLevelResult } from '../../utils/fileParser';
import { 
  X, 
  FileJson, 
  ClipboardPaste, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Boxes, 
  Layers, 
  ArrowRight,
  BookmarkPlus
} from 'lucide-react';

interface LoadJsonModalProps {
  onClose: () => void;
  onLoadLevel: (data: LevelData, name: string, saveToLibrary?: boolean) => void;
  onBatchImport?: (levels: Array<{ name: string; data: LevelData }>) => void;
}

const SAMPLE_JSON_SNIPPET = `{
  "name": "Sample Micro Level",
  "data": {
    "Id": 101,
    "BoardNodes": [
      { "Id": "0_0_0", "LayerId": 0, "XPosition": 0, "ZPosition": 0 },
      { "Id": "0_1_0", "LayerId": 0, "XPosition": 1, "ZPosition": 0 },
      { "Id": "1_0_0", "LayerId": 1, "XPosition": 0.5, "ZPosition": 0 }
    ],
    "BoxNodes": [
      { "Id": "0_0_0", "TypeId": 1, "BoxColor": 1, "BlockedNodes": [], "InitCards": [1, 1, 1, 1] },
      { "Id": "0_1_0", "TypeId": 1, "BoxColor": 2, "BlockedNodes": [], "InitCards": [2, 2, 2, 2] },
      { "Id": "1_0_0", "TypeId": 1, "BoxColor": 1, "BlockedNodes": ["0_0_0", "0_1_0"], "InitCards": [1, 1, 2, 2] }
    ]
  }
}`;

export const LoadJsonModal: React.FC<LoadJsonModalProps> = ({
  onClose,
  onLoadLevel,
  onBatchImport,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [levelName, setLevelName] = useState('');
  const [parseResult, setParseResult] = useState<ParsedJsonLevelResult | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
  const [saveToLibrary, setSaveToLibrary] = useState(true);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // Parse JSON on text changes
  useEffect(() => {
    if (!jsonText.trim()) {
      setParseResult(null);
      setParseError(null);
      return;
    }

    try {
      const res = parseJsonLevelInput(jsonText);
      setParseResult(res);
      setParseError(null);
      setLevelName(res.name || `Level ${res.levelData.Id || 'Imported'}`);
      setSelectedLevelIndex(0);
    } catch (err: any) {
      setParseResult(null);
      setParseError(err.message || 'Failed to parse JSON.');
    }
  }, [jsonText]);

  // Active level data from single or multiple levels
  const currentData: LevelData | null = React.useMemo(() => {
    if (!parseResult) return null;
    if (parseResult.multipleLevels && parseResult.multipleLevels.length > 0) {
      return parseResult.multipleLevels[selectedLevelIndex]?.data || parseResult.levelData;
    }
    return parseResult.levelData;
  }, [parseResult, selectedLevelIndex]);

  // Update level name when index changes in multi-level mode
  const handleSelectMultiLevel = (idx: number) => {
    setSelectedLevelIndex(idx);
    if (parseResult?.multipleLevels?.[idx]) {
      setLevelName(parseResult.multipleLevels[idx].name);
    }
  };

  // Handle paste directly from clipboard
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setJsonText(text);
        setCopiedStatus('Pasted from clipboard!');
        setTimeout(() => setCopiedStatus(null), 2000);
      } else {
        setCopiedStatus('Clipboard is empty');
        setTimeout(() => setCopiedStatus(null), 2000);
      }
    } catch (err: any) {
      setCopiedStatus('Cannot access clipboard. Please paste manually (Ctrl+V).');
      setTimeout(() => setCopiedStatus(null), 3000);
    }
  };

  const handleClear = () => {
    setJsonText('');
    setParseResult(null);
    setParseError(null);
    setLevelName('');
  };

  const handleLoadSample = () => {
    setJsonText(SAMPLE_JSON_SNIPPET);
  };

  const handleApply = () => {
    if (!currentData) return;
    const finalName = levelName.trim() || `Level ${currentData.Id || 'Imported'}`;
    onLoadLevel(currentData, finalName, saveToLibrary);
    onClose();
  };

  const handleImportAll = () => {
    if (!parseResult?.multipleLevels || !onBatchImport) return;
    onBatchImport(parseResult.multipleLevels);
    onClose();
  };

  // Calculate distinct layers and colors in current level
  const stats = React.useMemo(() => {
    if (!currentData) return null;
    const layers = new Set(currentData.BoardNodes.map(n => n.LayerId ?? n.TileMapId ?? 0));
    const colors = new Set<number>();
    for (const bx of currentData.BoxNodes) {
      colors.add(bx.BoxColor);
    }
    return {
      boxCount: currentData.BoxNodes.length,
      boardCount: currentData.BoardNodes.length,
      layerCount: layers.size,
      layerList: Array.from(layers).sort((a, b) => a - b),
      colors: Array.from(colors).sort((a, b) => a - b),
      spawners: (currentData.SpawnerNodes || []).length,
    };
  }, [currentData]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[88vh] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="h-14 bg-slate-950 px-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileJson size={18} />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                Load Level from JSON
              </h2>
              <span className="text-[11px] text-slate-400 block">
                Paste or input level JSON string to inspect and load into the editor
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePasteClipboard}
              className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              title="Paste text from your clipboard"
            >
              <ClipboardPaste size={13} />
              <span>Paste Clipboard</span>
            </button>

            <button
              onClick={handleLoadSample}
              className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              title="Fill with an example JSON snippet"
            >
              <Sparkles size={13} />
              <span>Sample</span>
            </button>

            {jsonText && (
              <button
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                title="Clear input"
              >
                <Trash2 size={15} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Notification pill if clipboard status */}
        {copiedStatus && (
          <div className="bg-sky-950/90 border-b border-sky-800/80 px-4 py-1 text-center text-xs text-sky-200 font-medium">
            {copiedStatus}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 p-4 bg-slate-950/60 overflow-hidden flex flex-col gap-3 font-sans">
          {/* JSON Textarea */}
          <div className="flex-1 min-h-[220px] flex flex-col">
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder={`Paste your level JSON string here...\n\nSupported Formats:\n1. Direct Level JSON: { "BoardNodes": [...], "BoxNodes": [...] }\n2. Wrapped Level JSON: { "name": "Level 1", "data": { ... } }\n3. Level Array: [ { "name": "...", "data": { ... } }, ... ]\n4. Escaped String: "{\\"BoardNodes\\":...}"`}
              spellCheck={false}
              className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-emerald-400 font-mono text-xs focus:outline-none focus:border-emerald-500 resize-none leading-relaxed placeholder-slate-600"
            />
          </div>

          {/* Validation & Live Preview Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col gap-2.5">
            {parseError ? (
              <div className="flex items-start gap-2 text-rose-300 text-xs">
                <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Invalid JSON or Format Error</span>
                  <span className="text-slate-400 text-[11px] font-mono break-all">{parseError}</span>
                </div>
              </div>
            ) : currentData && stats ? (
              <div className="space-y-3">
                {/* Status Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                      <CheckCircle2 size={13} />
                      Valid Level JSON
                    </span>

                    {parseResult?.multipleLevels && parseResult.multipleLevels.length > 1 && (
                      <span className="text-xs bg-sky-500/20 text-sky-300 border border-sky-500/40 px-2 py-0.5 rounded font-semibold">
                        Array: {parseResult.multipleLevels.length} Levels Detected
                      </span>
                    )}
                  </div>

                  {/* Multi-Level Selector if applicable */}
                  {parseResult?.multipleLevels && parseResult.multipleLevels.length > 1 && (
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-slate-400">Select level:</label>
                      <select
                        value={selectedLevelIndex}
                        onChange={(e) => handleSelectMultiLevel(Number(e.target.value))}
                        className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded px-2 py-1 focus:outline-none focus:border-sky-500"
                      >
                        {parseResult.multipleLevels.map((lvl, idx) => (
                          <option key={idx} value={idx}>
                            {idx + 1}. {lvl.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Level Name & Metadata Row */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                    <span className="text-xs text-slate-400 font-medium">Level Name:</span>
                    <input
                      type="text"
                      value={levelName}
                      onChange={(e) => setLevelName(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-100 font-semibold focus:outline-none focus:border-sky-500"
                      placeholder="Enter level name..."
                    />
                  </div>

                  {/* Summary Chips */}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                      <Boxes size={13} className="text-sky-400" />
                      <span>{stats.boxCount} Boxes</span>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                      <Layers size={13} className="text-indigo-400" />
                      <span>{stats.layerCount} Layers ({stats.layerList.join(', ')})</span>
                    </div>

                    {stats.spawners > 0 && (
                      <div className="flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300">
                        <span>{stats.spawners} Spawners</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-1 flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400" />
                <span>Paste or type JSON into the editor above. Format validation and level preview will appear automatically.</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="h-16 bg-slate-950 px-5 flex items-center justify-between border-t border-slate-800">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={saveToLibrary}
                onChange={(e) => setSaveToLibrary(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-sky-500 focus:ring-0 w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1">
                <BookmarkPlus size={13} className="text-sky-400" />
                Also save to Project Saved Levels
              </span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-1.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Cancel
            </button>

            {parseResult?.multipleLevels && parseResult.multipleLevels.length > 1 && onBatchImport && (
              <button
                onClick={handleImportAll}
                className="py-1.5 px-3.5 rounded-lg bg-teal-950/90 hover:bg-teal-900 text-teal-200 border border-teal-700/80 text-xs font-semibold shadow-sm transition active:scale-95 flex items-center gap-1.5"
              >
                <span>Import All {parseResult.multipleLevels.length} to Library</span>
              </button>
            )}

            <button
              onClick={handleApply}
              disabled={!currentData}
              className="py-1.5 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold shadow-md shadow-emerald-950/40 flex items-center gap-1.5 transition active:scale-95"
            >
              <span>Load Level</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
