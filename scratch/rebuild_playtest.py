import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

# Build file by taking the latest version of each line
lines_dict = {}

# Priority order of steps (earlier to later)
steps_order = [
    1157, 1155, 1153, 1149, 1133, 1056, 1054,
    1480, 1482, 1484, 1486,
    2025, 2027, 2029, 2031, 2033,
    2112, 2122, 2180, 2206, 2208,
    2801, 2830, 2832, 2834, 2836, 2838, 2865
]

with open(transcript_path, 'r', encoding='utf-8') as f:
    records = [json.loads(line) for line in f]

for step in steps_order:
    if step < len(records):
        d = records[step]
        content = d.get('content', '')
        if 'PlaytestModal.tsx' in content:
            for l in content.split('\n'):
                m = re.match(r'^\s*(\d+):\s(.*)$', l)
                if m:
                    lines_dict[int(m.group(1))] = m.group(2)

print("Total lines collected:", len(lines_dict))
print("Max line:", max(lines_dict.keys()))

with open(r'c:\Users\TUAN ANH\Documents\GitHub\Card factory level builder\scratch\PlaytestModal_rebuilt.tsx', 'w', encoding='utf-8') as out:
    for i in range(1, max(lines_dict.keys()) + 1):
        if i in lines_dict:
            out.write(lines_dict[i] + '\n')
        else:
            out.write(f'/* MISSING {i} */\n')
