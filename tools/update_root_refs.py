import re

file_path = r"d:\backup proyecto\proyecto\index.html"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

folders_moved = [
    "peluqueria", "plantilla diskete", "polaroid", "proyectoAmazon", 
    "radio", "retrocasete", "rozalen", "spoify", "Starwars", "streamdeck", 
    "test", "trailers", "web"
]

for folder in folders_moved:
    # Look for href="folder/..." or src="folder/..."
    content = re.sub(rf'(href|src)="{folder}/', rf'\1="projects/{folder}/', content)
    # also with single quotes
    content = re.sub(rf"(href|src)='{folder}/", rf"\1='projects/{folder}/", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated index.html")
