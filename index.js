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
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
                document.body.style.backgroundImage = 'url("rain.jpg")';
                break;
        
        case 'Thunderstorm':
                document.body.style.backgroundImage = 'url("storm.jpg")';
                break;

        case 'Snow':
                document.body.style.backgroundImage = 'url("snow.jpg")';
                break;
            
        default:
                break;
    }

    let weatherDescriptionHeader = $('#weatherDescriptionHeader');
    let temperatureElement = $('#temperature');
    let humidityElement = $('#humidity');
    let windspeedElement = $('#windSpeed');
    let cityHeader = $('#cityHeader');
    let weatherIcon = $('#documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.text(resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1));

    temperatureElement.html(Math.floor(resultFromServer.main.temp) + '&#176');
    windspeedElement.html('Winds at ' + resultFromServer.wind.speed + 'm/s');
    cityHeader.html(resultFromServer.name);
    humidityElement.html('Humidity levels at '+ resultFromServer.main.humidity + '%');

}

$('#searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm) {
        searchWeather(searchTerm);
    }
})






 


