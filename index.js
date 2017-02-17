const express = require('express'),
    app = express(),
    path = require('path'),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 3000

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/app'));
