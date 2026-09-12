import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

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

for i in range(835, 900):
    print(f"{i}: {all_lines.get(i, '<MISSING>')}")
