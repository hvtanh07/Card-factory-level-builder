with open(r'c:\Users\TUAN ANH\Documents\GitHub\Card factory level builder\scratch\PlaytestModal_reconstructed.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    for i in range(790, 840):
        if i < len(lines):
            print(f"{i+1}: {lines[i].rstrip()}")
