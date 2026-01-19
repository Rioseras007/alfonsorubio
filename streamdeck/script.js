// Stream Deck Web - script.js corregido

function defaultDeck() {
    return Array.from({ length: 12 }, (_, i) => ({ icon: "🔘", label: "Botón " + (i + 1), action: "" }));
}

let profiles = JSON.parse(localStorage.getItem("profiles")) || {};
let currentProfile = localStorage.getItem("currentProfile") || "Streaming";
if (!profiles[currentProfile]) {
    profiles[currentProfile] = defaultDeck();
    localStorage.setItem("profiles", JSON.stringify(profiles));
}
let selected = null;

const emojiList = [
    "🎹", "😎", "🎮", "🎵", "💥", "🔔", "🔥", "🎉", "💡", "📌",
    "🖥️", "⚡", "🎯", "🎁", "🌟", "🍀", "🌈", "⚽", "🏆", "🎲",
    "🛠️", "🎷", "📷", "📱", "✈️", "🚀", "🚨", "❤️", "💛", "💚",
    "💙", "💜", "🐶", "🎤", "🎧", "🔊", "🔇", "⏯️", "⏹️", "🎬"
];

// --- Sistema de Audio ---
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
}

function playSound(type) {
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    switch (type) {
        case 'click':
            // Sonido suave al seleccionar
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.08);
            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.08);
            break;
        case 'action':
            // Sonido al ejecutar acción
            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime + 0.05);
            oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.15);
            break;
        case 'save':
            // Sonido de confirmación al guardar
            oscillator.frequency.setValueAtTime(523, audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(659, audioCtx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.3);
            break;
        case 'error':
            // Sonido de error
            oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.15);
            break;
    }
}

// --- Funciones de perfiles ---
function renderProfileList() {
    const select = document.getElementById("profileSelect");
    if (!select) return;
    select.innerHTML = "";
    for (const name in profiles) {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        if (name === currentProfile) opt.selected = true;
        select.appendChild(opt);
    }
}

function changeProfile() {
    currentProfile = document.getElementById("profileSelect").value;
    localStorage.setItem("currentProfile", currentProfile);
    selected = null;
    render();
}

function newProfile() {
    const name = prompt("Nombre del nuevo perfil:");
    if (!name) return;
    profiles[name] = defaultDeck();
    currentProfile = name;
    localStorage.setItem("profiles", JSON.stringify(profiles));
    localStorage.setItem("currentProfile", currentProfile);
    selected = null;
    render();
}

function deleteProfile() {
    if (!currentProfile) return;
    const confirmDelete = confirm(`¿Seguro que quieres borrar el perfil "${currentProfile}"?`);
    if (!confirmDelete) return;

    delete profiles[currentProfile];
    const remainingProfiles = Object.keys(profiles);
    currentProfile = remainingProfiles.length > 0 ? remainingProfiles[0] : "Streaming";
    if (!profiles[currentProfile]) profiles[currentProfile] = defaultDeck();

    localStorage.setItem("profiles", JSON.stringify(profiles));
    localStorage.setItem("currentProfile", currentProfile);
    selected = null;
    render();
}

// --- Funciones de botones ---
function render() {
    renderProfileList();
    const deck = document.getElementById("deck");
    if (!deck) return;
    deck.innerHTML = "";
    profiles[currentProfile].forEach((b, i) => {
        const el = document.createElement("div");
        el.className = "btn";
        el.innerHTML = `${b.icon}<span>${b.label}</span>`;
        el.onclick = () => selectButton(i);
        el.ondblclick = () => runAction(i);
        deck.appendChild(el);
    });
}

function selectButton(i) {
    initAudio();
    playSound('click');

    selected = i;
    const b = profiles[currentProfile][i];
    document.getElementById("labelInput").value = b.label;
    document.getElementById("iconInput").value = b.icon;
    document.getElementById("actionInput").value = b.action;

    // Resaltar botón seleccionado visualmente
    document.querySelectorAll(".btn").forEach((btn, idx) => {
        btn.classList.toggle("selected", idx === i);
    });
}

function saveConfig() {
    initAudio();

    if (selected === null) {
        playSound('error');
        alert("Selecciona primero un botón haciendo clic en él.");
        return;
    }

    playSound('save');

    const b = profiles[currentProfile][selected];
    b.label = document.getElementById("labelInput").value || "Botón";
    b.icon = document.getElementById("iconInput").value || "🔘";
    b.action = document.getElementById("actionInput").value;

    localStorage.setItem("profiles", JSON.stringify(profiles));
    render();

    const btn = document.querySelector(".config button");
    btn.textContent = "✅ Guardado";
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = "Guardar";
        btn.disabled = false;
    }, 1000);
}

function runAction(i) {
    initAudio();
    const act = profiles[currentProfile][i].action;
    if (!act) return;

    playSound('action');

    if (act.startsWith("http://") || act.startsWith("https://")) {
        window.open(act, "_blank");
    } else if (act.endsWith(".mp3")) {
        const audio = new Audio("sounds/" + act);
        audio.play();
    } else {
        playSound('error');
        alert("Acción desconocida. Usa una URL (http/https) o un archivo .mp3");
    }
}

// --- Selector de emojis ---
function toggleEmojiPicker() {
    const panel = document.getElementById("emojiPanel");
    if (!panel) return;

    // Crear botones de emoji si está vacío
    if (panel.innerHTML === "") {
        emojiList.forEach((e) => {
            const btn = document.createElement("button");
            btn.textContent = e;
            btn.addEventListener("click", () => {
                if (selected === null) {
                    alert("Selecciona primero un botón.");
                    return;
                }
                document.getElementById("iconInput").value = e;
                profiles[currentProfile][selected].icon = e;
                localStorage.setItem("profiles", JSON.stringify(profiles));
                render();
                panel.classList.add("hidden");
            });
            panel.appendChild(btn);
        });
    }

    panel.classList.toggle("hidden");
}

// Cerrar panel de emojis al hacer clic fuera
document.addEventListener("click", (e) => {
    const panel = document.getElementById("emojiPanel");
    const picker = document.querySelector(".emoji-picker");
    if (panel && !panel.contains(e.target) && !picker.contains(e.target)) {
        panel.classList.add("hidden");
    }
});

// --- Inicialización ---
render();
