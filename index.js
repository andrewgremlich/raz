const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 3000,
      socketio = require('./server_modules/socketio')

server.listen(port, function () {
    console.log('Server listening at port %d', port)
})

// Routing
app.use(express.static(__dirname + '/app'))

socketio(io)
