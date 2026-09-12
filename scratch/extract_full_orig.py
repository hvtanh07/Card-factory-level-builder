import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

# Let's inspect step 2830 to 2838 + step 1480 to 1486 + step 1157
with open(transcript_path, 'r', encoding='utf-8') as f:
    records = [json.loads(line) for line in f]

lines_dict = {}

def extract_lines(step_idx):
    if step_idx < len(records):
        content = records[step_idx].get('content', '')
        for l in content.split('\n'):
            m = re.match(r'^\s*(\d+):\s(.*)$', l)
            if m:
                lines_dict[int(m.group(1))] = m.group(2)

# Load in sequence
for s in [1153, 1155, 1157, 1480, 1482, 1484, 1486, 2025, 2027, 2029, 2031, 2033, 2110, 2112, 2180, 2206, 2208, 2830, 2832, 2834, 2836, 2838]:
    extract_lines(s)

print(f"Total lines: {len(lines_dict)}, max: {max(lines_dict.keys()) if lines_dict else 0}")
missing = [i for i in range(1, max(lines_dict.keys()) + 1) if i not in lines_dict]
print("Missing:", missing)
