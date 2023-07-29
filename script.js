const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const city_name = document.getElementById('city-name');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    // const api_key = "4cd0eee81294c867b4bc4cfc64e998c5";
    const api_key = "cfb05256989e5a8534d0f180d3029132";
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
    city_name.innerHTML = `Welcome to ${city}`


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/assets/cloud.svg";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.svg";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.svg";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.svg";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.svg";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});