import { Player } from './Player.js';
import { Canvas } from './Canvas.js';
import { Events } from './Events.js';
import { Obstacles } from "./Obstacle.js";
import { renderer } from '../mixins/renderer.js';
import { extend } from '../lib.js';

export function Game(data, numPlayers) {
  this.numPlayers = numPlayers;
  this.players = [];
  this.data = data;
  this.canvas = new Canvas(this.data, this.numPlayers);

  this.obstacles = new Obstacles(this.canvas);

  this.createPlayers(this.numPlayers);
}

Game.prototype = new Events();

extend(Game.prototype, renderer);

/*Create the players for the game session*/
Game.prototype.createPlayers = function() {
  for (let i = 0; i < this.numPlayers; i++) {
    if (i === 0)
      this.players.push(new Player({ x: this.canvas.width / 2, y: this.canvas.height / 2 }, 12345, this.canvas.ctx, this.canvas.width, this.canvas.height))
  }
}
