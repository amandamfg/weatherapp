let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
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

function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currently").innerHTML = Math.round(
    response.data.main.temperature
  );
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
let form = document.querySelector("#search-form");
form.addEventListener("submit", showSearch);
