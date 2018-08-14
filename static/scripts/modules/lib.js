export function extend(destination, source) {
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination;
}

export function getById(string) {
  return document.getElementById(string)
}

//NOTE from my understanding 'ctx' and 'canvasObj.ctx' are both referencing
//      the exact same thing.
export function drawCircle(circleObj, ctx) {
  ctx.beginPath();
  ctx.arc(circleObj.x, circleObj.y, circleObj.radius, 0, Math.PI * 2);
  ctx.fillStyle = circleObj.playerColor;
  ctx.fill();
  ctx.closePath();
}

export function drawBox(canvasObj) {
  canvasObj.ctx.beginPath();
  canvasObj.ctx.moveTo(2, 2);
  canvasObj.ctx.lineTo(canvasObj.width - 2, 2);
  canvasObj.ctx.lineTo(canvasObj.width - 2, canvasObj.height - 2);
  canvasObj.ctx.lineTo(2, canvasObj.height - 2);
  canvasObj.ctx.lineTo(2, 2);
  canvasObj.ctx.stroke();
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
