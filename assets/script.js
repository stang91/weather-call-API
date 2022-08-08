// need to figure out how to hide API keys; dotenv???
//.gitignore??
var keyAPI='cda125b32a94084e8ae8c5922b57599d';
var submitBtn=$('#submit');
var CurrentWeatherCityTitle= $('.selectedCityAndDate');
var city=$('#city').val();//add toLowerCase() to eliminate error when searched with uppercase
var state=$('#state-Code').val();


function createFutureForecast(){

//forecast block
//use nth child 8n+4 to get 
//noon weather forecast

//future Date title

}

function createPreviousSearchBtn(){
    $('.previousSearchedCity').append($("<li></li>").addClass(city+'SearchBtn').val())=city;
    $('.'+city+'SearchBtn').click(function(){

    });
}

submitBtn.click(function(event){
    event.preventDefault();
    let city1=$('#city').val().toLowerCase();//add toLowerCase() to eliminate error when searched with uppercase
    let state1=$('#state-Code').val().toLowerCase();
    let requestLonLatURL='http://api.openweathermap.org/geo/1.0/direct?q='+city1+','+state1+',US&appid='+keyAPI;
    fetch(requestLonLatURL, {
        method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        localStorage.setItem(city1,JSON.stringify(data));
    });

    createPreviousSearchBtn();

    const lon=JSON.parse(localStorage.getItem(city1))[0].lon;
    const lat=JSON.parse(localStorage.getItem(city1))[0].lat;
    
    let requestCurrentWeatherURL='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+keyAPI+'&units=imperial';
    fetch(requestCurrentWeatherURL, {
        method: 'GET',
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data1) {
        localStorage.setItem(city1+'1',JSON.stringify(data1));
    });
//title, date and icon
    let weatherCurrentIcon=JSON.parse(localStorage.getItem(city1)).weather[0].icon;
    let iconURL = "http://openweathermap.org/img/w/"+weatherCurrentIcon+".png";
    CurrentWeatherCityTitle.after($('<i></i>',{src:iconURL}));
    $('.selectedCityAndDate').val()=city1+' ('+moment().format('L');
   
//weather discription
    let weatherCurrentDiscription=JSON.parse(localStorage.getItem(city1)).weather[0].description;
   
   
//weather list
    let weatherCurrentMain=JSON.parse(localStorage.getItem(city1)).main;//object
    
    
       let requestForecastWeatherURL='http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+keyAPI+'&units=imperial';
    fetch(requestForecastWeatherURL, {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (data2) {
        localStorage.setItem(city1+'2',JSON.stringify(data2));
    
    });

});
