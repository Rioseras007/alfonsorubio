// --- DATOS DEL SITIO ---
const noticias = [
    { titulo: "Nueva Temporada: Mitos y Mortales", fecha: "20 Ene 2026", tipo: "Temporada", badge: "badge-new", desc: "Explora el Olimpo, derrota a dioses legendarios y consigue poderes míticos en esta nueva actualización." },
    { titulo: "Parche 29.10: Cambios en el mapa", fecha: "18 Ene 2026", tipo: "Parche", badge: "badge-patch", desc: "Nuevas zonas de interés han aparecido cerca de Glaciar Grandioso. ¡Descubre los secretos que oculta la nieve!" },
    { titulo: "Colaboración con Star Wars filtrada", fecha: "15 Ene 2026", tipo: "Filtración", badge: "badge-new", desc: "Los sables de luz podrían regresar antes de lo esperado junto a nuevas skins de la serie The Mandalorian." },
    { titulo: "Torneo FNCS: Fechas confirmadas", fecha: "12 Ene 2026", tipo: "Competición", badge: "badge-patch", desc: "Prepara a tu dúo para competir por el gran premio. Las clasificatorias comienzan el próximo fin de semana." },
    { titulo: "Nuevas misiones semanales", fecha: "10 Ene 2026", tipo: "Misiones", badge: "badge-new", desc: "Consigue XP extra completando los desafíos de 'Nexo'. Sube de nivel tu Pase de Batalla rápidamente." },
    { titulo: "Regresa el modo OG", fecha: "05 Ene 2026", tipo: "Evento", badge: "badge-patch", desc: "Por tiempo limitado, vuelve a la isla original con las armas y vehículos que lo empezaron todo." }
];

const itemsTienda = [
    { id: 1, nombre: "Caballero Negro", precio: 2000, imagen: "https://fortnite-api.com/images/cosmetics/br/cid_035_athena_commando_m_medieval/icon.png", rareza: "Legendaria" },
    { id: 2, nombre: "Midas", precio: 2000, imagen: "https://fortnite-api.com/images/cosmetics/br/CID_694_Athena_Commando_M_CatBurglar/icon.png", rareza: "Legendaria" },
    { id: 3, nombre: "Cuervo", precio: 2000, imagen: "https://fortnite-api.com/images/cosmetics/br/CID_102_Athena_Commando_M_Raven/icon.png", rareza: "Legendaria" },
    { id: 4, nombre: "Bombardera Brillante", precio: 1200, imagen: "https://fortnite-api.com/images/cosmetics/br/cid_043_athena_commando_f_stealth/icon.png", rareza: "Rara" },
    { id: 5, nombre: "Focus", precio: 800, imagen: "https://fortnite-api.com/images/cosmetics/br/CID_452_Athena_Commando_F_CyberFu/icon.png", rareza: "Rara" },
    { id: 6, nombre: "Palito de Pescado", precio: 1200, imagen: "https://fortnite-api.com/images/cosmetics/br/cid_315_athena_commando_m_teriyakifish/icon.png", rareza: "Rara" },
    { id: 7, nombre: "Aura", precio: 800, imagen: "https://fortnite-api.com/images/cosmetics/br/CID_397_Athena_Commando_F_TreasureHunterFashion/icon.png", rareza: "Poco Común" },
    { id: 8, nombre: "Renegada", precio: 1200, imagen: "https://fortnite-api.com/images/cosmetics/br/CID_028_Athena_Commando_F/icon.png", rareza: "Rara" }
];

const rankingJugadores = [
    { nick: "ANTONIO2709", victorias: 1061, kd: "1.47", winRate: "6.8%", rank: "🥇", url: "https://fortnitetracker.com/profile/all/ANTONIO2709" },
    { nick: "rioseras007", victorias: 958, kd: "1.20", winRate: "6.3%", rank: "🥈", url: "https://fortnitetracker.com/profile/all/rioseras007" },
    { nick: "bongonnclap", victorias: 404, kd: "2.42", winRate: "8.4%", rank: "🥉", url: "https://fortnitetracker.com/profile/all/bongonnclap" },
    { nick: "comandantegerbi", victorias: 276, kd: "2.84", winRate: "9.0%", rank: "🔥", url: "https://fortnitetracker.com/profile/all/comandantegerbi" }
];

const guias = [
    { titulo: "Estrategia Victoria Segura", desc: "Aprende los pasos clave para asegurar el Top 1 en cada partida.", icon: "🏆", url: "https://www.youtube.com/watch?v=txjUid9t4qc" },
    { titulo: "Entrenamiento Pro (Coaching)", desc: "Repasamos jugadas y errores para mejorar el nivel del equipo.", icon: "👨‍🏫", url: "https://www.youtube.com/watch?v=Mx281dJONW8" },
    { titulo: "Diversión y Victoria", desc: "Cómo ganar manteniendo el espíritu de la Patrulla.", icon: "🕺", url: "https://www.youtube.com/watch?v=nq8bxk-AnN8" },
    { titulo: "Dominando el Mapa 2026", desc: "Secretos y rutas de loot en las nuevas zonas de la isla.", icon: "🗺️", url: "https://www.youtube.com/watch?v=YT_RAVHpG4c" }
];

