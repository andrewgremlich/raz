import endgame from './endgame.js'
import Player from './Player.js'
import Canvas from './Canvas.js'
import Enemy from './Enemy.js'
import spawn from './spawn.js'
import spawnEnemy from './spawnEnemy.js'

document.querySelector('canvas').width = 2000
document.querySelector('canvas').height = 500

let chain = Promise.resolve(),
    spawnCoor = spawn(),
    enemyPos = spawnEnemy()

chain
    .then(spawnCoor)
    .then(enemyPos)

/*
    canvas = new Canvas(),
    player = new Player(),
    enemy = new Enemy(canvas.width, canvas.height)

player.movePlayer()

function frameRate() {

    canvas.clearFrame()
    canvas.drawBorders()

    player.drawPlayer(canvas.ctx)
    enemy.drawEnemy(canvas.ctx)

    player.updatePlayerPosition()
    enemy.updateEnemyPosition()

    player.collision(canvas.width, canvas.height)
    enemy.collision(canvas.width, canvas.height)
    
    endgame(player, enemy)
}

setInterval(frameRate, 10)*/