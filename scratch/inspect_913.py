import json

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx in [913, 915, 953, 1056]:
            d = json.loads(line)
            content = d.get('content', '')
            print(f"Step {idx}: len={len(content)}")
            with open(f'scratch/step_{idx}.txt', 'w', encoding='utf-8') as out:
                out.write(content)