const videosPatrulla = [
    { id: "txjUid9t4qc", titulo: "Victoria Segura - Fortnite", miniatura: "https://img.youtube.com/vi/txjUid9t4qc/maxresdefault.jpg" },
    { id: "YT_RAVHpG4c", titulo: "Donde estará este cab....", miniatura: "https://img.youtube.com/vi/YT_RAVHpG4c/maxresdefault.jpg" },
    { id: "Mx281dJONW8", titulo: "Hago Coaching", miniatura: "https://img.youtube.com/vi/Mx281dJONW8/maxresdefault.jpg" },
    { id: "nq8bxk-AnN8", titulo: "Con Baile Incluido (Ft. Rioseras)", miniatura: "https://img.youtube.com/vi/nq8bxk-AnN8/maxresdefault.jpg" },
    { id: "kFZioHFC-QQ", titulo: "Le he cogido la espalda", miniatura: "https://img.youtube.com/vi/kFZioHFC-QQ/maxresdefault.jpg" },
    { id: "udXmECMZKNo", titulo: "Esta muy tocado", miniatura: "https://img.youtube.com/vi/udXmECMZKNo/maxresdefault.jpg" }
];

// --- FUNCIONES DE CARGA ---

function cargarNoticias() {
    const container = document.getElementById('news-container');
    if (!container) return;
    container.innerHTML = noticias.map(n => `
        <div class="glass-panel news-card" style="padding: 25px;">
            <span class="badge ${n.badge}">${n.tipo}</span>
            <h3 style="margin: 15px 0 10px; font-size: 1.2rem; color: var(--primary);">${n.titulo}</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 15px;">${n.desc}</p>
            <span style="color: var(--primary); font-size: 0.8rem; font-weight: 600;">${n.fecha}</span>
        </div>
    `).join('');
}

function cargarTienda() {
    const container = document.getElementById('shop-container');
    if (!container) return;

    const rarezaColores = {
        'Legendaria': 'linear-gradient(45deg, #d37841, #eb9a3e)',
        'Épica': 'linear-gradient(45deg, #a448ee, #d156ff)',
        'Rara': 'linear-gradient(45deg, #2cc1ff, #3ec8ff)',
        'Poco Común': 'linear-gradient(45deg, #4ed341, #62eb3e)'
    };

    container.innerHTML = itemsTienda.map(item => `
        <div class="glass-panel" style="padding: 20px; transition: transform 0.3s ease; text-align: center;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            <div style="background: ${rarezaColores[item.rareza] || '#333'}; border-radius: 12px; margin-bottom: 15px; position: relative; overflow: hidden; aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center;">
                <img src="${item.imagen}" style="width: 100%; height: auto; z-index: 1;">
            </div>
            <h3>${item.nombre}</h3>
            <p style="color: var(--primary); font-weight: 700; margin-top: 5px;">${item.precio} <i class="fa-solid fa-v" style="font-size: 0.8rem;"></i>-Bucks</p>
        </div>
    `).join('');
}

function cargarStats() {
    const body = document.getElementById('stats-body');
    if (!body) return;
    body.innerHTML = rankingJugadores.sort((a, b) => b.victorias - a.victorias).map(j => `
        <tr style="${j.rank === '🥇' ? 'background: rgba(0, 210, 255, 0.05);' : ''}">
            <td style="font-size: 1.2rem;">${j.rank}</td>
            <td style="font-weight: bold;">
                <a href="${j.url}" target="_blank" style="color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 10px;">
                    ${j.nick} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem;"></i>
                </a>
            </td>
            <td>${j.victorias.toLocaleString()}</td>
            <td>${j.kd}</td>
            <td style="color: var(--success); font-weight: bold;">${j.winRate}</td>
        </tr>
    `).join('');
}

function cargarGuias() {
    const container = document.getElementById('guides-container');
    if (!container) return;
    container.innerHTML = guias.map(g => `
        <a href="${g.url}" target="_blank" class="glass-panel" style="padding: 30px; border-top: 3px solid var(--accent); text-decoration: none; color: inherit; transition: transform 0.3s ease; display: block;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="font-size: 2rem; margin-bottom: 15px;">${g.icon}</div>
            <h3 style="margin-bottom: 10px;">${g.titulo}</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;">${g.desc}</p>
        </a>
    `).join('');
}

