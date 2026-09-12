import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

# Steps with slices of PlaytestModal.tsx
# Let's check all steps that have PlaytestModal.tsx content
step_slices = [
    2830, # 1-120
    2832, # 120-250
    2834, # 250-450
    2836, # 450-650
    2838, # 650-800
    1480, # 830-900
    1482, # 900-980
    1484, # 981-1050
    1486, # 1045-1070
    1157, # 1080-1130
]

# Also scan any step between 1 and 2865
all_lines = {}

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx < 2900:
            d = json.loads(line)
            content = d.get('content', '')
            if 'PlaytestModal.tsx' in content and 'Showing lines' in content:
                for l in content.split('\n'):
                    m = re.match(r'^\s*(\d+):\s(.*)$', l)
                    if m:
                        all_lines[int(m.group(1))] = m.group(2)

print(f"Total lines indexed: {len(all_lines)}")
sorted_keys = sorted(all_lines.keys())
print("Min line:", sorted_keys[0], "Max line:", sorted_keys[-1])

# Check missing ranges
missing = []
for i in range(1, sorted_keys[-1] + 1):
    if i not in all_lines:
        missing.append(i)

print("Missing lines:", missing)
