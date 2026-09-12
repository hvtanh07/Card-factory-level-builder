import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

for s in [1153, 1155, 1157]:
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if idx == s:
                d = json.loads(line)
                content = d.get('content', '')
                first_lines = [l for l in content.split('\n') if re.match(r'^\s*\d+:', l)]
                if first_lines:
                    print(f"Step {s}: start={first_lines[0]} end={first_lines[-1]}")
