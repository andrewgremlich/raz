class Player {
    constructor(x, y) {
        this.width = 10
        this.height = 10
        this.x = x
        this.y = y
        this.xMotionSpeed = 0
        this.yMotionSpeed = 0
        this.radius = 10
    }

    drawPlayer(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#558bb8'
        ctx.fill()
        ctx.closePath()
    }

    updatePlayerPosition() {
        this.x += this.xMotionSpeed
        this.y += this.yMotionSpeed
    }

    collision(cwidth, cheight) {

        var xPos = this.x + this.xMotionSpeed,
            yPos = this.y + this.yMotionSpeed

        if (xPos > cwidth - this.radius || xPos < this.radius) this.xMotionSpeed = -this.xMotionSpeed
        if (yPos > cheight - this.radius || yPos < this.radius) this.yMotionSpeed = -this.yMotionSpeed
    }

    movePlayer() {

        var that = this

        document.onkeydown = e => {

            /*To make a static speed instead of a steady acceleration*/

            that.xMotionSpeed = 0
            that.yMotionSpeed = 0

            let keyCode = e.keyCode || e.which,
                stringKey = keyCode.toString(),
                move = {
                    '37': () => {
                        /*arrow left*/
                        that.xMotionSpeed = that.xMotionSpeed - 2
                        socket.emit('go left', that)
                    },
                    '38': () => {
                        /*arrow up*/
                        that.yMotionSpeed = that.yMotionSpeed - 2
                        socket.emit('go up', that)
                    },
                    '39': () => {
                        /*arrow right*/
                        that.xMotionSpeed = that.xMotionSpeed + 2
                        socket.emit('go right', that)
                    },
                    '40': () => {
                        /*arrow down*/
                        that.yMotionSpeed = that.yMotionSpeed + 2
                        socket.emit('go down', that)
                    }
                }

            move[stringKey]()
        }

        document.onkeyup = () => {

            that.xMotionSpeed = 0
            that.yMotionSpeed = 0

            socket.emit('reset motion', that)

        }
    }
}

export default Player