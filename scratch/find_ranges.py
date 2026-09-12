import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

# Look for steps viewing PlaytestModal lines > 700
with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx < 2900:
            d = json.loads(line)
            content = d.get('content', '')
            if 'PlaytestModal.tsx' in content and 'Showing lines' in content:
                m = re.search(r'Showing lines (\d+) to (\d+)', content)
                if m:
                    print(f"Step {idx}: Showing lines {m.group(1)} to {m.group(2)}")
