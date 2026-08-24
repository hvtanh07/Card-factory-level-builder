import React, { useRef } from 'react';
import { 
  FolderOpen, 
  Download, 
  FileCode, 
  Play, 
  Wand2, 
  Grid, 
  Link2, 
  HelpCircle, 
  Shuffle,
  Archive,
  Scaling
} from 'lucide-react';

interface NavbarProps {
  levelName: string;
  onLevelNameChange: (name: string) => void;
  onImportFiles: (files: FileList | File[]) => void;
  onExportBytes: () => void;
  onExportJson: () => void;
  onExportAllZip: () => void;
  onOpenJsonModal: () => void;
  onAutoCalculateBlockers: () => void;
  onAutoBalanceDeck: () => void;
  onStartPlaytest: () => void;
  onOpenHelp: () => void;
  realBoxSize: boolean;
  onToggleRealBoxSize: () => void;
  showGrid: boolean;
  onToggleShowGrid: () => void;
  snapToGrid: boolean;
  onToggleSnapToGrid: () => void;
  showAllDependencies: boolean;
  onToggleShowAllDependencies: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  levelName,
  onLevelNameChange,
  onImportFiles,
  onExportBytes,
  onExportJson,
  onExportAllZip,
  onOpenJsonModal,
  onAutoCalculateBlockers,
  onAutoBalanceDeck,
  onStartPlaytest,
  onOpenHelp,
  realBoxSize,
  onToggleRealBoxSize,
  showGrid,
  onToggleShowGrid,
  snapToGrid,
  onToggleSnapToGrid,
  showAllDependencies,
  onToggleShowAllDependencies,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImportFiles(files);
    }
    if (e.target) e.target.value = '';
  };

  return (
    <header className="h-14 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between select-none z-30">
      {/* Left: Brand & Level Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/20 border border-sky-400/40">
            <span className="text-white font-black text-sm">CF</span>
          </div>
          <div>
            <h1 className="text-xs font-black tracking-wide text-slate-100 uppercase">
              Card Factory
            </h1>
            <span className="text-[10px] text-sky-400 font-bold block tracking-wider">
              LEVEL BUILDER
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800 mx-1"></div>

        {/* Level Name Input */}
        <input
          type="text"
          value={levelName}
          onChange={(e) => onLevelNameChange(e.target.value)}
          className="bg-slate-900/90 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-sky-500 w-44 hover:border-slate-600 transition"
          placeholder="Level Name..."
        />
      </div>

      {/* Center: Viewport & Canvas Toggle Tools */}
      <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 shadow-inner">
        {/* Real Box Size Toggle */}
        <button
          onClick={onToggleRealBoxSize}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            realBoxSize
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
          title="Scale box dimensions proportionally with zoom level"
        >
          <Scaling size={13} />
          <span>Real Size</span>
        </button>

        {/* Toggle Grid */}
        <button
          onClick={onToggleShowGrid}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            showGrid
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
          title="Toggle Canvas Grid"
        >
          <Grid size={13} />
          <span>Grid</span>
        </button>

        {/* Snap to Grid */}
        <button
          onClick={onToggleSnapToGrid}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            snapToGrid
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
          title="Snap node placement to integer grid"
        >
          <span>Snap</span>
        </button>

        {/* Dependency Arrows */}
        <button
          onClick={onToggleShowAllDependencies}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            showAllDependencies
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
          title="Show all blocking dependency arrows"
        >
          <Link2 size={13} />
          <span>Arrows</span>
        </button>
      </div>

      {/* Right: File I/O, Batch Actions, Simulation */}
      <div className="flex items-center gap-2">
        {/* Multi-File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".bytes,.json,.zip,text/plain"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Open Multiple Files */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
          title="Import multiple .bytes, .json, or .zip files at once"
        >
          <FolderOpen size={14} className="text-sky-400" />
          <span>Import .bytes</span>
        </button>

        {/* Auto Blockers Tool */}
        <button
          onClick={onAutoCalculateBlockers}
          className="py-1.5 px-2.5 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-200 hover:text-white border border-indigo-700/60 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
          title="Automatically calculate BlockedNodes from physical layer overlaps"
        >
          <Wand2 size={13} className="text-indigo-400" />
          <span>Auto-Blockers</span>
        </button>

        {/* Auto Balance Deck Tool */}
        <button
          onClick={onAutoBalanceDeck}
          className="py-1.5 px-2.5 rounded-lg bg-purple-950/70 hover:bg-purple-900/80 text-purple-200 hover:text-white border border-purple-700/60 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
          title="Balance total cards of each color to match box capacities"
        >
          <Shuffle size={13} className="text-purple-400" />
          <span>Balance Deck</span>
        </button>

        {/* JSON Code modal */}
        <button
          onClick={onOpenJsonModal}
          className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
          title="View & Edit JSON text"
        >
          <FileCode size={14} className="text-amber-400" />
          <span>JSON</span>
        </button>

        {/* Export .bytes */}
        <button
          onClick={onExportBytes}
          className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-900/40"
          title="Export current level to .bytes file for Unity game"
        >
          <Download size={14} />
          <span>Export .bytes</span>
        </button>

        {/* Export All Zip */}
        <button
          onClick={onExportAllZip}
          className="py-1.5 px-2.5 rounded-lg bg-teal-950/80 hover:bg-teal-900 text-teal-200 border border-teal-700/60 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
          title="Export all stored levels in project as a .zip bundle"
        >
          <Archive size={14} className="text-teal-400" />
          <span>Export All (.zip)</span>
        </button>

        {/* Playtest Simulator */}
        <button
          onClick={onStartPlaytest}
          className="py-1.5 px-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-lg shadow-amber-500/20"
        >
          <Play size={14} className="fill-slate-950" />
          <span>Playtest</span>
        </button>

        {/* Help */}
        <button
          onClick={onOpenHelp}
          className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition"
          title="Help & Controls"
        >
          <HelpCircle size={17} />
        </button>
      </div>
    </header>
  );
};
