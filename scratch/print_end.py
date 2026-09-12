with open(r'c:\Users\TUAN ANH\Documents\GitHub\Card factory level builder\scratch\PlaytestModal_rebuilt.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(840, len(lines)):
    print(f"{i+1}: {lines[i].rstrip()}")
