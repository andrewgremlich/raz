import database from './firebaseConfig.js'

let enemyRef = database.ref('enemy')

function main(playerPos) {
    
    console.log(playerPos)

    return new Promise((resolve, reject) => {

        enemyRef.once("value", snap => {
            let value = snap.val(),
                positions = {
                    enemyPos: value,
                    playerPos: playerPos
                }

            if (value) {
                resolve(positions)
            }
        })
        
    })
}

export default main