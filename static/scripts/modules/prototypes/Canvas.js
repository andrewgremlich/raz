import { getById, drawBox } from '../lib.js';

/*
Canvas prototype constructor
*/
export function Canvas(data, numPlayers) {
  this.canvasElement = getById('myCanvas');
  this.ctx = this.canvasElement.getContext('2d');
  this.width = 2000 * numPlayers;
  this.height = 2000 * numPlayers;
  this.data = data;

  this.createCanvasSize();
}

Canvas.prototype.createCanvasSize = function() {
  this.canvasElement.height = this.height;
  this.canvasElement.width = this.width;
}

/*Prototype method to draw the borders on the canvas.  Purely decorative*/
Canvas.prototype.drawBorders = function() {
  drawBox(this);
};

Canvas.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
};
