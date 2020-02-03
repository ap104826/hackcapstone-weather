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
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer){
    switch(resultFromServer.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = 'url("clearx.jpg")';
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
        case 'snow':
                document.body.style.backgroundImage = 'url("snow.jpg")';
                break;
        default:
                document.body.style.backgroundImage = 'url("Color-blue.jpg")';
                break;
    }
    let weatherDescription = $('.weatherDescription');
    let weatherDescriptionHeader = $('#weatherDescriptionHeader');
    let temperatureElement = $('#temperature');
    let humidityElement = $('#humidity');
    let windspeedElement = $('#windSpeed');
    let cityHeader = $('#cityHeader');
    let weatherIcon = $('.weatherLogo');
    
    weatherIcon.attr('src', `http://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}@2x.png`);
    weatherDescription.removeClass('hidden')
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.text(resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1));

    temperatureElement.html('Temperature: ' + Math.floor(resultFromServer.main.temp) + '&#176');
    windspeedElement.text('Winds at ' + resultFromServer.wind.speed + 'm/s');
    cityHeader.text('City: ' + resultFromServer.name);
    humidityElement.text('Humidity levels at '+ resultFromServer.main.humidity + '%');

}

$('#weatherForm').on('submit', (event) => {
    event.preventDefault()
    let searchTerm = $('#searchInput').val();
    if(searchTerm) {
        searchWeather(searchTerm);
    }
})






 


