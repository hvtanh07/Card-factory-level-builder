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
  Scaling, 
  FileJson,
  Layers,
  Workflow,
  Eye,
  EyeOff
} from 'lucide-react';

interface NavbarProps {
  editorMode: 'level' | 'conveyor';
  onToggleEditorMode: (mode: 'level' | 'conveyor') => void;

  // Level mode props
  levelName: string;
  onLevelNameChange: (name: string) => void;
  onImportFiles: (files: FileList | File[]) => void;
  onExportJson: () => void;
  onExportAllZip: () => void;
  onOpenJsonModal: () => void;
  onOpenLoadJsonModal: () => void;
  onAutoCalculateBlockers: () => void;
  onAutoBalanceDeck: () => void;
  realBoxSize: boolean;
  onToggleRealBoxSize: () => void;
  showAllDependencies: boolean;
  onToggleShowAllDependencies: () => void;

  // Conveyor mode props
  conveyorSlotsCount?: number;
  conveyorNodesCount?: number;
  onImportConveyorFile?: (file: File) => void;
  onExportConveyorJson?: () => void;
  onOpenConveyorJsonModal?: () => void;
  showGhostLevel?: boolean;
  onToggleGhostLevel?: () => void;

  // Shared props
  showGrid: boolean;
  onToggleShowGrid: () => void;
  snapToGrid: boolean;
  onToggleSnapToGrid: () => void;
  onStartPlaytest: () => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  editorMode,
  onToggleEditorMode,
  levelName,
  onLevelNameChange,
  onImportFiles,
  onExportJson,
  onExportAllZip,
  onOpenJsonModal,
  onOpenLoadJsonModal,
  onAutoCalculateBlockers,
  onAutoBalanceDeck,
  realBoxSize,
  onToggleRealBoxSize,
  showAllDependencies,
  onToggleShowAllDependencies,
  conveyorSlotsCount = 0,
  conveyorNodesCount = 0,
  onImportConveyorFile,
  onExportConveyorJson,
  onOpenConveyorJsonModal,
  showGhostLevel = true,
  onToggleGhostLevel,
  showGrid,
  onToggleShowGrid,
  snapToGrid,
  onToggleSnapToGrid,
  onStartPlaytest,
  onOpenHelp,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const conveyorFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImportFiles(files);
    }
    if (e.target) e.target.value = '';
  };

  const handleConveyorFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onImportConveyorFile) {
      onImportConveyorFile(files[0]);
    }
    if (e.target) e.target.value = '';
  };

  return (
    <header className="h-14 bg-slate-950 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between select-none z-30">
      {/* Left: Brand & Mode Switcher */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/20 border border-sky-400/40">
            <span className="text-white font-black text-sm">CF</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xs font-black tracking-wide text-slate-100 uppercase leading-none">
              Card Factory
            </h1>
            <span className="text-[10px] text-sky-400 font-bold block tracking-wider leading-tight">
              LEVEL BUILDER
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-slate-800 mx-1 hidden sm:block"></div>

        {/* Mode Switcher: Box Builder vs Conveyor Builder */}
        <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => onToggleEditorMode('level')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              editorMode === 'level'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={13} />
            <span>Box Builder</span>
          </button>
          <button
            onClick={() => onToggleEditorMode('conveyor')}
            className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
              editorMode === 'conveyor'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Workflow size={13} />
            <span>Conveyor Builder</span>
          </button>
        </div>

        {/* Contextual Title / Input */}
        {editorMode === 'level' ? (
          <input
            type="text"
            value={levelName}
            onChange={(e) => onLevelNameChange(e.target.value)}
            className="bg-slate-900/90 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:border-sky-500 w-36 sm:w-44 hover:border-slate-600 transition hidden sm:block"
            placeholder="Level Name..."
          />
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400/90 bg-amber-950/40 border border-amber-800/50 px-2.5 py-1 rounded-lg">
            <Workflow size={12} />
            <span className="font-semibold">{conveyorNodesCount} Nodes • {conveyorSlotsCount} Slots</span>
          </div>
        )}
      </div>

      {/* Center: Viewport & Canvas Toggle Tools */}
      <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 shadow-inner">
        {editorMode === 'level' && (
          <button
            onClick={onToggleRealBoxSize}
            className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              realBoxSize
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
            title="Scale box dimensions proportionally with zoom level"
          >
            <Scaling size={13} />
            <span className="hidden md:inline">Real Size</span>
          </button>
        )}

        {editorMode === 'conveyor' && onToggleGhostLevel && (
          <button
            onClick={onToggleGhostLevel}
            className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              showGhostLevel
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
            title="Overlay ghost view of box level layout"
          >
            {showGhostLevel ? <Eye size={13} /> : <EyeOff size={13} />}
            <span className="hidden md:inline">Level Overlay</span>
          </button>
        )}

        {/* Toggle Grid */}
        <button
          onClick={onToggleShowGrid}
          className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            showGrid
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
          title="Toggle Canvas Grid"
        >
          <Grid size={13} />
          <span className="hidden md:inline">Grid</span>
        </button>

        {/* Snap to Grid */}
        <button
          onClick={onToggleSnapToGrid}
          className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
            snapToGrid
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
          title="Snap node placement to grid"
        >
          <span>Snap</span>
        </button>

        {editorMode === 'level' && (
          <button
            onClick={onToggleShowAllDependencies}
            className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              showAllDependencies
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
            title="Show all blocking dependency arrows"
          >
            <Link2 size={13} />
            <span className="hidden md:inline">Arrows</span>
          </button>
        )}
      </div>

      {/* Right: Actions, Modals & Simulation */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {editorMode === 'level' ? (
          <>
            {/* Multi-File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".json,.zip,text/plain"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Open Multiple Files */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm hidden lg:flex"
              title="Import multiple .json or .zip files at once"
            >
              <FolderOpen size={14} className="text-sky-400" />
              <span>Import Files</span>
            </button>

            {/* Input JSON string to load level */}
            <button
              onClick={onOpenLoadJsonModal}
              className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              title="Paste or input a JSON string to load a level"
            >
              <FileJson size={14} className="text-emerald-400" />
              <span className="hidden sm:inline">Input JSON</span>
            </button>

            {/* Auto Blockers Tool */}
            <button
              onClick={onAutoCalculateBlockers}
              className="py-1.5 px-2 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-200 hover:text-white border border-indigo-700/60 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm hidden md:flex"
              title="Automatically calculate BlockedNodes from physical layer overlaps"
            >
              <Wand2 size={13} className="text-indigo-400" />
              <span>Auto-Blockers</span>
            </button>

            {/* Auto Balance Deck Tool */}
            <button
              onClick={onAutoBalanceDeck}
              className="py-1.5 px-2 rounded-lg bg-purple-950/70 hover:bg-purple-900/80 text-purple-200 hover:text-white border border-purple-700/60 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm hidden md:flex"
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
              <span className="hidden sm:inline">JSON</span>
            </button>

            {/* Export JSON */}
            <button
              onClick={onExportJson}
              className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-900/40"
              title="Export current level to .json file"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            {/* Export All Zip */}
            <button
              onClick={onExportAllZip}
              className="py-1.5 px-2 rounded-lg bg-teal-950/80 hover:bg-teal-900 text-teal-200 border border-teal-700/60 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm hidden xl:flex"
              title="Export all stored levels in project as a .zip bundle"
            >
              <Archive size={14} className="text-teal-400" />
              <span>Export All</span>
            </button>
          </>
        ) : (
          <>
            {/* Conveyor Mode File Input */}
            <input
              ref={conveyorFileInputRef}
              type="file"
              accept=".json,text/plain"
              onChange={handleConveyorFileChange}
              className="hidden"
            />

            {/* Import Conveyor JSON */}
            <button
              onClick={() => conveyorFileInputRef.current?.click()}
              className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              title="Import a Conveyor .json file"
            >
              <FolderOpen size={14} className="text-amber-400" />
              <span>Import Conveyor</span>
            </button>

            {/* Conveyor JSON Editor Modal */}
            <button
              onClick={onOpenConveyorJsonModal}
              className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition active:scale-95 shadow-sm"
              title="View & Edit Conveyor JSON text"
            >
              <FileCode size={14} className="text-amber-400" />
              <span>Conveyor JSON</span>
            </button>

            {/* Export Conveyor JSON */}
            <button
              onClick={onExportConveyorJson}
              className="py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-amber-900/40"
              title="Export current conveyor layout to .json file"
            >
              <Download size={14} />
              <span>Export JSON</span>
            </button>
          </>
        )}

        {/* Playtest Simulator (Runs for both Level & Conveyor mode) */}
        <button
          onClick={onStartPlaytest}
          className="py-1.5 px-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-lg shadow-amber-500/20"
          title="Playtest current box layout with current conveyor layout"
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
