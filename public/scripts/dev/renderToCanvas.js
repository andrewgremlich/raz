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
    
    /*This if statement should see if any addtional players joined.
      If any addtional players join then reset the Player rendering
      Object for the canvas.*/
    if (Object.keys(players).length !== Object.keys(PlayersObj).length) {
        PlayersObj = false
    }
    
    /*This if statement checks to see if there is already a PlayersObj 
      object.  If there is a players object, then just set the 
      new player position for the draw.  If there is not a PlayersObj
      set, then make the objects for the draw.*/
    if (PlayersObj) {
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
        PlayersObj[i].drawPlayer()
        /*Add addtional object methods here*/
    }
}

function renderEnemyPosition(enemy) {
    
    /*Check if the EnemyObj is already set.  If the EnemyObj variable
      is already set, then set the player position with the incoming
      parameter.  If not set, then create a new Enemy object.*/
    if (EnemyObj) {
        EnemyObj.setEnemyPosition(enemy)
    } else {
        EnemyObj = new Enemy(canvas.width, canvas.height)
    }
    
    EnemyObj.drawEnemy(canvas.ctx)
    /*Add addtional object methods here*/
}
 
function renderToCanvas(renderingObj) {

    console.log(renderingObj)
    
    canvas.clearFrame()
    canvas.drawBorders()
    
    renderEnemyPosition(renderingObj.enemy)
    renderPlayersPositions(renderingObj.players)
    
    /*
    endgame(player, enemy)
    */
}

export default renderToCanvas