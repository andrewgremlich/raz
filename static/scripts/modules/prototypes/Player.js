import { Being } from './Being.js';

/*
Player prototype constructor
*/
export function Player(spawnCoor, playerId, ctx, canvasWidth, canvasHeight) {
  this.id = playerId;
  this.ctx = ctx;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  Being.call(this, spawnCoor)

  this.movePlayer(this.canvasWidth, this.canvasHeight);
}

Player.prototype = Object.create(Being.prototype);
/*
Player motion according to the arrow controls in the movePlayer method
*/
Player.prototype.motionSpeedToPosition = function() {
  this.x += this.xMotionSpeed;
  this.y += this.yMotionSpeed;
};

/*
Evaluate collision of the player with the edges of the play area.
*/
Player.prototype.collisionWithBorder = function(cwidth, cheight) {

  let xPos = this.x + this.xMotionSpeed,
    yPos = this.y + this.yMotionSpeed;

  if (xPos > cwidth - this.radius || xPos < this.radius) this.xMotionSpeed = -this.xMotionSpeed;
  if (yPos > cheight - this.radius || yPos < this.radius) this.yMotionSpeed = -this.yMotionSpeed;
};

/*
Directional control with the arrow keys.
*/
Player.prototype.movePlayer = function(cwidth, cheight) {

  let that = this,
    move = {
      '37': () => { that.xMotionSpeed = that.xMotionSpeed - that.motionLimit },
      '38': () => { that.yMotionSpeed = that.yMotionSpeed - that.motionLimit },
      '39': () => { that.xMotionSpeed = that.xMotionSpeed + that.motionLimit },
      '40': () => { that.yMotionSpeed = that.yMotionSpeed + that.motionLimit }
    };

  document.onkeydown = function(e) {
    let keyCode = e.keyCode || e.which,
      stringKey = keyCode.toString();

    move[stringKey]()

    that.x += that.xMotionSpeed;
    that.y += that.yMotionSpeed;

    that.collisionWithBorder(cwidth, cheight);
  };

  document.onkeyup = function() {
    that.xMotionSpeed = 0;
    that.yMotionSpeed = 0;
  };
};
