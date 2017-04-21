/*******************FUNCTIONS******************/
import spawn from './spawn.js'
import spawnEnemy from './spawnEnemy.js'
import everyOneElseSpawn from './everyOneElseSpawn.js'

document.querySelector('canvas').width = 2000
document.querySelector('canvas').height = 500

let renderingObject = {
        enemy: {},
        players: {}
    }

/*
    Start game by spawning the client player first, 
    then the enemy, then everyone else. 
*/
spawn(renderingObject)
    .then(spawnEnemy)
    .then(everyOneElseSpawn)
