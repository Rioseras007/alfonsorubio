// Hardcoded Data (unchanged)
const PROVINCIAS_DATA = {
    "pais": "España",
    "comunidades": [
        {
            "nombre": "Galicia",
            "provincias": [
                { "nombre": "La Coruña", "latitude": 43.37, "longitude": -8.40 },
                { "nombre": "Lugo", "latitude": 43.01, "longitude": -7.56 },
                { "nombre": "Orense", "latitude": 42.34, "longitude": -7.86 },
                { "nombre": "Pontevedra", "latitude": 42.43, "longitude": -8.64 }
            ]
        },
        {
            "nombre": "Principado de Asturias",
            "provincias": [{ "nombre": "Asturias", "latitude": 43.36, "longitude": -5.86 }]
        },
        {
            "nombre": "Cantabria",
            "provincias": [{ "nombre": "Cantabria", "latitude": 43.18, "longitude": -3.99 }]
        },
        {
            "nombre": "País Vasco",
            "provincias": [
                { "nombre": "Vizcaya", "latitude": 43.26, "longitude": -2.93 },
                { "nombre": "Guipúzcoa", "latitude": 43.32, "longitude": -1.98 },
                { "nombre": "Álava", "latitude": 42.85, "longitude": -2.67 }
            ]
        },
        {
            "nombre": "Navarra",
            "provincias": [{ "nombre": "Navarra", "latitude": 42.81, "longitude": -1.65 }]
        },
        {
            "nombre": "La Rioja",
            "provincias": [{ "nombre": "La Rioja", "latitude": 42.29, "longitude": -2.54 }]
        },
        {
            "nombre": "Aragón",
            "provincias": [
                { "nombre": "Huesca", "latitude": 42.14, "longitude": -0.41 },
                { "nombre": "Zaragoza", "latitude": 41.66, "longitude": -0.88 },
                { "nombre": "Teruel", "latitude": 40.35, "longitude": -1.11 }
            ]
        },
        {
            "nombre": "Cataluña",
            "provincias": [
                { "nombre": "Lérida", "latitude": 41.62, "longitude": 0.62 },
                { "nombre": "Gerona", "latitude": 41.98, "longitude": 2.82 },
                { "nombre": "Barcelona", "latitude": 41.39, "longitude": 2.16 },
                { "nombre": "Tarragona", "latitude": 41.12, "longitude": 1.25 }
            ]
        },
        {
            "nombre": "Comunidad Valenciana",
            "provincias": [
                { "nombre": "Castellón", "latitude": 39.99, "longitude": -0.05 },
                { "nombre": "Valencia", "latitude": 39.47, "longitude": -0.38 },
                { "nombre": "Alicante", "latitude": 38.35, "longitude": -0.48 }
            ]
        },
        {
            "nombre": "Murcia",
            "provincias": [{ "nombre": "Murcia", "latitude": 37.99, "longitude": -1.13 }]
        },
        {
            "nombre": "Baleares",
            "provincias": [{ "nombre": "Baleares", "latitude": 39.69, "longitude": 3.02 }]
        },
        {
            "nombre": "Castilla y León",
            "provincias": [
                { "nombre": "León", "latitude": 42.60, "longitude": -5.57 },
                { "nombre": "Palencia", "latitude": 42.01, "longitude": -4.52 },
                { "nombre": "Burgos", "latitude": 42.34, "longitude": -3.70 },
                { "nombre": "Zamora", "latitude": 41.51, "longitude": -5.74 },
                { "nombre": "Valladolid", "latitude": 41.66, "longitude": -4.72 },
                { "nombre": "Soria", "latitude": 41.76, "longitude": -2.47 },
                { "nombre": "Salamanca", "latitude": 40.97, "longitude": -5.66 },
                { "nombre": "Ávila", "latitude": 40.66, "longitude": -4.70 },
                { "nombre": "Segovia", "latitude": 40.95, "longitude": -4.12 }
            ]
        },
        {
            "nombre": "Madrid",
            "provincias": [{ "nombre": "Madrid", "latitude": 40.42, "longitude": -3.70 }]
        },
        {
            "nombre": "Castilla-La Mancha",
            "provincias": [
                { "nombre": "Guadalajara", "latitude": 40.63, "longitude": -3.16 },
                { "nombre": "Cuenca", "latitude": 40.07, "longitude": -2.13 },
                { "nombre": "Toledo", "latitude": 39.86, "longitude": -4.02 },
                { "nombre": "Ciudad Real", "latitude": 38.99, "longitude": -3.93 },
                { "nombre": "Albacete", "latitude": 38.99, "longitude": -1.86 }
            ]
        },
        {
            "nombre": "Extremadura",
            "provincias": [
                { "nombre": "Cáceres", "latitude": 39.48, "longitude": -6.37 },
                { "nombre": "Badajoz", "latitude": 38.88, "longitude": -6.97 }
            ]
        },
        {
            "nombre": "Andalucía",
            "provincias": [
                { "nombre": "Huelva", "latitude": 37.27, "longitude": -6.94 },
                { "nombre": "Sevilla", "latitude": 37.38, "longitude": -5.97 },
                { "nombre": "Córdoba", "latitude": 37.89, "longitude": -4.77 },
                { "nombre": "Jaén", "latitude": 37.77, "longitude": -3.79 },
                { "nombre": "Cádiz", "latitude": 36.53, "longitude": -6.29 },
                { "nombre": "Málaga", "latitude": 36.72, "longitude": -4.42 },
                { "nombre": "Granada", "latitude": 37.19, "longitude": -3.61 },
                { "nombre": "Almería", "latitude": 36.84, "longitude": -2.46 }
            ]
        },
        {
            "nombre": "Canarias",
            "provincias": [
                { "nombre": "Tenerife", "latitude": 28.47, "longitude": -16.25 },
                { "nombre": "Las Palmas", "latitude": 28.12, "longitude": -15.43 }
            ]
        }
    ]
};

