import React, { useState } from 'react';
import { ConveyorData } from '../../types/conveyor';
import { parseConveyorData, validateConveyor } from '../../utils/conveyorParser';
import { 
  X, 
  FileJson, 
  ClipboardPaste, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Repeat, 
  Box, 
  Navigation,
  ArrowRight,
  BookmarkPlus
} from 'lucide-react';

interface ConveyorLoadJsonModalProps {
  onClose: () => void;
  onLoadConveyor: (data: ConveyorData, name: string, saveToLibrary?: boolean) => void;
}

const SAMPLE_CONVEYOR_SNIPPET = `{
  "Id": 3,
  "ConveyorNodes": [
    { "Id": "0", "XPosition": -3.49, "ZPosition": 2.0, "TangentMode": 1, "YRotation": 180.0 },
    { "Id": "1", "XPosition": -3.49, "ZPosition": 0.5, "TangentMode": 0, "YRotation": 180.0 },
    { "Id": "2", "XPosition": -2.99, "ZPosition": 0.0, "TangentMode": 0, "YRotation": 90.0 }
  ],
  "ConveyorRoute": ["0", "1", "2"],
  "ConveyorSlots": [
    { "Id": "0", "TargetNodeId": "1", "YRotation": 90.0, "XPosition": -1.95, "ZPosition": 2.0, "LockedTurn": 0, "UnlockedByAd": false }
  ],
  "IsLoop": false,
  "BoardOffsetX": 0.0,
  "BoardOffsetZ": 3.0,
  "NumberOfArrows": 3
}`;

export const ConveyorLoadJsonModal: React.FC<ConveyorLoadJsonModalProps> = ({
  onClose,
  onLoadConveyor,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [conveyorName, setConveyorName] = useState('');
  const [parsedData, setParsedData] = useState<ConveyorData | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  const handleTextChange = (text: string) => {
    setJsonText(text);
    if (!text.trim()) {
      setParsedData(null);
      setParseError(null);
      setValidationWarnings([]);
      return;
    }

    try {
      const parsed = parseConveyorData(text);
      const validation = validateConveyor(parsed);

      if (validation.errors.length > 0) {
        setParseError(validation.errors.join('; '));
        setParsedData(null);
      } else {
        setParseError(null);
        setParsedData(parsed);
        setValidationWarnings(validation.warnings);
        if (!conveyorName) {
          setConveyorName(`Conveyor #${parsed.Id}`);
        }
      }
    } catch (e: any) {
      setParseError(e.message);
      setParsedData(null);
      setValidationWarnings([]);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleTextChange(text);
    } catch (e) {
      alert('Failed to read from clipboard. Please paste manually into the textarea.');
    }
  };

  const handleClear = () => {
    setJsonText('');
    setParsedData(null);
    setParseError(null);
    setValidationWarnings([]);
  };

  const handleLoadSample = () => {
    handleTextChange(SAMPLE_CONVEYOR_SNIPPET);
  };

  const handleConfirmLoad = (saveToLibrary = false) => {
    if (!parsedData) return;
    const finalName = conveyorName.trim() || `Conveyor #${parsedData.Id}`;
    onLoadConveyor(parsedData, finalName, saveToLibrary);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden animate-scaleIn max-h-[90vh]">
        {/* Header */}
        <div className="h-14 px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileJson size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Input Conveyor JSON Text
              </h2>
              <p className="text-[11px] text-slate-400">
                Paste JSON text directly to load or save a conveyor configuration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              Paste JSON configuration below:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePasteClipboard}
                className="py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              >
                <ClipboardPaste size={13} className="text-sky-400" />
                <span>Paste from Clipboard</span>
              </button>
              <button
                onClick={handleLoadSample}
                className="py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition active:scale-95 shadow-sm"
              >
                Insert Sample
              </button>
              {jsonText && (
                <button
                  onClick={handleClear}
                  className="p-1 text-slate-400 hover:text-rose-400 transition"
                  title="Clear Text"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Monospace Text Area */}
          <textarea
            value={jsonText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Paste your Conveyor JSON here..."
            className="w-full h-56 bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-sky-300 focus:outline-none focus:border-emerald-500 resize-none selection:bg-emerald-500/30 leading-relaxed shadow-inner"
            spellCheck={false}
          />

          {/* Validation Error Toast */}
          {parseError && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl flex items-start gap-2 text-rose-300 text-xs animate-fadeIn">
              <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Invalid Conveyor JSON:</span>
                <span className="font-mono text-[11px] break-all">{parseError}</span>
              </div>
            </div>
          )}

          {/* Parsed Conveyor Summary Card */}
          {parsedData && (
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-emerald-500/30 space-y-3 animate-fadeIn shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Valid Conveyor Detected
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  ID: {parsedData.Id}
                </span>
              </div>

              {/* Conveyor Name Input */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 shrink-0 font-medium">Preset Name:</label>
                <input
                  type="text"
                  value={conveyorName}
                  onChange={(e) => setConveyorName(e.target.value)}
                  placeholder="e.g. S-Curve 4-Slot Conveyor..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-medium">Nodes</span>
                  <span className="text-xs font-bold font-mono text-sky-400">
                    {parsedData.ConveyorNodes.length}
                  </span>
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-medium">Slots</span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    {parsedData.ConveyorSlots.length}
                  </span>
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-medium">Type</span>
                  <span className="text-xs font-bold font-mono text-amber-400">
                    {parsedData.IsLoop ? 'Loop' : 'Linear'}
                  </span>
                </div>
                <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-medium">Board Offset</span>
                  <span className="text-xs font-bold font-mono text-slate-300">
                    {parsedData.BoardOffsetX}, {parsedData.BoardOffsetZ}
                  </span>
                </div>
              </div>

              {/* Warnings */}
              {validationWarnings.length > 0 && (
                <div className="p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <AlertTriangle size={13} />
                    <span>Configuration Warnings:</span>
                  </div>
                  <ul className="text-[11px] text-amber-200/80 list-disc list-inside space-y-0.5 font-mono">
                    {validationWarnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="h-16 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleConfirmLoad(true)}
              disabled={!parsedData}
              className={`py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-md ${
                parsedData
                  ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
              }`}
              title="Load conveyor into editor and save to project library"
            >
              <BookmarkPlus size={14} />
              <span>Load & Save to Library</span>
            </button>

            <button
              onClick={() => handleConfirmLoad(false)}
              disabled={!parsedData}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md ${
                parsedData
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Load Conveyor</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
