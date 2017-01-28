/*WEATHER MODULES*/
const path = require('path'),
    MODULES_DIR = __dirname,
    alerts = require(path.join(MODULES_DIR + '/alerts')),
    curr = require(path.join(MODULES_DIR + '/currently')),
    daily = require(path.join(MODULES_DIR + '/daily')),
    hourly = require(path.join(MODULES_DIR + '/hourly')),
    minutely = require(path.join(MODULES_DIR + '/minutely'))

/*APPLICATION VARIABLES*/
var cachedWeather,
    weatherComponent = document.createElement('div')

weatherComponent.id = 'weatherComponent'

function makeWeatherDisplay(cw) {

    /*DONE*/
    alerts(cw.alerts, weatherComponent)

    /*WORK ON*/
    curr(cw.currently, weatherComponent)
    daily(cw.daily, weatherComponent)
    hourly(cw.hourly, weatherComponent)
    minutely(cw.minutely, weatherComponent)
}

try {
    cachedWeather = JSON.parse(localStorage['cachedWeather'])
    makeWeatherDisplay(cachedWeather)
} catch (e) {
    console.warn(e)
}

if (!cachedWeather) {

    $.get('http://freegeoip.net/json/', data => {

        $.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${data.latitude},${data.longitude}`, data => {
            localStorage['cachedWeather'] = JSON.stringify(data)
            console.log('Weather data loaded!')
            makeWeatherDisplay(cachedWeather)
        })

    })
}

module.exports = weatherComponent
