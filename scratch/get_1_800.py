import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

# Look at step 2830 to 2838
# Step 2830: 1 to 120
# Step 2832: 120 to 250
# Step 2834: 250 to 450
# Step 2836: 450 to 650
# Step 2838: 650 to 800
# And let's find what was from line 800 to end in the file at step 2838 (right before we wrote Conveyor changes)!

def get_step_lines(step_idx):
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if idx == step_idx:
                d = json.loads(line)
                content = d.get('content', '')
                res = {}
                for l in content.split('\n'):
                    m = re.match(r'^\s*(\d+):\s(.*)$', l)
                    if m:
                        res[int(m.group(1))] = m.group(2)
                return res
    return {}

lines_1_800 = {}
for s in [2830, 2832, 2834, 2836, 2838]:
    lines_1_800.update(get_step_lines(s))

print(f"Lines 1-800 has {len(lines_1_800)} lines. Max: {max(lines_1_800.keys())}")
