let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();
let year = now.getFullYear();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let currentTime = document.querySelector("#current-time");
let morning = "am";
let evening = "pm";
if (hours < 12) {
  currentTime.innerHTML = `${hours}:${minutes} ${morning}`;
} else {
  currentTime.innerHTML = `${hours}:${minutes} ${evening}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${date} ${month} ${year}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                  <div class="col-2">
                  <div class = "weather-forecast-date">
                    ${formatDay(forecastDay.dt)} </div> 
                   
                    <img src = " http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" width = "42"/>
                    
                    <span class = "weather-forecast-max"> ${Math.round(
                      forecastDay.temp.max
                    )}°</span>;
                    <span class = "weather-forecast-min"> ${Math.round(
                      forecastDay.temp.min
                    )}°</span> 
                    
                  </div>
                 `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f3406c924baa256ef0f9e571be414af2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperatureElement = (document.querySelector(
    "#current-temperature"
  ).innerHTML = Math.round(response.data.main.temp));
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  let celsiusTemperature = response.data.main.temp;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}

function showSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");

  if (searchInput.value.length > 0) {
    let units = "metric";
    let apiKey = "f3406c924baa256ef0f9e571be414af2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
    let place = document.querySelector("#city");
    place.innerHTML = `${searchInput.value}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
  } else {
    alert("Try again");
  }
}

function displayFTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitConvert = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitConvert);
}

function displayCTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", showSearch);

let fahrenheitLink = document.querySelector("#convert-fahrenheit");
fahrenheitLink.addEventListener("click", displayFTemperature);

let celsiusLink = document.querySelector("#convert-celsius");
celsiusLink.addEventListener("click", displayCTemperature);
