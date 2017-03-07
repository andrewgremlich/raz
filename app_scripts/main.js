/*
TODO
The drawing of the canvas needs to show the position of the connected players.  
Having an interval in the current location isn't a very good spot.
*/

import Canvas from './app_modules/Canvas.js'
import Enemy from './app_modules/Enemy.js'
import Player from './app_modules/Player.js'
import endgame from './app_modules/endgame.js'

var socket = io()

/*OBJECTS*/

document.querySelector('canvas').width = window.innerWidth
document.querySelector('canvas').height = window.innerHeight

/*OBJECT OFF OF PROTOTYPES*/

var canvas = new Canvas()

function drawOtherPlayers(ctx, pos) {

    //        ctx.clearRect(0, 0, this.width, this.height)

    ctx.beginPath()
    ctx.arc(pos.x, pos.y, pos.radius, 0, Math.PI * 2)
    ctx.fillStyle = '#55b877'
    ctx.fill()
    ctx.closePath()
}

/*SOCKET CONNECTION*/

socket.on('user connected', e => {
    console.log("user connected", e)
})

socket.on('lobbyUser', e => {
    console.log(e)
})

socket.on('on left', e => {
    drawOtherPlayers(canvas.ctx, e)
})

socket.on('on up', e => {
    drawOtherPlayers(canvas.ctx, e)
})

socket.on('on right', e => {
    drawOtherPlayers(canvas.ctx, e)
})

socket.on('on down', e => {
    drawOtherPlayers(canvas.ctx, e)
})

socket.on('on reset', e => {
    drawOtherPlayers(canvas.ctx, e)
})

socket.on('user left', e => {
    console.log(e)
})

/*FRAME RATE*/

function frameRate(renderingObject) {

    let canvas = renderingObject.canvas,
        player = renderingObject.player
        //            enemy = renderingObject.enemy()

    canvas.clearFrame()

    player.drawPlayer(canvas.ctx)
        //        enemy.drawEnemy(canvas.ctx)

    player.updatePlayerPosition()
        //        enemy.updateEnemyPosition()

    player.collision(canvas.width, canvas.height)
        //      enemy.collision(canvas.width, canvas.height)


    /*Pass into the function the positional data of the player and the enemy.*/
    //      endgame(player, enemy)
}

/*****
EVENTS
******/

document.querySelector('input[type="button"]').onclick = e => {
    let srcElement = e.target || e.srcElement,
        textInput = srcElement.previousElementSibling,
        username = textInput.value,
        parent = srcElement.parentElement,
        aunt = parent.nextElementSibling

    /*GAME START MECHANICS*/

    socket.emit('add user to game', username);

    socket.on('login', e => {

        let xPos = e.clientData.player.x,
            yPos = e.clientData.player.y,
            renderingObject = {
                'canvas': canvas,
                'player': new Player(xPos, yPos)
            }

        parent.style.display = 'none'
        aunt.style.display = 'block'

        renderingObject.player.movePlayer()

        window.inter = setInterval(() => {
            frameRate(renderingObject)
        }, 10)

    })
}
