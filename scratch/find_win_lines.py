import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

# Look for steps with lines 1120-1180
with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx < 2900:
            d = json.loads(line)
            content = d.get('content', '')
            if 'PlaytestModal.tsx' in content and 'Trophy' in content and 'setIsWon' in content:
                print(f"Step {idx}")
                # print the lines with numbers
                for l in content.split('\n'):
                    if re.match(r'^\s*\d+:', l):
                        print(l)