// --- Storage & offsets ---
let savedOffsets = JSON.parse(localStorage.getItem('weatherMapOffsets')) || {};
let isEditMode = false;

// --- Projection Logic ---

let MAP_BOUNDS = {
    topLat: 43.80,
    bottomLat: 36.00,
    leftLon: -9.50,
    rightLon: 3.50
};

const CANARY_BOUNDS = {
    containerTop: 80,   // %
    containerLeft: 2,   // %
    width: 25,          // %
    height: 18,         // %
    topLat: 29.5,
    bottomLat: 27.5,
    leftLon: -18.5,
    rightLon: -13.0
};

function log(msg) {
    console.log(msg);
}

function toggleCalibration() {
    isEditMode = !isEditMode;
    const btn = document.querySelector('.cal-toggle-btn');
    const container = document.getElementById('mapContainer');

    if (isEditMode) {
        btn.textContent = "💾 Guardar Y Mostrar Datos";
        btn.style.background = "#22c55e"; // Green
        btn.style.color = "white";
        container.classList.add('edit-mode');
        hideTooltip();
    } else {
        btn.textContent = "⚙️ Editar Posiciones";
        btn.style.background = ""; // Reset
        btn.style.color = "";
        container.classList.remove('edit-mode');
        localStorage.setItem('weatherMapOffsets', JSON.stringify(savedOffsets));
        refreshHotspotVisuals();
    }
}

function initMap() {
    const container = document.getElementById('mapContainer');
    const oldDots = container.querySelectorAll('.province-hotspot');
    oldDots.forEach(d => d.remove());

    // Add Tooltip Structure dynamically if missing or just rely on it being in HTML
    // But we are in "pure manual mode" request, so let's keep it robust.
    if (!document.getElementById('weatherTooltip')) {
        const tt = document.createElement('div');
        tt.id = "weatherTooltip";
        tt.className = "glass-tooltip hidden";
        tt.innerHTML = `
            <div class="tooltip-header">
                <h3 id="tt-province">Provincia</h3>
                <span id="tt-icon">☀️</span>
            </div>
            <div class="tooltip-body">
                <div class="data-row">
                    <span class="label">Temperatura</span>
                    <span class="value" id="tt-temp">--°C</span>
                </div>
                <div class="data-row">
                    <span class="label">Lluvia</span>
                    <span class="value" id="tt-rain">-- mm</span>
                </div>
                <div class="data-row">
                    <span class="label">Viento</span>
                    <span class="value" id="tt-wind">-- km/h</span>
                </div>
                <div class="data-row">
                    <span class="label">Humedad</span>
                    <span class="value" id="tt-hum">--%</span>
                </div>
            </div>`;
        container.appendChild(tt);
    }

    const allProvs = [];
    PROVINCIAS_DATA.comunidades.forEach(c => allProvs.push(...c.provincias));

    allProvs.forEach(prov => {
        createHotspot(prov, container);
    });
}

