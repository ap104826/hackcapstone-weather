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
    let descriptionElement = $('.description');
    
    weatherIcon.attr('src', `https://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}@2x.png`);
    weatherDescription.removeClass('hidden')
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.text(resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1));

    temperatureElement.html('Temperature: ' + Math.floor(resultFromServer.main.temp) + '&#176');
    windspeedElement.text('Winds at ' + resultFromServer.wind.speed + 'm/s');
    cityHeader.text('City: ' + resultFromServer.name);
    humidityElement.text('Humidity levels at '+ resultFromServer.main.humidity + '%');

//if weather is between 70-80 degrees alert= have a beautiful sunny day. if weather is between 69-50 degreers alert = don't forget your sweater. If weather is below 50 alert bundle up its chilly outside. If weather is between 100-81 degrees alert don't forget sunscreen and a hat. It will be warm today
    let temperature = resultFromServer.main.temp;
    let text; 
    
    if(temperature >= 70 && temperature <=80) {
        text = "Have a beautiful day!"
        
    } else if(temperature >= 50 && temperature <= 69) {
        text= "Don't forget your sweater! "
    } else if(temperature < 50) {
        text = " Bundle up, its chilly outside!"
        
    } else  {
        text = "Don't forget suncreen and hat! Its a warm day!"
    }
    descriptionElement.text(text)
    

}


function isStateValid(stateTerm) {
    //get from the website list of state abbr and match what the user input to that list
    //return true or false
    let states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NH','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']  
    if(states.includes(stateTerm)) {
        return true;
    } else {
        return false
    }
    
}

function showInvalidStateMessage() {
    let error = new Error('Invalid state')
    handleError(error)
}

$('#weatherForm').on('submit', (event) => {
    event.preventDefault()
    
    let searchTerm = $('#searchInput').val();
    let stateTerm = $('#stateInput').val().toUpperCase();
    if (isStateValid(stateTerm)){
        searchWeather(searchTerm, stateTerm);
    } else {
        showInvalidStateMessage()
    }
    })

    $(wireUpHandler);



 