function cargarVideos() {
    const container = document.querySelector('#videos .grid-container');
    if (!container) return;
    container.innerHTML = videosPatrulla.map(v => `
        <a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" class="glass-panel" style="text-decoration: none; color: inherit; overflow: hidden;">
            <img src="${v.miniatura}" style="width: 100%;">
            <div style="padding: 15px;"><h3>${v.titulo}</h3></div>
        </a>
    `).join('');
}

// --- INITIALIZATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade');
        }
    });
}, { threshold: 0.1 });

// --- FUNCIONALIDADES PRO ---

function pickDropZone() {
    playSfx('drop');
    const zones = ["Demon's Dojo", "Flooded Frogs", "Whiffy Wharf", "Seaport City", "Warrior's Watch", "Twinkle Terrace", "Lost Lake", "Pumped Power"];
    const display = document.getElementById('drop-zone-display');

    display.style.opacity = "0.3";
    let count = 0;
    const interval = setInterval(() => {
        display.innerText = zones[Math.floor(Math.random() * zones.length)];
        count++;
        if (count > 10) {
            clearInterval(interval);
            display.style.opacity = "1";
            display.style.transform = "scale(1.1)";
            setTimeout(() => display.style.transform = "scale(1)", 200);
        }
    }, 100);
}

function copyCode() {
    const code = document.getElementById('creator-code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.code-box button');
        btn.innerText = '¡COPIADO!';
        btn.style.background = '#00ff88';
        setTimeout(() => {
            btn.innerText = 'COPIAR';
            btn.style.background = 'white';
        }, 2000);
    });
}

function createParticles() {
    const container = document.getElementById('nexus-particles');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.width = p.style.height = Math.random() * 3 + 'px';
        p.style.animationDuration = (Math.random() * 10 + 10) + 's';
        p.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(p);
    }
}

const mapPins = [
    { name: "Demon's Dojo", x: 65, y: 40, loot: "Muy Alto", risk: "Extremo" },
    { name: "Flooded Frogs", x: 30, y: 70, loot: "Alto", risk: "Medio" },
    { name: "Whiffy Wharf", x: 80, y: 20, loot: "Medio", risk: "Bajo" },
    { name: "Seaport City", x: 20, y: 35, loot: "Muy Alto", risk: "Alto" },
    { name: "Warrior's Watch", x: 50, y: 15, loot: "Alto", risk: "Muy Alto" }
];

function cargarMapaPins() {
    const container = document.getElementById('map-pins-container');
    if (!container) return;
    container.innerHTML = mapPins.map(p => `
        <div class="map-pin" style="left: ${p.x}%; top: ${p.y}%;"></div>
        <div class="map-tooltip" style="left: ${p.x}%; top: ${p.y - 5}%;">
            <strong>${p.name}</strong><br>Loot: ${p.loot} | Riesgo: ${p.risk}
        </div>
    `).join('');
}

const arsenalMeta = [
    { name: "Escopeta de Corredera", tier: "s", dmg: 95, tag: "Imprescindible" },
    { name: "Fusil de Asalto War", tier: "a", dmg: 35, tag: "Beam total" },
    { name: "Subfusil de Ráfaga", tier: "s", dmg: 19, tag: "Meta close" }
];

const itemsSalud = [
    { name: "Mini Poción", effect: "+25 Escudo", icon: "🧪", color: "#00d2ff" },
    { name: "Poción Grande", effect: "+50 Escudo", icon: "🍶", color: "#0072ff" },
    { name: "Botiquín Pro", effect: "100% Salud", icon: "🩹", color: "#28a745" },
    { name: "Zumo de Subidón", effect: "Salud/Escudo + Stamina", icon: "⚡", color: "#ffc107" }
];

function cargarTierList() {
    const container = document.getElementById('tier-list-container');
    if (!container) return;
    container.innerHTML = arsenalMeta.map(w => `
        <div class="glass-panel" style="padding: 20px; text-align: center; border-left: 4px solid var(--${w.tier === 's' ? 'secondary' : 'primary'});">
            <div class="tier-badge tier-${w.tier}">${w.tier.toUpperCase()} TIER</div>
            <h3 style="margin-top: 10px;">${w.name}</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">${w.tag}</p>
        </div>
    `).join('');
}

function cargarSalud() {
    const container = document.getElementById('health-items-container');
    if (!container) return;
    container.innerHTML = itemsSalud.map(i => `
        <div class="glass-panel" style="padding: 20px; text-align: center; border-top: 3px solid ${i.color};">
            <div style="font-size: 2rem; margin-bottom: 10px;">${i.icon}</div>
            <h4 style="margin-bottom: 5px;">${i.name}</h4>
            <span style="font-size: 0.75rem; color: ${i.color}; font-weight: bold; text-transform: uppercase;">${i.effect}</span>
        </div>
    `).join('');
}

