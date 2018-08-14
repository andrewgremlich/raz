import { Game } from './modules/prototypes/Game.js';

import '../style/main.css';

/*

*** NEW implementation!

ws.onmessage = msg => console.log(msg.data)

ws.send('WebSockets are awesome!')
*/

const host = location.origin.replace(/^http/, 'ws')
const ws = new WebSocket(host)

const StartGame = (socket => {

  const game =  new Game(socket, 1);
  console.log('GAME OBJECT', game)
  setInterval(() => game.renderToCanvas(), 1000/60);

})(ws);
