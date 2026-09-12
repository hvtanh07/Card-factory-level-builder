with open('src/components/Playtest/PlaytestModal.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
for i, l in enumerate(lines):
    if 'const layerElev' in l or '<svg className="w-[700px]' in l or 'board-boxes-system' in l or 'isSpawner && (' in l:
        print(f"Line {i+1}: {l.rstrip()[:90]}")
