/*******************FUNCTIONS******************/
import spawn from './spawn.js'
import spawnEnemy from './spawnEnemy.js'
import everyOneElseSpawn from './everyOneElseSpawn.js'

let renderingObject = {
//        enemy: {},
        players: {}
    }

/*
Start game by spawning the client player first, 
then the enemy, then everyone else. 
*/
spawn(renderingObject)
//    .then(spawnEnemy)
    .then(everyOneElseSpawn)
