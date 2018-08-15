import { Being } from './Being.js';

/*
Player prototype constructor
*/
export function Player(spawnCoor, playerId, ctx, canvasWidth, canvasHeight) {
  this.id = playerId;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.playerColor = '#558bb8';

  Being.call(this, spawnCoor);
}

Player.prototype = Object.create(Being.prototype);

// Player.prototype
