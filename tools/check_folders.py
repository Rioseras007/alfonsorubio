import os
import re

root_dir = r"d:\backup proyecto\proyecto"

folders_to_check = [
    "peliculas", "peluqueria", "plantilla diskete", "polaroid", "proyectoAmazon", 
    "radio", "retrocasete", "rozalen", "spoify", "Starwars", "streamdeck", 
    "styles", "suno", "tango", "test", "tiempo", "trailers", "web"
]

content_files = []
for dirpath, dirnames, filenames in os.walk(root_dir):
    # Exclude the folders we are checking from being the source of references
    # (we want to know if the MAIN site references them)
    # But wait, maybe they reference each other. Let's just check all HTML/CSS/JS
    for filename in filenames:
        if filename.endswith(('.html', '.css', '.js')):
            content_files.append(os.path.join(dirpath, filename))

all_contents = ""
for f in content_files:
    try:
        with open(f, 'r', encoding='utf-8', errors='ignore') as file:
            all_contents += file.read() + "\n"
    except:
        pass

print("Folders that are NOT referenced anywhere:")
for folder in folders_to_check:
    # A simple string search for 'folder/' or '/folder/'
    if f"{folder}/" not in all_contents and f"{folder}\\" not in all_contents and f"'{folder}'" not in all_contents and f"\"{folder}\"" not in all_contents:
        print("-", folder)
    else:
        print("[REFERENCED] -", folder)
