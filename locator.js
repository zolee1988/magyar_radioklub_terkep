function locatorToLatLng(locator) {
    locator = locator.trim().toUpperCase();

    const A = 'A'.charCodeAt(0);
    const a = 'A'.charCodeAt(0);
    const zero = '0'.charCodeAt(0);

    const lon = (locator.charCodeAt(0) - A) * 20 +
                (locator.charCodeAt(2) - zero) * 2 +
                (locator.charCodeAt(4) - a) / 12 - 180;

    const lat = (locator.charCodeAt(1) - A) * 10 +
                (locator.charCodeAt(3) - zero) +
                (locator.charCodeAt(5) - a) / 24 - 90;

    // cella közepére igazítás
    return {
        lat: lat + 1 / 24,
        lng: lon + 1 / 12
    };
}
