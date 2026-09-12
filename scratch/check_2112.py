import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

# Let's extract all lines from step 2112 (lines 1 to 600) + step 2830-2838 + step 1480-1486 + step 1157 + step 2208/2211
with open(transcript_path, 'r', encoding='utf-8') as f:
    records = [json.loads(line) for line in f]

# Let's inspect step 2112 content length
print("Step 2112 content len:", len(records[2112].get('content', '')))
