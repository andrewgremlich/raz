/*EXTERNAL LIBRARIES*/
const path = require('path'),
    $ = require('jquery'),
    dotenv = require('dotenv')

dotenv.load()

/*PATHS*/
const SCRIPT_DIR = __dirname + '/js/modules/',
    weather = require(path.join(SCRIPT_DIR, 'weather'))

document.querySelector('main').appendChild(weather)

/*APPLICATION VARIABLES*/

/*
$.get('http://192.168.1.32:3000/', data => {
    console.log(data)
}).fail(e => {
    console.log(e, "Error!")
})
*/
