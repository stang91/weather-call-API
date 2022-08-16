// need to figure out how to hide API keys; dotenv???
//.gitignore??
var keyAPI='cda125b32a94084e8ae8c5922b57599d';
var submitBtn=$('#submit');
var CurrentWeatherCityTitle= $('.selectedCityAndDate');
//create pevious search list
for (var i=0; i<localStorage.length; i++){
    $('.previousSearchedCity').append($("<li>"+localStorage.key(i)+"</li>").addClass(localStorage.key(i)+' d-flex justify-content-center SearchBtn'));
}

var previousSearchedBtn=$('.SearchBtn');

//click event listener for pervious search list
previousSearchedBtn.click(function(event){
    event.preventDefault();
    //clear or remove events
    $('.forecastFutureWheatherBlock').empty();    
    $('.image').remove();
    $('.selectedCityAndDate').empty;
    $('.forecastCurrentWeatherList').empty();
    //title, date and icon for current Weather
    let city=$(this).text();
    let weatherCurrentIcon=JSON.parse(localStorage.getItem(city)).current.weather[0].icon;
    let iconURL = "https://openweathermap.org/img/w/"+weatherCurrentIcon+".png";
    $('.selectedCityAndDate').text(city+' ('+moment().format('L')+')').after($('<img src='+iconURL+'>').addClass('image'));
    //weather discription
    let weatherCurrentDiscription=JSON.parse(localStorage.getItem(city)).current.weather[0].description;
    $('.forecastCurrentWeatherList').append($('<li>'+weatherCurrentDiscription+'</li>').addClass('currentDiscription'));
    //weather list
    //the temperature
    let weatherCurrentTemp=JSON.parse(localStorage.getItem(city)).current.temp;
    $('.forecastCurrentWeatherList').append($('<li>'+'Temperature: '+weatherCurrentTemp+'°F'+'</li>').addClass('currentTemp'));
    //the humidity
    let weatherCurrentHumid=JSON.parse(localStorage.getItem(city)).current.humidity;
    $('.forecastCurrentWeatherList').append($('<li>'+'Humidity: '+weatherCurrentHumid+'%'+'</li>').addClass('currentHumid'));
    //the wind speed 
    let weatherCurrentWindSpeed=JSON.parse(localStorage.getItem(city)).current.wind_speed;
    $('.forecastCurrentWeatherList').append($('<li>'+'Wind Speed: '+weatherCurrentWindSpeed+' mph'+'</li>').addClass('currentWindSpeed'));
    //and the UV index
    let weatherCurrentUV=JSON.parse(localStorage.getItem(city)).current.uvi;
    if (weatherCurrentUV<=2){
        $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV low'));
    } else if(2<weatherCurrentUV<=5){
        $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV moderate'));
    }else {
        $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV severe'));
    }

    //forecast days list
    for (var i=0;i<5;i++){
        //clone forecastBlock
        let cloneForecastBlock= $('.forecastBlock').clone().addClass('col-12 col-sm-6 col-md-4 col-lg-4 forecastBlock'+i).removeClass('forecastBlock');
        $('.forecastFutureWeatherBlock').append(cloneForecastBlock);
        }
    $('.forecastBlock').remove();
        //5-day forecast that displays the date
    $('.forecastFutureWeatherList').each(function(index){
        $(this).prop('id','forecastFutureWeatherList'+(index));
        $(this).siblings('.futureDate').prop('id','futureDate'+(index));
        });    
    for (i=0;i<5;i++){
        $('#forecastFutureWeatherList'+i).empty();
        // an icon representation of weather conditions
        let weather5DayForecastIcon = JSON.parse(localStorage.getItem(city)).daily[i].weather[0].icon;
        let forecaste5dayIconURL = "https://openweathermap.org/img/w/"+weather5DayForecastIcon+".png";
        //5-day forecast that displays the date
        $('#futureDate'+i).text(moment().add(i+1,'days').format('L')).after($('<img src='+forecaste5dayIconURL+'>').addClass('image'));
        //weather listt
        // the temperature
        let weatherForecastMaxTemp=JSON.parse(localStorage.getItem(city)).daily[i].temp.max;
        $('#forecastFutureWeatherList'+i).append($('<li>'+'Max Temp: '+weatherForecastMaxTemp+'°F'+'</li>').addClass('forecastMaxTemp'));
        let weatherForecastMinTemp=JSON.parse(localStorage.getItem(city)).daily[i].temp.min;
        $('#forecastFutureWeatherList'+i).append($('<li>'+'Min Temp: '+weatherForecastMinTemp+'°F'+'</li>').addClass('forecastMinTemp'));
        //the humidity
        let weatherForecastHumid=JSON.parse(localStorage.getItem(city)).daily[i].humidity;
        $('#forecastFutureWeatherList'+i).append($('<li>'+'Humidity: '+weatherForecastHumid+'%'+'</li>').addClass('currentHumid'));
        // the wind speed
        let weatherForecastWindSpeed=JSON.parse(localStorage.getItem(city)).daily[i].wind_speed;
        $('#forecastFutureWeatherList'+i).append($('<li>'+'Wind Speed: '+weatherForecastWindSpeed+' mph'+'</li>').addClass('currentWindSpeed'));                
    }
});

