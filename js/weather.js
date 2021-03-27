const API_KEY = "";
const weather = document.querySelector(".js-weather");
const COORDS = 'coords';

function getWeather(latitude, longitude){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    ).then(function(response) {
        return response.json()
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature} @ ${place}`
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function askCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);

}

function handleGeoSucces(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);

}

function handleGeoError() {
    console.log("Can't Access geo location");
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askCoords();
    } else {
        const parseCoord = JSON.parse(loadedCoords);
        getWeather(parseCoord.latitude, parseCoord.longitude);
    }

}

function init() {
    loadCoords();
}

init();



// find description about geolocation function