const https = require('https');

function getCoordinates(query) {
    return new Promise((resolve, reject) => {
        // Try just the name, maybe the 'España' suffix confuses it if not handled well
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=es&format=json`;
        console.log(`Requesting URL: ${url}`);

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    console.log(`Raw Response: ${data}`);
                    const result = JSON.parse(data);
                    if (result.results && result.results.length > 0) {
                        // Filter for Spain if possible, usually country_code or country
                        const spanishResult = result.results.find(r => r.country === "Spain" || r.country === "España" || r.country_code === "ES");
                        if (spanishResult) {
                            resolve({ lat: spanishResult.latitude, lon: spanishResult.longitude, name: spanishResult.name });
                        } else {
                            resolve(result.results[0]); // Fallback
                        }
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    console.error("Parse Error:", e);
                    resolve(null);
                }
            });
        }).on('error', (err) => {
            console.error("Network Error:", err);
            resolve(null);
        });
    });
}

async function test() {
    console.log("Testing...");
    const c1 = await getCoordinates("Madrid");
    console.log("Madrid:", c1);

    // Add delay
    await new Promise(r => setTimeout(r, 1000));

    const c2 = await getCoordinates("Lugo");
    console.log("Lugo:", c2);
}

test();
