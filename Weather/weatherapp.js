

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');



 async function checkWeather(city) {
    const api_key ="b9d586d6652411e97a08fc04d2d91b32";
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response=> response.json());

    temperature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;

    description.innerHTML = `${weather_data.weather[0].description}`;
   

    humidity.innerHTML = `${weather_data.main.humidity}%`;

    wind_speed.innerHTML=`${weather_data.wind.speed}Km/h`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/picture/clouds1.jpg";
            break;
        case 'rain':
            weather_img.src = "/picture/rain.jpg";
        
        break;
        case 'snow':
            weather_img.src = "/picture/snow.jpg";
        break;
        case 'Clear Sky':
            weather_img.src = "/picture/sun.jpg";
        break;
        
        case 'Mist':
            weather_img.src = "/picture/mist.jpg";
        break;
        
        case 'Fog':
            weather_img.src = "/picture/mist.jpg";
        break;
        

    }


     console.log(weather_data);

}
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
    });