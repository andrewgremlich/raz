import { Game } from './modules/prototypes/Game.js';

import '../style/main.css';

const socket = io();
const StartGame = ((socket) => {

  const game =  new Game(socket, 1);

  console.log('GAME OBJECT', game)

  setInterval(() => {
    game.renderToCanvas()
  }, 1000/60);
})(socket);

socket.emit('chat message', 'Hello there!');

socket.on('chat message', msg => console.log(msg));

console.log('hello world!')