//sumbit button click event listener
submitBtn.click(function(event){
    event.preventDefault();
    $('.previousSearchedCity').empty();
    $('.forecastFutureWheatherBlock').empty();    
    $('.image').remove();

    let city=$('#city').val().toLowerCase().trim();
    let state=$('#state-Code').val().toLowerCase().trim();
    //fetch request to get Lon and Lat of city
    let requestLonLatURL='https://api.openweathermap.org/geo/1.0/direct?q='+city+','+state+',US&appid='+keyAPI;
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

            let requestCurrentWeatherURL='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,hourly&appid='+keyAPI+'&units=imperial';
            fetch(requestCurrentWeatherURL, {
                method: 'GET',
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                localStorage.setItem(city,JSON.stringify(data));
            
            //alert?
                //dailyList
                //current forecast
                $('.selectedCityAndDate').empty;
                $('.forecastCurrentWeatherList').empty();
                //title, date and icon
                let weatherCurrentIcon=JSON.parse(localStorage.getItem(city)).current.weather[0].icon;
                let iconURL = "https://openweathermap.org/img/w/"+weatherCurrentIcon+".png";
                $('.selectedCityAndDate').text(city+' ('+moment().format('L')+')').after($('<img src='+iconURL+'>').addClass('image'));

                //weather discription
                let weatherCurrentDiscription=JSON.parse(localStorage.getItem(city)).current.weather[0].description;
                $('.forecastCurrentWeatherList').append($('<li>'+weatherCurrentDiscription+'</li>').addClass('currentDiscription'));
                //weather list
                // , the temperature, 
                let weatherCurrentTemp=JSON.parse(localStorage.getItem(city)).current.temp;
                $('.forecastCurrentWeatherList').append($('<li>'+'Temperature: '+weatherCurrentTemp+'°F'+'</li>').addClass('currentTemp'));
                //the humidity,
                let weatherCurrentHumid=JSON.parse(localStorage.getItem(city)).current.humidity;
                $('.forecastCurrentWeatherList').append($('<li>'+'Humidity: '+weatherCurrentHumid+'%'+'</li>').addClass('currentHumid'));
                // the wind speed, 
                let weatherCurrentWindSpeed=JSON.parse(localStorage.getItem(city)).current.wind_speed;
                $('.forecastCurrentWeatherList').append($('<li>'+'Wind Speed: '+weatherCurrentWindSpeed+' mph'+'</li>').addClass('currentWindSpeed'));
                //and the UV index
                let weatherCurrentUV=JSON.parse(localStorage.getItem(city)).current.uvi;
                if (weatherCurrentUV<=2){
                    $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV low'));
                } else if(2<weatherCurrentUV<=5){
                    $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV moderate'));
                }else {
                    $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV severe'));
                }

                //forecast days list
                for (var i=0;i<5;i++){
                    //clone forecastBlock
                    let cloneForecastBlock= $('.forecastBlock').clone().addClass('col-12 col-sm-6 col-md-4 col-lg-4 forecastBlock'+i).removeClass('forecastBlock');
                    $('.forecastFutureWeatherBlock').append(cloneForecastBlock);
                    }
                $('.forecastBlock').remove();
                    //5-day forecast that displays the date,
                    // an icon representation of weather conditions, 
                $('.forecastFutureWeatherList').each(function(index){
                    $(this).prop('id','forecastFutureWeatherList'+(index));
                    $(this).siblings('.futureDate').prop('id','futureDate'+(index));
                    });    
                for (i=0;i<5;i++){
                    $('#forecastFutureWeatherList'+i).empty();
                    let weather5DayForecastIcon = JSON.parse(localStorage.getItem(city)).daily[i].weather[0].icon;
                    let forecaste5dayIconURL = "https://openweathermap.org/img/w/"+weather5DayForecastIcon+".png";
                    //5-day forecast that displays the date
                    $('#futureDate'+i).text(moment().add(i+1,'days').format('L')).after($('<img src='+forecaste5dayIconURL+'>').addClass('image'));
                    //weather list
                    // the temperature
                    let weatherForecastMaxTemp=JSON.parse(localStorage.getItem(city)).daily[i].temp.max;
                    $('#forecastFutureWeatherList'+i).append($('<li>'+'Max Temp: '+weatherForecastMaxTemp+'°F'+'</li>').addClass('forecastMaxTemp'));
                    let weatherForecastMinTemp=JSON.parse(localStorage.getItem(city)).daily[i].temp.min;
                    $('#forecastFutureWeatherList'+i).append($('<li>'+'Min Temp: '+weatherForecastMinTemp+'°F'+'</li>').addClass('forecastMinTemp'));
                    //the humidity
                    let weatherForecastHumid=JSON.parse(localStorage.getItem(city)).daily[i].humidity;
                    $('#forecastFutureWeatherList'+i).append($('<li>'+'Humidity: '+weatherForecastHumid+'%'+'</li>').addClass('currentHumid'));
                    // the wind speed 
                    let weatherForecastWindSpeed=JSON.parse(localStorage.getItem(city)).daily[i].wind_speed;
                    $('#forecastFutureWeatherList'+i).append($('<li>'+'Wind Speed: '+weatherForecastWindSpeed+' mph'+'</li>').addClass('currentWindSpeed'));                
                }
                for (var i=0; i<localStorage.length; i++){
                    $('.previousSearchedCity').append($("<li>"+localStorage.key(i)+"</li>").addClass(localStorage.key(i)+' d-flex justify-content-center SearchBtn'));
                }
                let previousSearchedBtn=$('.SearchBtn');
                //create previous search list
                previousSearchedBtn.click(function(event){
                    event.preventDefault();
                    $('.forecastFutureWheatherBlock').empty();    
                    $('.image').remove();
                    $('.selectedCityAndDate').empty;
                    $('.forecastCurrentWeatherList').empty();
                    let city=$(this).text();
                    //title, date and icon
                    let weatherCurrentIcon=JSON.parse(localStorage.getItem(city)).current.weather[0].icon;
                    let iconURL = "https://openweathermap.org/img/w/"+weatherCurrentIcon+".png";
                    $('.selectedCityAndDate').text(city+' ('+moment().format('L')+')').after($('<img src='+iconURL+'>').addClass('image'));
                    //weather discription
                    let weatherCurrentDiscription=JSON.parse(localStorage.getItem(city)).current.weather[0].description;
                    $('.forecastCurrentWeatherList').append($('<li>'+weatherCurrentDiscription+'</li>').addClass('currentDiscription'));
                    //weather list
                    //the temperature 
                    let weatherCurrentTemp=JSON.parse(localStorage.getItem(city)).current.temp;
                    $('.forecastCurrentWeatherList').append($('<li>'+'Temperature: '+weatherCurrentTemp+'°F'+'</li>').addClass('currentTemp'));
                    //the humidity
                    let weatherCurrentHumid=JSON.parse(localStorage.getItem(city)).current.humidity;
                    $('.forecastCurrentWeatherList').append($('<li>'+'Humidity: '+weatherCurrentHumid+'%'+'</li>').addClass('currentHumid'));
                    // the wind speed 
                    let weatherCurrentWindSpeed=JSON.parse(localStorage.getItem(city)).current.wind_speed;
                    $('.forecastCurrentWeatherList').append($('<li>'+'Wind Speed: '+weatherCurrentWindSpeed+' mph'+'</li>').addClass('currentWindSpeed'));
                    //and the UV index
                    let weatherCurrentUV=JSON.parse(localStorage.getItem(city)).current.uvi;
                    if (weatherCurrentUV<=2){
                        $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV low'));
                    } else if(2<weatherCurrentUV<=5){
                        $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV moderate'));
                    }else {
                        $('.forecastCurrentWeatherList').append($('<li>'+'UV Index: '+weatherCurrentUV+'</li>').addClass('currentUV severe'));
                    }
                
                    //forecast days list
                    for (var i=0;i<5;i++){
                        //clone forecastBlock
                        let cloneForecastBlock= $('.forecastBlock').clone().addClass('col-12 col-sm-6 col-md-4 col-lg-4 forecastBlock'+i).removeClass('forecastBlock');
                        $('.forecastFutureWeatherBlock').append(cloneForecastBlock);
                        }
                    $('.forecastBlock').remove();
                    $('.forecastFutureWeatherList').each(function(index){
                        $(this).prop('id','forecastFutureWeatherList'+(index));
                        $(this).siblings('.futureDate').prop('id','futureDate'+(index));
                    });    
                    for (i=0;i<5;i++){
                        $('#forecastFutureWeatherList'+i).empty();
                        // an icon representation of weather conditions, 
                        let weather5DayForecastIcon = JSON.parse(localStorage.getItem(city)).daily[i].weather[0].icon;
                        let forecaste5dayIconURL = "https://openweathermap.org/img/w/"+weather5DayForecastIcon+".png";
                        //5-day forecast that displays the date
                        $('#futureDate'+i).text(moment().add(i+1,'days').format('L')).after($('<img src='+forecaste5dayIconURL+'>').addClass('image'));
                        //weather list
                        //the temperature 
                        let weatherForecastMaxTemp=JSON.parse(localStorage.getItem(city)).daily[i].temp.max;
                        $('#forecastFutureWeatherList'+i).append($('<li>'+'Max Temp: '+weatherForecastMaxTemp+'°F'+'</li>').addClass('forecastMaxTemp'));
                        let weatherForecastMinTemp=JSON.parse(localStorage.getItem(city)).daily[i].temp.min;
                        $('#forecastFutureWeatherList'+i).append($('<li>'+'Min Temp: '+weatherForecastMinTemp+'°F'+'</li>').addClass('forecastMinTemp'));
                        //the humidity
                        let weatherForecastHumid=JSON.parse(localStorage.getItem(city)).daily[i].humidity;
                        $('#forecastFutureWeatherList'+i).append($('<li>'+'Humidity: '+weatherForecastHumid+'%'+'</li>').addClass('currentHumid'));
                        // the wind speed
                        let weatherForecastWindSpeed=JSON.parse(localStorage.getItem(city)).daily[i].wind_speed;
                        $('#forecastFutureWeatherList'+i).append($('<li>'+'Wind Speed: '+weatherForecastWindSpeed+' mph'+'</li>').addClass('currentWindSpeed'));                
                    }
                });
            }); 
        });
    }
});
