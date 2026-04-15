// Simple fade-in animation on scroll using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    // Reveal Hero Color
    const hero = document.querySelector('.hero-section');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('reveal-color');
        }, 800);
    }

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply to elements if we add more dynamic classes later
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ── Efecto de clic: ripple + sonido tijera ──────────────────────
    initClickEffects();
});





function escribir(valor) {
    document.getElementById('pantalla').textContent += valor;
}

function limpiar() {
    document.getElementById('pantalla').textContent = '';
}

function borrar() {
  
  document.getElementById('pantalla').textContent = '';
}

function clave() {
    var claveIngresada = document.getElementById('pantalla').textContent.trim();
    var claveCorrecta ="007"; // Puedes cambiar esta clave a lo que desees

    if (String(claveIngresada) === String(claveCorrecta)) {
         window.location.href = 'https://rioseras007.github.io/alfonsorubio/peliculas/index.html';
        alert('Clave correcta!');
       
    } else {
        alert('Clave incorrecta!');
    }
}


// ── SONIDO  (Web Audio API) ────────────────────────────────
function playSound() {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();

        // Primer "snip" - corte inicial
        function snip(startTime, freq, duration) {
            const bufferSize = ctx.sampleRate * duration;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                // Ruido blanco con envolvente exponencial descendente
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 8);
            }

            const source = ctx.createBufferSource();
            source.buffer = buffer;

            // Filtro de paso de banda para dar tono metálico
            const bandpass = ctx.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.value = freq;
            bandpass.Q.value = 3;

            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0.35, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            source.connect(bandpass);
            bandpass.connect(gainNode);
            gainNode.connect(ctx.destination);
            source.start(startTime);
        }

        const now = ctx.currentTime;
        snip(now,        5200, 0.08);   // primer chasquido
        snip(now + 0.09, 4800, 0.07);   // segundo chasquido (cierre de la tijera)

    } catch (e) {
        // Si el navegador no soporta AudioContext, no pasa nada
    }
}

// ── INICIALIZAR efectos en todos los botones y enlaces ───────────────
function initClickEffects() {
    const targets = document.querySelectorAll('a, button, .cancel, .btn, .cancel, .clear, .enter');

    targets.forEach(el => {
        // Necesario para que el ripple quede contenido
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }
        el.style.overflow = 'hidden';

        el.addEventListener('click', (e) => {
            playSound();
            createRipple(e, el);
        });
    });
}
// ── EFECTO RIPPLE VISUAL ─────────────────────────────────────────────
function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width  = ripple.style.height = `${size}px`;
    ripple.style.left   = `${x}px`;
    ripple.style.top    = `${y}px`;

    element.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
}