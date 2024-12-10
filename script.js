const searchButton = document.querySelector('.sea');
const searchInput = document.querySelector('.enter');
const weatherIcon = document.querySelector('.weathercond');
const degreeText = document.querySelector('.degree');
const countryText = document.querySelector('.country');
const humidityText = document.querySelector('.winspeed:nth-child(1) .humiditynum');
const windSpeedText = document.querySelector('.winspeed:nth-child(2) .humiditynum');

// Function to fetch weather data from OpenWeatherMap API
async function getWeather(city) {
    const apiKey = '04ded6e36f1b46f18a4bec4bc65cd62c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        // Update the weather app with fetched data
        updateWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update the UI with weather data
function updateWeather(data) {
    const { name, sys, main, wind, weather } = data;

    // Update UI elements
    degreeText.textContent = `${Math.round(main.temp)}°c`;
    countryText.textContent = `${name}, ${sys.country}`;
    humidityText.textContent = `Humidity: ${main.humidity}%`;
    windSpeedText.textContent = `Wind Speed: ${wind.speed} km/h`;

    // Update weather icon based on the weather condition
    const weatherCondition = weather[0].main.toLowerCase();
    if (weatherCondition.includes('cloud')) {
        weatherIcon.src = 'cloud.png'; // Replace with your cloud icon path
    } else if (weatherCondition.includes('rain')) {
        weatherIcon.src = 'rain.png'; // Replace with your rain icon path
    } else if (weatherCondition.includes('clear')) {
        weatherIcon.src = 'sun.png'; // Replace with your sun icon path
    } else {
        weatherIcon.src = 'default.png'; // Replace with a default icon path
    }
}

// Add event listener to the search button
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city or country name');
    }
});
