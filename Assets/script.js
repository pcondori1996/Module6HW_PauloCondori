
var searchButton1 = document.querySelector('#searchButton');
//Text input to search variable
var textArea = document.querySelector('#textInput');
var userInput = textArea.value;


//API's I use




//User types City name and Searches 

searchButton.addEventListener("click", function () {
    let userInput = textArea.value;
    let apiGeoLocater = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=1&appid=96aab11cd848962acac2160b486f6080';
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
    console.log(oneCallWeaterApi);

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

            //color change in UX button
            var valueOfUV = oneCallData.current.uvi;
            currentUXOfCity.classList.remove('btn-info');
            if (valueOfUV < 3.00) {
                currentUXOfCity.classList.add('btn-success');
            } else if (2.99 < valueOfUV & valueOfUV < 6.01) {
                currentUXOfCity.classList.add('btn-warning');
            } else {
                currentUXOfCity.classList.add('btn-danger');
            }

            //img weather icon code
            var IconHolder = document.createElement('img');
            var IconNum = oneCallData.daily[0].weather[0].icon;
            IconHolder.src = 'https://openweathermap.org/img/wn/' + IconNum + '@2x.png';
            cityNDay.appendChild(IconHolder);


            //MAke getElementById of all elements and put it into the arrays
            var dateDay1 = document.getElementById('dateDay1');
            var dateDay2 = document.getElementById('dateDay2');
            var dateDay3 = document.getElementById('dateDay3');
            var dateDay4 = document.getElementById('dateDay4');
            var dateDay5 = document.getElementById('dateDay5');

            var tempDay1 = document.getElementById('tempDay1');
            var tempDay2 = document.getElementById('tempDay2');
            var tempDay3 = document.getElementById('tempDay3');
            var tempDay4 = document.getElementById('tempDay4');
            var tempDay5 = document.getElementById('tempDay5');

            var windDay1 = document.getElementById('windDay1');
            var windDay2 = document.getElementById('windDay2');
            var windDay3 = document.getElementById('windDay3');
            var windDay4 = document.getElementById('windDay4');
            var windDay5 = document.getElementById('windDay5');

            var HumidityDay1 = document.getElementById('HumidityDay1');
            var HumidityDay2 = document.getElementById('HumidityDay2');
            var HumidityDay3 = document.getElementById('HumidityDay3');
            var HumidityDay4 = document.getElementById('HumidityDay4');
            var HumidityDay5 = document.getElementById('HumidityDay5');


            //Arrays holding element id's of the 5 days next forcast at bottom of HTML file
            var DayIDs = ['placeholder', dateDay1, dateDay2, dateDay3, dateDay4, dateDay5];
            var TempIDs = ['placeholder', tempDay1, tempDay2, tempDay3, tempDay4, tempDay5];
            var WindIDs = ['placeholder', windDay1, windDay2, windDay3, windDay4, windDay5];
            var HumidityIDs = ['placeholder', HumidityDay1, HumidityDay2, HumidityDay3, HumidityDay4, HumidityDay5];

            for (var i = 1; i < DayIDs.length; i++) {

                DayIDs[i].textContent = moment(oneCallData.daily[i].dt, 'X').format('MMM Do YY');

                var IconElement = document.createElement('img');
                var IconiNum = oneCallData.daily[i].weather[0].icon;
                IconElement.src = 'https://openweathermap.org/img/wn/' + IconiNum + '@2x.png';
                DayIDs[i].appendChild(IconElement);


                TempIDs[i].textContent = 'Temp: ' + oneCallData.daily[i].temp.day + ' F';
                WindIDs[i].textContent = 'Wind: ' + oneCallData.daily[i].wind_speed + ' MPH';
                HumidityIDs[i].textContent = 'Humidity: ' + oneCallData.daily[i].humidity + '%';
            }

        });

};


//Click event for the State Buttons

var stateButtons = document.getElementsByClassName('stateButton');

//document.getElementById('stateButton');
//document.getElementsByClassName('stateButton');

stateButtons[0].addEventListener("click", function (event) {
    if (event.target.matches('.btn')) {
        let userInput = event.target.textContent;
        console.log(userInput);
        let apiGeoLocater = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=1&appid=96aab11cd848962acac2160b486f6080';


        // fetch request gets a list of all the repos for the node.js organization
        fetch(apiGeoLocater)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                GeoLocator(data);
            })

    }
});


