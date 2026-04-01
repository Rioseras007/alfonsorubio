import os
import subprocess
import json

# Paths
mkv_dir = r"d:\proyecto\peliculas\MKV"
mp4_dir = r"d:\proyecto\peliculas\MP4"
thumb_dir = r"d:\proyecto\peliculas\miniaturas"
ffmpeg_path = r"C:\ffmpeg\bin\ffmpeg.exe"
ffprobe_path = r"C:\ffmpeg\bin\ffprobe.exe"

# Ensure thumb directory exists
if not os.path.exists(thumb_dir):
    os.makedirs(thumb_dir)

def get_video_duration(video_path):
    """Get video duration in seconds using ffprobe"""
    cmd = [
        ffprobe_path,
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "json",
        video_path
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        data = json.loads(result.stdout)
        return float(data['format']['duration'])
    except Exception as e:
        print(f"Error getting duration: {e}")
        return None

def generate_thumbnail_at_time(video_path, output_path, time_seconds):
    """Generate a thumbnail at a specific time"""
    cmd = [
        ffmpeg_path,
        "-y",
        "-ss", str(time_seconds),
        "-i", video_path,
        "-vframes", "1",
        "-vf", "scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2",
        "-q:v", "2",  # High quality
        output_path
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        return True
    except Exception:
        return False

def generate_thumbnails():
    # Process MKV files
    for directory in [mkv_dir, mp4_dir]:
        if not os.path.exists(directory):
            continue
            
        files = [f for f in os.listdir(directory) if f.lower().endswith(('.mkv', '.mp4'))]
        
        for filename in files:
            video_path = os.path.join(directory, filename)
            title = os.path.splitext(filename)[0]
            thumb_path = os.path.join(thumb_dir, f"{title}.jpg")
            
            print(f"⏳ Generating thumbnail for: {title}...")
            
            # Get video duration
            duration = get_video_duration(video_path)
            if not duration:
                print(f"  ⚠ Could not determine duration, using default")
                duration = 300  # Default 5 minutes
            
            # Try multiple timestamps for more epic moments
            # Skip intro credits (start at 8%), take from action sequences
            timestamps = [
                duration * 0.25,  # 25% in
                duration * 0.40,  # 40% in (often action sequences)
                duration * 0.60,  # 60% in (climax build-up)
            ]
            
            # Try each timestamp until one succeeds
            success = False
            for i, time_sec in enumerate(timestamps):
                if generate_thumbnail_at_time(video_path, thumb_path, time_sec):
                    print(f"  ✓ Generated from {int(time_sec)}s ({int(time_sec/60)}:{int(time_sec%60):02d})")
                    success = True
                    break
            
            if not success:
                print(f"  ✗ Failed to generate thumbnail")

    print("\n✅ Thumbnail generation complete!")

if __name__ == "__main__":
    generate_thumbnails()
