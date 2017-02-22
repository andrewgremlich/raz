const checkForEnemy = require('./checkForEnemy')

function socketio(io) {

    io.on('connection', socket => {

        var addedUser = false

        socket.renderingObj = {
            'player': {},
            'enemy': {}
        }

        socket.emit('user connected', {
            'userID': socket.id,
            'message': 'you have connected'
        })

        socket.broadcast.emit('lobbyUser', {
            'message': 'there is a new user in the lobby'
        })

        socket.on('add user to game', username => {

            socket.renderingObj.player = {
                'id': socket.id,
                'name': username,
                'x': 25,
                'y': 25,
                'dead': false
            }

            /*NEEDS TO STAY AFTER PLAYER HAS BEEN SET*/
            /* let enemyCheck = socket.renderingObj.enemy.hasOwnProperty('id')

             if (!enemyCheck) {
                 socket.renderingObj.enemy = {
                     'id': 'enemy',
                     'name': 'enemy',
                     'x': 50,
                     'y': 50,
                     'dead': false
                 }
             }*/

            console.log(socket.renderingObj)

            socket.emit('login', {
                'clientData': socket.renderingObj
            })

            socket.broadcast.emit('user joined', {
                'clientData': socket.renderingObj
            })
        })

        socket.on('disconnect', () => {

            socket.emit('user left', {
                'message': 'you left'
            })

            socket.broadcast.emit('user left', {
                'message': 'user left'
            })

        })
    })

}

module.exports = socketio