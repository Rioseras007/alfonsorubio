import os
import urllib.parse
import sys

def generate_catalog(directory):
    # Validar directorio
    if not os.path.exists(directory):
        print(f"Error: El directorio '{directory}' no existe.")
        return

    songs = []
    # Extensiones de audio soportadas
    valid_extensions = ('.mp3', '.wav', '.ogg', '.m4a')

    # Escanear directorio
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(valid_extensions):
                # Obtener ruta relativa para el enlace
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, directory)
                # Codificar URL para evitar errores con espacios y caracteres especiales
                url_path = urllib.parse.quote(rel_path.replace(os.path.sep, '/'))
                
                songs.append({
                    'title': os.path.splitext(file)[0],
                    'path': url_path,
                    'format': os.path.splitext(file)[1][1:].upper()
                })

    if not songs:
        print("No se encontraron archivos de música en el directorio.")
        return

    # Generar HTML
    html_content = f"""
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Catalog</title>
    <style>
        :root {{
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --bg-dark: #0f172a;
            --bg-card: #1e293b;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }}

        body {{
            background-color: var(--bg-dark);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            padding-bottom: 120px; /* Space for player */
        }}

        /* Header */
        header {{
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(10px);
            padding: 1.5rem 2rem;
            position: sticky;
            top: 0;
            z-index: 10;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}

        h1 {{
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(to right, #818cf8, #c084fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}

        /* Search */
        .search-container {{
            position: relative;
            max-width: 400px;
            width: 100%;
        }}

        .search-input {{
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: var(--bg-card);
            color: white;
            outline: none;
            transition: all 0.2s;
        }}

        .search-input:focus {{
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }}

        .search-icon {{
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-muted);
        }}

        /* Song List */
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            padding: 2rem;
        }}

        .song-list {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
        }}

        .song-card {{
            background: var(--bg-card);
            padding: 1rem;
            border-radius: 12px;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
            display: flex;
            align-items: center;
            gap: 1rem;
            border: 1px solid transparent;
        }}

        .song-card:hover {{
            transform: translateY(-2px);
            background: #2d3b55;
            border-color: rgba(99, 102, 241, 0.3);
        }}

        .song-card.playing {{
            border-color: var(--primary);
            background: rgba(99, 102, 241, 0.1);
        }}

        .song-icon {{
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }}

        .song-info {{
            overflow: hidden;
        }}

        .song-title {{
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 0.25rem;
        }}

        .song-meta {{
            font-size: 0.875rem;
            color: var(--text-muted);
        }}

        /* Player Footer */
        .player-bar {{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(12px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 100;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
            transform: translateY(100%);
            transition: transform 0.3s ease-out;
        }}

        .player-bar.active {{
            transform: translateY(0);
        }}

        .current-track {{
            display: flex;
            align-items: center;
            gap: 1rem;
            width: 30%;
        }}

        .track-info h3 {{
            font-size: 1rem;
            margin-bottom: 0.2rem;
            color: var(--text-main);
        }}

        .track-info p {{
            font-size: 0.8rem;
            color: var(--text-muted);
        }}

        .controls {{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 40%;
            gap: 0.5rem;
        }}

        .buttons {{
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }}

        .btn-control {{
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            transition: color 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }}

        .btn-control:hover {{
            color: white;
        }}

        .btn-play {{
            width: 40px;
            height: 40px;
            background: white;
            color: black;
            border-radius: 50%;
            font-size: 1.2rem;
        }}

        .btn-play:hover {{
            background: var(--primary);
            color: white;
        }}

        /* Progress Bar */
        .progress-container {{
            width: 100%;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 12px;
            color: var(--text-muted);
        }}

        .progress-bar {{
            flex-grow: 1;
            height: 4px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            cursor: pointer;
            position: relative;
        }}

        .progress-fill {{
            height: 100%;
            background: var(--primary);
            border-radius: 2px;
            width: 0%;
        }}

        .volume-control {{
            width: 30%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;
        }}
        
        input[type="range"] {{
            accent-color: var(--primary);
        }}


        .caratulas {{
        display: flex;
            justify-content: center;
            gap: 2rem;
            padding: 2rem;
            flex-wrap: wrap;
       

       .cartulas .item {{
       background: var(--bg-card);
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}}

.caratulas img {{
    border-radius: 8px;
            object-fit: cover;
            width: 100%;
            height: auto;
            max-width: 240px; /* Para mantener un tamaño razonable */
}}







}}

     

    </style>
</head>
<body>

    <header>

        <h1>🎵 Music Cloud - {{ directory }}</h1>
        <div class="search-container">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" placeholder="Buscar canciones..." id="searchInput">
        </div>
    </header>
    <div class="caratulas">
    <div class="item"> <img src="frontcover.jpg" alt="Caratula frontal"width="200" height="200" loading="lazy" ></div>
     <div class="item"> <img src="trascover.jpg" alt="Caratula trasera"width="240" height="198" loading="lazy" ></div>
     </div>

    <div class="container">
        <div class="song-list" id="songList">
            <!-- Items injected by JS -->
        </div>
    </div>

    <div class="player-bar" id="playerBar">
        <div class="current-track">
            <div class="song-icon">🎵</div>
            <div class="track-info">
                <h3 id="currentTitle">Selecciona una canción</h3>
                <p id="currentArtist">Local Library</p>
            </div>
        </div>

        <div class="controls">
            <div class="buttons">
                <button class="btn-control" onclick="prevSong()">⏮</button>
                <button class="btn-control btn-play" onclick="togglePlay()" id="playBtn">▶</button>
                <button class="btn-control" onclick="nextSong()">⏭</button>
            </div>
            <div class="progress-container">
                <span id="currentTime">0:00</span>
                <div class="progress-bar" id="progressBar" onclick="seek(event)">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <span id="duration">0:00</span>
            </div>
        </div>

        <div class="volume-control">
            <span>🔊</span>
            <input type="range" min="0" max="1" step="0.1" value="1" onchange="setVolume(this.value)">
        </div>
    </div>

    <audio id="audioPlayer"></audio>

    <script>
        const songs = {songs};
        let currentIndex = -1;
        const audio = document.getElementById('audioPlayer');
        const searchInput = document.getElementById('searchInput');

        // Render Songs
        function renderSongs(filter = "") {{
            const container = document.getElementById('songList');
            container.innerHTML = "";
            
            songs.forEach((song, index) => {{
                if(song.title.toLowerCase().includes(filter.toLowerCase())) {{
                    const el = document.createElement('div');
                    el.className = `song-card ${{index === currentIndex ? 'playing' : ''}}`;
                    el.onclick = () => playSong(index);
                    el.innerHTML = `
                        <div class="song-icon">♫</div>
                        <div class="song-info">
                            <div class="song-title">${{song.title}}</div>
                            <div class="song-meta">${{song.format}}</div>
                        </div>
                    `;
                    container.appendChild(el);
                }}
            }});
        }}

        // Search Listener
        searchInput.addEventListener('input', (e) => renderSongs(e.target.value));

        // Player Logic
        function playSong(index) {{
            if (index < 0 || index >= songs.length) return;
            
            currentIndex = index;
            const song = songs[index];
            
            audio.src = song.path;
            audio.play();
            
            document.getElementById('currentTitle').innerText = song.title;
            document.getElementById('playBtn').innerText = "⏸";
            document.getElementById('playerBar').classList.add('active');
            
            renderSongs(searchInput.value);
        }}

        function togglePlay() {{
            if (audio.paused) {{
                if(currentIndex === -1 && songs.length > 0) playSong(0);
                else audio.play();
                document.getElementById('playBtn').innerText = "⏸";
            }} else {{
                audio.pause();
                document.getElementById('playBtn').innerText = "▶";
            }}
        }}

        function nextSong() {{
            let next = currentIndex + 1;
            if (next >= songs.length) next = 0;
            playSong(next);
        }}

        function prevSong() {{
            let prev = currentIndex - 1;
            if (prev < 0) prev = songs.length - 1;
            playSong(prev);
        }}

        function setVolume(val) {{
            audio.volume = val;
        }}

        function seek(e) {{
            const bar = document.getElementById('progressBar');
            const percent = e.offsetX / bar.offsetWidth;
            audio.currentTime = percent * audio.duration;
        }}

        audio.addEventListener('timeupdate', () => {{
            const percent = (audio.currentTime / audio.duration) * 100;
            document.getElementById('progressFill').style.width = percent + "%";
            document.getElementById('currentTime').innerText = formatTime(audio.currentTime);
            if(audio.duration) document.getElementById('duration').innerText = formatTime(audio.duration);
        }});

        audio.addEventListener('ended', nextSong);

        function formatTime(seconds) {{
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${{m}}:${{s < 10 ? '0' : ''}}${{s}}`;
        }}

        // Init
        renderSongs();
    </script>
</body>
</html>
    """

    output_file = os.path.join(directory, 'index.html')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Catálogo generado éxitosamente en: {output_file}")
    print(f"Se encontraron {len(songs)} canciones.")

if __name__ == "__main__":
    target_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    # Limpiar argumento de comillas si las hay (común en Windows copy path)
    target_dir = target_dir.strip('"').strip("'")
    
    # Si se ejecuta sin argumentos, usar el directorio actual para seguridad o preguntar?
    # Para este script, usaremos el directorio actual si no se da ninguno
    generate_catalog(os.path.abspath(target_dir))
