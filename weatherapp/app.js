async function getWeather() {
    const city = document.getElementById('cityInput').value;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        // Fetch latitude and longitude for the city
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            document.getElementById('weatherDisplay').innerHTML = `<p>City not found. Please try another one.</p>`;
            return;
        }

        const { latitude, longitude } = geoData.results[0];

        // Fetch weather data for the coordinates
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const temperature = weatherData.current_weather.temperature;
        const windSpeed = weatherData.current_weather.windspeed;

        document.getElementById('weatherDisplay').innerHTML = `
            <h2>${city}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Wind Speed: ${windSpeed} km/h</p>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('weatherDisplay').innerHTML = `<p>There was an error fetching the weather data. Please try again later.</p>`;
    }
}
