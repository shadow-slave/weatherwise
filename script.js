// Selecting necessary DOM elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Function to fetch weather data
function fetchWeatherData(city, lat, lon) {
    const APIKey = '913413ddf34b1cb4d948473869aa8a08';
    let apiUrl;
    if (city) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent === city) {
                return;
            } else {
                cityHide.textContent = city || json.name;

                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        document.body.style.background = "url('images/clear-bg.gif')";
                        container.style.background = "rgba(255, 255, 255, .1)";
                        break;

                    case 'Rain':
                        image.src = 'images/rain.png';
                        document.body.style.background = "url('images/rainbg.jpg')";
                        container.style.background = "rgba(255, 255, 255, .1)";
                        break;

                    case 'Snow':
                        image.src = 'images/snow.png';
                        document.body.style.background = "url('images/snowbg.jpg')";
                        container.style.background = "rgb(37 58 70 / 36%)";
                        break;

                    case 'Clouds':
                        image.src = 'images/cloud.png';
                        document.body.style.background = "url('images/cloudybg.jpg')";
                        container.style.background = "rgba(53, 63, 67, 0.23)";
                        break;

                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.png';
                        document.body.style.background = "url('images/mistbg.jpg')";
                        container.style.background = "rgba(53, 63, 67, 0.23)"
                        break;

                    default:
                        image.src = 'images/cloud.png';
                        container.style.background = "rgba(53, 63, 67, 0.23)";
                }

                console.log('Weather:', json.weather[0].main);
                console.log('Container background set:', container.style.background);

                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                // Clone and animate weather information
                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneInfoWeather = infoWeather.cloneNode(true);
                const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                const elCloneInfoWind = infoWind.cloneNode(true);

                elCloneInfoWeather.id = 'clone-info-weather';
                elCloneInfoWeather.classList.add('active-clone');

                elCloneInfoHumidity.id = 'clone-info-humidity';
                elCloneInfoHumidity.classList.add('active-clone');

                elCloneInfoWind.id = 'clone-info-wind';
                elCloneInfoWind.classList.add('active-clone');

                // Remove any previous clones and insert new clones
                setTimeout(() => {
                    document.querySelectorAll('#clone-info-weather, #clone-info-humidity, #clone-info-wind').forEach(el => el.remove());

                    infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                }, 2200);

                // Hide original elements
                infoWeather.style.visibility = 'hidden';
                infoHumidity.style.visibility = 'hidden';
                infoWind.style.visibility = 'hidden';

                // Ensure clones are visible
                elCloneInfoWeather.style.visibility = 'visible';
                elCloneInfoHumidity.style.visibility = 'visible';
                elCloneInfoWind.style.visibility = 'visible';
            }
        });
}

// Function to get current location and fetch weather data
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(null, lat, lon);
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Fetch weather for current location on page load
window.addEventListener('load', getCurrentLocationWeather);

// Event listener for the search button click
search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;
    if (city === '') return;
    fetchWeatherData(city);
});