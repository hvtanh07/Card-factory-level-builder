import json

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx in [2179, 2205, 2207, 2209, 2211, 2800]:
        f.seek(0)
        for i, line in enumerate(f):
            if i == idx:
                d = json.loads(line)
                tc = d.get('tool_calls', [])
                print(f"Index {idx}: tc={tc}")
                content = d.get('content', '')
                print(f"Content len: {len(content)}")
