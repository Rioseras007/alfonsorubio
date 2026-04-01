import os
import subprocess

# Paths
movie_dir = r"d:\proyecto\peliculas"
thumb_dir = os.path.join(movie_dir, "miniaturas")
ffmpeg_path = r"C:\ffmpeg\bin\ffmpeg.exe"

# Ensure thumb directory exists
if not os.path.exists(thumb_dir):
    os.makedirs(thumb_dir)

def generate_thumbnails():
    files = [f for f in os.listdir(movie_dir) if f.lower().endswith(('.mkv', '.mp4'))]
    generated_count = 0
    
    for filename in files:
        movie_path = os.path.join(movie_dir, filename)
        # Title for the thumbnail (strip extension)
        title = os.path.splitext(filename)[0]
        thumb_path = os.path.join(thumb_dir, f"{title}.jpg")
        
        # ffmpeg command to extract a frame at 10 seconds, scale to 320x180
        cmd = [
            ffmpeg_path,
            "-y", # Overwrite if exists
            "-ss", "00:00:10", # Seek to 10 seconds
            "-i", movie_path,
            "-vframes", "1", # One frame
            "-vf", "scale=320:180:force_original_aspect_ratio=decrease,pad=320:180:(ow-iw)/2:(oh-ih)/2", # Scale and pad to 320x180
            thumb_path
        ]
        
        try:
            print(f"Generating thumbnail for: {filename}...")
            subprocess.run(cmd, check=True, capture_output=True)
            generated_count += 1
        except subprocess.CalledProcessError as e:
            print(f"Error generating thumbnail for {filename}: {e.stderr.decode()}")
        except Exception as e:
            print(f"Unexpected error for {filename}: {e}")

    print(f"\nTotal thumbnails generated: {generated_count}")

if __name__ == "__main__":
    generate_thumbnails()
