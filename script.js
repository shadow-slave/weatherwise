// Selecting necessary DOM elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Event listener for the search button click
search.addEventListener('click', () => {
    // OpenWeatherMap API key
    const APIKey = '913413ddf34b1cb4d948473869aa8a08';
    // Get the city name from the input field
    const city = document.querySelector('.search-box input').value;

    // Check if the city input is empty, if so, return
    if (city === '') return;

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // Handle case where city is not found (404 error)
            if (json.cod === '404') {
                // Display the city name in the error message
                cityHide.textContent = city;
                // Adjust container height and show error message
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            // Select elements for displaying weather information
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Check if the weather for the city has already been displayed
            if (cityHide.textContent === city) {
                return;
            } else {
                // Update city name and display weather information
                cityHide.textContent = city;

                // Adjust container height and show weather elements
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');

                // Automatically hide weather information after 2.5 seconds
                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                // Set weather image and background based on weather condition
                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        document.body.style.background = "url('images/clearbg.jpeg')";
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

                // Debugging console logs
                console.log('Weather:', json.weather[0].main);
                console.log('Container background set:', container.style.background);

                // Set background styles
                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";

                // Update weather information in UI
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
                    infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                    infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                }, 2200);

                // Hide original wind details
                infoWind.style.visibility = 'hidden';
                infoHumidity.style.visibility = 'hidden'
                // Remove clones if they exist
                const CloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                const CloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const CloneInfoWind = document.querySelectorAll('.info-wind.active-clone');

                if (CloneInfoWeather.length > 0) {
                    CloneInfoWeather.forEach(el => el.remove());
                }
                if (CloneInfoHumidity.length > 0) {
                    CloneInfoHumidity.forEach(el => el.remove());
                }
                if (CloneInfoWind.length > 0) {
                    CloneInfoWind.forEach(el => el.remove());
                }
            }

            
        });
});
