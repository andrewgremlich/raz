import { drawCircle } from '../lib.js';

const WILL_CHANGE_POSITION = false;

export let renderer = {

  renderToCanvas() {
    this.canvas.clearCanvas();
    this.canvas.drawBorders();

    this.playerXAxisMove();
    this.playerYAxisMove();

    this.keepPlayerToCenterScreen();
    this.renderObstacles();

    // this.obstaclesCollision();

    for (let player of this.players) {
      player.drawBeing(this.canvas.ctx);
    }
  },

  obstaclesCollision() {
    // (R0 - R1)^2 <= (x0 - x1)^2 + (y0 - y1)^2 <= (R0 + R1)^2

    //TODO: work on this a bit more.

    const PLAYER = this.players[0];

    for (let obst of this.obstacles) {
      const RADIUS_DIFF = (obst.radius - PLAYER.radius)**2;
      const RADIUS_SUM = (obst.radius + PLAYER.radius)**2;
      const CIRCLE_DETER = (obst.x - PLAYER.x)**2 + (obst.y - PLAYER.y)**2;

      if (RADIUS_DIFF <= CIRCLE_DETER
        && CIRCLE_DETER <= RADIUS_SUM
        && WILL_CHANGE_POSITION) {
        this.players[0].x = 0;
        this.players[0].y = 0;
      } else {
        this.players[0].x = 0;
        this.players[0].y = 0;
      }
    }
  },

  playerXAxisMove() {
    if (this.rightPressed && this.players[0].x < this.canvas.width - this.players[0].radius) {
      this.players[0].x += 7;
      WILL_CHANGE_POSITION = true;
    } else if (this.leftPressed && this.players[0].x > this.players[0].radius) {
      this.players[0].x -= 7;
      WILL_CHANGE_POSITION = true;
    }
  },

  playerYAxisMove() {
    if (this.topPressed && this.players[0].y > this.players[0].radius) {
      this.players[0].y -= 7;
      WILL_CHANGE_POSITION = true;
    } else if (this.bottomPressed && this.players[0].y < this.canvas.height - this.players[0].radius) {
      this.players[0].y += 7;
      WILL_CHANGE_POSITION = true;
    }
  },

  keepPlayerToCenterScreen() {
    const PLAYER_LEFT = this.players[0].x - window.innerWidth / 2;
    const PLAYER_TOP = this.players[0].y - window.innerHeight / 2;

    window.scrollTo({
      top: PLAYER_TOP,
      left: PLAYER_LEFT,
      behavior: 'instant'
    })
  },

  renderObstacles() {
    for (let obst of this.obstacles) {
      drawCircle(obst, this.canvas.ctx)
    }
  }
}
