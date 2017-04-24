import database from './firebaseConfig.js'
import renderToCanvas from './renderToCanvas.js'

/*Get all the other players from the database
  and add them to the rendering object.*/
function everyOneElseSpawn(renderObj) {
        
        let rObj = renderObj
        
        return new Promise(resolve => {
            
            database.ref('users').on("value", snap => {
                let databaseValue = snap.val()
                rObj.players = databaseValue
                renderToCanvas(rObj)
                resolve(rObj)
            })
            
        })
}

export default everyOneElseSpawn