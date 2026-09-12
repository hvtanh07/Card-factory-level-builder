import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LevelData, BoardNode, BoxNode, SpawnerNode, ValidationIssue } from './types/level';
import { ConveyorData } from './types/conveyor';
import { LEVEL_1_SAMPLE, PRESET_LEVELS } from './constants/sampleLevels';
import { DEFAULT_CONVEYOR_DATA } from './constants/defaultConveyor';
import { 
  parseLevelData, 
  downloadLevelFile, 
  parseMultipleFiles, 
  exportAllLevelsAsZip 
} from './utils/fileParser';
import { 
  parseConveyorData, 
  downloadConveyorJson 
} from './utils/conveyorParser';
import { calculateAutoBlockers, calculateAutoBlockersResult } from './utils/autoBlocker';
import { validateLevel, balanceLevelCardDeck, balanceLevelCardDeckResult } from './utils/levelValidator';
import { Navbar } from './components/Header/Navbar';
import { StatsBar } from './components/Header/StatsBar';
import { LevelCanvas } from './components/Canvas/LevelCanvas';
import { NodeInspector } from './components/Inspector/NodeInspector';
import { ConveyorCanvas } from './components/Conveyor/ConveyorCanvas';
import { ConveyorInspector } from './components/Conveyor/ConveyorInspector';
import { LayerManager } from './components/Sidebar/LayerManager';
import { PalettePanel } from './components/Sidebar/PalettePanel';
import { LevelLibrary, SavedLevel } from './components/Sidebar/LevelLibrary';
import { JsonModal } from './components/Modals/JsonModal';
import { LoadJsonModal } from './components/Modals/LoadJsonModal';
import { ConveyorJsonModal } from './components/Conveyor/ConveyorJsonModal';
import { PlaytestModal } from './components/Playtest/PlaytestModal';
import { HelpModal } from './components/Modals/HelpModal';
import { 
  Layers, 
  PackagePlus, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle,
  Workflow
} from 'lucide-react';

const STORAGE_KEY = 'card_factory_project_levels';
const CONVEYOR_STORAGE_KEY = 'card_factory_conveyor_data';

