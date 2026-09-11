import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LevelData, BoardNode, BoxNode, SpawnerNode, ValidationIssue } from './types/level';
import { ConveyorData } from './types/conveyor';
import { LEVEL_1_SAMPLE, PRESET_LEVELS } from './constants/sampleLevels';
import { DEFAULT_CONVEYOR_DEMO, PRESET_CONVEYORS } from './constants/sampleConveyors';
import { 
  parseLevelData, 
  downloadLevelFile, 
  parseMultipleFiles, 
  exportAllLevelsAsZip 
} from './utils/fileParser';
import { 
  parseConveyorData, 
  downloadConveyorFile 
} from './utils/conveyorParser';
import { calculateAutoBlockersResult } from './utils/autoBlocker';
import { validateLevel, balanceLevelCardDeckResult } from './utils/levelValidator';
import { Navbar } from './components/Header/Navbar';
import { StatsBar } from './components/Header/StatsBar';
import { LevelCanvas } from './components/Canvas/LevelCanvas';
import { NodeInspector } from './components/Inspector/NodeInspector';
import { LayerManager } from './components/Sidebar/LayerManager';
import { PalettePanel } from './components/Sidebar/PalettePanel';
import { LevelLibrary, SavedLevel } from './components/Sidebar/LevelLibrary';
import { ConveyorCanvas } from './components/Conveyor/ConveyorCanvas';
import { ConveyorInspector } from './components/Conveyor/ConveyorInspector';
import { ConveyorLibrary, SavedConveyor } from './components/Conveyor/ConveyorLibrary';
import { JsonModal } from './components/Modals/JsonModal';
import { LoadJsonModal } from './components/Modals/LoadJsonModal';
import { ConveyorJsonModal } from './components/Modals/ConveyorJsonModal';
import { ConveyorLoadJsonModal } from './components/Modals/ConveyorLoadJsonModal';
import { PlaytestModal } from './components/Playtest/PlaytestModal';
import { HelpModal } from './components/Modals/HelpModal';
import { 
  Layers, 
  PackagePlus, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle,
  Repeat
} from 'lucide-react';

const STORAGE_KEY = 'card_factory_project_levels';
const CONVEYOR_STORAGE_KEY = 'card_factory_project_conveyors';

