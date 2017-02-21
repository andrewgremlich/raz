const checkForEnemy = require('./checkForEnemy')

function socketio(io) {

    var numUsers = 0

    io.on('connection', socket => {
        var addedUser = false
        socket.renderingArray = []

        if (checkForEnemy(socket.renderingArray)) {
            socket.renderingArray.push({
                'id': 'enemy',
                'name': 'enemy',
                'x': 50,
                'y': 50,
                'dead': false
            })
        }

        socket.on('add user', username => {
            if (addedUser) return

            ++numUsers

            socket.renderingArray.push({
                'id': socket.id,
                'name': username,
                'x': 25,
                'y': 25,
                'dead': false
            })

            addedUser = true

            socket.emit('login', {
                'clientData': socket.renderingArray,
                'numUsers': numUsers
            })

            socket.broadcast.emit('user joined', {
                'clientData': socket.renderingArray,
                'numUsers': numUsers
            })
        })

        socket.on('disconnect', () => {
            if (addedUser) {
                --numUsers

                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                })
            }
        })
    })

}

module.exports = socketio
