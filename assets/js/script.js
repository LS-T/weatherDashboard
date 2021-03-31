// Global DOM variables
var searchBtn = $("#Search");
var citySearch = $(".searchCity");
var wipeScreen = $(".container-fluid");
var fiveDayHeader = $("#fiveDayHeader");
var fiveDayForecast = $(".fiveDayForecast");
var list = $(".list-group");

// Grab todays date
var date = moment().format("MM[/] DD[/] YYYY");
console.log(date);

var apiKey = "1ebd3e88b4147deeadc030e6248c294d";


// Pull citySearch value pass it an City, pull current city data
function getApi(City) {
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    City +
    "&units=imperial&appid=" +
    apiKey;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Template literal for current day data
      currentDayTemplate = `
                <div class="card-body">
                    <h1 class="cityName"></h1>
                    <p class="temperature">Temperature:<span id="temp"></span></p>
                    <p class="humidity">Humidity:<span id="humidity"></span></p>
                    <p class="windSpeed">Wind Speed:<span id="windSpeed"></span></p>
                    <p class="UvNumber">UV index: <span id="Uv"></span></p>
                </div>`;
      document.querySelector(".current-day").innerHTML += currentDayTemplate;

      var cityName = $(".cityName");
      var temperature = $("#temp");
      var humidity = $("#humidity");
      var windSpeed = $("#windSpeed");

    // Manipulate DOM
      cityName.text(data.name + " " + "( " + date + " )");
      temperature.text(data.main.temp + " " + "°F");
      humidity.text(data.main.humidity + " " + "%");
      windSpeed.text(data.wind.speed + " " + "MPH");
    
    //   Created an object to hold lat and lon for city selected
      City = {
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
    //   Set currentCityData to local storage
      localStorage.setItem("CurrentCityData", JSON.stringify(data));
      
    //  Pass lat and lon as x and y into UvForCity function
      UvForCity(City.lat.toFixed(), City.lon.toFixed());

      console.log(City.lat);
      console.log(City.lon);
    });
}
// Function for 5 day forecast
function fiveDay(City) {
  var requestURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    City +
    "&units=imperial&appid=" +
    apiKey;

  fetch(requestURL2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Set text for header that will include 5 cards
      fiveDayHeader.text(" 5 Day Forecast");

      console.log(data.city.name);
        // Created the card template that was once hard coded
      var cardTemplate = `
                <div class="card mx-2" style="width: 15rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data.list[0].dt_txt}</h5>
                        <p class="card-text">Temperature:<span id="1temp"></span></p>
                        <br>
                        <p class="card-text">Humidity:<span id="1humid"></span></p>
                    </div>
                </div>
                `;
                var cardTemplate2 = `
                <div class="card mx-2" style="width: 15rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data.list[8].dt_txt}</h5>
                        <p class="card-text">Temperature:<span id="2temp"></span></p>
                        <br>
                        <p class="card-text">Humidity:<span id="2humid"></span></p>
                    </div>
                </div>
                `;
                var cardTemplate3 = `
                <div class="card mx-2" style="width: 15rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data.list[16].dt_txt}</h5>
                        <p class="card-text">Temperature:<span id="3temp"></span></p>
                        <br>
                        <p class="card-text">Humidity:<span id="3humid"></span></p>
                    </div>
                </div>
                `;
                var cardTemplate4 = `
                <div class="card mx-2" style="width: 15rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data.list[24].dt_txt}</h5>
                        <p class="card-text">Temperature:<span id="4temp"></span></p>
                        <br>
                        <p class="card-text">Humidity:<span id="4humid"></span></p>
                    </div>
                </div>
                `;
                var cardTemplate5 = `
                <div class="card mx-2" style="width: 15rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data.list[32].dt_txt}</h5>
                        <p class="card-text">Temperature:<span id="5temp"></span></p>
                        <br>
                        <p class="card-text">Humidity:<span id="5humid"></span></p>
                    </div>
                </div>
                `;

    // Manipulate DOM and add each cardTemplate to the fiveDayForecast div class
        document.querySelector(".fiveDayForecast").innerHTML += cardTemplate
        document.querySelector(".fiveDayForecast").innerHTML += cardTemplate2
        document.querySelector(".fiveDayForecast").innerHTML += cardTemplate3
        document.querySelector(".fiveDayForecast").innerHTML += cardTemplate4
        document.querySelector(".fiveDayForecast").innerHTML += cardTemplate5
        
        // Target each days id for temp and humidity
      $("#1temp").text(data.list[0].main.temp + " °F");
      $("#1humid").text(data.list[0].main.humidity + " %");

      $("#2temp").text(data.list[8].main.temp + " °F");
      $("#2humid").text(data.list[8].main.humidity + " %");

      $("#3temp").text(data.list[16].main.temp + " °F");
      $("#3humid").text(data.list[16].main.humidity + " %");

      $("#4temp").text(data.list[24].main.temp + " °F");
      $("#4humid").text(data.list[24].main.humidity + " %");

      $("#5temp").text(data.list[32].main.temp + " °F");
      $("#5humid").text(data.list[32].main.humidity + " %");

      //  Store data from search into local storage
      localStorage.setItem("Five-day-data", JSON.stringify(data));
    });
}

function UvForCity(x, y) {
  var UvIndex = $("#Uv");
  console.log(x);
  console.log(y);
  var requestURL3 =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    x +
    "&lon=" +
    y +
    "&appid=" +
    apiKey;

  fetch(requestURL3)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.value.toFixed());
      UvIndex.text(data.value);
    //   Set Uv-data to local storage
      localStorage.setItem("Uv-data", JSON.stringify(data));
    });
}

function lastSearched(City) {
  var listItem = $('<li>');
  listItem.addClass("list-group-item search-again ");
  listItem.text(City);
  list.append(listItem);


    // Store list item into local storage 
    localStorage.setItem("listItem",JSON.stringify(listItem));


}


searchBtn.on("click", function () {
  var searchCity = citySearch.val();
  if (!searchCity) {
    alert("Must enter a city");
  } else {
    getApi(searchCity);
    fiveDay(searchCity);
    lastSearched(searchCity);
  }
});
function init(){
    var previousCity = JSON.parse(localStorage.getItem("listItem"));
    if(previousCity !== null){
        list.append(listItem);
        

    }
    
}