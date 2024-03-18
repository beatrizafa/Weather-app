function refreshWeather(response) {
  console.log(response.data.temperature.current);
  //console.log(apiUrl)//
  let temperatureElement = document.querySelector("#current-temperature-value");
  let currentTemperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(currentTemperature);
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Barcelona");
