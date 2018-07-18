import { drawCircle } from '../lib.js';

export function Being(spawnCoor) {
  this.radius = 10;
  this.x = spawnCoor.x;
  this.y = spawnCoor.y;
}

/*
Draw player.  It's just a circle for now.
*/
Being.prototype.drawBeing = function (ctx) {
  drawCircle(this, ctx);
};
