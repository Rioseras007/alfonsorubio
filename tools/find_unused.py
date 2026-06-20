import os
import re

root_dir = r"d:\backup proyecto\proyecto"
report_file = os.path.join(root_dir, "archivos_huerfanos.txt")

# Directories where we look for unused files
target_dirs = ["assets", "css", "js", "pages", "."]

ignored_files = {
    "index.html", "manifest.json", "sw.js", "README.md", "task.md", "walkthrough.md",
    "archivos_huerfanos.txt", "replace_icons.py", ".gitignore", "LICENSE",
    "favicon.ico", "faviconcurso.png"
}
ignored_dirs = {".git", ".github", ".vs", "tools", "node_modules", ".vscode", "projects"}

all_files = []
content_files = []

for dirpath, dirnames, filenames in os.walk(root_dir):
    # Modify dirnames in-place to exclude ignored
    dirnames[:] = [d for d in dirnames if d not in ignored_dirs]
    
    # Is this directory one we want to check for orphans?
    # We only check orphans in assets, css, js, pages, and root.
    # So if the current dir is root, or starts with one of those (not projects)
    
    for filename in filenames:
        filepath = os.path.join(dirpath, filename)
        if filename in ignored_files or filename.endswith(('.md', '.py')):
            continue
            
        # Files that contain code
        if filename.endswith(('.html', '.js', '.css', '.json')):
            content_files.append(filepath)
            
        all_files.append(filepath)

# Load all project content into memory
all_contents = ""
for f in content_files:
    try:
        with open(f, 'r', encoding='utf-8', errors='ignore') as file:
            all_contents += file.read() + "\n"
    except:
        pass

# Also load projects/ files to make sure we don't delete an asset used by a subproject
projects_dir = os.path.join(root_dir, "projects")
for dirpath, dirnames, filenames in os.walk(projects_dir):
    for filename in filenames:
        if filename.endswith(('.html', '.css', '.js')):
            try:
                with open(os.path.join(dirpath, filename), 'r', encoding='utf-8', errors='ignore') as file:
                    all_contents += file.read() + "\n"
            except:
                pass

unused = []
for filepath in all_files:
    filename = os.path.basename(filepath)
    # Simple search
    if filename not in all_contents:
        unused.append(filepath)

with open(report_file, 'w', encoding='utf-8') as f:
    f.write("REPORTE DE ARCHIVOS HUÉRFANOS\n")
    f.write("=============================\n")
    f.write("Estos archivos están en el proyecto pero su nombre no aparece en el código.\n")
    f.write("Por favor, revisa manualmente antes de eliminar nada.\n\n")
    for u in unused:
        f.write(u.replace(root_dir + "\\", "") + "\n")

print("Report generated.")
