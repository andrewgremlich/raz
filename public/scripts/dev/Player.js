import database from './firebaseConfig.js'

/*
Player prototype constructor
*/

function Player(spawnCoor, playerId) {
    this.width = 10
    this.height = 10
    this.x = spawnCoor.x
    this.y = spawnCoor.y
    this.id = playerId
    this.radius = 10
}

/*
Draw player.  It's just a circle for now.
*/

Player.prototype.drawPlayer = function (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = '#558bb8'
    ctx.fill()
    ctx.closePath()
}

/*Set player position*/

Player.prototype.setPlayerPosition = function (playerPos) {
    this.x = playerPos.x
    this.y = playerPos.y
}

/*
Evaluate collision of the player with the edges of the play area.
*/

Player.prototype.collisionWithBorder = function (cwidth, cheight) {

    var xPos = this.x + this.xMotionSpeed,
        yPos = this.y + this.yMotionSpeed

    if (xPos > cwidth - this.radius || xPos < this.radius) this.xMotionSpeed = -this.xMotionSpeed
    if (yPos > cheight - this.radius || yPos < this.radius) this.yMotionSpeed = -this.yMotionSpeed
}

/*
Directional control with the arrow keys.
*/

Player.prototype.movePlayer = function (cwidth, cheight) {

    var that = this,
        leftMove = that.x - 2,
        upMove = that.y - 2,
        rightMove = that.x + 2,
        downMove = that.y + 2,
        xPos = that.x,
        yPos = that.y,
        borderCollisionX = xPos > cwidth - that.radius || xPos < that.radius,
        borderCollisionY = yPos > cheight - that.radius || yPos < that.radius,
        token = localStorage['razSessionToken']

    document.onkeydown = function (e) {
        let keyCode = e.keyCode || e.which,
            stringKey = keyCode.toString(),
            xCoorDatabase = database.ref(`users/${token}/x`),
            yCoorDatabase = database.ref(`users/${token}/y`),
            move = {
                '37': function () {
                    //console.log("firing left arrow!")
                    xCoorDatabase.set(leftMove)
                },
                '38': function () {
                    //console.log("firing up arrow!")
                    yCoorDatabase.set(upMove)
                },
                '39': function () {
                    //console.log("firing right arrow!")
                    xCoorDatabase.set(rightMove)
                },
                '40': function () {
                    //console.log("firing down arrow!")
                    yCoorDatabase.set(downMove)
                }
            }

        if (borderCollisionX) {
            console.log("collision x!")
            if (xPos > cwidth - that.radius) {
                move['37']()
            } else if (xPos < that.radius) {
                move['39']()
            }
            return
        } else if (borderCollisionY) {
            console.log("collision y!")
            if (yPos > cheight - that.radius) {
                move['38']()
            } else if (yPos < that.radius) {
                move['40']()
            }
            return
        }
        move[stringKey]()
    }
}

export default Player