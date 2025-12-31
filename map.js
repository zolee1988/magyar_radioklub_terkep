// Alap térkép
const map = L.map('map').setView([47.2, 19.5], 8);

// OpenStreetMap réteg
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// PMR ikon
const pmrIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});


// JSON betöltése
fetch('pmr_papagajok.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {

            // Lokátorból koordináta
            const coords = locatorToLatLng(item.locator);

            // CTCSS / DCS mezők külön kezelése
            let toneCode = "-";
            let toneHz = "-";

            if (item.ctcss_code) {
                toneCode = item.ctcss_code.replace("CTCSS ", ""); // csak a szám
            }

            if (item.ctcss_hz) {
                toneHz = item.ctcss_hz + " Hz";
            }

            if (item.dcs) {
                toneCode = item.dcs;   // pl. DCS023
                toneHz = "-";          // nincs Hz érték
            }

            const popupHtml = `
    <div class="title">${item.name}</div>
    <div style="height:2px; background:#2A81CB; margin:4px 0 6px 0; border-radius:2px;"></div>
    <table>
        <tr><th>QTH</th><td>${item.locator}</td></tr>
        <tr><th>PMR</th><td>${item.channel} / ${toneCode}</td></tr>
        <tr><th>Frekvencia</th><td>${item.freq_mhz} MHz</td></tr>
        <tr><th>CTCSS</th><td>${toneHz}</td></tr>
        ${item.notes ? `<tr><th>Megjegyzés</th><td>${item.notes}</td></tr>` : ""}
    </table>
`;




            // Marker
            L.marker([coords.lat, coords.lng], { icon: pmrIcon })
                .addTo(map)
                .bindPopup(popupHtml);
        });
    });
