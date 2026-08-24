import React, { useState, useRef } from 'react';
import { LevelData, BoxNode } from '../../types/level';
import { PRESET_LEVELS } from '../../constants/sampleLevels';
import { 
  Bookmark, 
  FolderOpen, 
  Trash2, 
  Plus, 
  Sparkles, 
  Download, 
  Archive, 
  Search, 
  UploadCloud,
  Zap,
  ShieldAlert,
  Smile
} from 'lucide-react';
import { downloadLevelFile, exportAllLevelsAsZip } from '../../utils/fileParser';

export interface SavedLevel {
  id: string;
  name: string;
  updatedAt: string;
  data: LevelData;
}

interface LevelLibraryProps {
  currentLevelData: LevelData;
  onLoadLevel: (data: LevelData, name: string) => void;
  onImportFiles: (files: FileList | File[]) => void;
  savedLevels: SavedLevel[];
  onSaveLevel: (name: string) => void;
  onDeleteSavedLevel: (id: string) => void;
  onClearAllSaved: () => void;
}

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';

export const LevelLibrary: React.FC<LevelLibraryProps> = ({
  currentLevelData,
  onLoadLevel,
  onImportFiles,
  savedLevels,
  onSaveLevel,
  onDeleteSavedLevel,
  onClearAllSaved,
}) => {
  const [newLevelName, setNewLevelName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (!newLevelName.trim()) return;
    onSaveLevel(newLevelName.trim());
    setNewLevelName('');
    setShowSaveInput(false);
  };

  const handleExportAll = () => {
    const all = [
      ...savedLevels.map(s => ({ name: `saved/${s.name}`, data: s.data })),
      ...PRESET_LEVELS.map(p => ({ name: `${p.difficulty || 'medium'}/${p.name}`, data: p.data })),
    ];
    exportAllLevelsAsZip(all, 'card_factory_30_levels_bundle.zip');
  };

  const filteredSaved = savedLevels.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPresets = PRESET_LEVELS.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (difficultyFilter === 'all') return true;
    return p.difficulty === difficultyFilter;
  });

  const getDifficultyBadge = (diff?: 'easy' | 'medium' | 'hard') => {
    switch (diff) {
      case 'easy':
        return (
          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <Smile size={10} />
            Easy
          </span>
        );
      case 'hard':
        return (
          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/40">
            <ShieldAlert size={10} />
            Hard
          </span>
        );
      case 'medium':
      default:
        return (
          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
            <Zap size={10} />
            Medium
          </span>
        );
    }
  };

  const counts = {
    all: PRESET_LEVELS.length,
    easy: PRESET_LEVELS.filter(p => p.difficulty === 'easy').length,
    medium: PRESET_LEVELS.filter(p => p.difficulty === 'medium').length,
    hard: PRESET_LEVELS.filter(p => p.difficulty === 'hard').length,
  };

  return (
    <div className="space-y-4 select-none pb-6">
      {/* Hidden Multi-file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".bytes,.json,.zip,text/plain"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onImportFiles(e.target.files);
          }
          if (e.target) e.target.value = '';
        }}
        className="hidden"
      />

      {/* Search Bar */}
      <div className="relative">
        <Search size={13} className="absolute left-2.5 top-2.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search levels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
      </div>

      {/* Top Action Bar */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
          title="Import multiple .bytes or .zip files"
        >
          <UploadCloud size={13} />
          <span>Import Files</span>
        </button>

        <button
          onClick={handleExportAll}
          className="py-1.5 px-2.5 bg-teal-950/80 hover:bg-teal-900 text-teal-200 border border-teal-700/60 rounded-lg text-xs font-medium flex items-center gap-1 transition active:scale-95 shadow-sm"
          title="Export all 30 premade levels + saved levels as a .zip bundle"
        >
          <Archive size={13} className="text-teal-400" />
          <span>Zip All ({PRESET_LEVELS.length + savedLevels.length})</span>
        </button>
      </div>

      {/* SECTION 1: 30 Premade Reference Levels with Difficulty Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" />
            Premade Levels ({filteredPresets.length})
          </span>
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl text-[11px] font-medium text-center">
          <button
            onClick={() => setDifficultyFilter('all')}
            className={`py-1 rounded-lg transition ${
              difficultyFilter === 'all'
                ? 'bg-slate-800 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setDifficultyFilter('easy')}
            className={`py-1 rounded-lg transition ${
              difficultyFilter === 'easy'
                ? 'bg-emerald-950/90 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            Easy ({counts.easy})
          </button>
          <button
            onClick={() => setDifficultyFilter('medium')}
            className={`py-1 rounded-lg transition ${
              difficultyFilter === 'medium'
                ? 'bg-amber-950/90 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            Med ({counts.medium})
          </button>
          <button
            onClick={() => setDifficultyFilter('hard')}
            className={`py-1 rounded-lg transition ${
              difficultyFilter === 'hard'
                ? 'bg-rose-950/90 text-rose-300 font-bold border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            Hard ({counts.hard})
          </button>
        </div>

        {/* Premade Levels List */}
        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
          {filteredPresets.map((preset, idx) => {
            let totalCards = preset.data.BoxNodes.reduce((a: number, b: BoxNode) => a + b.InitCards.length, 0);
            const spawnerCount = (preset.data.SpawnerNodes || []).length;
            const trayCount = preset.data.BoxNodes.filter(b => b.BoxColor === 5).length;

            for (const sn of (preset.data.SpawnerNodes || [])) {
              for (const sb of sn.SpawnBoxes) {
                totalCards += sb.InitCards.length;
              }
            }

            return (
              <div
                key={`preset-level-${preset.id || idx}`}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition flex flex-col gap-1 group shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    onClick={() => onLoadLevel(preset.data, preset.name)}
                    className="cursor-pointer font-bold text-xs text-slate-100 group-hover:text-sky-300 transition truncate flex-1 flex items-center gap-1.5"
                  >
                    <span className="truncate">{preset.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {getDifficultyBadge(preset.difficulty)}

                    <button
                      onClick={() => downloadLevelFile(preset.data, preset.name, true)}
                      className="p-1 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 rounded transition ml-1"
                      title="Download .bytes"
                    >
                      <Download size={12} />
                    </button>
                    <button
                      onClick={() => onLoadLevel(preset.data, preset.name)}
                      className="p-1 hover:bg-slate-700 text-slate-400 group-hover:text-sky-400 rounded transition"
                      title="Load Level"
                    >
                      <FolderOpen size={13} />
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 line-clamp-1">
                  {preset.description}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 pt-0.5 flex-wrap">
                  <span className="bg-slate-950 px-1.5 py-0.5 rounded text-sky-300 font-semibold">
                    {preset.data.BoardNodes.length} Nodes
                  </span>
                  <span className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300">
                    {totalCards} Cards
                  </span>
                  {trayCount > 0 && (
                    <span className="bg-teal-950/60 text-teal-300 border border-teal-500/30 px-1.5 py-0.5 rounded">
                      {trayCount} Trays
                    </span>
                  )}
                  {spawnerCount > 0 && (
                    <span className="bg-purple-950/60 text-purple-300 border border-purple-500/30 px-1.5 py-0.5 rounded">
                      {spawnerCount} Spawners
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Project Level Store (Imported & Custom Saved Levels) */}
      <div className="space-y-2 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Bookmark size={14} className="text-sky-400" />
            Project Levels ({savedLevels.length})
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSaveInput(!showSaveInput)}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold"
            >
              <Plus size={13} />
              Save Current
            </button>
            {savedLevels.length > 0 && (
              <button
                onClick={onClearAllSaved}
                className="text-[10px] text-slate-500 hover:text-rose-400 transition"
                title="Clear all stored levels"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Save Dialog Input */}
        {showSaveInput && (
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 space-y-2 animate-fadeIn">
            <input
              type="text"
              placeholder="Level Project Name..."
              value={newLevelName}
              onChange={(e) => setNewLevelName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-medium"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={!newLevelName.trim()}
                className="flex-1 py-1 px-2 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-white rounded-lg text-xs font-semibold transition"
              >
                Save Level
              </button>
              <button
                onClick={() => setShowSaveInput(false)}
                className="py-1 px-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg text-xs transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Saved levels list */}
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {filteredSaved.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 italic rounded-xl border border-dashed border-slate-800">
              No saved project levels yet. Import .bytes or save current level above!
            </div>
          ) : (
            filteredSaved.map(saved => {
              let totalCards = saved.data.BoxNodes.reduce((a, b) => a + b.InitCards.length, 0);
              for (const sn of (saved.data.SpawnerNodes || [])) {
                for (const sb of sn.SpawnBoxes) {
                  totalCards += sb.InitCards.length;
                }
              }

              return (
                <div
                  key={`saved-${saved.id}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs transition group shadow-sm"
                >
                  <div
                    className="flex-1 cursor-pointer truncate mr-2"
                    onClick={() => onLoadLevel(saved.data, saved.name)}
                  >
                    <div className="font-semibold text-slate-200 group-hover:text-sky-300 truncate">
                      {saved.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 pt-0.5">
                      <span>{saved.data.BoardNodes.length} Nodes</span>
                      <span>•</span>
                      <span>{totalCards} Cards</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => downloadLevelFile(saved.data, saved.name, true)}
                      className="p-1 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 rounded transition"
                      title="Download .bytes"
                    >
                      <Download size={13} />
                    </button>
                    <button
                      onClick={() => onDeleteSavedLevel(saved.id)}
                      className="p-1 hover:bg-rose-950/60 text-slate-500 hover:text-rose-400 rounded transition"
                      title="Delete Level"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
