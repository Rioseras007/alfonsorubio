<<<<<<< HEAD
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
});

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

=======
const search = document.getElementById("search");
const toggleTheme = document.getElementById("toggleTheme");
const toggleSound = document.getElementById("toggleSound");

// --- Lógica del Buscador ---
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  document.querySelectorAll("li").forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(value) ? "" : "none";
  });
});

// --- Lógica del Tema Oscuro ---
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// --- Lógica de Sonido (Web Audio API) ---
let soundEnabled = localStorage.getItem("soundEnabled") !== "false";
actualizarIconoSonido();

function actualizarIconoSonido() {
  const icon = toggleSound.querySelector("i");
  if (soundEnabled) {
    icon.className = "bi bi-volume-up";
    toggleSound.title = "Silenciar sonidos";
  } else {
    icon.className = "bi bi-volume-mute";
    toggleSound.title = "Activar sonidos";
  }
}

toggleSound.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  localStorage.setItem("soundEnabled", soundEnabled);
  actualizarIconoSonido();
});

// Generador de sonido elegante
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClickSound() {
  if (!soundEnabled) return;

  // Reactivar contexto si está suspendido (política de navegadores)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  // Tono de inicio más bajo y suave
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); 
  oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.08);

  // Ataque y decaimiento súper suaves
  gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime + 0.005);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.08);
}

function playHoverSound() {
  if (!soundEnabled) return;
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime); // Más agudo para el hover
  oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.04);

  gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.02, audioCtx.currentTime + 0.002);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.04);
}

// --- Delegación de eventos para sonidos ---
document.addEventListener("click", (e) => {
  const target = e.target.closest("a, button, [onclick], .media-title");
  if (target) {
    playClickSound();
  }
});

// Sonido al pasar por redes sociales
document.addEventListener("mouseenter", (e) => {
  const target = e.target.closest(".social-link");
  if (target) {
    playHoverSound();
  }
}, true); // Usamos capture para detectar el evento en elementos delegados
>>>>>>> 9e2a5e1 (Modernización completa: SEO, tipografía y sonidos (excluyendo archivos pesados))
