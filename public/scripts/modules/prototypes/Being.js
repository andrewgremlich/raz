export function Being(spawnCoor) {
  this.width = 10;
  this.height = 10;
  this.radius = 10;
  this.xMotionSpeed = 0;
  this.yMotionSpeed = 0;
  this.x = spawnCoor.x;
  this.y = spawnCoor.y;
  this.motionLimit = 2;
}

/*
Draw player.  It's just a circle for now.
*/
Being.prototype.drawBeing = function () {
  let ctx = this.ctx;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#558bb8';
  ctx.fill();
  ctx.closePath();
};
