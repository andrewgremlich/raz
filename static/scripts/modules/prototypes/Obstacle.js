import { getRandomInt, drawCircle } from '../lib.js';

export function Obstacles (canvas) {
  this.obstacleColor = '#51bc64';
  this.numObstacles = 10;
  this.obstacleArray = [];
  this.canvas = canvas;

  this.makeObstacles();
}

Obstacles.prototype.makeObstacles = function (canvas) {
  let that = this;

  for (let i = 0; i < that.numObstacles; i++) {
    that.obstacleArray.push({
      x: getRandomInt(50, that.canvas.width - 50),
      y: getRandomInt(50, that.canvas.height - 50),
      radius: getRandomInt(50, 100),
      playerColor: that.obstacleColor
    });
  }
};

Obstacles.prototype.renderObstacles = function () {
  for (let obst of this.obstacleArray) {
    drawCircle(obst, this.canvas.ctx);
  }
};
