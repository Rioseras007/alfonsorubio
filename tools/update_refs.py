import os
import re

root_dir = r"d:\backup proyecto\proyecto"

pages_files = [
    "tablaperiodica.html", "repaso.html", "musica.html", "reproductor.html", 
    "reproductor2.html", "discord.html", "formulario.html", "fuentes.html", 
    "top50.html", "topvisitados.html", "printables.html", "grok4.html", 
    "tablagrok.html", "tablamejorada.html", "menu.html", "menu2.html", 
    "overlay.html", "secreto.html", "antonio.html", "favicon.html", "regaloro.html", "regalo-rocio.html"
]

juegos_files = ["ahorcado.html", "ahorcadopro.html", "tres.html"]

projects_mapping = {
    "peliculas": "bond-007",
    "CV": "cv",
    "Eclipse": "eclipse-solar",
    "fortnite": "patrulla-canina",
    "gestor": "gestor-passwords",
    "inventario": "inventario-3d",
    "mapeador": "mapeador-imagenes",
    "misdiscos": "mis-discos",
    "musica": "musica-bond",
    "music3": "musica-julio-emociones",
    "musica2": "musica-raphael",
    "musica4": "musica-julio-tango",
    "muscia5": "musica-pink-floyd",
    "musica6": "musica-sergio-dalma",
    "calendario": "calendario",
    "horoscopo": "horoscopo"
}

def update_root_file(filepath):
    if not os.path.exists(filepath):
        print(f"Not found: {filepath}")
        return
        
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # CSS and JS
    content = re.sub(r'href="style\.css"', r'href="css/style.css"', content)
    content = re.sub(r'href="style2\.css"', r'href="css/style2.css"', content)
    content = re.sub(r'href="discord\.css"', r'href="css/discord.css"', content)
    content = re.sub(r'href="xstyle\.css"', r'href="css/xstyle.css"', content)
    content = re.sub(r'src="script\.js"', r'src="js/script.js"', content)
    content = re.sub(r'src="xscript\.js"', r'src="js/xscript.js"', content)
    
    # Images and audio
    content = re.sub(r'src="covers/', r'src="assets/covers/', content)
    content = re.sub(r'href="styles/favicon\.ico"', r'href="styles/favicon.ico"', content) # should be unchanged
    
    # Special fix for Regalo Rocio.html which we renamed
    content = content.replace("Regalo Rocio.html", "regalo-rocio.html")
    # Backslash fix
    content = content.replace(r"polaroid\index.html", "polaroid/index.html")
    
    # Pages
    for p in pages_files:
        content = re.sub(rf'href="{p}"', rf'href="pages/{p}"', content)
        content = re.sub(rf'src="{p}"', rf'src="pages/{p}"', content)
        
    for j in juegos_files:
        content = re.sub(rf'href="{j}"', rf'href="pages/juegos/{j}"', content)
        content = re.sub(rf'src="{j}"', rf'src="pages/juegos/{j}"', content)
        
    # Projects
    for orig, dest in projects_mapping.items():
        # Look for orig/something
        content = re.sub(rf'href="{orig}/', rf'href="projects/{dest}/', content)
        content = re.sub(rf'src="{orig}/', rf'src="projects/{dest}/', content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
def update_pages_file(filepath, depth=1):
    if not os.path.exists(filepath):
        return
        
    prefix = "../" * depth
        
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # CSS and JS
    content = re.sub(r'href="style\.css"', rf'href="{prefix}css/style.css"', content)
    content = re.sub(r'href="style2\.css"', rf'href="{prefix}css/style2.css"', content)
    content = re.sub(r'href="discord\.css"', rf'href="{prefix}css/discord.css"', content)
    content = re.sub(r'href="xstyle\.css"', rf'href="{prefix}css/xstyle.css"', content)
    content = re.sub(r'src="script\.js"', rf'src="{prefix}js/script.js"', content)
    content = re.sub(r'src="xscript\.js"', rf'src="{prefix}js/xscript.js"', content)
    
    # Other files (like submenu)
    content = re.sub(r'src="submenu\.html"', rf'src="{prefix}submenu.html"', content)
    content = re.sub(r'href="index\.html"', rf'href="{prefix}index.html"', content)
    content = re.sub(r'src="menu\.html"', rf'src="menu.html"', content) # menu is in same dir now for pages
    if depth == 1:
        # inside pages/
        for p in pages_files:
            if p != os.path.basename(filepath):
                content = re.sub(rf'href="{p}"', rf'href="{p}"', content) # same dir
        for j in juegos_files:
            content = re.sub(rf'href="{j}"', rf'href="juegos/{j}"', content)
            
        for orig, dest in projects_mapping.items():
            content = re.sub(rf'href="{orig}/', rf'href="../projects/{dest}/', content)
            content = re.sub(rf'src="{orig}/', rf'src="../projects/{dest}/', content)
            
    elif depth == 2:
        # inside pages/juegos/
        for p in pages_files:
            content = re.sub(rf'href="{p}"', rf'href="../{p}"', content)
        for j in juegos_files:
            if j != os.path.basename(filepath):
                content = re.sub(rf'href="{j}"', rf'href="{j}"', content) # same dir
                
        for orig, dest in projects_mapping.items():
            content = re.sub(rf'href="{orig}/', rf'href="../../projects/{dest}/', content)
            content = re.sub(rf'src="{orig}/', rf'src="../../projects/{dest}/', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Update root files
update_root_file(os.path.join(root_dir, "index.html"))
update_root_file(os.path.join(root_dir, "submenu.html"))

# Update pages
for p in pages_files:
    update_pages_file(os.path.join(root_dir, "pages", p), depth=1)

for j in juegos_files:
    update_pages_file(os.path.join(root_dir, "pages", "juegos", j), depth=2)
    
print("References updated.")
