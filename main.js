/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const api = {
  key: "08b5d6f804564fb8619e7b87de554153",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

const checkbox = document.getElementById('toggle');
if(checkbox){
  checkbox.addEventListener('change', function() {
      const videoEl = document.getElementById('videoEl');
      const titleEl = document.getElementById('titleEl');

      if (this.checked) {
          titleEl.style.color= 'silver';
          document.getElementById('title').style.opacity= 1;
          videoEl.setAttribute('src', 'assets/mp4/space.mp4');
      }
      if (!(this.checked)) {
          titleEl.style.color= 'white';
          videoEl.setAttribute('src', 'assets/mp4/mountain.mp4');
      }
  });
    
}

function setQuery(evt) {
  // keyCode of 'enter' button is 13
  if (evt.keyCode === 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    // resolve(value)
    .then((weather) => weather.json())
    .then(displayResults);
}

function displayResults(weather) {

  // debugging purposes

  console.log(weather);

  const city = document.querySelector(".city");
  const now = new Date();
  const date = document.querySelector(".date");
  const temp = document.querySelector(".temp");
  const feelsLike = document.querySelector(".feels-like");
  const weatherCondition = document.querySelector(".weather");
  const high = document.querySelector(".high-low");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind-velocity");
  
  if (weather.message === "city not found") {
      console.log("City Not Found");
  
      // Error Displays
  
      city.innerText = `City Not Found...`;
      date.innerText = '</>';
      temp.innerHTML = `--&#176;c`;
      feelsLike.innerHTML = `--&#176;c`;
      weatherCondition.innerText = `none`;
      high.innerHTML = `--/--`;
      humidity.innerText = `--%`;
      wind.innerHTML = `--m/s X`;
    
  } else {

      // Locations
  
      city.innerHTML = `${weather.name}, ${weather.sys.country} <span>${getFlagEmoji(weather.sys.country)}</span>`;
  
      // Date (formated)
  
      date.innerText = dateFormatter(now);
  
      // Temperature
  
      temp.innerHTML = `${Math.round(weather.main.temp)}&#176;c`;
  
      // Temperature Feels Like
  
      feelsLike.innerHTML = `${Math.round(weather.main.feels_like)}&#176;c`;
  
      // Weather Condition
  
      weatherCondition.innerText = weather.weather[0].description;
  
      // Weather Condition Icon
  
      // const weatherParent = document.querySelector(".weather-box");
      // const weatherImgTag = document.querySelector(".weather-icon");
      // const attributes = {
      //     src: getIconUrl(weather.weather[0].icon),
      //     alt: "weather icon",
      // };
      // setMultipleAttr(weatherImgTag, attributes);
      // weatherParent.append(weatherImgTag);
  
      // Daily Temperature High/Low
  
      high.innerHTML = `${Math.round(weather.main.temp_max)}&#176;/${Math.round(weather.main.temp_min)}&#176;`;
  
      // Humidity %
  
      humidity.innerText = `${weather.main.humidity}%`;
  
      // Wind Velocity
  
      const windDirection = degToCompass(weather.wind.deg);
      wind.innerHTML = `${weather.wind.speed}m/s ${windDirection}`;
  }
}

function dateFormatter(d) {
  return d.toLocaleString("en-US", {
      // comment out whichever values to skip over in the date format
      weekday: "short",
      day: "numeric",
      year: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric", 
      // second: 'numeric',   
  });
}

function degToCompass(deg) {
  const num = parseInt(deg / 22.5 + 0.5, 10);
  const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
  ];
  return directions[num % 16];
}

function getIconUrl(iconCode) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function setMultipleAttr(el, attrs) {
  const keys = Object.keys(attrs);
  const values = Object.values(attrs);
  for (let i = 0; i < keys.length; i += 1) {
      el.setAttribute(keys[i], values[i]);
  }
}

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}
