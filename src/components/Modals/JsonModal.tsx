import React, { useState, useEffect } from 'react';
import { LevelData } from '../../types/level';
import { levelDataToJson, parseLevelData } from '../../utils/fileParser';
import { X, Copy, Check, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

interface JsonModalProps {
  levelData: LevelData;
  onClose: () => void;
  onApply: (updatedData: LevelData) => void;
}

export const JsonModal: React.FC<JsonModalProps> = ({ levelData, onClose, onApply }) => {
  const [jsonText, setJsonText] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setJsonText(levelDataToJson(levelData, true));
  }, [levelData]);

  const handleTextChange = (text: string) => {
    setJsonText(text);
    try {
      parseLevelData(text);
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
      const parsed = parseLevelData(jsonText);
      setJsonText(levelDataToJson(parsed, true));
      setParseError(null);
    } catch (e: any) {
      setParseError(e.message);
    }
  };

  const handleApply = () => {
    try {
      const parsed = parseLevelData(jsonText);
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
              Level Data (JSON / .bytes payload)
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
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Format</span>
            </button>
            <button
              onClick={handleCopy}
              className="py-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* JSON Editor Textarea */}
        <div className="flex-1 p-4 bg-slate-950/60 font-mono text-xs overflow-hidden flex flex-col">
          <textarea
            value={jsonText}
            onChange={(e) => handleTextChange(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-emerald-400 font-mono text-xs focus:outline-none focus:border-sky-500 resize-none leading-relaxed"
          />
          {parseError && (
            <div className="mt-2 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs font-sans">
              <strong>Error:</strong> {parseError}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="h-14 bg-slate-950 px-5 flex items-center justify-between border-t border-slate-800">
          <span className="text-xs text-slate-500">
            Paste raw JSON from game files or copy this payload to write to a `.bytes` asset.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="py-1.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!!parseError}
              className="py-1.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-white text-xs font-semibold shadow-md transition"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
