import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    records = [json.loads(line) for line in f]

def extract_step_lines(step_idx):
    lines = {}
    if step_idx < len(records):
        content = records[step_idx].get('content', '')
        for l in content.split('\n'):
            m = re.match(r'^\s*(\d+):\s(.*)$', l)
            if m:
                lines[int(m.group(1))] = m.group(2)
    return lines

full_file = {}
# 1-800 from steps 2830, 2832, 2834, 2836, 2838
for s in [2830, 2832, 2834, 2836, 2838]:
    full_file.update(extract_step_lines(s))

# 830-1070 from steps 1480, 1482, 1484, 1486
for s in [1480, 1482, 1484, 1486]:
    full_file.update(extract_step_lines(s))

# 1080-1130 from step 1157
full_file.update(extract_step_lines(1157))

# Apply step 2209 and 2211 updates (the isPaperBox/isRainbowBox updates)
# In handleBoardBoxClick:
full_file[398] = "    const isTray = Boolean(activeBox.IsPaperBox);"
full_file[399] = "    const boxType = getBoxType(activeBox.TypeId, isTray);"

# In board render:
# Let's check lines 870-893 in board render:
full_file[870] = "                      const isSpawner = !!spawnerBoxes && spawnerBoxes.length > 0;"
full_file[871] = "                      const isTray = Boolean(activeBox.IsPaperBox);"
full_file[872] = "                      const boxType = getBoxType(activeBox.TypeId, isTray);"
full_file[873] = "                      const colorDef = getColor(activeBox.BoxColor);"
full_file[874] = "                      const blockers = liveBlockedByMap.get(bn.Id) || [];"
full_file[875] = "                      const isBlocked = blockers.length > 0;"
full_file[876] = ""
full_file[877] = "                      // Mystery / Rainbow Box: color is hidden while blocked"
full_file[878] = "                      const isHidden = (activeBox.IsRainbowBox || activeBox.IsHidden) && isBlocked;"
full_file[879] = "                      const areCardsHidden = activeBox.IsCardsHidden;"
full_file[880] = ""
full_file[881] = "                      const unityX = bn.XPosition !== undefined ? bn.XPosition : (bn.MapPosX ?? 0);"
full_file[882] = "                      const unityZ = bn.ZPosition !== undefined ? bn.ZPosition : ((bn.MapPosY ?? 0) + (bn.YPosition ?? 0));"
full_file[883] = ""
full_file[884] = "                      const cx = unityX * 74;"
full_file[885] = "                      const cy = -unityZ * 74;"
full_file[886] = "                      const rot = bn.YRotation ?? bn.ZRotation ?? 0;"
full_file[887] = "                      const svgAngle = (-rot + 360) % 360;"
full_file[888] = ""
full_file[889] = "                      const w = boxType.width;"
full_file[890] = "                      const h = boxType.height;"

# Fill missing lines 801-829:
full_file[801] = '                        fill="rgba(255, 255, 255, 0.6)"'
full_file[802] = '                      />'
full_file[803] = '                    </g>'
full_file[804] = '                  );'
full_file[805] = '                })}'
full_file[806] = ''
full_file[807] = '                {/* 4. Flying Cards to Docked Boxes */}'
full_file[808] = '                {flyingCardsRef.current.map((fc) => {'
full_file[809] = '                  const colorDef = getColor(fc.color);'
full_file[810] = '                  const curX = fc.startX + (fc.targetX - fc.startX) * fc.progress;'
full_file[811] = '                  const curY = fc.startY + (fc.targetY - fc.startY) * fc.progress - Math.sin(fc.progress * Math.PI) * 35;'
full_file[812] = '                  const scale = 1.0 + Math.sin(fc.progress * Math.PI) * 0.25;'
full_file[813] = ''
full_file[814] = '                  return ('
full_file[815] = '                    <g'
full_file[816] = '                      key={`flying-${fc.uid}`}'
full_file[817] = '                      transform={`translate(${curX}, ${curY}) scale(${scale})`}'
full_file[818] = '                    >'
full_file[819] = '                      <rect'
full_file[820] = '                        x="-9"'
full_file[821] = '                        y="-12"'
full_file[822] = '                        width="18"'
full_file[823] = '                        height="24"'
full_file[824] = '                        rx="4"'
full_file[825] = '                        fill={colorDef.hex}'
full_file[826] = '                        stroke="#ffffff"'
full_file[827] = '                        strokeWidth="2"'
full_file[828] = '                      />'
full_file[829] = '                      <rect'
full_file[830] = '                        x="-7"'
full_file[831] = '                        y="-10"'
full_file[832] = '                        width="14"'
full_file[833] = '                        height="4"'
full_file[834] = '                        rx="2"'
full_file[835] = '                        fill="rgba(255, 255, 255, 0.6)"'
full_file[836] = '                      />'
full_file[837] = '                    </g>'
full_file[838] = '                  );'
full_file[839] = '                })}'
full_file[840] = '              </svg>'
full_file[841] = '            </div>'
full_file[842] = '          </div>'

# Check if there are any other missing lines
max_l = max(full_file.keys())
print("Max line:", max_l)
missing = [i for i in range(1, max_l + 1) if i not in full_file]
print("Missing:", missing)

# And lines after 1130 (Win modal and zoom controls end):
with open(r'c:\Users\TUAN ANH\Documents\GitHub\Card factory level builder\scratch\PlaytestModal_orig_clean.tsx', 'w', encoding='utf-8') as out:
    for i in range(1, max_l + 1):
        out.write(full_file[i] + '\n')
    
    # End of controls & win modal
    out.write("""              <button
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition"
                title="Reset Zoom & Pan"
              >
                <Maximize2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Level Win Modal Overlay */}
        {isWon && (
          <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/10 animate-bounce">
                <Trophy size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-100 uppercase tracking-wider mb-1">
                Level Complete!
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                All {levelData.BoardNodes.length} boxes cleared successfully.
              </p>
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={resetGame}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw size={14} />
                  <span>Replay</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/30"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
""")
