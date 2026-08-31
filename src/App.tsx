import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { LevelData, BoardNode, BoxNode, SpawnerNode, ValidationIssue } from './types/level';
import { LEVEL_1_SAMPLE, PRESET_LEVELS } from './constants/sampleLevels';
import { 
  parseLevelData, 
  downloadLevelFile, 
  parseMultipleFiles, 
  exportAllLevelsAsZip 
} from './utils/fileParser';
import { calculateAutoBlockers, calculateAutoBlockersResult } from './utils/autoBlocker';
import { validateLevel, balanceLevelCardDeck } from './utils/levelValidator';
import { Navbar } from './components/Header/Navbar';
import { StatsBar } from './components/Header/StatsBar';
import { LevelCanvas } from './components/Canvas/LevelCanvas';
import { NodeInspector } from './components/Inspector/NodeInspector';
import { LayerManager } from './components/Sidebar/LayerManager';
import { PalettePanel } from './components/Sidebar/PalettePanel';
import { LevelLibrary, SavedLevel } from './components/Sidebar/LevelLibrary';
import { JsonModal } from './components/Modals/JsonModal';
import { PlaytestModal } from './components/Playtest/PlaytestModal';
import { HelpModal } from './components/Modals/HelpModal';
import { 
  Layers, 
  PackagePlus, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const STORAGE_KEY = 'card_factory_project_levels';

export function App() {
  // Current Level State
  const [levelData, setLevelData] = useState<LevelData>(LEVEL_1_SAMPLE);
  const [levelName, setLevelName] = useState('Level 1 (Tutorial)');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('0_-1_0');

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

  // Export handlers
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
    const balanced = balanceLevelCardDeck(levelData);
    setLevelData(balanced);
    showToast('Card deck balanced to match box capacities perfectly!');
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
      XPosition: index,
      ZPosition: 0,
      MapPosX: index,
      MapPosY: 0,
      YPosition: 0,
    };

    const newBoxNode: BoxNode = {
      Id: newId,
      TypeId: typeId,
      BoxColor: colorId,
      BlockedNodes: [],
      InitCards: [...cards],
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
    showToast(`Added preset to Layer ${targetLayer}!`);
  };

  // Duplicate node
  const handleDuplicateNode = (id: string) => {
    const sourceBoard = levelData.BoardNodes.find(n => n.Id === id);
    const sourceBox = levelData.BoxNodes.find(b => b.Id === id);
    if (!sourceBoard || !sourceBox) return;

    const layer = sourceBoard.LayerId ?? sourceBoard.TileMapId ?? 0;
    const x = (sourceBoard.XPosition !== undefined && sourceBoard.MapPosX === undefined)
      ? sourceBoard.XPosition
      : ((sourceBoard.MapPosX ?? 0) + (sourceBoard.XPosition ?? 0));
    const z = (sourceBoard.ZPosition !== undefined && sourceBoard.MapPosY === undefined)
      ? sourceBoard.ZPosition
      : ((sourceBoard.MapPosY ?? 0) + (sourceBoard.YPosition ?? (sourceBoard.ZPosition ?? 0)));

    let index = 1;
    let newId = `${layer}_${Math.round(x + 1)}_${Math.round(z)}`;
    while (levelData.BoardNodes.some(n => n.Id === newId)) {
      index++;
      newId = `${layer}_${Math.round(x + index)}_${Math.round(z)}`;
    }

    const newBoardNode: BoardNode = {
      ...sourceBoard,
      Id: newId,
      LayerId: layer,
      TileMapId: layer,
      XPosition: x + 1,
      ZPosition: z,
      MapPosX: Math.floor(x + 1),
      MapPosY: Math.floor(z),
    };

    const newBoxNode: BoxNode = {
      ...sourceBox,
      Id: newId,
      InitCards: [...sourceBox.InitCards],
      BlockedNodes: [...sourceBox.BlockedNodes],
    };

    setLevelData(prev => ({
      ...prev,
      BoardNodes: [...prev.BoardNodes, newBoardNode],
      BoxNodes: [...prev.BoxNodes, newBoxNode],
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
        BlockedNodes: b.BlockedNodes.filter(targetId => targetId !== id),
      })),
      SpawnerNodes: (prev.SpawnerNodes || []).filter(s => s.Id !== id),
    }));

    if (selectedNodeId === id) {
      setSelectedNodeId(null);
    }
    showToast(`Deleted node "${id}"`);
  };

  // Load level handler
  const handleLoadLevel = (data: LevelData, name: string) => {
    setLevelData(data);
    setLevelName(name);
    setSelectedNodeId(data.BoardNodes[0]?.Id || null);
    showToast(`Loaded "${name}"!`);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Navigation */}
      <Navbar
        levelName={levelName}
        onLevelNameChange={setLevelName}
        onImportFiles={handleImportFiles}
        onExportBytes={handleExportBytes}
        onExportJson={handleExportJson}
        onExportAllZip={handleExportAllZip}
        onOpenJsonModal={() => setShowJsonModal(true)}
        onAutoCalculateBlockers={handleAutoCalculateBlockers}
        onAutoBalanceDeck={handleAutoBalanceDeck}
        onStartPlaytest={() => setShowPlaytestModal(true)}
        onOpenHelp={() => setShowHelpModal(true)}
        realBoxSize={realBoxSize}
        onToggleRealBoxSize={() => setRealBoxSize(!realBoxSize)}
        showGrid={showGrid}
        onToggleShowGrid={() => setShowGrid(!showGrid)}
        snapToGrid={snapToGrid}
        onToggleSnapToGrid={() => setSnapToGrid(!snapToGrid)}
        showAllDependencies={showAllDependencies}
        onToggleShowAllDependencies={() => setShowAllDependencies(!showAllDependencies)}
      />

      {/* Subheader Metrics & Deck Bar */}
      <StatsBar
        levelData={levelData}
        validationIssues={validationIssues}
        onUpdateGlobalSettings={(isOdd, ver) => setLevelData(prev => ({ ...prev, IsOddSize: isOdd, Version: ver }))}
      />

      {/* Main Workspace 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden relative">
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
          />
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
        />
      )}

      {showPlaytestModal && (
        <PlaytestModal
          levelData={levelData}
          onClose={() => setShowPlaytestModal(false)}
        />
      )}

      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
}
