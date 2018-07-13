import { Being } from './Being.js';

/*
Enemy Prototype constructor
*/
export function Enemy(cwidth, cheight, pos) {
  this.collisions = 0;
}

Enemy.prototype = Object.create(Being.prototype);

Enemy.prototype.setMotion = function () {
  this.x += this.xMotionSpeed;
  this.y += this.yMotionSpeed;
};

/*
Automatic and size incrementing motion of the enemy.  Each time that the enemy
touches a wall the enemy grows.
*/
Enemy.prototype.collision = function (cwidth, cheight) {

  var xPos = this.x + this.xMotionSpeed,
    yPos = this.y + this.yMotionSpeed,
    collisionFactor = this.collisions * 1.75;

    /*The collision of an expanding circle is being detected half the time.*/
  if (xPos > cwidth - this.radius - collisionFactor || xPos < this.radius + collisionFactor) {
    this.xMotionSpeed = -this.xMotionSpeed;
    this.collisions = this.collisions + 1;
  }
  if (yPos > cheight - this.radius - collisionFactor || yPos < this.radius + collisionFactor) {
    this.yMotionSpeed = -this.yMotionSpeed;
    this.collisions = this.collisions + 1;
  }

};
