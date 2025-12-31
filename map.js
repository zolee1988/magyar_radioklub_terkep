// Alap térkép
const map = L.map('map').setView([47.2, 19.5], 8);

// OpenStreetMap réteg
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// Klub ikon (egyelőre a default Leaflet ikon)
const clubIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

// JSON betöltése
fetch('radioklub.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {

            // Lokátorból koordináta
            const coords = locatorToLatLon(item.locator);


            // Popup HTML
            const popupHtml = `
                <div class="title">${item.name}</div>
                <div style="height:2px; background:#2A81CB; margin:4px 0 6px 0; border-radius:2px;"></div>
                <table>
                    <tr><th>Hívójel</th><td>${item.callsign}</td></tr>
                    <tr><th>Lokátor</th><td>${item.locator}</td></tr>
                    ${item.website ? `<tr><th>Web</th><td><a href="${item.website}" target="_blank">${item.website}</a></td></tr>` : ""}
                    ${item.facebook ? `<tr><th>Facebook</th><td><a href="${item.facebook}" target="_blank">${item.facebook}</a></td></tr>` : ""}
                    ${item.qrz ? `<tr><th>QRZ</th><td><a href="${item.qrz}" target="_blank">${item.qrz}</a></td></tr>` : ""}
                    ${item.notes ? `<tr><th>Megjegyzés</th><td>${item.notes}</td></tr>` : ""}
                </table>
            `;

            // Marker
            L.marker([coords.lat, coords.lon], { icon: clubIcon })
                .addTo(map)
                .bindPopup(popupHtml);
        });
    });
