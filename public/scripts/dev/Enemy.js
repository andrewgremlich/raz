/*
Enemy Prototype constructor
*/
function Enemy(cwidth, cheight, pos) {
    this.width = 10
    this.height = 10
    this.xMotionSpeed = -3
    this.yMotionSpeed = -3
    this.radius = 10
    this.wboundary = cwidth
    this.hboundary = cheight
    this.x = this.wboundary - 100
    this.y = this.hboundary - 100
    this.collisions = 0
}

Enemy.prototype.setEnemyPosition = function(enemyPos) {
    this.x = enemyPos.x
    this.y = enemyPos.y
}

/*
Draw the enemy circle on the canvas element.
*/

Enemy.prototype.drawEnemy = function (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius + this.collisions * 1.5, 0, Math.PI * 2)
    ctx.fillStyle = '#a73838'
    ctx.fill()
    ctx.closePath()
}

/*
Automatic motion of the enemy circle.
*/

/*!!!! Use this to update position in Firebase?*/
Enemy.prototype.updateEnemyPosition = function () {
    this.x += this.xMotionSpeed
    this.y += this.yMotionSpeed
}

/*
Automatic and size incrementing motion of the enemy.  Each time that the enemy
touches a wall the enemy grows.
*/

Enemy.prototype.collision = function (cwidth, cheight) {

    var xPos = this.x + this.xMotionSpeed,
        yPos = this.y + this.yMotionSpeed,
        collisionFactor = this.collisions * 1.75

    /*The collision of an expanding circle is being detected half the time.*/

    if (xPos > cwidth - this.radius - collisionFactor || xPos < this.radius + collisionFactor) {
        this.xMotionSpeed = -this.xMotionSpeed
        this.collisions = this.collisions + 1
    }
    if (yPos > cheight - this.radius - collisionFactor || yPos < this.radius + collisionFactor) {
        this.yMotionSpeed = -this.yMotionSpeed
        this.collisions = this.collisions + 1
    }

}

export default Enemy
