import React, { useState, useRef } from 'react';
import { ConveyorData, ConveyorPreset } from '../../types/conveyor';
import { PRESET_CONVEYORS } from '../../constants/sampleConveyors';
import { parseConveyorData } from '../../utils/conveyorParser';
import { 
  Bookmark, 
  Plus, 
  Trash2, 
  Copy, 
  FolderOpen, 
  Sparkles, 
  CheckCircle2, 
  Repeat, 
  ArrowRight,
  Sliders,
  FileJson
} from 'lucide-react';

export interface SavedConveyor {
  id: string;
  name: string;
  updatedAt: string;
  data: ConveyorData;
}

interface ConveyorLibraryProps {
  currentConveyor: ConveyorData;
  savedConveyors: SavedConveyor[];
  onLoadConveyor: (data: ConveyorData, name: string) => void;
  onSaveConveyor: (name: string) => void;
  onDeleteSavedConveyor: (id: string) => void;
  onImportConveyorFile: (file: File) => void;
  onOpenInputJsonModal: () => void;
}

export const ConveyorLibrary: React.FC<ConveyorLibraryProps> = ({
  currentConveyor,
  savedConveyors,
  onLoadConveyor,
  onSaveConveyor,
  onDeleteSavedConveyor,
  onImportConveyorFile,
  onOpenInputJsonModal,
}) => {
  const [saveName, setSaveName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveName.trim()) return;
    onSaveConveyor(saveName.trim());
    setSaveName('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImportConveyorFile(files[0]);
    }
    if (e.target) e.target.value = '';
  };

  return (
    <div className="space-y-6 select-none text-xs">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 1. SAVE CURRENT CONVEYOR */}
      <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-2 shadow-sm">
        <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
          Save to Conveyor Library
        </span>
        <form onSubmit={handleSave} className="flex gap-1.5">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Conveyor preset name..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 text-xs"
          />
          <button
            type="submit"
            disabled={!saveName.trim()}
            className="bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition active:scale-95 shadow-sm"
          >
            <Plus size={14} />
            <span>Save</span>
          </button>
        </form>
      </div>

      {/* 2. IMPORT CONVEYOR FILE OR PASTE JSON */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
          title="Import Conveyor JSON file from disk"
        >
          <FolderOpen size={14} className="text-sky-400" />
          <span>Import File</span>
        </button>
        <button
          onClick={onOpenInputJsonModal}
          className="py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
          title="Paste JSON text directly"
        >
          <FileJson size={14} className="text-emerald-400" />
          <span>Input JSON</span>
        </button>
      </div>

      {/* 3. BUILT-IN PRESETS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" />
            Built-in Presets
          </span>
          <span className="text-[10px] text-slate-500">{PRESET_CONVEYORS.length} presets</span>
        </div>

        <div className="space-y-2">
          {PRESET_CONVEYORS.map(preset => {
            const isCurrent = currentConveyor.Id === preset.data.Id;
            return (
              <div
                key={preset.id}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-sky-950/40 border-sky-500/60 shadow-md shadow-sky-950/30'
                    : 'bg-slate-950/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => onLoadConveyor(preset.data, preset.name)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-bold text-xs ${isCurrent ? 'text-sky-300' : 'text-slate-200'}`}>
                      {preset.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>
                  {isCurrent && (
                    <span className="bg-sky-500/20 text-sky-400 border border-sky-500/40 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ml-2">
                      Active
                    </span>
                  )}
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{preset.data.ConveyorSlots.length} Slots</span>
                  <span>{preset.data.ConveyorNodes.length} Nodes</span>
                  <span>{preset.data.IsLoop ? 'Loop 🔄' : 'Linear ➔'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CUSTOM SAVED CONVEYORS */}
      {savedConveyors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Bookmark size={13} className="text-emerald-400" />
              Custom Saved Conveyors
            </span>
            <span className="text-[10px] text-slate-500">{savedConveyors.length} items</span>
          </div>

          <div className="space-y-2">
            {savedConveyors.map(saved => {
              const isCurrent = currentConveyor.Id === saved.data.Id;
              return (
                <div
                  key={saved.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md shadow-emerald-950/30'
                      : 'bg-slate-950/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => onLoadConveyor(saved.data, saved.name)}
                    >
                      <h3 className={`font-bold text-xs ${isCurrent ? 'text-emerald-300' : 'text-slate-200'}`}>
                        {saved.name}
                      </h3>
                      <span className="text-[10px] text-slate-500">{saved.updatedAt}</span>
                    </div>

                    <button
                      onClick={() => onDeleteSavedConveyor(saved.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition ml-2"
                      title="Delete Saved Conveyor"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{saved.data.ConveyorSlots.length} Slots</span>
                    <span>{saved.data.ConveyorNodes.length} Nodes</span>
                    <span>{saved.data.IsLoop ? 'Loop' : 'Linear'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
