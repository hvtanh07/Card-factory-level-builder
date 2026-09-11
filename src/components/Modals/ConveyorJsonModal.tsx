import React, { useState, useEffect } from 'react';
import { ConveyorData } from '../../types/conveyor';
import { conveyorDataToJson, parseConveyorData, downloadConveyorFile } from '../../utils/conveyorParser';
import { X, Copy, Check, CheckCircle2, AlertTriangle, Sparkles, Download, FileCode } from 'lucide-react';

interface ConveyorJsonModalProps {
  conveyorData: ConveyorData;
  onClose: () => void;
  onApply: (updated: ConveyorData) => void;
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

  const handleDownload = () => {
    try {
      const parsed = parseConveyorData(jsonText);
      downloadConveyorFile(parsed, `conveyor_${parsed.Id}.json`);
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
        <div className="h-14 px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <FileCode size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Conveyor JSON Configuration
              </h2>
              <p className="text-[11px] text-slate-400">
                Inspect, edit, or copy the production JSON for Conveyor #{conveyorData.Id}
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

        {/* Content / Editor */}
        <div className="flex-1 p-4 relative overflow-hidden flex flex-col">
          <textarea
            value={jsonText}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-sky-300 focus:outline-none focus:border-sky-500 resize-none selection:bg-sky-500/30 leading-relaxed shadow-inner"
            placeholder="Paste Conveyor JSON configuration here..."
            spellCheck={false}
          />

          {parseError && (
            <div className="mt-3 p-3 bg-rose-950/50 border border-rose-800/80 rounded-xl flex items-center gap-2 text-rose-300 text-xs shrink-0 animate-fadeIn">
              <AlertTriangle size={15} className="shrink-0 text-rose-400" />
              <span className="font-mono">{parseError}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="h-14 px-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleFormat}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition active:scale-95"
            >
              <Sparkles size={13} className="text-amber-400" />
              <span>Format JSON</span>
            </button>
            <button
              onClick={handleCopy}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition active:scale-95"
            >
              <Download size={13} className="text-sky-400" />
              <span>Download .json</span>
            </button>
          </div>

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
              className={`py-1.5 px-4 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-md ${
                parseError
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
              }`}
            >
              <CheckCircle2 size={14} />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
