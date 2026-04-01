
import json

def diagnose():
    with open('diagnostic_results.txt', 'w', encoding='utf-8') as out:
        try:
            with open('movies_data.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
        except Exception as e:
            out.write(f"Error loading JSON: {e}\n")
            return

        out.write("LISTING ALL PIERCE BROSNAN MOVIES:\n")
        for m in data:
            if m['actor'] == "Pierce Brosnan":
                t = m['title']
                out.write(f"Title: [{t}]\n")
                out.write(f"Hex:   {t.encode('utf-8').hex()}\n")
                out.write(f"Len:   {len(t)}\n\n")

if __name__ == "__main__":
    diagnose()
