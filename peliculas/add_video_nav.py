"""
Batch script to add 'Videoteca' link before the lang-switcher in all HTML files.
This targets files that don't already have the video.html link.
"""
import os
import re
import glob

count = 0
skipped = 0
failed = []

for filepath in glob.glob(os.path.join('.', '*.html')):
    basename = os.path.basename(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip video.html itself and files already containing the link
    if basename == 'video.html' or 'video.html' in content:
        skipped += 1
        continue
    
    # Skip files without mainNav (like template files)
    if 'mainNav' not in content:
        skipped += 1
        continue
    
    # Insert video link before the lang-switcher div
    search = '                <div class="lang-switcher">'
    replacement = '                <a href="video.html" data-i18n="nav_video">Videoteca</a>\r\n                <div class="lang-switcher">'
    
    if search in content:
        new_content = content.replace(search, replacement, 1)  # Only first occurrence
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(new_content)
        count += 1
        print(f"  UPDATED: {basename}")
    else:
        failed.append(basename)
        print(f"  NO MATCH: {basename}")

print(f"\nDone! Updated {count} files, skipped {skipped}.")
if failed:
    print(f"Failed: {failed}")
