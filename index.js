let appId = '66adb290f68675fc3135f42f75a4c096';
let units = 'imperial';


function searchWeather(searchTerm,stateTerm) {
    //start loader
    $('.errorMessage').addClass('hidden')
    $('.weatherDescription').addClass('hidden')
    document.body.style.backgroundColor = '#2B3E50'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm},${stateTerm},us&APPID=${appId}&units=${units}`)
    .then(result => {
        if (result.ok) {
            return result.json();
        } else {
            throw new Error('Unable to get weather data for this location. Try again!')
        }
        
    }).then(result => {
        //end loader
        init(result);
    })
    .catch(error => {
        if (error.message === 'Failed to fetch') {
            error.message = 'There was a problem!'
        }
        handleError(error)
    })
    //end loader
}

function handleError(error) {
    $('.errorMessage')
        .text(error.message)
        .removeClass('hidden')
} 

function init(resultFromServer){
   
    let weatherDescription = $('.weatherDescription');
    let weatherDescriptionHeader = $('#weatherDescriptionHeader');
    let temperatureElement = $('#temperature');
    let humidityElement = $('#humidity');
    let windspeedElement = $('#windSpeed');
    let cityHeader = $('#cityHeader');
    let weatherIcon = $('.weatherLogo');
    
    weatherIcon.attr('src', `https://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}@2x.png`);
    weatherDescription.removeClass('hidden')
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.text(resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1));

    temperatureElement.html('Temperature: ' + Math.floor(resultFromServer.main.temp) + '&#176');
    windspeedElement.text('Winds at ' + resultFromServer.wind.speed + 'm/s');
    cityHeader.text('City: ' + resultFromServer.name);
    humidityElement.text('Humidity levels at '+ resultFromServer.main.humidity + '%');

}

function isStateValid(stateTerm) {
    return true
}

function showInvalidStateMessage() {
    
}

$('#weatherForm').on('submit', (event) => {
    event.preventDefault()
    
    let searchTerm = $('#searchInput').val();
    let stateTerm = $('#stateInput').val();
    if (isStateValid(stateTerm)){
        searchWeather(searchTerm, stateTerm);
    } else {
        showInvalidStateMessage()
    }
    
    
    })





 