function init() {
    log('Iniciando sistema...');
    initMap();
    log('Mapa cargado.');
}

function project(lat, lon, name) {
    let x, y;

    if (lat < 35 && lon < -10) {
        const xPct = (lon - CANARY_BOUNDS.leftLon) / (CANARY_BOUNDS.rightLon - CANARY_BOUNDS.leftLon);
        const yPct = (CANARY_BOUNDS.topLat - lat) / (CANARY_BOUNDS.topLat - CANARY_BOUNDS.bottomLat);
        x = CANARY_BOUNDS.containerLeft + (xPct * CANARY_BOUNDS.width);
        y = CANARY_BOUNDS.containerTop + (yPct * CANARY_BOUNDS.height);
    } else {
        const xPct = (lon - MAP_BOUNDS.leftLon) / (MAP_BOUNDS.rightLon - MAP_BOUNDS.leftLon);
        const yPct = (MAP_BOUNDS.topLat - lat) / (MAP_BOUNDS.topLat - MAP_BOUNDS.bottomLat);
        x = xPct * 100;
        y = yPct * 100;
    }

    if (savedOffsets[name]) {
        x += savedOffsets[name].x;
        y += savedOffsets[name].y;
    }

    return { x, y };
}

// --- Drag Logic ---
let draggedEl = null;

function makeDraggable(el, provName) {
    el.addEventListener('mousedown', startDrag);

    function startDrag(e) {
        if (!isEditMode) return;
        e.preventDefault();
        draggedEl = el;
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', endDrag);
    }

    function onDrag(e) {
        if (!draggedEl) return;
        const container = document.getElementById('mapContainer');
        const rect = container.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        draggedEl.style.left = `${x}%`;
        draggedEl.style.top = `${y}%`;
    }

    function endDrag(e) {
        if (!draggedEl) return;
        const currentLeft = parseFloat(draggedEl.style.left);
        const currentTop = parseFloat(draggedEl.style.top);

        const baseLat = parseFloat(draggedEl.dataset.lat);
        const baseLon = parseFloat(draggedEl.dataset.lon);

        const base = projectPure(baseLat, baseLon);
        const offsetX = currentLeft - base.x;
        const offsetY = currentTop - base.y;

        savedOffsets[provName] = { x: offsetX, y: offsetY };
        draggedEl = null;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);
    }
}

function projectPure(lat, lon) {
    let x, y;
    if (lat < 35 && lon < -10) {
        const xPct = (lon - CANARY_BOUNDS.leftLon) / (CANARY_BOUNDS.rightLon - CANARY_BOUNDS.leftLon);
        const yPct = (CANARY_BOUNDS.topLat - lat) / (CANARY_BOUNDS.topLat - CANARY_BOUNDS.bottomLat);
        x = CANARY_BOUNDS.containerLeft + (xPct * CANARY_BOUNDS.width);
        y = CANARY_BOUNDS.containerTop + (yPct * CANARY_BOUNDS.height);
    } else {
        const xPct = (lon - MAP_BOUNDS.leftLon) / (MAP_BOUNDS.rightLon - MAP_BOUNDS.leftLon);
        const yPct = (MAP_BOUNDS.topLat - lat) / (MAP_BOUNDS.topLat - MAP_BOUNDS.bottomLat);
        x = xPct * 100;
        y = yPct * 100;
    }
    return { x, y };
}

function getTempColor(temp) {
    if (temp < 0) return '#3b82f6';
    if (temp < 10) return '#0ea5e9';
    if (temp < 18) return '#22c55e';
    if (temp < 25) return '#eab308';
    if (temp < 32) return '#f97316';
    return '#ef4444';
}

