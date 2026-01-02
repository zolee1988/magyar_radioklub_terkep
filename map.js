// Alap térkép
const map = L.map('map').setView([47.2, 19.5], 8);

// OpenStreetMap réteg
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// Klub ikon (egyelőre a default Leaflet ikon)
const clubIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Wiki oldal lekérése
fetch("https://wiki.ham.hu/api.php?action=parse&page=Kateg%C3%B3ria:R%C3%A1di%C3%B3klubok&prop=text&format=json&origin=*")
    .then(r => r.json())
    .then(data => {

        const html = data.parse.text["*"];

        // HTML → DOM
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // A táblázat kiválasztása
        const table = doc.querySelector("table.wikitable");
        if (!table) {
            console.error("Nem található a wikitable!");
            return;
        }

        // Fejléc kiolvasása
        const headers = [];
        table.querySelectorAll("tr:first-child th").forEach(th => {
            headers.push(th.innerText.trim());
        });

        const clubs = [];

        // Sorok feldolgozása
        table.querySelectorAll("tr").forEach((row, index) => {
            if (index === 0) return; // fejléc kihagyása

            const cells = row.querySelectorAll("td");
            if (cells.length === 0) return;

            const obj = {};

            cells.forEach((cell, i) => {
                const key = headers[i] || `oszlop_${i}`;
                obj[key] = cell.innerText.trim();

                // Ha link van a cellában, mentsük el külön
                const a = cell.querySelector("a");
                if (a) obj[key + "_link"] = a.href;
            });

            clubs.push(obj);
        });

        console.log("Betöltött klubok:", clubs.length);
        console.log(clubs);

        // Marker generálás
        clubs.forEach(club => {

            const locator = club["QTH"];
            if (!locator) return;

            const coords = locatorToLatLon(locator);
            if (!coords) return;

            // Popup HTML dinamikusan, minden mezővel
            let rows = "";

            Object.keys(club).forEach(key => {
                const value = club[key];

                // Üres mezők kihagyása
                if (!value || value.trim() === "") return;

                // "Név" mezőt kihagyjuk (már a fejlécben van)
                if (key === "Név") return;

                // Hívójel → QRZ link
                if (key === "Hívójel") {
                    const callsign = value;
                    const qrzUrl = `https://www.qrz.com/db/${callsign}`;
                    rows += `<tr><th>${key}</th><td><a href="${qrzUrl}" target="_blank">${callsign}</a></td></tr>`;
                    return;
                }

                // Link mezők külön kezelése → a cella szövegét jelenítjük meg, nem az URL-t
                if (key.endsWith("_link")) {
                    const baseKey = key.replace("_link", "");
                    const textValue = club[baseKey] || baseKey; // ha nincs szöveg, fallback
                    rows += `<tr><th>${baseKey}</th><td><a href="${value}" target="_blank">${textValue}</a></td></tr>`;
                    return;
                }

                // A sima "Link" mezőt kihagyjuk, ha van hozzá "_link"
                if (key === "Link" && club["Link_link"]) return;

                // Normál mezők
                rows += `<tr><th>${key}</th><td>${value}</td></tr>`;
            });

            const popupHtml = `
                <div class="title">${club["Név"] || "Ismeretlen klub"}</div>
                <div style="height:2px; background:#2A81CB; margin:4px 0 6px 0; border-radius:2px;"></div>
                <table>${rows}</table>
            `;

            L.marker([coords.lat, coords.lon], { icon: clubIcon })
                .addTo(map)
                .bindPopup(popupHtml);
        });
    });
