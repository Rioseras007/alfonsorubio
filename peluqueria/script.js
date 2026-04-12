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

// ── SONIDO DE TIJERA (Web Audio API) ────────────────────────────────
function playScissorSound() {
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
        snip(now,        3200, 0.08);   // primer chasquido
        snip(now + 0.09, 2800, 0.07);   // segundo chasquido (cierre de la tijera)

    } catch (e) {
        // Si el navegador no soporta AudioContext, no pasa nada
    }
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

// ── INICIALIZAR efectos en todos los botones y enlaces ───────────────
function initClickEffects() {
    const targets = document.querySelectorAll('a, button, .filter-btn, .btn, .faq-question');

    targets.forEach(el => {
        // Necesario para que el ripple quede contenido
        if (getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }
        el.style.overflow = 'hidden';

        el.addEventListener('click', (e) => {
            playScissorSound();
            createRipple(e, el);
        });
    });
}



function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category || (category === 'todos' && btn.innerText.toLowerCase() === 'todos')) {
            btn.classList.add('active');
        }
    });

    items.forEach(item => {
        if (category === 'todos') {
            item.style.display = 'block';
        } else {
            if (item.classList.contains(category)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// FAQ Acordeón
function toggleFaq(questionEl) {
    const item = questionEl.parentElement;
    const isOpen = item.classList.contains('open');

    // Cierra todos los demás
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
    });

    // Abre el seleccionado si estaba cerrado
    if (!isOpen) {
        item.classList.add('open');
    }
}


