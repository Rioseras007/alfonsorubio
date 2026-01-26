const fs = require('fs');
const path = require('path');
const https = require('https');

const PROVINCIAS_FILE = path.join(__dirname, 'provincias.json');
let provinciasCache = null;

function loadProvinces() {
    if (provinciasCache) return provinciasCache;
    const rawData = fs.readFileSync(PROVINCIAS_FILE, 'utf8');
    const data = JSON.parse(rawData);

    // Flatten for easy lookup
    const map = {};
    data.comunidades.forEach(comunidad => {
        comunidad.provincias.forEach(prov => {
            map[prov.nombre.toLowerCase()] = prov;
        });
    });
    provinciasCache = map;
    return map;
}

function fetchWeather(lat, lon) {
    return new Promise((resolve, reject) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&start_date=${new Date().toISOString().split('T')[0]}&end_date=${new Date().toISOString().split('T')[0]}`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (result.current_weather) {
                        resolve(result.current_weather);
                    } else {
                        reject(new Error("No weather data found"));
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', err => reject(err));
    });
}

/**
 * Gets the current weather for a province by name.
 * @param {string} provinceName 
 * @returns {Promise<Object>} Weather data object
 */
async function getWeather(provinceName) {
    const provinces = loadProvinces();
    const province = provinces[provinceName.toLowerCase()];

    if (!province) {
        throw new Error(`Province '${provinceName}' not found.`);
    }

    if (province.latitude === null || province.longitude === null) {
        throw new Error(`Coordinates missing for '${provinceName}'.`);
    }

    try {
        const weather = await fetchWeather(province.latitude, province.longitude);
        return {
            province: province.nombre,
            temperature: weather.temperature,
            windspeed: weather.windspeed,
            winddirection: weather.winddirection,
            weathercode: weather.weathercode,
            time: weather.time
        };
    } catch (error) {
        throw new Error(`Failed to fetch weather for ${provinceName}: ${error.message}`);
    }
}

// Example usage if run directly
if (require.main === module) {
    const provinceToTest = process.argv[2] || "Madrid";
    console.log(`Fetching weather for ${provinceToTest}...`);
    getWeather(provinceToTest)
        .then(data => console.log(data))
        .catch(err => console.error(err.message));
}

module.exports = { getWeather };
