/*******************OBJECTS******************/
import Player from './Player.js'
import Canvas from './Canvas.js'
import Enemy from './Enemy.js'

/*******************FUNCTIONS****************/
function endgame(player, enemy) {
    
    var enemyRadius = enemy.radius + enemy.collisions * 1.75,
        playerRadius = player.radius,
        middleEvalExpr = Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2),
        lowerEval = Math.pow(playerRadius - enemyRadius, 2) <= middleEvalExpr,
        higherEval = middleEvalExpr <= Math.pow(playerRadius + enemyRadius, 2)

    return lowerEval && higherEval 
}

let canvas = new Canvas(),
    PlayersObj,
    EnemyObj

function renderPlayersPositions(players) {

    /*This if statement checks to see if there is already a PlayersObj 
      object.  If there is a players object, then just set the 
      new player position for the draw.  If there is not a PlayersObj
      set, then make the objects for the draw.
      
      It also checks if the incoming players object is the same length
      as the objects stored.  This determines if a player has joined.
      */

    if (players) {
        if (PlayersObj && Object.keys(players).length === Object.keys(PlayersObj).length) {
            /*Draw for the same amount of players in database*/
            for (let k in PlayersObj) {
                PlayersObj[k].setPlayerPosition(players[k])
            }
        } else {
            /*Initial draw and new incoming player redraw*/
            PlayersObj = {}
            for (let j in players) {
                PlayersObj[j] = new Player(players[j], j)
            }
        }
    }

    /*!!!!Add addtional object methods here*/
    PlayersObj[localStorage['razSessionToken']].movePlayer(canvas.width, canvas.height)
    PlayersObj[localStorage['razSessionToken']].motionSpeedToPosition()

    /*Run through the PlayersObj and activate all the methods for 
      interactivity to happen with the canvas*/
    for (let i in PlayersObj) {
        PlayersObj[i].drawPlayer(canvas.ctx)
    }
}

function renderEnemyPosition(enemy) {

    /*Check if the EnemyObj is already set.  If the EnemyObj variable
      is already set, then set the player position with the incoming
      parameter.  If not set, then create a new Enemy object.*/
    if (!EnemyObj) {
        EnemyObj = new Enemy(canvas.width, canvas.height)
    }

    EnemyObj.drawEnemy(canvas.ctx)
    EnemyObj.collision(canvas.width, canvas.height)
    EnemyObj.setMotion()
    let gameOver = endgame(PlayersObj[localStorage['razSessionToken']], EnemyObj)
    if (gameOver) {
        document.querySelector('body').innerHTML = "<h1>Game Over!</h1><p>Refresh the page to start again.</p>"
    }
}

function renderToCanvas(renderingObj, enemy) {

    canvas.clearFrame()
    canvas.drawBorders()

    if (!PlayersObj) renderPlayersPositions(renderingObj.players)

    if (enemy) {
        renderEnemyPosition()
        renderPlayersPositions()
    }
    
}

export default renderToCanvas