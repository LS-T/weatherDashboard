// DOM variables
var searchBtn = $("#Search");
var citySearch = $(".searchCity")
var cityName = $(".cityName");
var temperature = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var UvIndex = $("#uv");
var fiveDayHeader = $("#fiveDayHeader");
var fiveDayForecast = $(".fiveDayForecast");

// Grab todays date
var date = moment().format("MM[/] DD[/] YYYY");
console.log(date);


var apiKey = "1ebd3e88b4147deeadc030e6248c294d";

var index = [0,1,2,3,4];








function getApi(City){
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&units=imperial&appid=" + apiKey;
    fetch(requestURL)
        .then(function(response){
            return response.json();
        })
            .then(function(data){
                console.log(data);
                console.log(data.main.temp);
                console.log(data.main.humidity);
                console.log(data.wind.speed);
                cityName.text(data.name + " " + date + data.weather.id);
                temperature.text(data.main.temp + " "+ "°F");
                humidity.text(data.main.humidity + " " + "%");
                windSpeed.text(data.wind.speed + " " + "MPH");

                // Set text for header that will include 5 cards
                fiveDayHeader.text(" 5 Day Forecast");

                // Created the card template that was once hard coded
                var cardTemplate = `
                <div class="card mx-2" style="width: 15rem;">
                        <div class="card-body">
                          <h5 class="card-title">${data.name}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <a href="#" class="card-link">Card link</a>
                          <a href="#" class="card-link">Another link</a>
                        </div>
                      </div>
                `
                
                for (var i = 0; i < index.length; i++){
                    

                    // grab class fiveDayForecast and set innerHTML to cardTemplate
                    document.querySelector(".fiveDayForecast").innerHTML += cardTemplate;







                    
                }
                 
        

                
            })
}





searchBtn.on("click", function(){
    var searchCity = citySearch.val();
    console.log(searchCity);

    getApi(searchCity);

    
})


