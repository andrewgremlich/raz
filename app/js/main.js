/*EXTERNAL LIBRARIES*/
const path = require('path'),
    $ = require('jquery'),
    dotenv = require('dotenv')

dotenv.load()

/*PATHS*/
const SCRIPT_DIR = __dirname + '/js/modules/'
    //    events = require(path.join(SCRIPT_DIR, 'events'))

console.log("hello")

$.get('http://192.168.1.32:3000/', data => {
    console.log(data)
})

$.get('http://192.168.1.32:3000/testresponse', data => {
    console.log(data)
})

$.get('http://freegeoip.net/json/', data => {

    $.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${data.latitude},${data.longitude}`, data => {
        console.log(data)
    })

})
