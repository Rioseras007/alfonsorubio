const fs = require('fs');
const path = require('path');
const https = require('https');

const filePath = path.join(__dirname, 'provincias.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getCoordinates(query) {
    return new Promise((resolve, reject) => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=es&format=json`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    if (result.results && result.results.length > 0) {
                        // Priority: country code ES
                        const hit = result.results.find(r => r.country_code === 'ES' || r.country === 'Spain' || r.country === 'España');
                        if (hit) {
                            resolve({ latitude: hit.latitude, longitude: hit.longitude });
                        } else {
                            // Fallback to first result if no Spain match (unlikely for spanish provinces but possible)
                            resolve({ latitude: result.results[0].latitude, longitude: result.results[0].longitude });
                        }
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', (err) => {
            resolve(null);
        });
    });
}

async function processProvinces() {
    console.log('Starting coordinate update...');

    // Iterate communities
    for (let cIndex = 0; cIndex < data.comunidades.length; cIndex++) {
        const comunidad = data.comunidades[cIndex];
        console.log(`Processing ${comunidad.nombre}...`);

        // Iterate provinces
        for (let pIndex = 0; pIndex < comunidad.provincias.length; pIndex++) {
            const prov = comunidad.provincias[pIndex];
            // Check if already has coords (skips if we re-run)
            if (prov.latitude !== null && prov.latitude !== undefined) {
                continue;
            }

            const provName = prov.nombre;
            console.log(`  Fetching ${provName}...`);

            const coords = await getCoordinates(provName);

            if (coords) {
                prov.latitude = coords.latitude;
                prov.longitude = coords.longitude;
                console.log(`    -> Found: ${coords.latitude}, ${coords.longitude}`);
            } else {
                console.warn(`    -> NOT FOUND: ${provName}`);
                // Try appending "España" as backup strategy
                const retryCoords = await getCoordinates(`${provName} España`);
                if (retryCoords) {
                    prov.latitude = retryCoords.latitude;
                    prov.longitude = retryCoords.longitude;
                    console.log(`    -> Found (retry): ${retryCoords.latitude}, ${retryCoords.longitude}`);
                }
            }

            // Save incrementally or at end? Let's save at end to avoid IO thrashing, 
            // but maybe save every community to be safe?
            await delay(200); // 5 calls per second max (open-meteo is generous but polite)
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Done! provincias.json updated.');
}

processProvinces();
