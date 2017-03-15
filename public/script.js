var socket = io()

socket.emit('event', {
    'hello': 'world'
})