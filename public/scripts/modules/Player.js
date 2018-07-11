import database from './firebaseConfig.js';
import mobileCheck from './mobilecheck.js';

/*
Player prototype constructor
*/

function Player(spawnCoor, playerId) {
  this.width = 10;
  this.height = 10;
  this.x = spawnCoor.x;
  this.y = spawnCoor.y;
  this.xMotionSpeed = 0;
  this.yMotionSpeed = 0;
  this.id = playerId;
  this.radius = 10;
}

/*
Draw player.  It's just a circle for now.
*/

Player.prototype.drawPlayer = function (ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#558bb8';
  ctx.fill();
  ctx.closePath();
};

/*Set player position*/

Player.prototype.setPlayerPosition = function (playerPos) {
  this.x = playerPos.x;
  this.y = playerPos.y;
};

/*
Player motion according to the arrow controls in the movePlayer method
*/

Player.prototype.motionSpeedToPosition = function () {
  this.x += this.xMotionSpeed;
  this.y += this.yMotionSpeed;
};

/*
Evaluate collision of the player with the edges of the play area.
*/

Player.prototype.collisionWithBorder = function (cwidth, cheight) {

  var xPos = this.x + this.xMotionSpeed,
    yPos = this.y + this.yMotionSpeed;

  if (xPos > cwidth - this.radius || xPos < this.radius) this.xMotionSpeed = -this.xMotionSpeed;
  if (yPos > cheight - this.radius || yPos < this.radius) this.yMotionSpeed = -this.yMotionSpeed;
};

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
    token = localStorage['razSessionToken'],
    xCoorDatabase = database.ref(`users/${token}/x`),
    yCoorDatabase = database.ref(`users/${token}/y`),
    move = {
      'left': function () {
        //console.log("firing left arrow!")
        that.xMotionSpeed = that.xMotionSpeed - 2;
        xCoorDatabase.set(leftMove);
      },
      'up': function () {
        //console.log("firing up arrow!")
        that.yMotionSpeed = that.yMotionSpeed - 2;
        yCoorDatabase.set(upMove);
      },
      'right': function () {
        //console.log("firing right arrow!")
        that.xMotionSpeed = that.xMotionSpeed + 2;
        xCoorDatabase.set(rightMove);
      },
      'down': function () {
        //console.log("firing down arrow!")
        yCoorDatabase.set(downMove);
        that.yMotionSpeed = that.yMotionSpeed + 2;
      }
    };

  if (mobileCheck) {
    document.querySelector('.d-pad').onclick = e => {
      let target = e.target,
        targetID = target.getAttribute('id'),
        direction = targetID.replace('d-', '');

      move[direction]();
    };
  }
    
  if (!mobileCheck) {
    document.onkeydown = function (e) {
      let keyCode = e.keyCode || e.which,
        stringKey = keyCode.toString();

      if (borderCollisionX) {
        console.log('collision x!');
        if (xPos > cwidth - that.radius) {
          move['left']();
        } else if (xPos < that.radius) {
          move['right']();
        }
        return;
      } else if (borderCollisionY) {
        console.log('collision y!');
        if (yPos > cheight - that.radius) {
          move['up']();
        } else if (yPos < that.radius) {
          move['down']();
        }
        return;
      }
            
      if (stringKey === '37') move['left']();
      if (stringKey === '38') move['up']();
      if (stringKey === '39') move['right']();
      if (stringKey === '40') move['down']();
    };

    document.onkeyup = function () {
      that.xMotionSpeed = 0;
      that.yMotionSpeed = 0;
    };
  }
};

export default Player;
