const tracks = [
    { id: 1, title: "La Patrulla Canina", artist: "Squad Anthem", file: "assets/01_La_Patrulla_Canina.mp3", cover: "assets/__track_1__la_patrulla_canina.jpg"},
    { id: 2, title: "Antonio: El Rey del Loot", artist: "Antonio", file: "assets/02_Antonio_Rey_Loot.mp3", cover: "https://via.placeholder.com/400x400/FFD700/000000?text=EL+REY+DEL+LOOT", lyrics: ["[0:00] Si brilla, Antonio lo quiere", "[0:05] Cofres dorados en cada esquina", "[0:10] No acepta nada que no sea legendario"] },
    { id: 3, title: "Rioseras: Pánico en la Tormenta", artist: "Rioseras", file: "assets/03_Rioseras_Tormenta.mp3", cover: "https://via.placeholder.com/400x400/B14CE6/FFFFFF?text=PANICO+TORMENTA", lyrics: ["[0:00] ¡Que viene la zona!", "[0:05] Rioseras corre como el viento", "[0:10] El miedo morado lo persigue"] },
    { id: 4, title: "El Murciano: Máquina de Kills", artist: "El Murciano", file: "assets/04_Murciano_Pro_Kills.mp3", cover: "https://via.placeholder.com/400x400/00F2FF/000000?text=MAQUINA+DE+KILLS", lyrics: ["[0:00] Edit rápido, disparo letal", "[0:05] El Murciano no perdona", "[0:10] Otra kill para la patrulla"] },
    { id: 5, title: "Gerbi: El Comandante Loco", artist: "Comandante Gerbi", file: "assets/05_Gerbi_Loco.mp3", cover: "https://via.placeholder.com/400x400/FF4500/FFFFFF?text=EL+COMANDANTE+LOCO", lyrics: ["[0:00] Gerbi se lanza sin pensar", "[0:05] Va por libre, es un alocado", "[0:10] Granadas por todos lados"] },
    { id: 6, title: "Amigos en el Battle Bus", artist: "The Squad", file: "assets/06_Battle_Bus.mp3", cover: "https://via.placeholder.com/400x400/854CE6/FFFFFF?text=BATTLE+BUS", lyrics: ["[0:00] La música del bus empieza a sonar", "[0:05] Listos para saltar"] },
    { id: 11, title: "Victoria Magistral", artist: "Champion Theme", file: "assets/11_Victoria_Magistral.mp3", cover: "https://via.placeholder.com/400x400/FFD700/000000?text=VICTORIA+MAGISTRAL", lyrics: ["[0:00] La tensión sube", "[0:05] Círculo final", "[0:10] Victoria asegurada"] },
    { id: 12, title: "GG Patrulla", artist: "Outro Relax", file: "assets/12_GG_Patrulla.mp3", cover: "https://via.placeholder.com/400x400/00F2FF/000000?text=GG+PATRULLA", lyrics: ["[0:00] GG a todos", "[0:05] Mañana más"] }
];

// Elements
const tracklistEl = document.getElementById('tracklist');
const audioEl = document.getElementById('main-audio');
const titleEl = document.getElementById('current-title');
const artistEl = document.getElementById('current-artist');
const lyricsWrapper = document.getElementById('lyrics-content');
const singleCover = document.getElementById('single-cover');
const visualizerCanvas = document.getElementById('visualizer');
const progressBar = document.getElementById('progress');
const playPauseBtn = document.getElementById('play-pause');

// Audio Context Vars
let audioCtx, analyser, sourceNode, dataArray, bufferLength;
let isAudioInited = false;
let currentLyricsArr = [];

// DIRECT AUDIO FIX: This function ensures the audio is never blocked by the analyzer.
function setupAudioCore() {
    if (isAudioInited) return;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();

        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64; // Smaller for performance

        // Critical: create source from audio element
        sourceNode = audioCtx.createMediaElementSource(audioEl);

        // NO-FAIL CONNECTION: Split signal
        // 1. Audio directly to outlet (Always works)
        sourceNode.connect(audioCtx.destination);

        // 2. Audio to analyzer (Visualizer only)
        sourceNode.connect(analyser);

        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        isAudioInited = true;
        renderVisualizerFrame();
        console.log("Audio Hub Synchronized");
    } catch (err) {
        console.warn("Visualizer failed, but audio will play normally.", err);
    }
}

