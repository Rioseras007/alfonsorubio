import os
import urllib.parse
import sys
import json
import base64
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, APIC, TIT2, TPE1, TALB
from mutagen import File

def get_metadata(file_path):
    """Extrae metadatos de un archivo de audio usando mutagen."""
    metadata = {
        'title': os.path.splitext(os.path.basename(file_path))[0],
        'artist': 'Artista desconocido',
        'album': 'Álbum desconocido',
        'cover': None,
        'format': os.path.splitext(file_path)[1][1:].upper()
    }
    
    try:
        audio = File(file_path)
        if audio:
            if 'TIT2' in audio: metadata['title'] = str(audio['TIT2'])
            elif audio.get('title'): metadata['title'] = audio.get('title')[0]
            
            if 'TPE1' in audio: metadata['artist'] = str(audio['TPE1'])
            elif audio.get('artist'): metadata['artist'] = audio.get('artist')[0]
            
            if 'TALB' in audio: metadata['album'] = str(audio['TALB'])
            elif audio.get('album'): metadata['album'] = audio.get('album')[0]

            # Extraer carátula (APIC en ID3)
            if hasattr(audio, 'tags') and audio.tags:
                for tag in audio.tags.values():
                    if isinstance(tag, APIC):
                        mime = tag.mime
                        data = tag.data
                        b64_data = base64.b64encode(data).decode('utf-8')
                        metadata['cover'] = f"data:{mime};base64,{b64_data}"
                        break
    except Exception as e:
        print(f"Error procesando metadatos de {file_path}: {e}")
        
    # Si no hay carátula embebida, buscar en el directorio
    if not metadata['cover']:
        dir_path = os.path.dirname(file_path)
        cover_files = ['frontcover.jpg', 'cover.jpg', 'folder.jpg', 'front.png']
        for cf in cover_files:
            cp = os.path.join(dir_path, cf)
            if os.path.exists(cp):
                # Usar la ruta relativa para el navegador
                rel_cp = os.path.relpath(cp, os.getcwd()) # Idealmente respecto al target_dir
                metadata['cover'] = urllib.parse.quote(rel_cp.replace(os.path.sep, '/'))
                break
                
    return metadata

def generate_catalog(directory):
    if not os.path.exists(directory):
        print(f"Error: El directorio '{directory}' no existe.")
        return

    # Moverse al directorio para resolver rutas relativas correctamente
    original_cwd = os.getcwd()
    os.chdir(directory)

    songs = []
    valid_extensions = ('.mp3', '.wav', '.ogg', '.m4a')

    print("Escaneando archivos y extrayendo metadatos...")
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.lower().endswith(valid_extensions):
                full_path = os.path.join(root, file)
                # Normalizar ruta
                rel_path = os.path.relpath(full_path, '.')
                url_path = urllib.parse.quote(rel_path.replace(os.path.sep, '/'))
                
                meta = get_metadata(rel_path)
                meta['path'] = url_path
                songs.append(meta)

    if not songs:
        print("No se encontraron archivos de música.")
        os.chdir(original_cwd)
        return

    # Buscar plantilla
    template_path = os.path.join(original_cwd, 'template.html')
    # Opcionalmente buscarla en el directorio de música también
    if not os.path.exists(template_path):
        template_path = 'template.html'

    if not os.path.exists(template_path):
        print(f"Error: No se encontró 'template.html' en {original_cwd} ni en {directory}")
        os.chdir(original_cwd)
        return

    with open(template_path, 'r', encoding='utf-8') as f:
        template_content = f.read()

    # Reemplazar placeholders
    html_content = template_content.replace('/* SONG_DATA_PLACEHOLDER */', json.dumps(songs, ensure_ascii=False))
    html_content = html_content.replace('/* DIRECTORY_NAME_PLACEHOLDER */', os.path.basename(directory))

    output_file = 'index.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"\n¡Éxito! Catálogo generado en: {os.path.join(directory, output_file)}")
    print(f"Canciones procesadas: {len(songs)}")
    
    os.chdir(original_cwd)

if __name__ == "__main__":
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    target_dir = target_dir.strip('"').strip("'")
    generate_catalog(os.path.abspath(target_dir))
