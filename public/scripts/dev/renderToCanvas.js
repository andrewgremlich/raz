/*******************OBJECTS******************/
import Player from './Player.js'
import Canvas from './Canvas.js'
import Enemy from './Enemy.js'

/*******************FUNCTIONS****************/
import endgame from './endgame.js'

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
    if (PlayersObj && Object.keys(players).length === Object.keys(PlayersObj).length) {
        for (let k in PlayersObj) {
            PlayersObj[k].setPlayerPosition(players[k])
        }
    } else {
        PlayersObj = {}
        
        for (let j in players) {
            PlayersObj[j] = new Player(players[j], j)
        }
    }
    
    /*Run through the PlayersObj and activate all the methods for 
      interactivity to happen with the canvas*/
    for (let i in PlayersObj) {
        PlayersObj[i].drawPlayer(canvas.ctx)
    }
        /*!!!!Add addtional object methods here*/
    PlayersObj[localStorage['razSessionToken']].movePlayer()
}

function renderEnemyPosition(enemy) {
    
    /*Check if the EnemyObj is already set.  If the EnemyObj variable
      is already set, then set the player position with the incoming
      parameter.  If not set, then create a new Enemy object.*/
    if (EnemyObj) {
        EnemyObj.setEnemyPosition()
    } else {
        EnemyObj = new Enemy(canvas.width, canvas.height)
    }
    
    EnemyObj.drawEnemy(canvas.ctx)
    EnemyObj.collision(canvas.width, canvas.height)
    setInterval(EnemyObj.setMotion(), 1000)
}
 
function renderToCanvas(renderingObj) {

    console.log(renderingObj)
    
    canvas.clearFrame()
    canvas.drawBorders()
    
    renderEnemyPosition()
    renderPlayersPositions(renderingObj.players)
    
    /*
    endgame(player, enemy)
    */
}

export default renderToCanvas