const express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 3000,
    checkForEnemy = require("./modules/checkForEnemy")

server.listen(port, function () {
    console.log('Server listening at port %d', port)
})

// Routing
app.use(express.static(__dirname + '/app'))

var numUsers = 0

io.on('connection', socket => {
    var addedUser = false
    socket.renderingArray = []

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

        if (checkForEnemy(socket.renderingArray)) {
            socket.renderingArray.push({
                'id': 'enemy',
                'name': 'enemy',
                'x': 50,
                'y': 50,
                'dead': false
            })
        }

        console.log(socket.renderingArray)

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
