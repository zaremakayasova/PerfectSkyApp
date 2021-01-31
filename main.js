const api = {
    key: "a8c7ea489156be98979f21effb8fc576",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector(".search-box");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temperature = document.querySelector(".temp");
const weather_el = document.querySelector(".weather");
const hiLow = document.querySelector(".hi-low");

searchbox.addEventListener('keypress', (evt) => {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
});

const getResults = async (query) => {
    try {
        const res = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
        const data = await res.json();
        displayWeather(data);
    }
    catch (e) {
        return "No data available";
    }
}

const displayWeather = (weather) => {
    
    city.textContent = `${weather.name}, ${weather.sys.country}`;

    const now = new Date();
    date.innerText = dateBuilder(now);

    temperature.innerHTML = `${Math.round(weather.main.temp)} <span>°c</span>`;

    weather_el.innerText = weather.weather[0].main;

    hiLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
