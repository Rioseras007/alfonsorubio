const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'provincias.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getCoordinates(query) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=es&format=json`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        if (result.results && result.results.length > 0) {
            return {
                latitude: result.results[0].latitude,
                longitude: result.results[0].longitude
            };
        }
    } catch (error) {
        console.error(`Error fetching for ${query}:`, error.message);
    }
    return null;
}

async function processProvinces() {
    console.log('Starting coordinate update...');
    
    for (const comunidad of data.comunidades) {
        // Since provinces is an array of strings, we need to convert them to objects or just create a new mapping.
        // The user asked to "add coordinates", so converting strings to objects is best.
        // Current format: "provincias": ["La Coruña", ...]
        // New format: "provincias": [{ "nombre": "La Coruña", "lat": ..., "lon": ... }, ...]
        
        const newProvinces = [];
        
        for (const provName of comunidad.provincias) {
            console.log(`Fetching ${provName}...`);
            // Add "España" to context if needed, but usually City/Province name is enough.
            // Some might need disambiguation.
            const coords = await getCoordinates(`${provName} España`);
            
            if (coords) {
                newProvinces.push({
                    nombre: provName,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                });
            } else {
                console.warn(`Could not find coordinates for ${provName}`);
                newProvinces.push({
                    nombre: provName,
                    latitude: null,
                    longitude: null
                });
            }
            await delay(250); // Rate limit kindness
        }
        
        comunidad.provincias = newProvinces;
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Done! provincias.json updated.');
}

processProvinces();
