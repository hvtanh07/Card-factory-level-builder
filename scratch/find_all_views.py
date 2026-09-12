import json

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'PlaytestModal.tsx' in line and 'view_file' in line:
            d = json.loads(line)
            print(f"Step {idx}: {d.get('content', '')[:120]}")
