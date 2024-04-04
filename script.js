//We intialize the map first and sets its initial view to the US
var map = L.map('map').setView([37.8, -96], 4);

//We intialize the pin marker for our location selection
var marker;

//We initialize our music player to the HTML element musicPlayer
var musicPlayer = document.getElementById('musicPlayer');

//Tile setup for Leaflet
//Leaflet uses this url to fetch map tiles
//X, Y, and Z are place holders for coom level and tile coordinates
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//Adds a click event for whenever the user clicks on map
map.on('click', function(e) {
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(e.latlng).addTo(map);

    //Fetch weather data from OpenWeatherMap API
    //Code on how to make an API call to Weather data
    //Latitude and longitude coordinaed from click event
    var apiKey = '63b38e13bf8545fa47c4edb8c538e14f';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid=' + apiKey;


    //API call using fetch
    fetch(apiUrl)
        //Checks to see if API call was successful
        .then(response => response.json())

        //Parses the data into this object
        .then(data => {

            //Display current weather information based on API document
            var weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <h2>Current Weather</h2>
                <p>Location: ${data.name}</p>
                <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
                <p>Weather: ${data.weather[0].main}</p>
            `;

            // Play music based on weather condition
            playMusic(data.weather[0].main);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

// Function to play music based on weather condition
function playMusic(weatherCondition) {
    var song;

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            song = 'music/clear.mp3';
            break;
        case 'clouds':
            song = 'music/clouds.mp3';
            break;
        case 'rain':
            song = 'music/rain.mp3';
            break;
        
    }

    // Set the source of the audio element to the selected song and play it
    musicPlayer.src = song;
    musicPlayer.play();
}
