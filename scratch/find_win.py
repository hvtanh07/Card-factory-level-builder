import json

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx < 2900:
            d = json.loads(line)
            content = d.get('content', '')
            if 'PlaytestModal.tsx' in content and 'LEVEL COMPLETED' in content or 'Trophy' in content:
                print(f"Step {idx} has Win modal / controls in PlaytestModal!")
                with open(f'scratch/win_step_{idx}.txt', 'w', encoding='utf-8') as out:
                    out.write(content)
