const express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 3000

server.listen(port, function () {
    console.log('Server listening at port %d', port)
})

// Routing
app.use(express.static(__dirname + '/app'))

var numUsers = 0

io.on('connection', socket => {
    var addedUser = false


    socket.on('add user', function (username) {
        if (addedUser) return

        socket.username = username
        ++numUsers
        addedUser = true

        socket.emit('login', {
            numUsers: numUsers
        })

        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        })
    })

    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
})