export function App() {
  // Mode: 'level' (Box Builder) or 'conveyor' (Conveyor Builder)
  const [editorMode, setEditorMode] = useState<'level' | 'conveyor'>('level');

  // Current Level State
  const [levelData, setLevelData] = useState<LevelData>(LEVEL_1_SAMPLE);
  const [levelName, setLevelName] = useState('Level 1 (Tutorial)');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('0_-1_0');

  // Current Conveyor State
  const [conveyorData, setConveyorData] = useState<ConveyorData>(() => {
    try {
      const stored = localStorage.getItem(CONVEYOR_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CONVEYOR_DATA;
  });

  const [selectedConveyorId, setSelectedConveyorId] = useState<string | null>('0');
  const [selectedConveyorType, setSelectedConveyorType] = useState<'node' | 'slot' | null>('node');
  const [showGhostLevel, setShowGhostLevel] = useState<boolean>(true);

  // Sync conveyor data to LocalStorage
  const updateConveyorData = (updated: ConveyorData) => {
    setConveyorData(updated);
    try {
      localStorage.setItem(CONVEYOR_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

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

  // Sync saved levels to LocalStorage
  const updateSavedLevels = (updated: SavedLevel[]) => {
    setSavedLevels(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

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

  // Batch Multi-File Import (.json, .zip)
  const handleImportFiles = async (files: FileList | File[]) => {
    try {
      const parsedLevels = await parseMultipleFiles(files);
      if (parsedLevels.length === 0) {
        showToast('No valid level files found in selection.', 'warning');
        return;
      }

      // Add all parsed levels to project store
      const newEntries: SavedLevel[] = parsedLevels.map(p => ({
        id: `imported_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        name: p.name,
        updatedAt: new Date().toLocaleDateString(),
        data: p.data,
      }));

      const updatedStore = [...newEntries, ...savedLevels];
      updateSavedLevels(updatedStore);

      // Load first parsed level
      const first = parsedLevels[0];
      setLevelData(first.data);
      setLevelName(first.name);
      setSelectedNodeId(first.data.BoardNodes[0]?.Id || null);

      showToast(`Successfully imported & stored ${parsedLevels.length} level${parsedLevels.length > 1 ? 's' : ''}!`);
    } catch (err: any) {
      showToast(`Failed to import files: ${err.message}`, 'warning');
    }
  };

  // Conveyor JSON File Import
  const handleImportConveyorFile = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = parseConveyorData(text);
      updateConveyorData(parsed);
      setSelectedConveyorId(parsed.ConveyorNodes[0]?.Id || parsed.ConveyorSlots[0]?.Id || null);
      setSelectedConveyorType(parsed.ConveyorNodes[0] ? 'node' : parsed.ConveyorSlots[0] ? 'slot' : null);
      showToast(`Successfully imported conveyor layout (${parsed.ConveyorNodes.length} nodes, ${parsed.ConveyorSlots.length} slots)!`);
    } catch (err: any) {
      showToast(`Failed to import conveyor: ${err.message}`, 'warning');
    }
  };

  // Export handlers
  const handleExportJson = () => {
    downloadLevelFile(levelData, levelName);
    showToast(`Exported "${levelName}.json" file!`);
  };

  const handleExportConveyorJson = () => {
    downloadConveyorJson(conveyorData, 'conveyor_layout.json');
    showToast('Exported conveyor layout to "conveyor_layout.json"!');
  };

  const handleExportAllZip = () => {
    const all = [
      ...savedLevels.map(s => ({ name: s.name, data: s.data })),
      ...PRESET_LEVELS.map(p => ({ name: p.name, data: p.data })),
    ];
    exportAllLevelsAsZip(all, 'card_factory_all_levels.zip');
    showToast(`Exported all ${all.length} levels as .zip bundle!`);
  };

  // Project Level Store actions
  const handleSaveLevel = (name: string) => {
    const newEntry: SavedLevel = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      updatedAt: new Date().toLocaleDateString(),
      data: levelData,
    };
    const updated = [newEntry, ...savedLevels];
    updateSavedLevels(updated);
    showToast(`Saved "${name}" to project store!`);
  };

  const handleDeleteSavedLevel = (id: string) => {
    const updated = savedLevels.filter(s => s.id !== id);
    updateSavedLevels(updated);
    showToast('Deleted level from project store.');
  };

  const handleClearAllSaved = () => {
    updateSavedLevels([]);
    showToast('Cleared all custom project levels.');
  };

  // Auto-Calculate Blockers
  const handleAutoCalculateBlockers = () => {
    const { updatedBoxes, updatedSpawners, sameLayerConflicts } = calculateAutoBlockersResult(levelData);
    let changeCount = 0;
    for (let i = 0; i < updatedBoxes.length; i++) {
      const oldBox = levelData.BoxNodes[i];
      const newBox = updatedBoxes[i];
      if (oldBox && JSON.stringify(oldBox.BlockedNodes) !== JSON.stringify(newBox.BlockedNodes)) {
        changeCount++;
      }
    }
    for (let i = 0; i < updatedSpawners.length; i++) {
      const oldSp = (levelData.SpawnerNodes || [])[i];
      const newSp = updatedSpawners[i];
      if (oldSp && JSON.stringify(oldSp.BlockedNodes) !== JSON.stringify(newSp.BlockedNodes)) {
        changeCount++;
      }
    }
    setLevelData(prev => ({
      ...prev,
      BoxNodes: updatedBoxes,
      SpawnerNodes: updatedSpawners,
    }));

    if (sameLayerConflicts.length > 0) {
      showToast(`Computed blockers (${changeCount} updated). ⚠️ Warning: ${sameLayerConflicts.length} pairs overlap on the same layer!`);
    } else {
      showToast(`Auto-blockers computed! Updated dependencies for ${changeCount} nodes.`);
    }
  };

  // Auto-Balance Card Deck
  const handleAutoBalanceDeck = () => {
    const maxColors = levelData.BoxNodes.length <= 10 ? 2 : 3;
    let result = balanceLevelCardDeckResult(levelData, 4, maxColors);
    if (!result.solvable && maxColors === 2) {
      result = balanceLevelCardDeckResult(levelData, 4, 3);
    }
    setLevelData(result.level);
    if (result.solvable) {
      showToast('Card deck balanced (max 3 colors/box) & verified solvable with 4 slots!');
    } else {
      showToast('Deck balanced by color groups, but 4-slot path is currently locked. Adjust blockers or box order.', 'warning');
    }
  };

  // Node updates
  const handleUpdateBoardNode = (updatedNode: BoardNode) => {
    setLevelData(prev => ({
      ...prev,
      BoardNodes: prev.BoardNodes.map(n => (n.Id === updatedNode.Id ? updatedNode : n)),
    }));
  };

  const handleUpdateBoxNode = (updatedBox: BoxNode) => {
    setLevelData(prev => ({
      ...prev,
      BoxNodes: prev.BoxNodes.map(b => (b.Id === updatedBox.Id ? updatedBox : b)),
    }));
  };

  const handleUpdateSpawnerNode = (updatedSpawner: SpawnerNode) => {
    setLevelData(prev => ({
      ...prev,
      SpawnerNodes: (prev.SpawnerNodes || []).map(s => (s.Id === updatedSpawner.Id ? updatedSpawner : s)),
    }));
  };

  // Layer visibility & isolation
  const handleToggleLayerVisibility = (layerId: number) => {
    setVisibleLayers(prev => {
      const next = new Set(prev);
      if (next.has(layerId)) next.delete(layerId);
      else next.add(layerId);
      return next;
    });
  };

  const handleToggleIsolateLayer = (layerId: number) => {
    setIsolatedLayer(prev => (prev === layerId ? null : layerId));
  };

  // Add new box node
  const handleAddNewNodeToLayer = (layerId: number) => {
    let index = 0;
    let newId = `${layerId}_0_${index}`;
    while (levelData.BoardNodes.some(n => n.Id === newId)) {
      index++;
      newId = `${layerId}_0_${index}`;
    }

    const newBoardNode: BoardNode = {
      Id: newId,
      NodeId: 1,
      LayerId: layerId,
      TileMapId: layerId,
      YRotation: 0,
      ZRotation: 0,
      XPosition: 0,
      ZPosition: index,
      MapPosX: 0,
      MapPosY: index,
      YPosition: 0,
    };

    const newBoxNode: BoxNode = {
      Id: newId,
      TypeId: 1,
      BoxColor: layerId % 6,
      BlockedNodes: [],
      InitCards: [layerId % 6, layerId % 6, layerId % 6, layerId % 6],
      IsHidden: false,
      LockedTurn: 0,
      IsCardsHidden: false,
    };

    setLevelData(prev => ({
      ...prev,
      BoardNodes: [...prev.BoardNodes, newBoardNode],
      BoxNodes: [...prev.BoxNodes, newBoxNode],
    }));

    setSelectedNodeId(newId);
    showToast(`Added new Box "${newId}" to Layer ${layerId}`);
  };

  // Add preset box
  const handleAddPreset = (typeId: number, colorId: number, cards: number[], rotation: number) => {
    const targetLayer = isolatedLayer !== null ? isolatedLayer : 1;
    let index = 0;
    let newId = `${targetLayer}_${index}_0`;
    while (levelData.BoardNodes.some(n => n.Id === newId)) {
      index++;
      newId = `${targetLayer}_${index}_0`;
    }

    const newBoardNode: BoardNode = {
      Id: newId,
      NodeId: typeId,
      LayerId: targetLayer,
      TileMapId: targetLayer,
      YRotation: rotation,
      ZRotation: rotation,
      XPosition: 0,
      ZPosition: 0,
      MapPosX: 0,
      MapPosY: 0,
      YPosition: 0,
    };

    const newBoxNode: BoxNode = {
      Id: newId,
      TypeId: typeId,
      BoxColor: colorId,
      BlockedNodes: [],
      InitCards: cards,
      IsHidden: false,
      LockedTurn: 0,
      IsCardsHidden: false,
    };

    setLevelData(prev => ({
      ...prev,
      BoardNodes: [...prev.BoardNodes, newBoardNode],
      BoxNodes: [...prev.BoxNodes, newBoxNode],
    }));

    setSelectedNodeId(newId);
    showToast(`Created new preset Box "${newId}"`);
  };

  // Duplicate node
  const handleDuplicateNode = (id: string) => {
    const origBoard = levelData.BoardNodes.find(n => n.Id === id);
    const origBox = levelData.BoxNodes.find(b => b.Id === id);
    const origSpawner = (levelData.SpawnerNodes || []).find(s => s.Id === id);

    if (!origBoard) return;

    let index = 1;
    let newId = `${origBoard.Id}_copy_${index}`;
    while (levelData.BoardNodes.some(n => n.Id === newId)) {
      index++;
      newId = `${origBoard.Id}_copy_${index}`;
    }

    const newBoardNode: BoardNode = {
      ...origBoard,
      Id: newId,
      XPosition: origBoard.XPosition + 1.2,
      ZPosition: origBoard.ZPosition,
    };

    const updatedBoxes = origBox
      ? [...levelData.BoxNodes, { ...origBox, Id: newId, BlockedNodes: [] }]
      : levelData.BoxNodes;

    const updatedSpawners = origSpawner
      ? [...(levelData.SpawnerNodes || []), { ...origSpawner, Id: newId, BlockedNodes: [] }]
      : (levelData.SpawnerNodes || []);

    setLevelData(prev => ({
      ...prev,
      BoardNodes: [...prev.BoardNodes, newBoardNode],
      BoxNodes: updatedBoxes,
      SpawnerNodes: updatedSpawners,
    }));

    setSelectedNodeId(newId);
    showToast(`Duplicated node as "${newId}"`);
  };

  // Delete node
  const handleDeleteNode = (id: string) => {
    setLevelData(prev => ({
      ...prev,
      BoardNodes: prev.BoardNodes.filter(n => n.Id !== id),
      BoxNodes: prev.BoxNodes.filter(b => b.Id !== id).map(b => ({
        ...b,
        BlockedNodes: b.BlockedNodes.filter(bn => bn !== id),
      })),
      SpawnerNodes: (prev.SpawnerNodes || []).filter(s => s.Id !== id).map(s => ({
        ...s,
        BlockedNodes: s.BlockedNodes.filter(bn => bn !== id),
      })),
    }));

    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
    showToast(`Deleted node "${id}"`);
  };

  // Load level from preset / library
  const handleLoadLevel = (level: LevelData, name: string) => {
    setLevelData(level);
    setLevelName(name);
    setSelectedNodeId(level.BoardNodes[0]?.Id || null);
    showToast(`Loaded "${name}"`);
  };

  // Load level from single JSON input
  const handleLoadLevelFromJson = (data: LevelData, name: string) => {
    setLevelData(data);
    setLevelName(name);
    setSelectedNodeId(data.BoardNodes[0]?.Id || null);
    showToast(`Loaded "${name}" from JSON`);
  };

  // Batch import from JSON modal
  const handleBatchImportFromJson = (levels: { name: string; data: LevelData }[]) => {
    const newEntries: SavedLevel[] = levels.map(p => ({
      id: `imported_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: p.name,
      updatedAt: new Date().toLocaleDateString(),
      data: p.data,
    }));

    const updatedStore = [...newEntries, ...savedLevels];
    updateSavedLevels(updatedStore);

    const first = levels[0];
    setLevelData(first.data);
    setLevelName(first.name);
    setSelectedNodeId(first.data.BoardNodes[0]?.Id || null);

    showToast(`Batch imported ${levels.length} levels!`);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* Top Navbar */}
      <Navbar
        editorMode={editorMode}
        onToggleEditorMode={setEditorMode}
        levelName={levelName}
        onLevelNameChange={setLevelName}
        onImportFiles={handleImportFiles}
        onExportJson={handleExportJson}
        onExportAllZip={handleExportAllZip}
        onOpenJsonModal={() => setShowJsonModal(true)}
        onOpenLoadJsonModal={() => setShowLoadJsonModal(true)}
        onAutoCalculateBlockers={handleAutoCalculateBlockers}
        onAutoBalanceDeck={handleAutoBalanceDeck}
        realBoxSize={realBoxSize}
        onToggleRealBoxSize={() => setRealBoxSize(prev => !prev)}
        showGrid={showGrid}
        onToggleShowGrid={() => setShowGrid(prev => !prev)}
        snapToGrid={snapToGrid}
        onToggleSnapToGrid={() => setSnapToGrid(prev => !prev)}
        showAllDependencies={showAllDependencies}
        onToggleShowAllDependencies={() => setShowAllDependencies(prev => !prev)}
        conveyorSlotsCount={conveyorData.ConveyorSlots.length}
        conveyorNodesCount={conveyorData.ConveyorNodes.length}
        onImportConveyorFile={handleImportConveyorFile}
        onExportConveyorJson={handleExportConveyorJson}
        onOpenConveyorJsonModal={() => setShowConveyorJsonModal(true)}
        showGhostLevel={showGhostLevel}
        onToggleGhostLevel={() => setShowGhostLevel(prev => !prev)}
        onStartPlaytest={() => setShowPlaytestModal(true)}
        onOpenHelp={() => setShowHelpModal(true)}
      />

      {/* Stats and Validation Bar */}
      <StatsBar
        levelData={levelData}
        validationIssues={validationIssues}
        onUpdateGlobalSettings={(isOddSize, version, isHardLvl) => {
          setLevelData(prev => ({
            ...prev,
            IsOddSize: isOddSize,
            Version: version,
            ...(isHardLvl !== undefined ? { IsHardLvl: isHardLvl } : {}),
          }));
        }}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Library, Layers, Palette */}
        <aside className="w-72 h-full bg-slate-900 border-r border-slate-800 flex flex-col z-10 shrink-0">
          {/* Sidebar Tabs */}
          <div className="h-10 bg-slate-950 border-b border-slate-800 px-2 flex items-center gap-1 shrink-0">
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
          <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
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

        {/* Center Canvas: Conditionally Box Canvas OR Conveyor Canvas */}
        <main className="flex-1 relative overflow-hidden">
          {editorMode === 'level' ? (
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
          ) : (
            <ConveyorCanvas
              conveyorData={conveyorData}
              levelData={levelData}
              selectedId={selectedConveyorId}
              selectedType={selectedConveyorType}
              showGrid={showGrid}
              showCoordinates={showCoordinates}
              snapToGrid={snapToGrid}
              showGhostLevel={showGhostLevel}
              onToggleGhostLevel={() => setShowGhostLevel(prev => !prev)}
              onSelectItem={(id, type) => {
                setSelectedConveyorId(id);
                setSelectedConveyorType(type);
              }}
              onUpdateConveyorData={updateConveyorData}
            />
          )}
        </main>

        {/* Right Sidebar: Conditionally Node Inspector OR Conveyor Inspector */}
        <aside className="w-80 h-full shrink-0 z-10">
          {editorMode === 'level' ? (
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
          ) : (
            <ConveyorInspector
              conveyorData={conveyorData}
              selectedId={selectedConveyorId}
              selectedType={selectedConveyorType}
              onSelectItem={(id, type) => {
                setSelectedConveyorId(id);
                setSelectedConveyorType(type);
              }}
              onUpdateConveyorData={updateConveyorData}
            />
          )}
        </aside>
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
            updateConveyorData(updated);
            showToast('Applied Conveyor JSON updates!');
          }}
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