function createHotspot(prov, container) {
    const coords = project(prov.latitude, prov.longitude, prov.nombre);

    const el = document.createElement('div');
    el.className = 'province-hotspot';
    el.style.left = `${coords.x}%`;
    el.style.top = `${coords.y}%`;

    el.dataset.lat = prov.latitude;
    el.dataset.lon = prov.longitude;
    el.dataset.name = prov.nombre;
    el.title = prov.nombre;

    makeDraggable(el, prov.nombre);

    el.addEventListener('mouseenter', (e) => {
        if (!draggedEl && !isEditMode) showTooltip(e, prov, el);
    });
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('click', (e) => {
        if (!isEditMode) showTooltip(e, prov, el);
    });

    container.appendChild(el);

    // Initial fetch (if we want heatmap on load)
    queueWeatherFetch(prov, el);
}

function refreshHotspotVisuals() {
    const dots = document.querySelectorAll('.province-hotspot');
    dots.forEach(el => {
        // Here we could re-fetch or just re-color if we stored data.
        // We stored data in dataset if available.
        if (el.dataset.temp) {
            const color = getTempColor(el.dataset.temp);
            el.style.backgroundColor = color;
            el.style.boxShadow = `0 0 10px ${color}`;
        }
    });
}

// Queue system
async function queueWeatherFetch(prov, el) {
    await new Promise(r => setTimeout(r, Math.random() * 2000));
    const data = await fetchWeather(prov.latitude, prov.longitude);
    if (data) {
        // data.current has the new fields
        // Open-Meteo V1 with "current" param returns object "current".
        // Our fetchWeather returns that object directly suitable for easy access.

        const color = getTempColor(data.temperature_2m);
        el.style.backgroundColor = color;
        el.style.boxShadow = `0 0 10px ${color}`;

        // Store all relevant data in dataset (stringified)
        el.dataset.weather = JSON.stringify(data);
        el.dataset.temp = data.temperature_2m;
    }
}

// --- Weather ---
const weatherCache = {};

async function fetchWeather(lat, lon) {
    const key = `${lat.toFixed(2)},${lon.toFixed(2)}`;
    if (weatherCache[key]) return weatherCache[key];

    // Updated URL directly based on requirements
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const data = await res.json();

        if (data.current) {
            weatherCache[key] = data.current;
            return data.current;
        }
    } catch (e) {
        return null;
    }
    return null;
}

// --- Tooltip UI ---
const tooltip = document.getElementById('weatherTooltip');
// Elements are grabbed dynamically now inside showTooltip to be safe

function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 82) return '🌦️';
    if (code <= 99) return '⛈️';
    return '🌡️';
}

function showTooltip(e, prov, el) {
    const title = document.getElementById('tt-province');
    const tempVal = document.getElementById('tt-temp');
    const rainVal = document.getElementById('tt-rain');
    const windVal = document.getElementById('tt-wind');
    const humVal = document.getElementById('tt-hum');
    const icon = document.getElementById('tt-icon');

    if (!title || !rainVal) return; // safety

    tooltip.classList.remove('hidden');
    title.textContent = prov.nombre;

    if (el.dataset.weather) {
        const w = JSON.parse(el.dataset.weather);
        tempVal.textContent = `${w.temperature_2m}°C`;
        rainVal.textContent = `${w.precipitation} mm`;
        windVal.textContent = `${w.wind_speed_10m} km/h`;
        humVal.textContent = `${w.relative_humidity_2m}%`;
        icon.textContent = getWeatherIcon(w.weather_code);
    } else {
        tempVal.textContent = "Cargando...";
        rainVal.textContent = "--";
        windVal.textContent = "--";
        humVal.textContent = "--";
        icon.textContent = "⏳";
    }

    positionTooltip(e);
}

function hideTooltip() {
    tooltip.classList.add('hidden');
}

function positionTooltip(e) {
    const mapWrapper = document.getElementById('mapContainer');
    const rect = mapWrapper.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x += 15;
    y += 15;

    if (x + 220 > rect.width) x -= 240;
    if (y + 150 > rect.height) y -= 170;

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

document.addEventListener('mousemove', (e) => {
    if (!tooltip.classList.contains('hidden')) {
        positionTooltip(e);
    }
});

init();
