import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx < 2900:
            d = json.loads(line)
            content = d.get('content', '')
            if 'PlaytestModal.tsx' in content and 'Showing lines' in content:
                m = re.search(r'Showing lines (\d+) to (\d+)', content)
                if m:
                    s = int(m.group(1))
                    e = int(m.group(2))
                    if e >= 800:
                        print(f"Step {idx}: lines {s} to {e}")
