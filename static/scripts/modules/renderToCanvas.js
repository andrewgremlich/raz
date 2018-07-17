export function renderToCanvas(canvas) {
  return function() {
    canvas.clearCanvas();
    canvas.drawBorders();
    for (let player of canvas.players) {
      player.drawBeing()
    }
    // requestAnimationFrame(renderToCanvas(canvas));
  }
}
