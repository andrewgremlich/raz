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

            socket.emit('login', {
                'clientData': socket.renderingObj
            })

            socket.broadcast.emit('user joined', {
                'clientData': socket.renderingObj
            })
        })

        socket.on('go left', data => {
            console.log(data)
            socket.broadcast.emit('on left', data)
        })
        socket.on('go up', data => {
            console.log(data)
            socket.broadcast.emit('on up', data)
        })
        socket.on('go right', data => {
            console.log(data)
            socket.broadcast.emit('on right', data)
        })
        socket.on('go down', data => {
            console.log(data)
            socket.broadcast.emit('on down', data)
        })
        socket.on('reset motion', data => {
            console.log(data)
            socket.broadcast.emit('on reset', data)
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