import { Being } from './Being.js';

/*
Enemy Prototype constructor
*/
export function Enemy(cwidth, cheight, pos) {
  this.collisions = 0;
}

Enemy.prototype = Object.create(Being.prototype);
