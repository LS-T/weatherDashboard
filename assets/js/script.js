// DOM variables
var searchBtn = $("#Search");
var citySearch = $(".searchCity")
var cityName = $(".cityName");
var temperature = $("#temp");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var UvIndex = $("#uv");
var fiveDayForecast = $(".fiveDayForecast");

var date = moment().format("MM[/] DD[/] YYYY");
console.log(date);


var apiKey = "1ebd3e88b4147deeadc030e6248c294d";




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

                
                
                
                 
        

                
            })
}





searchBtn.on("click", function(){
    var searchCity = citySearch.val();
    console.log(searchCity);

    getApi(searchCity);

    
})


// var template = `
// <div class="card mx-2" style="width: 15rem;">
//         <div class="card-body">
//           <h5 class="card-title">${data.name}</h5>
//           <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//           <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//           <a href="#" class="card-link">Card link</a>
//           <a href="#" class="card-link">Another link</a>
//         </div>
//       </div>
// `
// document.querySelector(".fiveDayForecast").innerHTML += template