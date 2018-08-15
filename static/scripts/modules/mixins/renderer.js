function utilCollided(point, obst, p) {
  var distancesquared = (p[0] - obst.x) * (p[0] - obst.x) + (p[1] - obst.y) * (p[1] - obst.y);
  return distancesquared <= obst.radius * obst.radius;
}

export let renderer = {

  renderToCanvas() {

    this.mainPlayer = this.players[0];

    this.mainPlayer.determineEdges();

    this.canvas.clearCanvas();
    this.canvas.drawBorders();

    // this.dead = this.determineEnemyCollision() || false;
    this.collided = this.determineObstacleCollision();

    this.playerXAxisMove();
    this.playerYAxisMove();

    this.keepPlayerToCenterScreen();

    this.obstacles.renderObstacles();

    for (let player of this.players) {
      player.drawBeing(this.canvas.ctx);
    }
  },

  determineObstacleCollision() {
    let returnCollisionObj = {
      xLeft: false,
      xRight: false,
      yTop: false,
      yBottom: false
    },
      p = this.mainPlayer,
      stopForLoop = false;

    for (let obst of this.obstacles.obstacleArray) {
      returnCollisionObj = {
        xLeft: (() => {
            if (utilCollided('xLeft', obst, p.xLeft) === true) {
              stopForLoop = true;
              return true;
            } else {
              return false;
            }
        })(),
        xRight: (() => {
          if (utilCollided('xRight', obst, p.xRight) === true) {
            return utilCollided('xRight', obst, p.xRight);
            stopForLoop = true;
          } else {
            return false;
          }
        })(),
        yTop: (() => {
          if (utilCollided('yTop', obst, p.yTop) === true) {
            return utilCollided('yTop', obst, p.yTop);
            stopForLoop = true;
          } else {
            return false;
          }
        })(),
        yBottom: (() => {
          if (utilCollided('yBottom', obst, p.yBottom) === true) {
            return utilCollided('yBottom', obst, p.yBottom)
            stopForLoop = true;
          } else {
            return false;
          }
        })()
      }

      if (stopForLoop) break;
    }

    return returnCollisionObj;
  },

  playerXAxisMove() {
    if (this.rightPressed
          && this.players[0].x < this.canvas.width - this.players[0].radius
          && this.collided.xLeft !== true) {
      this.players[0].x += 7;
    } else if (this.leftPressed
          && this.players[0].x > this.players[0].radius
          && this.collided.xRight !== true) {
      this.players[0].x -= 7;
    }
  },

  playerYAxisMove() {
    if (this.topPressed
          && this.players[0].y > this.players[0].radius
          && this.collided.yBottom !== true) {
      this.players[0].y -= 7;
    } else if (this.bottomPressed
          && this.players[0].y < this.canvas.height - this.players[0].radius
          && this.collided.yTop !== true) {
      this.players[0].y += 7;
    }
  },

  keepPlayerToCenterScreen() {
    const PLAYER_LEFT = this.players[0].x - window.innerWidth / 2;
    const PLAYER_TOP = this.players[0].y - window.innerHeight / 2;

    window.scrollTo({
      top: PLAYER_TOP,
      left: PLAYER_LEFT,
      behavior: 'instant'
    });
  },

  determineEnemyCollision() {
    let collided = false;

    for (let obst of this.obstacles.obstacleArray) {
      const RADIUS_DIFF = (obst.radius - this.mainPlayer.radius) ** 2;
      const RADIUS_SUM = (obst.radius + this.mainPlayer.radius) ** 2;
      const CIRCLE_DETER = (obst.x - this.mainPlayer.x) ** 2 + (obst.y - this.mainPlayer.y) ** 2;

      if (RADIUS_DIFF <= CIRCLE_DETER &&
        CIRCLE_DETER <= RADIUS_SUM) {
        collided = true;
      }
    }

    return collided;
  }

};