function renderVisualizerFrame() {
    requestAnimationFrame(renderVisualizerFrame);
    if (!isAudioInited) return;

    analyser.getByteFrequencyData(dataArray);
    const ctx = visualizerCanvas.getContext('2d');
    ctx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

    const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
        let barHeight = dataArray[i] / 3;
        ctx.fillStyle = i % 2 === 0 ? '#00F2FF' : '#854CE6';
        ctx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 4;
    }
}

// Track Management
tracks.forEach(track => {
    const item = document.createElement('div');
    item.className = 'track-item';
    item.innerHTML = `
        <span class="track-num">${track.id.toString().padStart(2, '0')}</span>
        <div class="track-info">
            <h4>${track.title}</h4>
            <p>${track.artist}</p>
        </div>
    `;
    item.onclick = () => playTrack(track, item);
    tracklistEl.appendChild(item);
});

async function playTrack(track, element) {
    // 1. Restore Player View
    switchView('view-player');

    // 2. Init Audio Context (User interaction requirement)
    setupAudioCore();
    if (audioCtx && audioCtx.state === 'suspended') await audioCtx.resume();

    // 3. UI Update
    document.querySelectorAll('.track-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    titleEl.innerText = track.title;
    artistEl.innerText = track.artist;
    singleCover.src = track.cover;

    // 4. Load Audio & Lyrics
    audioEl.src = track.file;
    loadLyrics(track.lyrics);

    // 5. Hard Play
    audioEl.load();
    try {
        await audioEl.play();
        playPauseBtn.innerText = '⏸';
    } catch (e) {
        console.error("Playback failed. Please ensure files are in assets/ folder.", e);
    }
}

function loadLyrics(lines) {
    lyricsWrapper.innerHTML = '';
    currentLyricsArr = lines.map(line => {
        const p = document.createElement('p');
        p.className = 'lyrics-line';
        const match = line.match(/\[(\d+):(\d+)\] (.*)/);
        if (match) {
            const time = parseInt(match[1]) * 60 + parseInt(match[2]);
            p.innerText = match[3];
            lyricsWrapper.appendChild(p);
            return { time, el: p };
        }
        return null;
    }).filter(l => l);
}

// System Loops
audioEl.ontimeupdate = () => {
    // Progress
    const pct = (audioEl.currentTime / audioEl.duration) * 100;
    progressBar.style.width = pct + '%';

    // Lyrics
    const now = audioEl.currentTime;
    currentLyricsArr.forEach(line => {
        if (now >= line.time) {
            currentLyricsArr.forEach(l => l.el.classList.remove('active'));
            line.el.classList.add('active');
            const offset = line.el.offsetTop - (lyricsWrapper.parentElement.offsetHeight / 2) + 20;
            lyricsWrapper.style.transform = `translateY(-${offset}px)`;
        }
    });
};

playPauseBtn.onclick = () => {
    if (audioEl.paused) {
        audioEl.play();
        playPauseBtn.innerText = '⏸';
    } else {
        audioEl.pause();
        playPauseBtn.innerText = '▶';
    }
};

// View Management
function switchView(viewId) {
    document.querySelectorAll('.content-view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
        const target = 'view-' + btn.getAttribute('data-target');
        switchView(target);
    };
});

document.querySelectorAll('.btn-back').forEach(btn => {
    btn.onclick = () => switchView('view-player');
});

// Mock Logic
document.getElementById('download-btn').onclick = () => alert("INICIANDO DESCARGA DEL DISCO COMPLETO...");
document.getElementById('order-form').onsubmit = (e) => {
    e.preventDefault();
    alert("¡PEDIDO RECIBIDO! LA PATRULLA CANINA TE LO ENVIARÁ PRONTO.");
    switchView('view-player');
};
