export let Renderer = {

  renderToCanvas() {
    this.canvas.clearCanvas();
    this.canvas.drawBorders();

    this.playerXAxisMove();
    this.playerYAxisMove();

    for (let player of this.players) {
      player.drawBeing(this.canvas.ctx);
    }
  },

  playerXAxisMove() {
    if (this.rightPressed && this.players[0].x < this.canvas.width - this.players[0].radius) {
      this.players[0].x += 7;
    } else if (this.leftPressed && this.players[0].x > this.players[0].radius) {
      this.players[0].x -= 7;
    }
  },

  playerYAxisMove() {
    if (this.topPressed && this.players[0].y > this.players[0].radius) {
      this.players[0].y -= 7;
    } else if (this.bottomPressed && this.players[0].y < this.canvas.height - this.players[0].radius) {
      this.players[0].y += 7;
    }
  }
}
