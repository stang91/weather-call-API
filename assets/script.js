//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
//https://openweathermap.org/api/one-call-api

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

let lat;
let lon;
let exclude;
let city=$('#city').val();
let state=$('#state-Code').val();
let keyAPI='cda125b32a94084e8ae8c5922b57599d';
let requestWeatherURL='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+keyAPI+'&units=imperial';
let submitBtn=$('#submit');

function createCurrentForecast(){
    
}

function createFutureForecast(){

}

function createPreviousSearchBtn(){

}

submitBtn.click(function(){ 
    let city=$('#city').val();
    let state=$('#state-Code').val();
    let requestLonLatURL='http://api.openweathermap.org/geo/1.0/direct?q='+city+','+state+',US&appid='+keyAPI;
    fetch(requestLonLatURL, {
        method: 'GET' //GET is the default.
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lon=data.lon;
            lat=data.lat;
        });
    // fetch(requestWeatherURL, {
    //     method: 'GET', //GET is the default.
    //     })
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data1) {
    //         console.log(data1);
    //         localStorage.setItem(city,JSON.stringify(data));
    //     });
});