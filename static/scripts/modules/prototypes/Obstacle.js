import { getRandomInt, drawCircle } from "../lib.js";

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
    })
  }
}

Obstacles.prototype.renderObstacles = function () {
  for (let obst of this.obstacleArray) {
    drawCircle(obst, this.canvas.ctx)
  }
}


// Obstacles.prototype.obstaclesCollision = function () {
//   // (R0 - R1)^2 <= (x0 - x1)^2 + (y0 - y1)^2 <= (R0 + R1)^2
//   //TODO: work on this a bit more.
//
//   const PLAYER = this.players[0];
//
//   for (let obst of this.obstacles) {
//     const RADIUS_DIFF = (obst.radius - PLAYER.radius)**2;
//     const RADIUS_SUM = (obst.radius + PLAYER.radius)**2;
//     const CIRCLE_DETER = (obst.x - PLAYER.x)**2 + (obst.y - PLAYER.y)**2;
//
//     if (RADIUS_DIFF <= CIRCLE_DETER
//       && CIRCLE_DETER <= RADIUS_SUM
//       && WILL_CHANGE_POSITION) {
//       this.players[0].x = 0;
//       this.players[0].y = 0;
//     } else {
//       this.players[0].x = 0;
//       this.players[0].y = 0;
//     }
//   }
// }
