// need to figure out how to hide API keys; dotenv???
//.gitignore??
var keyAPI='cda125b32a94084e8ae8c5922b57599d';
var submitBtn=$('#submit');
var CurrentWeatherCityTitle= $('.selectedCityAndDate');

var localStorageKeyArr=[];

for (var i=0; i<localStorage.length; i++){
    $('.previousSearchedCity').append($("<li>"+localStorage.key(i)+"</li>").addClass(localStorage.key(i)+' SearchBtn'));
}

submitBtn.click(function(event){
    event.preventDefault();
    let city=$('#city').val().toLowerCase().trim();//add toLowerCase() to eliminate error when searched with uppercase
    let state=$('#state-Code').val().toLowerCase().trim();
    let requestLonLatURL='http://api.openweathermap.org/geo/1.0/direct?q='+city+','+state+',US&appid='+keyAPI;
    if (city!=null){
        fetch(requestLonLatURL, {
            method: 'GET'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem(city,JSON.stringify(data));

            var {lon, lat} = JSON.parse(localStorage.getItem(city))[0];

        //some logic to prevent button to create copies of class
            //create preivous search button

            //window.onload?/document.ready?
            let requestCurrentWeatherURL='http://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,hourly&appid='+keyAPI+'&units=imperial';
            fetch(requestCurrentWeatherURL, {
                method: 'GET',
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                localStorage.setItem(city,JSON.stringify(data));
            
            //alert?


            //current forecast
                //title, date and icon
                let weatherCurrentIcon=JSON.parse(localStorage.getItem(city)).current.weather[0].icon;
                let iconURL = "http://openweathermap.org/img/w/"+weatherCurrentIcon+".png";
                $('.selectedCityAndDate').text(city+' ('+moment().format('L')+')').after($('<img src='+iconURL+'>'));
            
                //weather discription
                // let weatherCurrentDiscription=JSON.parse(localStorage.getItem(city1))current.weather[0].description;
            
            
                //weather list
                // let weatherCurrentMain=JSON.parse(localStorage.getItem(city1))current.main;//object

            });
        }); 
    }
});
