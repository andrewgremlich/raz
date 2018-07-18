import { Player } from './Player.js';
import { Canvas } from './Canvas.js';
import { Events } from './Events.js';
import { Renderer } from './Renderer.js';
import { extend } from '../lib.js';

export function Game(data, numPlayers) {
  this.numPlayers = numPlayers;
  this.players = [];
  this.data = data;
  this.canvas = new Canvas(this.data, this.numPlayers);

  this.createPlayers(this.numPlayers);
}

Game.prototype = new Events();

extend(Game.prototype, Renderer);

/*Create the players for the game session*/
Game.prototype.createPlayers = function() {
  for (let i = 0; i < this.numPlayers; i++) {
    this.players.push(new Player({ x: 50, y: 50 }, 12345, this.canvas.ctx, this.canvas.width, this.canvas.height))
  }
}
