import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

lines_dict = {}

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx < 2910: # strictly before our edits at 2911
            d = json.loads(line)
            content = d.get('content', '')
            if 'PlaytestModal.tsx' in content and 'Total Lines:' in content:
                for l in content.split('\n'):
                    m = re.match(r'^\s*(\d+):\s(.*)$', l)
                    if m:
                        lines_dict[int(m.group(1))] = m.group(2)

print("Found line count:", len(lines_dict))
max_line = max(lines_dict.keys())
print("Max line:", max_line)
missing = [i for i in range(1, max_line + 1) if i not in lines_dict]
print("Missing lines:", missing)

with open(r'c:\Users\TUAN ANH\Documents\GitHub\Card factory level builder\scratch\PlaytestModal_exact_orig.tsx', 'w', encoding='utf-8') as out:
    for i in range(1, max_line + 1):
        if i in lines_dict:
            out.write(lines_dict[i] + '\n')
