class Enemy {
    constructor(x, y) {
        this.width = 10
        this.height = 10
        this.xMotionSpeed = 4
        this.yMotionSpeed = 2
        this.radius = 10
        this.x = x
        this.y = y
        this.collisions = 0
    }

    drawEnemy(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius + this.collisions * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = '#a73838'
        ctx.fill()
        ctx.closePath()
    }

    updateEnemyPosition() {
        this.x += this.xMotionSpeed
        this.y += this.yMotionSpeed
    }

    collision(cwidth, cheight) {

        var xPos = this.x + this.xMotionSpeed,
            yPos = this.y + this.yMotionSpeed,
            collisionFactor = this.collisions * 1.5

        /*The collision of an expanding circle is being detected half the time.*/

        if (xPos > cwidth - this.radius - collisionFactor || xPos < this.radius + collisionFactor) {
            this.xMotionSpeed = -this.xMotionSpeed
            this.collisions = this.collisions + 2
        }
        if (yPos > cheight - this.radius - collisionFactor || yPos < this.radius + collisionFactor) {
            this.yMotionSpeed = -this.yMotionSpeed
            this.collisions = this.collisions + 2
        }
    }
}

export default Enemy