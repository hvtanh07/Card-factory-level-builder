import json
import os

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'PlaytestModal.tsx' in line:
            d = json.loads(line)
            tool_calls = d.get('tool_calls', [])
            content = d.get('content', '')
            print(f"Index {idx} Type={d.get('type')} Source={d.get('source')} Calls={len(tool_calls)}")
            for tc in tool_calls:
                print("   TC:", tc.get('function', {}).get('name'), tc.get('function', {}).get('arguments', {}).keys() if isinstance(tc.get('function', {}).get('arguments'), dict) else '')
