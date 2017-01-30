/*EXTERNAL LIBRARIES*/
const path = require('path'),
    $ = require('jquery'),
    dotenv = require('dotenv')

dotenv.load()

window.APP_DIR_NAME = __dirname

/*PATHS*/
const SCRIPT_DIR = window.APP_DIR_NAME + '/js/modules/',
    raz = require(path.join(SCRIPT_DIR, 'raz')),
    events = require(path.join(SCRIPT_DIR, 'events'))

/*APPLICATION VARIABLES*/

/*
$.get('http://192.168.1.32:3000/', data => {
    console.log(data)
}).fail(e => {
    console.log(e, "Error!")
})
*/
