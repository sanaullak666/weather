function getWeather() {

    let city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    // First get latitude and longitude of the city
    fetch("https://geocoding-api.open-meteo.com/v1/search?name="
        + encodeURIComponent(city) + "&count=1&language=en&format=json")

        .then(response => response.json())

        .then(locationData => {

            if (!locationData.results) {
                throw new Error("City not found");
            }

            let location = locationData.results[0];

            let latitude = location.latitude;
            let longitude = location.longitude;

            // Fetch weather using latitude and longitude
            return fetch(
                "https://api.open-meteo.com/v1/forecast" +
                "?latitude=" + latitude +
                "&longitude=" + longitude +
                "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
                "&timezone=auto"
            );
        })

        .then(response => response.json())

        .then(data => {

            let weather = data.current;

            document.getElementById("result").innerHTML =

                "<h3>Weather Information</h3>" +

                "<p>🌡 Temperature: "
                + weather.temperature_2m + " °C</p>" +

                "<p>💧 Humidity: "
                + weather.relative_humidity_2m + "%</p>" +

                "<p>💨 Wind Speed: "
                + weather.wind_speed_10m + " km/h</p>" +

                "<p>☁ Weather Code: "
                + weather.weather_code + "</p>";
        })

        .catch(error => {

            document.getElementById("result").innerHTML =
                "<p style='color:red'>"
                + error.message +
                "</p>";
        });
}