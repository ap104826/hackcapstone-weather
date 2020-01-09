let appId = '66adb290f68675fc3135f42f75a4c096';
let units = 'imperial';

function getSearchMethod(searchTerm) { 
    if(searchTerm.length === 5 && Number.parseInt(searchTerm)) {
        return 'zip';
    } else {
        return 'q';
    }
}
function searchWeather(searchTerm) {
    let searchMethod = getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer){
    switch(resultFromServer.weather[0].main) {
        case 'Clear':
            $('body').addClass('clear');
            break;

        case 'Clouds':
            $('body').addClass('clouds');
            break;
        
        case 'Rain':
            $('rain').addClass('rain');
            break;

        case 'Drizzle':
            $('drizzle').addClass('drizzle');
            break;

        case 'Mist':
                $('mist').addClass('mist');
                break;
        
        case 'Thunderstorm':
                $('thunderstorm').addClass('thunderstorm');
                break;

        case 'Snow':
                $('snow').addClass('snow');
                break;
            
        default:
                break;
    }

    let weatherDescriptionHeader = $('#weatherDescriptionHeader');
    let temperatureElement = $('#temperature');
    let humidityElement = $('#humidity');
    let windspeedElement = $('#windSpeed');
    let cityHeader = $('#cityHeader');
    let weatherIcon = $('.weatherLogo');

    weatherIcon.attr('src', `http://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}@2x.png`);
    weatherIcon.removeClass('hidden')
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.text(resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1));

    temperatureElement.html('Temperature: ' + Math.floor(resultFromServer.main.temp) + '&#176');
    windspeedElement.html('Winds at ' + resultFromServer.wind.speed + 'm/s');
    cityHeader.html('City: ' + resultFromServer.name);
    humidityElement.html('Humidity levels at '+ resultFromServer.main.humidity + '%');

}

$('#weatherForm').on('submit', (event) => {
    event.preventDefault()
    let searchTerm = $('#searchInput').val();
    if(searchTerm) {
        searchWeather(searchTerm);
    }
})






 


