import {
  drawCircle
} from '../lib.js';

export function Being(spawnCoor) {
  this.radius = 10;
  this.x = spawnCoor.x;
  this.y = spawnCoor.y;
  this.xLeft;
  this.xRight;
  this.yBottom;
  this.yTop;
}

/*
Draw player.  It's just a circle for now.
*/
Being.prototype.drawBeing = function(ctx) {
  drawCircle(this, ctx);
};

Being.prototype.determineEdges = function() {
  this.xLeft = [this.x - this.radius, this.y];
  this.xRight = [this.x + this.radius, this.y];
  this.yTop = [this.x, this.y + this.radius];
  this.yBottom = [this.x, this.y - this.radius];
}
