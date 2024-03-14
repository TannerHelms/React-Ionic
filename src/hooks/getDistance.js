import Radar from 'radar-sdk-js';

export async function getDistance(oLat, oLong, dLat, dLong) {
    const distance = await Radar.distance({
        origin: {
            latitude: oLat,
            longitude: oLong
        },
        destination: {
            latitude: dLat,
            longitude: dLong
        },
        modes: [
            'car'
        ],
        units: 'imperial'
    });

    if (distance.routes) {
        const { geodesic, car } = distance.routes;
        if (car.distance?.text) {
            return { value: car.distance.value, text: car.distance.text }
        } else {
            return { value: geodesic.distance.value, text: geodesic.distance.text }
        }
    } else {
        return result.message
    }
}
