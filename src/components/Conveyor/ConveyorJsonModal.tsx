import React, { useState, useEffect } from 'react';
import { ConveyorData } from '../../types/conveyor';
import { conveyorDataToJson, parseConveyorData } from '../../utils/conveyorParser';
import { X, Copy, Check, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface ConveyorJsonModalProps {
  conveyorData: ConveyorData;
  onClose: () => void;
  onApply: (updatedData: ConveyorData) => void;
}

export const ConveyorJsonModal: React.FC<ConveyorJsonModalProps> = ({
  conveyorData,
  onClose,
  onApply,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setJsonText(conveyorDataToJson(conveyorData, true));
  }, [conveyorData]);

  const handleTextChange = (text: string) => {
    setJsonText(text);
    try {
      parseConveyorData(text);
      setParseError(null);
    } catch (e: any) {
      setParseError(e.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    try {
      const parsed = parseConveyorData(jsonText);
      setJsonText(conveyorDataToJson(parsed, true));
      setParseError(null);
    } catch (e: any) {
      setParseError(e.message);
    }
  };

  const handleApply = () => {
    try {
      const parsed = parseConveyorData(jsonText);
      onApply(parsed);
      onClose();
    } catch (e: any) {
      setParseError(e.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[85vh] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-14 bg-slate-950 px-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              Conveyor Data (JSON)
            </span>
            {parseError ? (
              <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                <AlertTriangle size={12} /> Invalid JSON
              </span>
            ) : (
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 size={12} /> Valid Format
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFormat}
              className="py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
              title="Format JSON"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Format</span>
            </button>
            <button
              onClick={handleCopy}
              className="py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
              title="Copy JSON to clipboard"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative bg-slate-950 p-4 font-mono text-xs overflow-hidden flex flex-col">
          <textarea
            value={jsonText}
            onChange={(e) => handleTextChange(e.target.value)}
            className="flex-1 w-full bg-slate-900/50 text-sky-200 border border-slate-800 rounded-xl p-4 resize-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition selection:bg-sky-900 leading-relaxed custom-scrollbar"
            placeholder="Paste Conveyor JSON data here..."
            spellCheck={false}
          />

          {parseError && (
            <div className="mt-3 p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-start gap-2 animate-shake shrink-0">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block">Syntax Error:</span>
                <span className="text-rose-400/90 break-all">{parseError}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="h-16 bg-slate-950 px-5 flex items-center justify-between border-t border-slate-800">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Nodes: {conveyorData.ConveyorNodes.length}</span>
            <span>•</span>
            <span>Slots: {conveyorData.ConveyorSlots.length}</span>
            <span>•</span>
            <span>Arrows: {conveyorData.NumberOfArrows}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="py-1.5 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={Boolean(parseError)}
              className="py-1.5 px-5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-sky-600/30 flex items-center gap-1.5 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
            >
              <Check size={14} />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
