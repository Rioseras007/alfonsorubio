
function crearReproductorAudio(url, opciones = {}) {
    const defaults = {
        controles: true,
        autoplay: false,
        loop: false,
        muted: false,
        clase: '',
        id: '',
        textoAlternativo: 'Tu navegador no soporta el elemento audio'
    };

    const config = { ...defaults, ...opciones };

    const audio = document.createElement('audio');

    // Atributos booleanos
    if (config.controles)  audio.controls = true;
    if (config.autoplay)   audio.autoplay = true;
    if (config.loop)       audio.loop = true;
    if (config.muted)      audio.muted = true;

    // Atributos opcionales
    if (config.id)    audio.id = config.id;
    if (config.clase) audio.className = config.clase;

    // Fuente
    const source = document.createElement('source');
    source.src = url;
    // Intentamos adivinar el tipo por extensión (opcional pero útil)
    const extension = url.split('.').pop().toLowerCase();
    const tiposComunes = {
        'mp3': 'audio/mpeg',
        'wav': 'audio/wav',
        'ogg': 'audio/ogg',
        'm4a': 'audio/mp4',
        'aac': 'audio/aac'
    };
    if (tiposComunes[extension]) {
        source.type = tiposComunes[extension];
    }

    audio.appendChild(source);

    // Texto alternativo (fallback)
    audio.textContent = config.textoAlternativo;

    return audio;
}


// ────────────────────────────────────────────────
// Ejemplos de uso:
const urlCancion = "https://playerservices.streamtheworld.com/api/livestream-redirect/CADENADIAL.mp3";

// Forma 1: básica
const reproductor = crearReproductorAudio(urlCancion);
document.body.appendChild(reproductor);

// Forma 2: con opciones
const reproductorCustom = crearReproductorAudio(urlCancion, {
    controles: true,
    autoplay: false,
    loop: true,
    clase: 'mi-reproductor audio-estilo-oscuro',
    id: 'player-principal',
    muted: false
});

document.getElementById('contenedor-audio').appendChild(reproductorCustom);