export function App() {
  // Global Editor Mode: 'level' or 'conveyor'
  const [editorMode, setEditorMode] = useState<'level' | 'conveyor'>('level');

  // Current Level State
  const [levelData, setLevelData] = useState<LevelData>(LEVEL_1_SAMPLE);
  const [levelName, setLevelName] = useState('Level 1 (Tutorial)');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('0_-1_0');

  // Current Conveyor State (Detached and modular)
  const [conveyorData, setConveyorData] = useState<ConveyorData>(DEFAULT_CONVEYOR_DEMO);
  const [conveyorName, setConveyorName] = useState('Linear 4-Slot (Production Standard)');
  const [selectedConveyorNodeId, setSelectedConveyorNodeId] = useState<string | null>('0');
  const [selectedConveyorSlotId, setSelectedConveyorSlotId] = useState<string | null>('0');

  // Stored Project Levels
  const [savedLevels, setSavedLevels] = useState<SavedLevel[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const updateSavedLevels = (updated: SavedLevel[]) => {
    setSavedLevels(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Stored Project Conveyors
  const [savedConveyors, setSavedConveyors] = useState<SavedConveyor[]>(() => {
    try {
      const stored = localStorage.getItem(CONVEYOR_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const updateSavedConveyors = (updated: SavedConveyor[]) => {
    setSavedConveyors(updated);
    try {
      localStorage.setItem(CONVEYOR_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // List of all available conveyors (presets + saved)
  const availableConveyors = useMemo(() => {
    return [
      ...PRESET_CONVEYORS.map(p => ({ id: p.id, name: p.name, data: p.data })),
      ...savedConveyors.map(s => ({ id: s.id, name: s.name, data: s.data }))
    ];
  }, [savedConveyors]);

  // Viewport & Display toggles
  const [visibleLayers, setVisibleLayers] = useState<Set<number>>(new Set([0, 1, 2, 3]));
  const [isolatedLayer, setIsolatedLayer] = useState<number | null>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'layers' | 'palette' | 'library'>('library');
  const [realBoxSize, setRealBoxSize] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [showAllDependencies, setShowAllDependencies] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(false);

  // Modals
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [showLoadJsonModal, setShowLoadJsonModal] = useState(false);
  const [showConveyorJsonModal, setShowConveyorJsonModal] = useState(false);
  const [showConveyorLoadJsonModal, setShowConveyorLoadJsonModal] = useState(false);
  const [showPlaytestModal, setShowPlaytestModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Validation
  const validationIssues = useMemo(() => validateLevel(levelData), [levelData]);

  // Batch Multi-File Import (.bytes, .json, .zip)
  const handleImportFiles = async (files: FileList | File[]) => {
    try {
      const parsedLevels = await parseMultipleFiles(files);
      if (parsedLevels.length === 0) {
        showToast('No valid level files found in selection.', 'warning');
        return;
      }

      const newEntries: SavedLevel[] = parsedLevels.map(p => ({
        id: `imported_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: p.name,
        updatedAt: new Date().toLocaleDateString(),
        data: p.data,
      }));

      const updatedStore = [...newEntries, ...savedLevels];
      updateSavedLevels(updatedStore);

      const first = parsedLevels[0];
      setLevelData(first.data);
      setLevelName(first.name);
      setSelectedNodeId(first.data.BoardNodes[0]?.Id || null);

      showToast(`Successfully imported & stored ${parsedLevels.length} level${parsedLevels.length > 1 ? 's' : ''}!`);
    } catch (err: any) {
      showToast(`Failed to import files: ${err.message}`, 'warning');
    }
  };

  // Level Export handlers
  const handleExportBytes = () => {
    downloadLevelFile(levelData, levelName, true);
    showToast(`Exported "${levelName}.bytes" file!`);
  };

  const handleExportJson = () => {
    downloadLevelFile(levelData, levelName, false);
    showToast(`Exported "${levelName}.json" file!`);
  };

  const handleExportAllZip = () => {
    const all = [
      ...savedLevels.map(s => ({ name: s.name, data: s.data })),
      ...PRESET_LEVELS.map(p => ({ name: p.name, data: p.data })),
    ];
    exportAllLevelsAsZip(all, 'card_factory_all_levels.zip');
    showToast(`Exported all ${all.length} levels as .zip bundle!`);
  };

  // Level Project Store actions
  const handleSaveLevel = (name: string) => {
    const newEntry: SavedLevel = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      updatedAt: new Date().toLocaleDateString(),
      data: levelData,
    };
    const updated = [newEntry, ...savedLevels];
    updateSavedLevels(updated);
    showToast(`Saved "${name}" to level store!`);
  };

  const handleDeleteSavedLevel = (id: string) => {
    const updated = savedLevels.filter(s => s.id !== id);
    updateSavedLevels(updated);
    showToast('Deleted level from project store.');
  };

  const handleClearAllSaved = () => {
    updateSavedLevels([]);
    showToast('Cleared all saved levels.');
  };

  const handleLoadLevel = (loadedData: LevelData, name: string) => {
    setLevelData(loadedData);
    setLevelName(name);
    setSelectedNodeId(loadedData.BoardNodes[0]?.Id || null);
    showToast(`Loaded "${name}"!`);
  };

  const handleLoadLevelFromJson = (data: LevelData, name: string, saveToLibrary?: boolean) => {
    setLevelData(data);
    setLevelName(name);
    setSelectedNodeId(data.BoardNodes[0]?.Id || null);

    if (saveToLibrary) {
      const newEntry: SavedLevel = {
        id: `imported_json_${Date.now()}`,
        name: name.trim(),
        updatedAt: new Date().toLocaleDateString(),
        data,
      };
      updateSavedLevels([newEntry, ...savedLevels]);
      showToast(`Loaded and saved "${name}" to library!`);
    } else {
      showToast(`Loaded "${name}" from JSON!`);
    }
  };

  const handleBatchImportFromJson = (levels: Array<{ name: string; data: LevelData }>) => {
    if (levels.length === 0) return;

    const newEntries: SavedLevel[] = levels.map(l => ({
      id: `batch_json_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: l.name,
      updatedAt: new Date().toLocaleDateString(),
      data: l.data,
    }));

    updateSavedLevels([...newEntries, ...savedLevels]);
    const first = levels[0];
    setLevelData(first.data);
    setLevelName(first.name);
    setSelectedNodeId(first.data.BoardNodes[0]?.Id || null);
    showToast(`Batch imported ${levels.length} levels from JSON!`);
  };

  // Node modifications in Level
  const handleUpdateBoardNode = (updated: BoardNode) => {
    setLevelData(prev => ({
      ...prev,
      BoardNodes: prev.BoardNodes.map(n => n.Id === updated.Id ? updated : n),
    }));
  };

  const handleUpdateBoxNode = (updated: BoxNode) => {
    setLevelData(prev => ({
      ...prev,
      BoxNodes: prev.BoxNodes.map(b => b.Id === updated.Id ? updated : b),
    }));
  };

  const handleUpdateSpawnerNode = (updated: SpawnerNode) => {
    setLevelData(prev => ({
      ...prev,
      SpawnerNodes: (prev.SpawnerNodes || []).map(s => s.Id === updated.Id ? updated : s),
    }));
  };

  const handleDuplicateNode = (nodeId: string) => {
    const srcBoard = levelData.BoardNodes.find(n => n.Id === nodeId);
    const srcBox = levelData.BoxNodes.find(b => b.Id === nodeId);
    if (!srcBoard) return;

    const newX = (srcBoard.XPosition ?? 0) + 1;
    const newZ = (srcBoard.ZPosition ?? 0);
    const layer = srcBoard.LayerId ?? 0;
    const newId = `${layer}_${newX}_${newZ}`;

    const newBoardNode: BoardNode = {
      ...srcBoard,
      Id: newId,
      XPosition: newX,
      ZPosition: newZ,
      MapPosX: newX,
      MapPosY: newZ,
    };

    const newBoxNode: BoxNode = srcBox ? {
      ...srcBox,
      Id: newId,
      BlockedNodes: [],
    } : {
      Id: newId,
      TypeId: 1,
      BoxColor: 0,
      BlockedNodes: [],
      InitCards: [0, 0, 0, 0],
      IsHidden: false,
    };

    setLevelData(prev => ({
      ...prev,
      BoardNodes: [...prev.BoardNodes, newBoardNode],
      BoxNodes: [...prev.BoxNodes, newBoxNode],
    }));

    setSelectedNodeId(newId);
    showToast(`Duplicated node to "${newId}"`);
  };

  const handleDeleteNode = (nodeId: string) => {
    setLevelData(prev => ({
      ...prev,
      BoardNodes: prev.BoardNodes.filter(n => n.Id !== nodeId),
      BoxNodes: prev.BoxNodes.filter(b => b.Id !== nodeId),
      SpawnerNodes: (prev.SpawnerNodes || []).filter(s => s.Id !== nodeId),
    }));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
    showToast('Deleted node.');
  };

  const handleAddNewNodeToLayer = (layerId: number) => {
    const layerNodes = levelData.BoardNodes.filter(n => (n.LayerId ?? 0) === layerId);
    const count = layerNodes.length;
    const newX = count % 5;
    const newZ = Math.floor(count / 5);
    const newId = `${layerId}_${newX}_${newZ}`;

    const newBoardNode: BoardNode = {
      Id: newId,
      LayerId: layerId,
      TileMapId: layerId,
      XPosition: newX,
      ZPosition: newZ,
      MapPosX: newX,
      MapPosY: newZ,
      YPosition: 0,
      YRotation: 0,
      ZRotation: 0,
    };

    const newBoxNode: BoxNode = {
      Id: newId,
      TypeId: 1,
      BoxColor: layerId % 4,
      BlockedNodes: [],
      InitCards: [layerId % 4, layerId % 4, layerId % 4, layerId % 4],
      IsHidden: false,
    };

    setLevelData(prev => ({
      ...prev,
      BoardNodes: [...prev.BoardNodes, newBoardNode],
      BoxNodes: [...prev.BoxNodes, newBoxNode],
    }));

    setSelectedNodeId(newId);
    showToast(`Added new Box to Layer ${layerId}`);
  };

  const handleAddPreset = (typeId: number, colorId: number, cards: number[], rotation: number) => {
    const layer = isolatedLayer !== null ? isolatedLayer : 0;
    const count = levelData.BoardNodes.filter(n => (n.LayerId ?? 0) === layer).length;
    const newX = (count % 4) * 1.2;
    const newZ = Math.floor(count / 4) * 1.2;
    const newId = `${layer}_${Math.round(newX * 10) / 10}_${Math.round(newZ * 10) / 10}`;

    const newBoardNode: BoardNode = {
      Id: newId,
      LayerId: layer,
      TileMapId: layer,
      XPosition: newX,
      ZPosition: newZ,
      MapPosX: newX,
      MapPosY: newZ,
      YPosition: 0,
      YRotation: rotation,
      ZRotation: 0,
    };

    const newBoxNode: BoxNode = {
      Id: newId,
      TypeId: typeId,
      BoxColor: colorId,
      BlockedNodes: [],
      InitCards: cards,
      IsHidden: false,
      IsPaperBox: colorId === 5,
    };

    setLevelData(prev => ({
      ...prev,
      BoardNodes: [...prev.BoardNodes, newBoardNode],
      BoxNodes: [...prev.BoxNodes, newBoxNode],
    }));

    setSelectedNodeId(newId);
    showToast(`Added box preset to Layer ${layer}!`);
  };

  // Layer Visibility
  const handleToggleLayerVisibility = (layerId: number) => {
    setVisibleLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  const handleToggleIsolateLayer = (layerId: number) => {
    setIsolatedLayer(prev => prev === layerId ? null : layerId);
  };

  // Auto Tools
  const handleAutoCalculateBlockers = () => {
    const result = calculateAutoBlockersResult(levelData);
    setLevelData(prev => ({
      ...prev,
      BoxNodes: result.updatedBoxes,
      SpawnerNodes: result.updatedSpawners,
    }));
    showToast(`Auto-Blockers: Updated blockers for ${result.updatedBoxes.length} boxes!`);
  };

  const handleAutoBalanceDeck = () => {
    const result = balanceLevelCardDeckResult(levelData);
    setLevelData(result.level);
    showToast(`Deck Balanced! Solvable: ${result.solvable ? 'YES' : 'NO'}`);
  };

  // ================= CONVEYOR ACTIONS =================
  const handleSelectConveyor = (data: ConveyorData, name?: string) => {
    setConveyorData(data);
    if (name) setConveyorName(name);
    setSelectedConveyorNodeId(data.ConveyorNodes[0]?.Id || null);
    setSelectedConveyorSlotId(data.ConveyorSlots[0]?.Id || null);
    showToast(`Switched to Conveyor #${data.Id} (${name || 'Preset'})!`);
  };

  const handleSaveConveyor = (name: string) => {
    const newEntry: SavedConveyor = {
      id: `custom_conveyor_${Date.now()}`,
      name: name.trim(),
      updatedAt: new Date().toLocaleDateString(),
      data: conveyorData,
    };
    const updated = [newEntry, ...savedConveyors];
    updateSavedConveyors(updated);
    setConveyorName(name.trim());
    showToast(`Saved Conveyor "${name}" to library!`);
  };

  const handleDeleteSavedConveyor = (id: string) => {
    const updated = savedConveyors.filter(s => s.id !== id);
    updateSavedConveyors(updated);
    showToast('Deleted conveyor preset.');
  };

  const handleExportConveyorJson = () => {
    downloadConveyorFile(conveyorData, `conveyor_${conveyorData.Id}.json`);
    showToast(`Exported "conveyor_${conveyorData.Id}.json"!`);
  };

  const handleImportConveyorFile = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = parseConveyorData(text);
      setConveyorData(parsed);
      const name = file.name.replace(/\.[^/.]+$/, "");
      setConveyorName(name);
      setSelectedConveyorNodeId(parsed.ConveyorNodes[0]?.Id || null);
      setSelectedConveyorSlotId(parsed.ConveyorSlots[0]?.Id || null);
      showToast(`Imported Conveyor "${name}" successfully!`);
    } catch (err: any) {
      showToast(`Failed to import conveyor: ${err.message}`, 'warning');
    }
  };

  const handleLoadConveyorFromJson = (data: ConveyorData, name?: string, saveToLibrary?: boolean) => {
    setConveyorData(data);
    const finalName = name || `Conveyor #${data.Id}`;
    setConveyorName(finalName);
    setSelectedConveyorNodeId(data.ConveyorNodes[0]?.Id || null);
    setSelectedConveyorSlotId(data.ConveyorSlots[0]?.Id || null);

    if (saveToLibrary) {
      const newEntry: SavedConveyor = {
        id: `imported_conveyor_${Date.now()}`,
        name: finalName,
        updatedAt: new Date().toLocaleDateString(),
        data,
      };
      updateSavedConveyors([newEntry, ...savedConveyors.filter(c => c.name !== finalName)]);
      showToast(`Loaded and saved "${finalName}" to library!`);
    } else {
      showToast(`Loaded "${finalName}" successfully!`);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* Top Main Navigation Bar */}
      <Navbar
        editorMode={editorMode}
        onEditorModeChange={setEditorMode}
        levelName={levelName}
        onLevelNameChange={setLevelName}
        onImportFiles={handleImportFiles}
        onExportBytes={handleExportBytes}
        onExportJson={handleExportJson}
        onExportAllZip={handleExportAllZip}
        onOpenJsonModal={() => setShowJsonModal(true)}
        onOpenLoadJsonModal={() => setShowLoadJsonModal(true)}
        onAutoCalculateBlockers={handleAutoCalculateBlockers}
        onAutoBalanceDeck={handleAutoBalanceDeck}
        realBoxSize={realBoxSize}
        onToggleRealBoxSize={() => setRealBoxSize(!realBoxSize)}
        showGrid={showGrid}
        onToggleShowGrid={() => setShowGrid(!showGrid)}
        snapToGrid={snapToGrid}
        onToggleSnapToGrid={() => setSnapToGrid(!snapToGrid)}
        showAllDependencies={showAllDependencies}
        onToggleShowAllDependencies={() => setShowAllDependencies(!showAllDependencies)}
        conveyorData={conveyorData}
        conveyorName={conveyorName}
        availableConveyors={availableConveyors}
        onSelectConveyor={handleSelectConveyor}
        onOpenConveyorJsonModal={() => setShowConveyorJsonModal(true)}
        onOpenLoadConveyorJsonModal={() => setShowConveyorLoadJsonModal(true)}
        onExportConveyorJson={handleExportConveyorJson}
        onImportConveyorFile={handleImportConveyorFile}
        onStartPlaytest={() => setShowPlaytestModal(true)}
        onOpenHelp={() => setShowHelpModal(true)}
      />

      {/* Sub-Header Stats & Conveyor Feeder Deck Bar (In Level Mode) */}
      {editorMode === 'level' && (
        <StatsBar
          levelData={levelData}
          validationIssues={validationIssues}
          onUpdateGlobalSettings={(isOddSize, version, isHardLvl) =>
            setLevelData(prev => ({
              ...prev,
              IsOddSize: isOddSize,
              Version: version,
              IsHardLvl: isHardLvl !== undefined ? isHardLvl : (prev.IsHardLvl ?? false),
            }))
          }
          onOpenConveyorCards={() => setSelectedNodeId(null)}
        />
      )}

      {/* Main Workspace 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {editorMode === 'level' ? (
          /* ================= LEVEL EDITOR MODE ================= */
          <>
            {/* Left Sidebar: Library / Layers / Palette */}
            <aside className="w-80 bg-slate-900/95 border-r border-slate-800 flex flex-col z-10 shrink-0">
              {/* Sidebar Tab Bar */}
              <div className="flex border-b border-slate-800 bg-slate-950/60 p-1 gap-1">
                <button
                  onClick={() => setActiveSidebarTab('library')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    activeSidebarTab === 'library'
                      ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bookmark size={13} />
                  <span>Library</span>
                </button>
                <button
                  onClick={() => setActiveSidebarTab('layers')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    activeSidebarTab === 'layers'
                      ? 'bg-slate-800 text-sky-400 border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers size={13} />
                  <span>Layers</span>
                </button>
                <button
                  onClick={() => setActiveSidebarTab('palette')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    activeSidebarTab === 'palette'
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <PackagePlus size={13} />
                  <span>Palette</span>
                </button>
              </div>

              {/* Sidebar Tab Content */}
              <div className="flex-1 p-3 overflow-y-auto">
                {activeSidebarTab === 'library' && (
                  <LevelLibrary
                    currentLevelData={levelData}
                    onLoadLevel={handleLoadLevel}
                    onImportFiles={handleImportFiles}
                    onOpenLoadJsonModal={() => setShowLoadJsonModal(true)}
                    savedLevels={savedLevels}
                    onSaveLevel={handleSaveLevel}
                    onDeleteSavedLevel={handleDeleteSavedLevel}
                    onClearAllSaved={handleClearAllSaved}
                  />
                )}
                {activeSidebarTab === 'layers' && (
                  <LayerManager
                    levelData={levelData}
                    selectedNodeId={selectedNodeId}
                    visibleLayers={visibleLayers}
                    isolatedLayer={isolatedLayer}
                    onToggleLayerVisibility={handleToggleLayerVisibility}
                    onToggleIsolateLayer={handleToggleIsolateLayer}
                    onSelectNode={setSelectedNodeId}
                    onDeleteNode={handleDeleteNode}
                    onAddNewNodeToLayer={handleAddNewNodeToLayer}
                  />
                )}
                {activeSidebarTab === 'palette' && (
                  <PalettePanel onAddPreset={handleAddPreset} />
                )}
              </div>
            </aside>

            {/* Center: Interactive Visual Canvas */}
            <main className="flex-1 relative overflow-hidden">
              <LevelCanvas
                levelData={levelData}
                selectedNodeId={selectedNodeId}
                visibleLayers={visibleLayers}
                isolatedLayer={isolatedLayer}
                realBoxSize={realBoxSize}
                showGrid={showGrid}
                showCoordinates={showCoordinates}
                showAllDependencies={showAllDependencies}
                snapToGrid={snapToGrid}
                onSelectNode={setSelectedNodeId}
                onUpdateBoardNode={handleUpdateBoardNode}
                onUpdateBoxNode={handleUpdateBoxNode}
              />
            </main>

            {/* Right Sidebar: Node & Box Inspector */}
            <aside className="w-80 h-full shrink-0 z-10">
              <NodeInspector
                levelData={levelData}
                selectedNodeId={selectedNodeId}
                onUpdateBoardNode={handleUpdateBoardNode}
                onUpdateBoxNode={handleUpdateBoxNode}
                onUpdateSpawnerNode={handleUpdateSpawnerNode}
                onDuplicateNode={handleDuplicateNode}
                onDeleteNode={handleDeleteNode}
                onUpdateLevelSettings={(updates) => setLevelData(prev => ({ ...prev, ...updates }))}
              />
            </aside>
          </>
        ) : (
          /* ================= CONVEYOR EDITOR MODE ================= */
          <>
            {/* Left Sidebar: Conveyor Presets & Saved Conveyors */}
            <aside className="w-80 bg-slate-900/95 border-r border-slate-800 flex flex-col z-10 shrink-0">
              <div className="h-11 px-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Repeat size={15} className="text-indigo-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Conveyor Library
                  </span>
                </div>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-bold">
                  Modular
                </span>
              </div>
              <div className="flex-1 p-3 overflow-y-auto">
                <ConveyorLibrary
                  currentConveyor={conveyorData}
                  savedConveyors={savedConveyors}
                  onLoadConveyor={handleSelectConveyor}
                  onSaveConveyor={handleSaveConveyor}
                  onDeleteSavedConveyor={handleDeleteSavedConveyor}
                  onImportConveyorFile={handleImportConveyorFile}
                  onOpenInputJsonModal={() => setShowConveyorLoadJsonModal(true)}
                />
              </div>
            </aside>

            {/* Center: Interactive Conveyor Canvas */}
            <main className="flex-1 relative overflow-hidden">
              <ConveyorCanvas
                conveyorData={conveyorData}
                levelData={levelData}
                selectedNodeId={selectedConveyorNodeId}
                selectedSlotId={selectedConveyorSlotId}
                onSelectNode={setSelectedConveyorNodeId}
                onSelectSlot={setSelectedConveyorSlotId}
                onUpdateConveyor={setConveyorData}
              />
            </main>

            {/* Right Sidebar: Conveyor Inspector */}
            <aside className="w-80 h-full shrink-0 z-10">
              <ConveyorInspector
                conveyorData={conveyorData}
                selectedNodeId={selectedConveyorNodeId}
                selectedSlotId={selectedConveyorSlotId}
                onSelectNode={setSelectedConveyorNodeId}
                onSelectSlot={setSelectedConveyorSlotId}
                onUpdateConveyor={setConveyorData}
              />
            </aside>
          </>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 border border-slate-700 text-slate-100 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-medium animate-fadeIn">
          {toast.type === 'success' && <CheckCircle2 size={15} className="text-emerald-400" />}
          {toast.type === 'warning' && <AlertCircle size={15} className="text-amber-400" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Modals */}
      {showJsonModal && (
        <JsonModal
          levelData={levelData}
          onClose={() => setShowJsonModal(false)}
          onApply={(updated) => {
            setLevelData(updated);
            showToast('Applied JSON updates to level!');
          }}
          onSwitchToLoadJson={() => {
            setShowJsonModal(false);
            setShowLoadJsonModal(true);
          }}
        />
      )}

      {showLoadJsonModal && (
        <LoadJsonModal
          onClose={() => setShowLoadJsonModal(false)}
          onLoadLevel={handleLoadLevelFromJson}
          onBatchImport={handleBatchImportFromJson}
        />
      )}

      {showConveyorJsonModal && (
        <ConveyorJsonModal
          conveyorData={conveyorData}
          onClose={() => setShowConveyorJsonModal(false)}
          onApply={(updated) => {
            setConveyorData(updated);
            showToast(`Applied updates to Conveyor #${updated.Id}!`);
          }}
        />
      )}

      {showConveyorLoadJsonModal && (
        <ConveyorLoadJsonModal
          onClose={() => setShowConveyorLoadJsonModal(false)}
          onLoadConveyor={handleLoadConveyorFromJson}
        />
      )}

      {showPlaytestModal && (
        <PlaytestModal
          levelData={levelData}
          conveyorData={conveyorData}
          onClose={() => setShowPlaytestModal(false)}
        />
      )}

      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
}
