import axios from 'axios';

export async function getDistance(oLat, oLong, dLat, dLong) {
    const origin = `${oLat},${oLong}`;
    const destination = `${dLat},${dLong}`;
    const modes = "foot,car";
    const units = "imperial";
    const apiKey = "prj_live_pk_c1ab83e2ccb33fb19cfc825945296336a651239f"; // Use your publishable key here

    const apiUrl = `https://api.radar.io/v1/route/distance?origin=${origin}&destination=${destination}&modes=${modes}&units=${units}`;
    const headers = {
        "Authorization": apiKey,
    };

    try {
        const response = await axios.get(apiUrl, { headers });
        console.log(response.data); // Assuming you want to log the response data
        return response.data;
    } catch (error) {
        console.error("Error fetching distance:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
}
