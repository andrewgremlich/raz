var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    port = process.env.PORT || 3000

server.listen(port, () => {
    console.log('server started!')
})

app.use(express.static(__dirname + '/public'))

io.on('connection', (client) => {

    client.broadcast.emit('usrJoin', 'new user joined in session')

    client.on('event', (data) => {
        console.log(data)
    })
    client.on('disconnect', () => {
        console.log('user left')
    })
})