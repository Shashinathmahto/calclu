

// const inputBox = document.querySelector('.input-box');
// const searchBtn = document.getElementById('searchBtn');
// const weather_img = document.querySelector('.weather-img');
// const temperature = document.querySelector('.temperature');
// const description = document.querySelector('.description');
// const humidity = document.getElementById('humidity');
// const wind_speed = document.getElementById('wind-speed');



//  async function checkWeather(city) {
//     const api_key ="b9d586d6652411e97a08fc04d2d91b32";
//     const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

//     const weather_data = await fetch(`${url}`).then(response=> response.json());

//     temperature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;

//     description.innerHTML = `${weather_data.weather[0].description}`;
   

//     humidity.innerHTML = `${weather_data.main.humidity}%`;

//     wind_speed.innerHTML=`${weather_data.wind.speed}Km/h`;

//     switch(weather_data.weather[0].main){
//         case 'Clouds':
//             weather_img.src = "/picture/clouds1.jpg";
//             break;
//         case 'rain':
//             weather_img.src = "/picture/rain.jpg";
        
//         break;
//         case 'snow':
//             weather_img.src = "/picture/snow.jpg";
//         break;
//         case 'Clear Sky':
//             weather_img.src = "/picture/sun.jpg";
//         break;
        
//         case 'Mist':
//             weather_img.src = "/picture/mist.jpg";
//         break;
        
//         case 'Fog':
//             weather_img.src = "/picture/mist.jpg";
//         break;
        

//     }


//      console.log(weather_data);

// }
// searchBtn.addEventListener('click', () => {
//     checkWeather(inputBox.value);
//     });



const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

// Get latitude & longitude from city name (FREE)
async function getCoordinates(city) {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const response = await fetch(geoURL);
    const data = await response.json();

    if (!data.results) {
        alert("City not found");
        return null;
    }

    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude
    };
}

// Get weather data (FREE, NO API KEY)
async function checkWeather(city) {
    const coords = await getCoordinates(city);
    if (!coords) return;

    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&hourly=relative_humidity_2m`;

    const response = await fetch(weatherURL);
    const weather_data = await response.json();

    temperature.innerHTML = `${weather_data.current_weather.temperature}°C`;
    wind_speed.innerHTML = `${weather_data.current_weather.windspeed} Km/h`;
    humidity.innerHTML = `${weather_data.hourly.relative_humidity_2m[0]}%`;

    // Weather description & image
    const code = weather_data.current_weather.weathercode;

    if (code === 0) {
        description.innerHTML = "Clear Sky";
        weather_img.src = "/picture/sun.jpg";
    } 
    else if (code <= 3) {
        description.innerHTML = "Cloudy";
        weather_img.src = "/picture/clouds1.jpg";
    } 
    else if (code >= 51 && code <= 67) {
        description.innerHTML = "Rain";
        weather_img.src = "/picture/rain.jpg";
    } 
    else if (code >= 71 && code <= 77) {
        description.innerHTML = "Snow";
        weather_img.src = "/picture/snow.jpg";
    } 
    else {
        description.innerHTML = "Mist";
        weather_img.src = "/picture/mist.jpg";
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value.trim());
});

