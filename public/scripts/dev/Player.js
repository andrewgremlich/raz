/*
Player prototype constructor
*/

function Player(spawnCoor) {
    this.width = 10
    this.height = 10
    this.x = 50
    this.y = 50
    this.xMotionSpeed = 0
    this.yMotionSpeed = 0
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

/*
Player motion according to the arrow controls in the movePlayer method
*/

Player.prototype.updatePlayerPosition = function () {
    this.x += this.xMotionSpeed
    this.y += this.yMotionSpeed
}

/*
Evaluate collision of the player with the edges of the play area.
*/

Player.prototype.collision = function (cwidth, cheight) {

    var xPos = this.x + this.xMotionSpeed,
        yPos = this.y + this.yMotionSpeed

    if (xPos > cwidth - this.radius || xPos < this.radius) this.xMotionSpeed = -this.xMotionSpeed
    if (yPos > cheight - this.radius || yPos < this.radius) this.yMotionSpeed = -this.yMotionSpeed
}

/*
Directional control with the arrow keys.
*/

Player.prototype.movePlayer = function () {

    var that = this

    document.onkeydown = function (e) {

        /*To make a static speed instead of a steady acceleration*/

        that.xMotionSpeed = 0
        that.yMotionSpeed = 0

        let keyCode = e.keyCode || e.which,
            stringKey = keyCode.toString(),
            move = {
                '37': function () {
                    /*arrow left*/
                    that.xMotionSpeed = that.xMotionSpeed - 2
                },
                '38': function () {
                    /*arrow up*/
                    that.yMotionSpeed = that.yMotionSpeed - 2
                },
                '39': function () {
                    /*arrow right*/
                    that.xMotionSpeed = that.xMotionSpeed + 2
                },
                '40': function () {
                    /*arrow down*/
                    that.yMotionSpeed = that.yMotionSpeed + 2
                }
            }

        move[stringKey]()
    }

    document.onkeyup = function () {

        that.xMotionSpeed = 0
        that.yMotionSpeed = 0

    }
}

export default Player
