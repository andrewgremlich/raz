import database from './firebaseConfig.js'

let usersRef = database.ref('users')

function main(renderObj) {

        let rObj = renderObj,
            razSessionToken,
            nowToken = JSON.stringify(Date.now()),
            spawnCoor = {
                x: 50,
                y: 50
            }

        try {
            razSessionToken = localStorage['razSessionToken']
        } catch (e) {
            console.warn('No sesion token detected.')
            razSessionToken = false
        }

        return new Promise(resolve => {
        
            if (razSessionToken) {
                usersRef.child(razSessionToken).once('value', snap => {
                    let newSpawnCoor = snap.val()
                    
                    rObj.players = newSpawnCoor
                    
                    resolve(rObj)
                })
            } else {
                localStorage['razSessionToken'] = nowToken

                usersRef.child(nowToken).set(spawnCoor)
                
                rObj.players = spawnCoor
                
                resolve(rObj)
            }
        
        })
}

export default main