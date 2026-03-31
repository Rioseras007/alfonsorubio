const https = require('https');

function getCoordinates(query) {
    return new Promise((resolve, reject) => {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=es&format=json`;
        console.log(`Requesting: ${url}`);

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    console.log(`Response for ${query}: ${data.substring(0, 200)}...`);
                    const result = JSON.parse(data);
                    if (result.results && result.results.length > 0) {
                        resolve({
                            latitude: result.results[0].latitude,
                            longitude: result.results[0].longitude
                        });
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function test() {
    try {
        const coords = await getCoordinates("Madrid España");
        console.log("Coords for Madrid:", coords);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
