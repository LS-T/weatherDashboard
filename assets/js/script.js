// DOM variables
var searchBtn = $("#Search");
var citySearch = $(".searchCity")
var cityName = $(".cityName");
var temperature = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var UvIndex = $("#uv");


var searchCity = citySearch.val();
console.log(searchCity);

var apiKey = "1ebd3e88b4147deeadc030e6248c294d";
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=" + apiKey;



function getApi(){
    fetch(requestURL)
        .then(function(response){
            return response.json();
        })
            .then(function(data){
                console.log(data);
                console.log(data.main.temp);
                console.log(data.main.humidity);
                console.log(data.wind.speed);

            })
}






searchBtn.on("click", function(){
    

    getApi();

    
})

