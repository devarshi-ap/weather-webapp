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

    // debugging purposes

    console.log(weather);

    // Locations

    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // Date (formated)

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateFormatter(now);

    // Temperature

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&#176;c`;

    // Temperature Feels Like

    let feelsLike = document.querySelector('.feels-like');
    feelsLike.innerHTML = `${Math.round(weather.main.feels_like)}&#176;c`;
    
    // Weather Condition

    let weatherCondition = document.querySelector('.weather');
    weatherCondition.innerText = weather.weather[0].description;

    // Weather Condition Icon

    let weatherParent = document.querySelector('.weather-box');
    let weatherImgTag = document.querySelector('.weather-icon');
    let attributes = {
        'src': getIconUrl(weather.weather[0].icon),
        'alt': 'weather icon'
    }
    setMultipleAttr(weatherImgTag, attributes);
    weatherParent.append(weatherImgTag);

    // Daily Temperature High/Low

    let high = document.querySelector('.high-low');
    high.innerHTML = `${Math.round(weather.main.temp_max)}&#176;/${Math.round(weather.main.temp_min)}&#176;`;

    // Humidity %

    let humidity = document.querySelector('.humidity');
    humidity.innerText = `${weather.main.humidity}%`;

    // Wind Velocity

    let wind = document.querySelector('.wind-velocity');
    let windDirection = degToCompass(weather.wind.deg)
    wind.innerHTML = `${weather.wind.speed}m/s ${windDirection}`;
}

function dateFormatter(d) {
    return d.toLocaleString('en-US', {
        // comment out whichever values to skip over in the date format
        weekday: 'short',       // long, short, narrow
        day: 'numeric',         // numeric, 2-digit
        year: 'numeric',        // numeric, 2-digit
        month: 'long',          // numeric, 2-digit, long, short, narrow
        hour: 'numeric',        // numeric, 2-digit
        minute: 'numeric',      // numeric, 2-digit
        // second: 'numeric',   // numeric, 2-digit
    });
}

function degToCompass(deg) {
    var num = parseInt((deg/22.5) + 0.5);
    var directions = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ];
    return directions[(num%16)];
}

function getIconUrl(iconCode) {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function setMultipleAttr(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}