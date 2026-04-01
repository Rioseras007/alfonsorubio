
import os
import json
import re

# Define the actor mapping
actor_map = {
    "Sean Connery": ["Dr. No", "Desde Rusia con amor", "Goldfinger", "Operacion Trueno", "Solo Se Vive Dos Veces", "Diamantes para La Eternidad", "Nunca digas nunca Jamas"],
    "George Lazenby": ["Al Servicio Secreto de su Majestad"],
    "Roger Moore": ["Vive Y Deja Morir", "Vive y deja Morir", "El hombre de la pistola de oro", "La Espia Que Me Amo", "Moonraker", "Solo para sus Ojos", "Octopussy", "Panorama para Matar"],
    "Timothy Dalton": ["Alta tension", "Licencia para Matar"],
    "Pierce Brosnan": ["Goldeneye", "El Mañana nunca Muere", "El Mundo nunca es Suficiente", "Muere Otro Dia", "Muere otro Dia"],
    "Daniel Craig": ["Casino Royale (2006)", "Quantum Of Solace", "Skyfall", "Spectre", "Sin tiempo para morir"],
    "David Niven": ["Casino Royale (1967)"]
}

def get_actor(title):
    for actor, movies in actor_map.items():
        for m in movies:
            if m.lower() in title.lower():
                return actor
    return "Unknown"

def extract_year(title):
    """Extract year from title like 'Movie Name (1962)'"""
    match = re.search(r'\((\d{4})\)', title)
    if match:
        return int(match.group(1))
    return 9999  # Put movies without year at the end

mkv_dir = "d:\\proyecto\\peliculas\\MKV"
mp4_dir = "d:\\proyecto\\peliculas\\MP4"

try:
    mkv_files = os.listdir(mkv_dir)
    mp4_files = os.listdir(mp4_dir)
except FileNotFoundError:
    print("Directories not found.")
    mkv_files = []
    mp4_files = []

movies_dict = {}

def normalize(name):
    return os.path.splitext(name)[0]

# Process MKVs
for f in mkv_files:
    if not f.endswith('.mkv'): continue
    title = normalize(f)
    if title not in movies_dict:
        movies_dict[title] = {"title": title, "mkv": f"MKV/{f}", "mp4": None, "thumb": f"miniaturas/{title}.jpg", "year": extract_year(title)}
    else:
        movies_dict[title]["mkv"] = f"MKV/{f}"

# Process MP4s
for f in mp4_files:
    if not f.endswith('.mp4'): continue
    title = normalize(f)
    
    found = False
    for k in movies_dict:
        if k.lower() == title.lower():
            movies_dict[k]["mp4"] = f"MP4/{f}"
            found = True
            break
    
    if not found:
        movies_dict[title] = {"title": title, "mkv": None, "mp4": f"MP4/{f}", "thumb": f"miniaturas/{title}.jpg", "year": extract_year(title)}

# Convert to list and add actor
final_list = []
for title, data in movies_dict.items():
    data["actor"] = get_actor(title)
    final_list.append(data)

# Sort by year (chronological)
final_list.sort(key=lambda x: x["year"])

# Print as JS object
print("const movies = " + json.dumps(final_list, indent=4) + ";")

