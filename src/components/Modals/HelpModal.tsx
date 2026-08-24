import React from 'react';
import { X, MousePointer, Move, RotateCw, Link, Layers, Download, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="h-14 bg-slate-950 px-6 flex items-center justify-between border-b border-slate-800">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Card Factory Level Builder Guide
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed">
          {/* Section: Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
              <Layers size={16} />
              About the Game & Level Data (.bytes)
            </h3>
            <p className="text-slate-400">
              In <strong>Card Factory</strong>, players sort and clear stacks of cards packed into colored boxes and trays. Boxes are arranged on a 2D tilemap grid across multiple overlapping layers (Layer 0 on top, down to Layer 3 at the bottom). Boxes in upper layers block the boxes underneath them until the upper boxes are cleared.
            </p>
          </div>

          {/* Section: Controls */}
          <div className="space-y-2 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <MousePointer size={16} className="text-emerald-400" />
              Editor Controls & Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2">
                <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[11px] font-mono text-slate-200">
                  Left Click
                </kbd>
                <div>
                  <span className="font-semibold text-slate-200">Select Node</span>
                  <p className="text-slate-500 text-[11px]">Inspect and modify properties in the right panel.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[11px] font-mono text-slate-200">
                  Drag Node
                </kbd>
                <div>
                  <span className="font-semibold text-slate-200">Move Position</span>
                  <p className="text-slate-500 text-[11px]">Hold Shift or toggle Snap to snap to whole grid units.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[11px] font-mono text-slate-200">
                  Top Handle
                </kbd>
                <div>
                  <span className="font-semibold text-slate-200">Rotate Node</span>
                  <p className="text-slate-500 text-[11px]">Drag the circular handle above selected node to rotate.</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <kbd className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[11px] font-mono text-slate-200">
                  Space / Wheel
                </kbd>
                <div>
                  <span className="font-semibold text-slate-200">Pan & Zoom</span>
                  <p className="text-slate-500 text-[11px]">Scroll wheel zooms in/out; Space+Drag pans canvas.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Features */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Link size={16} className="text-amber-400" />
              Key Tools & Features
            </h3>
            <ul className="space-y-2 list-disc list-inside text-slate-400">
              <li>
                <strong className="text-slate-200">Auto-Blockers:</strong> Automatically calculates physical spatial overlap between upper and lower layer boxes and updates each box's <code className="text-amber-300 font-mono">BlockedNodes</code> array.
              </li>
              <li>
                <strong className="text-slate-200">Card Deck Editor:</strong> Customize the initial card sequence inside each box with 6 vibrant colors and quick fill presets.
              </li>
              <li>
                <strong className="text-slate-200">Playtest Simulation:</strong> Test level solvability right inside the builder with real unblocking cascade and win verification.
              </li>
              <li>
                <strong className="text-slate-200">Unity .bytes & JSON Export:</strong> Export directly to <code className="text-emerald-300 font-mono">.bytes</code> format ready to drop into Unity Resources or AssetBundles.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="h-14 bg-slate-950 px-6 flex items-center justify-end border-t border-slate-800">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-semibold shadow-md transition"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
