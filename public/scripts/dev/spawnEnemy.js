import database from './firebaseConfig.js'

let enemyRef = database.ref('enemy')

/*Find the enemy position data and add it to the rendering object.*/
function main(renderObj) {
    
          
        let rObj = renderObj

        return new Promise(resolve => {

            enemyRef.once("value", snap => {
                let value = snap.val()

                rObj.enemy = value
                
                    
                if (value) {
                    resolve(rObj)
                } else {
                    /*
                    This else statement should never happen.  
                    Doesn't make much sense in the long run
                    of things.  This could set the enemy just
                    in case if the enemy isn't set.
                    */
                    enemyRef.set({
                        x: 200,
                        y: 50
                    }, resolve(rObj))
                }
            })
        
        })
}

export default main