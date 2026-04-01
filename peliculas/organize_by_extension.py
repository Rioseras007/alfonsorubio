import os
import shutil
import re
import json

# Paths
movie_dir = r"d:\proyecto\peliculas"
html_path = os.path.join(movie_dir, "video.html")
subfolders = ["MKV", "MP4"]

def organize():
    # 1. Create folders
    for folder in subfolders:
        path = os.path.join(movie_dir, folder)
        if not os.path.exists(path):
            os.makedirs(path)
            print(f"Created folder: {folder}")

    # 2. Move files
    files = [f for f in os.listdir(movie_dir) if f.lower().endswith(('.mkv', '.mp4'))]
    moved_count = 0
    
    for filename in files:
        ext = os.path.splitext(filename)[1].lower().replace('.', '').upper()
        if ext in subfolders:
            old_path = os.path.join(movie_dir, filename)
            new_path = os.path.join(movie_dir, ext, filename)
            
            try:
                shutil.move(old_path, new_path)
                print(f"Moved: {filename} -> {ext}/")
                moved_count += 1
            except Exception as e:
                print(f"Error moving {filename}: {e}")

    print(f"\nTotal files moved: {moved_count}")

    # 3. Update video.html
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the videos array
        match = re.search(r'const videos = (\[.*?\]);', content, re.DOTALL)
        if match:
            videos = json.loads(match.group(1))
            for v in videos:
                src = v['src']
                # If src doesn't already contain a slash
                if '/' not in src and '\\' not in src:
                    ext = os.path.splitext(src)[1].lower().replace('.', '').upper()
                    if ext in subfolders:
                        v['src'] = f"{ext}/{src}"
            
            new_videos_js = f"const videos = {json.dumps(videos, indent=0, ensure_ascii=False)};"
            new_content = re.sub(r'const videos = \[.*?\];', new_videos_js, content, flags=re.DOTALL)
            
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Updated video.html with new subfolder paths.")

if __name__ == "__main__":
    organize()
