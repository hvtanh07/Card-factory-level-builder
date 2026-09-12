import json
import re

transcript_path = r'C:\Users\TUAN ANH\.gemini\antigravity\brain\5774e994-b4dc-450a-bd94-9cfdaa567443\.system_generated\logs\transcript_full.jsonl'

with open(transcript_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'PlaytestModal.tsx' in line:
            d = json.loads(line)
            # check write_to_file or replace_file_content or view_file
            tool_calls = d.get('tool_calls', [])
            for tc in tool_calls:
                fn = tc.get('function', {})
                args = fn.get('arguments', {})
                if isinstance(args, str):
                    try:
                        args = json.loads(args)
                    except:
                        pass
                if isinstance(args, dict):
                    if 'PlaytestModal.tsx' in str(args):
                        print(f"Step {idx}: tool={fn.get('name')} args_keys={list(args.keys())}")
                        if 'CodeContent' in args:
                            print(f"  CodeContent len = {len(args['CodeContent'])}")
                            with open(f'scratch/playtest_written_step_{idx}.tsx', 'w', encoding='utf-8') as out:
                                out.write(args['CodeContent'])
