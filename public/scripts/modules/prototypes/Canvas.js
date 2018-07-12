import { Player } from './Player.js';
/*
Canvas prototype constructor
*/
export function Canvas(data, numPlayers) {
  this.canvasElement = document.getElementById('myCanvas');
  this.ctx = this.canvasElement.getContext('2d');
  this.width = 800;
  this.height = 800;
  this.numPlayers = numPlayers;
  this.players = [];
  this.data = data;

  this.createPlayers(this.numPlayers);
  this.createCanvasSize();
  this.refreshFrame();
}

Canvas.prototype.refreshFrame = function() {
  setInterval(() => {
    this.clearCanvas();
    this.drawBorders();
    for (let player of this.players) {
      player.drawPlayer()
    }
  }, 100)
}

Canvas.prototype.createCanvasSize = function() {
  document.querySelector('#myCanvas').height = this.height;
  document.querySelector('#myCanvas').width = this.width;
}

/*Create the players for the game session*/
Canvas.prototype.createPlayers = function() {
  for (let i = 0; i < this.numPlayers; i++) {
    this.players.push(new Player({x: 50, y: 50}, 12345, this.ctx))
  }
}

/*Prototype method to draw the borders on the canvas.  Purely decorative*/
Canvas.prototype.drawBorders = function() {
  let ctx = this.ctx;
  ctx.beginPath();
  ctx.moveTo(2, 2);
  ctx.lineTo(this.width - 2, 2);
  ctx.lineTo(this.width - 2, this.height - 2);
  ctx.lineTo(2, this.height - 2);
  ctx.lineTo(2, 2);
  ctx.stroke();
};

Canvas.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
};
