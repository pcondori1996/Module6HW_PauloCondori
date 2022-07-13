
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


var cityNDay = document.querySelector('#cityNDateHolder')
var currentTempOfCity = document.querySelector('#currentTempOfCity');
var currentWindOfCity = document.querySelector('#currentWindOfCity');
var currentHumidityOfCity = document.querySelector('#currentHumidityOfCity');
var currentUXOfCity = document.querySelector('#currentUXOfCity');



function GeoLocator(data) {
    let lat = data[0].lat;
    let lon = data[0].lon;
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
            currentTempOfCity.textContent = oneCallData.current.temp + ' F';
            currentWindOfCity.textContent = oneCallData.current.wind_speed + ' MPH';
            currentHumidityOfCity.textContent = oneCallData.current.humidity + ' %';
            currentUXOfCity.textContent = oneCallData.current.uvi;

            //img weather icon code
            var IconHolder = document.createElement('img');
            var IconNum = oneCallData.daily[0].weather[0].icon;
            IconHolder.src = 'http://openweathermap.org/img/wn/' + IconNum + '@2x.png';
            cityNDay.appendChild(IconHolder);

            //Arrays holding element id's of the 5 days next forcast at bottom of HTML file
            var DayIDs = ['placeholder', '#dateDay1', '#dateDay2', '#dateDay3', '#dateDay4', '#dateDay5'];
            var TempIDs = ['placeholder', '#tempDay1', '#tempDay2', '#tempDay3', '#tempDay4', '#tempDay5'];
            var WindIDs = ['placeholder', '#windDay1', '#windDay2', '#windDay3', '#windDay4', '#windDay5'];
            var HumidityIDs = ['placeholder', '#HumidityDay1', '#HumidityDay2', '#HumidityDay3', '#HumidityDay4', '#HumidityDay5'];

            for (var i = 1; i < DayIDs.length + 1; i++) {
                DayIDs[i].textContent = moment(oneCallData.daily[i].dt, 'X').format('MM/DD/YYYY');
                var IconElement = document.createElement('img');
                var IconiNum = oneCallData.daily[i].weather[0].icon;
                IconElement.src = 'http://openweathermap.org/img/wn/' + IconiNum + '@2x.png';
               // DayIDs[i].appendChild(IconElement);


                TempIDs[i].textContent = oneCallData.daily[i].temp.day + ' F';
                WindIDs[i].textArea = oneCallData.daily[i].wind_speed + ' MPH';
                HumidityIDs[i].textContent = oneCallData.daily[i].humidity + ' %';
            }




            //Fetch coded to UV data from another fetch

            // function UVDataFinder(data) {
            //     var ApiUV = 'http://api.openweathermap.org/v3/uvi/{location}/{datetime}.json?appid={api_key}';


            //     fetch(ApiUV)
            //         .then(function (response) {
            //             return response.json();
            //         })
            //         .then(function () {

            //         });
            // };



        });

};
