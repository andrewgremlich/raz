const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const uuidv4 = require('uuid/v4');

// uuidv4();

app.get('/', (req, res) => res.sendFile(__dirname + '/static/index.html'));

app.use('/', express.static(path.join(__dirname, 'static')))

io.on('connection', socket => {

  console.log('a user connected');

  socket.broadcast.emit('hi');
  socket.on('disconnect', () => console.log('user disconnected'));

  socket.on('chat message', msg => {
    console.log('client message: ' + msg);
    io.emit('chat message', 'from server: ' + msg);
  });

});

http.listen(3000, () => console.log('listening on *:3000'));
