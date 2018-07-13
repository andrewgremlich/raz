import { Canvas } from './modules/prototypes/Canvas.js';
import { renderToCanvas } from './modules/renderToCanvas.js';

import '../style/main.css';

const socket = io();
const StartGame = ((socket) => {
  const canvas =  new Canvas(socket, 1);

  window.requestAnimationFrame(renderToCanvas(canvas));

})(socket);

socket.emit('chat message', 'Hello there!');

socket.on('chat message', msg => console.log(msg));

console.log('hello world!')
