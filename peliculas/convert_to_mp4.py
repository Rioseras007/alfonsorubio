import os
import subprocess

# Paths
movie_dir = r"d:\proyecto\peliculas"
mkv_dir = os.path.join(movie_dir, "MKV")
mp4_dir = os.path.join(movie_dir, "MP4")
ffmpeg_path = r"C:\ffmpeg\bin\ffmpeg.exe"

def convert():
    mkv_files = [f for f in os.listdir(mkv_dir) if f.lower().endswith('.mkv')]
    mp4_files = [f for f in os.listdir(mp4_dir) if f.lower().endswith('.mp4')]
    
    # Get base names (without extension) for comparison
    mp4_titles = {os.path.splitext(f)[0] for f in mp4_files}
    
    converted_count = 0
    
    for filename in mkv_files:
        title = os.path.splitext(filename)[0]
        if title not in mp4_titles:
            input_path = os.path.join(mkv_dir, filename)
            output_path = os.path.join(mp4_dir, f"{title}.mp4")
            
            # ffmpeg command: transcode to h264/aac
            # Using -preset faster for a good balance of speed/quality
            cmd = [
                ffmpeg_path,
                "-y", # Overwrite
                "-i", input_path,
                "-c:v", "libx264",
                "-preset", "faster",
                "-crf", "22", # Quality factor (23 is default, lower is better)
                "-c:a", "aac",
                "-b:a", "192k",
                output_path
            ]
            
            print(f"Converting: {filename} -> MP4...")
            try:
                # We use check=True to raise error on failure, and capture_output to keep logs
                # In a real environment, this might be better as a background process per file or sequential
                subprocess.run(cmd, check=True, text=True, capture_output=True)
                print(f"Successfully converted {filename}")
                converted_count += 1
            except subprocess.CalledProcessError as e:
                print(f"Error converting {filename}: {e.stderr}")
            except Exception as e:
                print(f"Unexpected error for {filename}: {e}")
        else:
            print(f"Skipping {filename}: MP4 already exists.")

    print(f"\nBatch conversion complete. Total converted: {converted_count}")

if __name__ == "__main__":
    convert()
