
var searchButton1 = document.querySelector('#searchButton');
//Text input to search variable
var textArea = document.querySelector('#textInput');
var userInput = textArea.value;


//API's I use




//User types City name and Searches 

searchButton.addEventListener("click", function () {
    var userInput = textArea.value;
    let apiGeoLocater = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=1&appid=96aab11cd848962acac2160b486f6080';
    //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    console.log(apiGeoLocater);

    // fetch request gets a list of all the repos for the node.js organization
    fetch(apiGeoLocater)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            GeoLocator(data);
        })


});


let cityNDay = document.querySelector('#cityNDateHolder')

function GeoLocator(data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var oneCallWeaterApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=96aab11cd848962acac2160b486f6080';

    // fetch request gets a list of all the repos for the node.js organization
    fetch(oneCallWeaterApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (oneCallData) {

            // console.log to see array and rest of code is append data to elements in HTML 
            console.log(oneCallData);
            cityNDay.textContent = data[0].name + ', ' + data[0].state + ' ' + moment(oneCallData.daily[0].dt, 'X').format('MM/DD/YYYY');



            //img weather icon code
            var IconHolder = document.createElement('img');
            var IconNum = oneCallData.daily[0].weather[0].icon;
            IconHolder.src = 'http://openweathermap.org/img/wn/' + IconNum + '@2x.png';
            cityNDay.appendChild(IconHolder);
        })
};
