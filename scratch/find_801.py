import json

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx < 2900:
            d = json.loads(line)
            content = d.get('content', '')
            if '801:' in content or '805:' in content:
                print(f"Step {idx} has lines 801-805! content len={len(content)}")
                with open('scratch/step_with_801.txt', 'w', encoding='utf-8') as out:
                    out.write(content)
                break