const cancionesSuno = [
    { titulo: "Nexo de Poder", genero: "Epic / Gaming", link: "https://suno.com/s/0eRRe5LoD4C2iAMN" },
    { titulo: "Fuego en la Isla", genero: "Synthwave / Action", link: "https://suno.com/s/InrQh7xfrDgrfuTm" },
    { titulo: "Leyendas del Bus", genero: "Power Metal / Epic", link: "https://suno.com/s/GTcyTfSyEFHnHkLX" },
    { titulo: "Amanecer de Victoria", genero: "Electronic / Cinematic", link: "https://suno.com/s/8JRcPcLO5CAaCSoH" },
    { titulo: "Ritmo en el Campo", genero: "Groovy / Gaming", link: "https://suno.com/s/gIZ16d40qzSvin5p" },
    { titulo: "Sinfonía del Nexo", genero: "Orchestral / Epic", link: "https://suno.com/s/qqiWrMoapd32KNZl" }
];

function cargarMusica() {
    const container = document.getElementById('music-container');
    if (!container) return;
    container.innerHTML = cancionesSuno.map(c => `
        <div class="music-card animate-fade">
            <div class="sound-waves">
                <div class="wave-bar" style="animation-delay: 0.1s"></div>
                <div class="wave-bar" style="animation-delay: 0.3s"></div>
                <div class="wave-bar" style="animation-delay: 0.2s"></div>
                <div class="wave-bar" style="animation-delay: 0.5s"></div>
                <div class="wave-bar" style="animation-delay: 0.4s"></div>
            </div>
            <h3 style="margin-bottom: 5px;">${c.titulo}</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 20px;">${c.genero}</p>
            <a href="${c.link}" target="_blank" class="btn-primary" style="font-size: 0.8rem; padding: 10px 20px;">ESCUCHAR EN SUNO</a>
        </div>
    `).join('');
}

const sfx = {
    click: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'), // Click limpio
    hover: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'), // Hover sutil
    success: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'), // Éxito/Logro
    drop: new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3')   // Randomizer / Acción especial
};

function playSfx(type) {
    const audio = sfx[type].cloneNode();
    audio.volume = 0.4;
    audio.play().catch(e => console.log("Audio play blocked by browser"));
}

function startCountdown() {
    const targetDate = new Date("March 20, 2026 19:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const cdContainer = document.getElementById('countdown');
        if (!cdContainer) return clearInterval(timer);

        const items = cdContainer.querySelectorAll('.cd-item');
        items[0].innerHTML = `${days < 10 ? '0' + days : days}<span style="font-size: 0.8rem; display: block; color: var(--text-muted); font-family: 'Inter';">DÍAS</span>`;
        items[1].innerHTML = `${hours < 10 ? '0' + hours : hours}<span style="font-size: 0.8rem; display: block; color: var(--text-muted); font-family: 'Inter';">HORAS</span>`;
        items[2].innerHTML = `${minutes < 10 ? '0' + minutes : minutes}<span style="font-size: 0.8rem; display: block; color: var(--text-muted); font-family: 'Inter';">MIN</span>`;
        items[3].innerHTML = `${seconds < 10 ? '0' + seconds : seconds}<span style="font-size: 0.8rem; display: block; color: var(--text-muted); font-family: 'Inter';">SEG</span>`;

        if (distance < 0) {
            clearInterval(timer);
            cdContainer.innerHTML = "¡EVENTO EN VIVO!";
        }
    }, 1000);
}

function submitClip() {
    const nick = document.getElementById('clip-nick').value;
    const url = document.getElementById('clip-url').value;

    playSfx('success');
    console.log(`Nuevo clip de ${nick}: ${url}`); // Simulación

    document.getElementById('clip-form').style.display = 'none';
    document.getElementById('clip-success').style.display = 'block';

    setTimeout(() => {
        document.getElementById('clip-form').reset();
        document.getElementById('clip-form').style.display = 'block';
        document.getElementById('clip-success').style.display = 'none';
    }, 5000);
}

const bttButton = document.getElementById('back-to-top');
window.onscroll = function () {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        bttButton.style.display = "block";
    } else {
        bttButton.style.display = "none";
    }
};

bttButton.onclick = function () {
    playSfx('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    cargarNoticias();
    cargarTienda();
    cargarStats();
    cargarGuias();
    cargarVideos();
    cargarMapaPins();
    cargarTierList();
    cargarSalud();
    cargarMusica();
    startCountdown();

    // Vinculación Global de SFX
    document.querySelectorAll('button, a, .map-pin').forEach(el => {
        el.addEventListener('mouseenter', () => playSfx('hover'));
        el.addEventListener('click', () => {
            if (el.tagName === 'BUTTON' || el.classList.contains('btn-primary')) {
                playSfx('click');
            }
        });
    });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
});
