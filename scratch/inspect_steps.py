import json

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

# Let's inspect step 2831 to 2840 where PlaytestModal was viewed
lines = []
with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx in range(2828, 2845):
            d = json.loads(line)
            print(f"Step {idx}: type={d.get('type')} source={d.get('source')}")
            content = d.get('content', '')
            if 'file:///c:/Users/TUAN%20ANH/Documents/GitHub/Card%20factory%20level%20builder/src/components/Playtest/PlaytestModal.tsx' in content:
                print(f"  Found view_file output at step {idx}, len={len(content)}")
