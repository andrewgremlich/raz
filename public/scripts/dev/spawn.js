import database from './firebaseConfig.js'

let usersRef = database.ref('users')

function main() {

    let razSessionToken,
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

    return new Promise((resolve, reject) => {
        
        if (razSessionToken) {
            usersRef.child(razSessionToken).once('value', snap => {
                let newSpawnCoor = snap.val()
                resolve(newSpawnCoor)
            })
        } else {
            localStorage['razSessionToken'] = nowToken

            usersRef.child(nowToken).set(spawnCoor)
            
            resolve(spawnCoor)
        }
        
    })
}

export default main