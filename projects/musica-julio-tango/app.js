/* ================================================
   WINAMP CLASSIC WEB PLAYER – APP.JS
   Core audio engine, visualizer, and UI logic
   ================================================ */

(function () {
    'use strict';

    // ── Playlist tracks ──
    const TRACKS = [
        { file: '01. JULIO IGLESIAS - La cumparsita.mp3', title: 'La cumparsita' },
        { file: '02. JULIO IGLESIAS - El día que me quieras.mp3', title: 'El día que me quieras' },
        { file: '03. JULIO IGLESIAS - A media luz.mp3', title: 'A media luz' },
        { file: '04. JULIO IGLESIAS - Murciano Pro Kills.mp3', title: 'Murciano Pro Kills' },
        { file: '05. JULIO IGLESIAS - Volver.mp3', title: 'Volver' },
        { file: '06. JULIO IGLESIAS - Mano a mano.mp3', title: 'Mano a mano' },
        { file: '07. JULIO IGLESIAS - Pisos Picados.mp3', title: 'Pisos Picados' },
        { file: '08. JULIO IGLESIAS - El choclo.mp3', title: 'El choclo' },
        { file: '09. JULIO IGLESIAS - Adiós, Pampa mía.mp3', title: 'Adiós, Pampa mía' },
        { file: '10. JULIO IGLESIAS - ¡Uno!.mp3', title: 'Uno' },
        { file: '11. JULIO IGLESIAS - Caminito.mp3', title: 'Caminito' },
        { file: '12. JULIO IGLESIAS - Mi Buenos Aires querido.mp3', title: 'Mi Buenos Aires querido' },
    ];

    // ── DOM references ──
    const audio = document.getElementById('audio-player');
    const visualizerCanvas = document.getElementById('visualizer');
    const visualizerCtx = visualizerCanvas.getContext('2d');
    const playStateCanvas = document.getElementById('play-state-icon');
    const playStateCtx = playStateCanvas.getContext('2d');
    const trackTitleEl = document.getElementById('track-title');
    const timerMin1 = document.getElementById('timer-min1');
    const timerMin2 = document.getElementById('timer-min2');
    const timerSec1 = document.getElementById('timer-sec1');
    const timerSec2 = document.getElementById('timer-sec2');
    const infoKbps = document.getElementById('info-kbps');
    const infoKhz = document.getElementById('info-khz');
    const infoMono = document.getElementById('info-mono');
    const infoStereo = document.getElementById('info-stereo');
    const seekbar = document.getElementById('seekbar');
    const volumeSlider = document.getElementById('volume');
    const balanceSlider = document.getElementById('balance');
    const playlistEl = document.getElementById('playlist');
    const playlistInfo = document.getElementById('playlist-info');
    const playlistTotalTime = document.getElementById('playlist-total-time');
    const playlistWindow = document.getElementById('playlist-window');
    const fileInput = document.getElementById('file-input');

    // Buttons
    const btnPlay = document.getElementById('btn-play');
    const btnPause = document.getElementById('btn-pause');
    const btnStop = document.getElementById('btn-stop');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnEject = document.getElementById('btn-eject');
    const btnShuffle = document.getElementById('btn-shuffle');
    const btnRepeat = document.getElementById('btn-repeat');
    const btnPl = document.getElementById('btn-pl');
    const btnPlClose = document.getElementById('btn-pl-close');

    // ── State ──
    let currentIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let repeatMode = 0; // 0 = off, 1 = all, 2 = one
    let isSeeking = false;
    let audioContext = null;
    let analyser = null;
    let sourceNode = null;
    let isAudioContextConnected = false;
    let animationId = null;

    // ── Initialize ──
    function init() {
        buildPlaylist();
        setupEventListeners();
        loadTrack(currentIndex, false);
        drawPlayState('stopped');
        updateVolume();
        drawIdleVisualizer();
    }

    // ── Web Audio API setup ──
    function initAudioContext() {
        if (audioContext) return;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        analyser.smoothingTimeConstant = 0.7;
    }

    function connectSource() {
        if (isAudioContextConnected) return;
        initAudioContext();
        sourceNode = audioContext.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        isAudioContextConnected = true;
    }

    // ── Build playlist UI ──
    function buildPlaylist() {
        playlistEl.innerHTML = '';
        TRACKS.forEach((track, i) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="track-num">${String(i + 1).padStart(2, '0')}.</span>
                <span class="track-name">${track.title}</span>
                <span class="track-duration" id="dur-${i}">--:--</span>
            `;
            li.dataset.index = i;
            li.addEventListener('dblclick', () => {
                currentIndex = i;
                loadTrack(i, true);
            });
            playlistEl.appendChild(li);
        });
        playlistInfo.textContent = `${TRACKS.length} tracks`;

        // Load durations
        TRACKS.forEach((track, i) => {
            const tempAudio = new Audio();
            tempAudio.preload = 'metadata';
            tempAudio.src = track.file;
            tempAudio.addEventListener('loadedmetadata', () => {
                const durEl = document.getElementById(`dur-${i}`);
                if (durEl) durEl.textContent = formatTime(tempAudio.duration);
                track.duration = tempAudio.duration;
                updateTotalTime();
            });
        });
    }

    function updateTotalTime() {
        let total = 0;
        TRACKS.forEach(t => { if (t.duration) total += t.duration; });
        playlistTotalTime.textContent = formatTimeLong(total);
    }

    // ── Load track ──
    function loadTrack(index, autoplay) {
        currentIndex = index;
        const track = TRACKS[index];
        audio.src = track.file;
        trackTitleEl.textContent = `${index + 1}. ${track.title}`;

        // Highlight in playlist
        const items = playlistEl.querySelectorAll('li');
        items.forEach(li => li.classList.remove('active'));
        if (items[index]) {
            items[index].classList.add('active');
            items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }

        // Reset display
        updateTimer(0);
        updateTechInfo();

        if (autoplay) {
            play();
        }
    }

    // ── Playback controls ──
    function play() {
        connectSource();
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        audio.play().then(() => {
            isPlaying = true;
            drawPlayState('playing');
            startVisualizer();
        }).catch(err => console.warn('Play error:', err));
    }

    function pause() {
        audio.pause();
        isPlaying = false;
        drawPlayState('paused');
    }

    function stop() {
        audio.pause();
        audio.currentTime = 0;
        isPlaying = false;
        drawPlayState('stopped');
        updateTimer(0);
        seekbar.value = 0;
        cancelAnimationFrame(animationId);
        drawIdleVisualizer();
    }

    function prevTrack() {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        let idx = currentIndex - 1;
        if (idx < 0) idx = TRACKS.length - 1;
        loadTrack(idx, isPlaying);
    }

    function nextTrack() {
        let idx;
        if (isShuffle) {
            do { idx = Math.floor(Math.random() * TRACKS.length); } while (idx === currentIndex && TRACKS.length > 1);
        } else {
            idx = currentIndex + 1;
            if (idx >= TRACKS.length) idx = 0;
        }
        loadTrack(idx, isPlaying);
    }

    // ── Timer ──
    function updateTimer(time) {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        const m = String(mins).padStart(2, '0');
        const s = String(secs).padStart(2, '0');
        timerMin1.textContent = m[0];
        timerMin2.textContent = m[1];
        timerSec1.textContent = s[0];
        timerSec2.textContent = s[1];
    }

    function formatTime(secs) {
        if (!secs || isNaN(secs)) return '--:--';
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${String(s).padStart(2, '0')}`;
    }

    function formatTimeLong(secs) {
        if (!secs || isNaN(secs)) return '0:00';
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = Math.floor(secs % 60);
        if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        return `${m}:${String(s).padStart(2, '0')}`;
    }

    // ── Tech info ──
    function updateTechInfo() {
        // Estimate bitrate from file size
        const track = TRACKS[currentIndex];
        const sizes = [4201264, 3193773, 3628942, 3006184, 3863631, 3496279, 2183274, 4433815, 2908679, 4227813, 1909529, 2407269];
        const fileSize = sizes[currentIndex] || 0;

        audio.addEventListener('loadedmetadata', function onMeta() {
            const duration = audio.duration;
            if (duration && fileSize) {
                const kbps = Math.round((fileSize * 8) / (duration * 1000));
                infoKbps.textContent = kbps;
            } else {
                infoKbps.textContent = '128';
            }
            infoKhz.textContent = '44';
            infoMono.classList.add('dim');
            infoStereo.classList.remove('dim');
            audio.removeEventListener('loadedmetadata', onMeta);
        });
    }

    // ── Volume & Balance ──
    function updateVolume() {
        audio.volume = volumeSlider.value / 100;
    }

    function updateBalance() {
        if (!audioContext) return;
        // Balance via stereo panner if available
        // For simplicity, we do a basic volume split approach if StereoPannerNode is available
        // This is a no-op in the basic setup; could be enhanced with StereoPannerNode
    }

    // ── Seekbar ──
    function onSeekStart() {
        isSeeking = true;
    }

    function onSeekEnd() {
        isSeeking = false;
        if (audio.duration) {
            audio.currentTime = (seekbar.value / 1000) * audio.duration;
        }
    }

    // ── Play state icon ──
    function drawPlayState(state) {
        const ctx = playStateCtx;
        const w = playStateCanvas.width;
        const h = playStateCanvas.height;
        ctx.clearRect(0, 0, w, h);

        ctx.fillStyle = '#00e100';
        ctx.shadowColor = 'rgba(0, 225, 0, 0.6)';
        ctx.shadowBlur = 3;

        if (state === 'playing') {
            // Play triangle
            ctx.beginPath();
            ctx.moveTo(4, 2);
            ctx.lineTo(16, 9);
            ctx.lineTo(4, 16);
            ctx.closePath();
            ctx.fill();
        } else if (state === 'paused') {
            // Pause bars
            ctx.fillRect(4, 2, 4, 14);
            ctx.fillRect(12, 2, 4, 14);
        } else {
            // Stopped - square
            ctx.fillRect(4, 3, 12, 12);
        }
        ctx.shadowBlur = 0;
    }

    // ── Visualizer ──
    function startVisualizer() {
        cancelAnimationFrame(animationId);
        drawVisualizer();
    }

    function drawVisualizer() {
        animationId = requestAnimationFrame(drawVisualizer);
        if (!analyser) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const w = visualizerCanvas.width;
        const h = visualizerCanvas.height;
        visualizerCtx.clearRect(0, 0, w, h);

        const barCount = 28;
        const barWidth = Math.floor(w / barCount) - 1;
        const step = Math.floor(bufferLength / barCount);

        for (let i = 0; i < barCount; i++) {
            // Average nearby frequencies
            let sum = 0;
            for (let j = 0; j < step; j++) {
                sum += dataArray[i * step + j] || 0;
            }
            const val = sum / step;
            const barHeight = (val / 255) * h;

            // Color gradient: green at bottom → yellow in middle → red at top
            const segments = Math.ceil(barHeight / 2);
            for (let s = 0; s < segments; s++) {
                const y = h - (s * 2) - 2;
                const ratio = s / (h / 2);
                let r, g, b;
                if (ratio < 0.5) {
                    r = 0; g = 225; b = 0;
                } else if (ratio < 0.8) {
                    r = Math.floor(225 * ((ratio - 0.5) / 0.3));
                    g = 225;
                    b = 0;
                } else {
                    r = 225; g = Math.floor(225 * (1 - (ratio - 0.8) / 0.2)); b = 0;
                }
                visualizerCtx.fillStyle = `rgb(${r},${g},${b})`;
                visualizerCtx.fillRect(i * (barWidth + 1), y, barWidth, 1.5);
            }
        }
    }

    function drawIdleVisualizer() {
        const w = visualizerCanvas.width;
        const h = visualizerCanvas.height;
        visualizerCtx.clearRect(0, 0, w, h);

        // Draw subtle baseline bars
        const barCount = 28;
        const barWidth = Math.floor(w / barCount) - 1;
        visualizerCtx.fillStyle = '#003300';
        for (let i = 0; i < barCount; i++) {
            visualizerCtx.fillRect(i * (barWidth + 1), h - 2, barWidth, 1.5);
        }
    }

    // ── Event Listeners ──
    function setupEventListeners() {
        // Transport
        btnPlay.addEventListener('click', play);
        btnPause.addEventListener('click', pause);
        btnStop.addEventListener('click', stop);
        btnPrev.addEventListener('click', prevTrack);
        btnNext.addEventListener('click', nextTrack);

        // Eject / file open
        btnEject.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', handleFileInput);

        // Seekbar
        seekbar.addEventListener('mousedown', onSeekStart);
        seekbar.addEventListener('touchstart', onSeekStart);
        seekbar.addEventListener('mouseup', onSeekEnd);
        seekbar.addEventListener('touchend', onSeekEnd);
        seekbar.addEventListener('change', onSeekEnd);

        // Volume
        volumeSlider.addEventListener('input', updateVolume);

        // Balance
        balanceSlider.addEventListener('input', updateBalance);

        // Audio events
        audio.addEventListener('timeupdate', () => {
            if (!isSeeking && audio.duration) {
                updateTimer(audio.currentTime);
                seekbar.value = (audio.currentTime / audio.duration) * 1000;
            }
        });

        audio.addEventListener('ended', () => {
            if (repeatMode === 2) {
                // Repeat one
                audio.currentTime = 0;
                play();
            } else if (repeatMode === 1 || currentIndex < TRACKS.length - 1 || isShuffle) {
                // Repeat all or next track
                nextTrack();
            } else {
                stop();
            }
        });

        // Shuffle toggle
        btnShuffle.addEventListener('click', () => {
            isShuffle = !isShuffle;
            btnShuffle.classList.toggle('active', isShuffle);
        });

        // Repeat toggle (off → all → one → off)
        btnRepeat.addEventListener('click', () => {
            repeatMode = (repeatMode + 1) % 3;
            if (repeatMode === 0) {
                btnRepeat.classList.remove('active');
                btnRepeat.textContent = 'REPEAT';
            } else if (repeatMode === 1) {
                btnRepeat.classList.add('active');
                btnRepeat.textContent = 'REP ALL';
            } else {
                btnRepeat.classList.add('active');
                btnRepeat.textContent = 'REP ONE';
            }
        });

        // Playlist toggle
        btnPl.addEventListener('click', togglePlaylist);
        btnPlClose.addEventListener('click', togglePlaylist);

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case ' ':
                    e.preventDefault();
                    isPlaying ? pause() : play();
                    break;
                case 'ArrowRight':
                    if (e.ctrlKey) nextTrack();
                    else if (audio.duration) audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
                    break;
                case 'ArrowLeft':
                    if (e.ctrlKey) prevTrack();
                    else audio.currentTime = Math.max(audio.currentTime - 5, 0);
                    break;
                case 'ArrowUp':
                    volumeSlider.value = Math.min(parseInt(volumeSlider.value) + 5, 100);
                    updateVolume();
                    break;
                case 'ArrowDown':
                    volumeSlider.value = Math.max(parseInt(volumeSlider.value) - 5, 0);
                    updateVolume();
                    break;
                case 's':
                    stop();
                    break;
            }
        });
    }

    // ── Playlist toggle ──
    function togglePlaylist() {
        playlistWindow.classList.toggle('hidden');
        btnPl.classList.toggle('active', !playlistWindow.classList.contains('hidden'));
    }

    // ── File input handler ──
    function handleFileInput(e) {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        files.forEach(file => {
            const url = URL.createObjectURL(file);
            const name = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
            TRACKS.push({ file: url, title: name });
        });

        buildPlaylist();
        // Play the first newly added track
        const newIndex = TRACKS.length - files.length;
        loadTrack(newIndex, true);
    }

    // ── Start ──
    init();

})();
