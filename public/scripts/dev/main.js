import database from './firebaseConfig.js'
import endgame from './endgame.js'
import Player from './Player.js'
import Canvas from './Canvas.js'
import Enemy from './Enemy.js'

document.querySelector('canvas').width = 2000
document.querySelector('canvas').height = 500

let canvas = new Canvas(),
    player = new Player(),
    enemy = new Enemy(canvas.width, canvas.height)

/*Move player controls*/
player.movePlayer()

/*FRAME RATE*/

function frameRate() {

    canvas.clearFrame()
    canvas.drawBorders()

    player.drawPlayer(canvas.ctx)
    enemy.drawEnemy(canvas.ctx)

    player.updatePlayerPosition()
    enemy.updateEnemyPosition()

    player.collision(canvas.width, canvas.height)
    enemy.collision(canvas.width, canvas.height)

    /*Pass into the function the positional data of the player and the enemy.*/
//    endgame(player, enemy)
}

setInterval(frameRate, 10)
