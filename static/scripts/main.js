import { Game } from './modules/prototypes/Game.js';

import '../style/main.css';

/*

*** NEW implementation!

ws.onmessage = msg => console.log(msg.data)

ws.send('WebSockets are awesome!')
*/

const host = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(host);

const StartGame = (socket => {

  const game =  new Game(socket, 1);
  console.log('GAME OBJECT', game);
  // setInterval(() => game.renderToCanvas(), 1000/60);

  function render() {
    game.players[0].determineEdges();

    game.canvas.clearCanvas();
    game.canvas.drawBorders();

    // game.dead = game.determineEnemyCollision() || false;
    game.collided = game.determineObstacleCollision();

    game.playerXAxisMove();
    game.playerYAxisMove();

    game.keepPlayerToCenterScreen();

    game.obstacles.renderObstacles();

    for (let player of game.players) {
      player.drawBeing(game.canvas.ctx);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

})(ws);
