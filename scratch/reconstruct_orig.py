import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

def reconstruct_file_from_views(step_indices):
    lines_dict = {}
    with open(transcript_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if idx in step_indices:
                d = json.loads(line)
                content = d.get('content', '')
                # Find line numbers like "123: text"
                for l in content.split('\n'):
                    m = re.match(r'^\s*(\d+):\s(.*)$', l)
                    if m:
                        lines_dict[int(m.group(1))] = m.group(2)
    
    sorted_lines = [lines_dict[k] for k in sorted(lines_dict.keys())]
    return '\n'.join(sorted_lines)

playtest_content = reconstruct_file_from_views([2830, 2832, 2834, 2836, 2838])
print(f"Reconstructed PlaytestModal.tsx lines: {len(playtest_content.splitlines())}")

with open(r'c:\Users\TUAN ANH\Documents\GitHub\Card factory level builder\scratch\PlaytestModal_orig.tsx', 'w', encoding='utf-8') as out:
    out.write(playtest_content)
