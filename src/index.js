function refreshWeather(response) {
  console.log(response.data.temperature.current);
  //console.log(apiUrl)//
  let temperatureElement = document.querySelector("#current-temperature-value");
  let currentTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#current-description");
  let windElement = document.querySelector("#current-wind");
  let humidityElement = document.querySelector("#current-humidity");
  let timeElement = document.querySelector("#current-date");
  let date = new Date();
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(currentTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = ` <img src= "${response.data.condition.icon_url}" class="current-temperature-icon"/>`;
  getForcast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  console.log(day);
  let hours = date.getHours();
  console.log(hours);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0{minutes}`;
  }
  return `${day} ${hours}:${minutes},`;
}

function searchCity(city) {
  // make api call and update the interface//
  let apiKey = "a017cf6758e1482b564bdt6545doc30a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  // move this to response to correct the name
  //let cityElement = document.querySelector("#city");//
  //cityElement.innerHTML = searchInput.value;//
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  //new date is the date of today//
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fr", "Sat"];

  return days[date.getDay()];
}
function getForcast(city) {
  let apiKey = "a017cf6758e1482b564bdt6545doc30a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  //variable empty, where we want to put all forecast html to have injected eventually//
  let forecastHtml = "";

  //index defines what is going to be displayed from the array//
  response.data.daily.forEach(function (weekday, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="forecast-day">
    <div class="weather-forecast-date">${formatDay(weekday.time)}</div>
    <img
      src="${weekday.condition.icon_url}" class="weather-forecast-icon
    />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-max-temperature">${Math.round(
        weekday.temperature.maximum
      )}º</span>
      <span class="weather-forecast-min-temperature">${Math.round(
        weekday.temperature.minimum
      )}º</span>
    </div>
  </div>
`;
    }
  });

  //once loop is over, adds the following information//
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Barcelona");
//to display something by default//
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
//new function to get forecast for a city//
