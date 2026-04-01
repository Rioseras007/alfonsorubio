import os
import json
import re

# Paths
movie_dir = r"d:\proyecto\peliculas"
html_path = os.path.join(movie_dir, "video.html")
thumb_dir = "miniaturas"

# Get video list
extensions = ('.mkv', '.mp4')
files = [f for f in os.listdir(movie_dir) if f.lower().endswith(extensions)]
videos = []
for f in sorted(files):
    title = os.path.splitext(f)[0]
    videos.append({
        "src": f,
        "title": title,
        "thumb": f"{thumb_dir}/{title}.jpg"
    })

# Read HTML
with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Replace the videos array
# Looking for const videos = [ ... ];
pattern = re.compile(r'const videos = \[.*?\];', re.DOTALL)
json_videos = json.dumps(videos, indent=0, ensure_ascii=False)
new_videos_js = f"const videos = {json_videos};"

new_html_content = pattern.sub(new_videos_js, html_content)

# Write back
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_html_content)

print(f"Updated video.html with {len(videos)} videos.")
