const api = {
    key: "08b5d6f804564fb8619e7b87de554153",
    base: "https://api.openweathermap.org/data/2.5/",
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    // keyCode of 'enter' button is 13
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        // resolve(value)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateFormatter(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&#176;c`;
    
    let weatherCondition = document.querySelector('.weather');
    weatherCondition.innerText = weather.weather[0].description;

    let high = document.querySelector('.high');
    high.innerHTML = `${weather.main.temp_max.toFixed(1)}&#176;c`;

    let low = document.querySelector('.low');
    low.innerHTML = `${weather.main.temp_min.toFixed(1)}&#176;c`;
}

function dateFormatter(d) {
    return d.toLocaleString('en-US', {
        weekday: 'short', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
        second: 'numeric', // numeric, 2-digit
    });
}