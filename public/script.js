var socket = io()

socket.emit('event', {
    'hello': 'world'
})

socket.on('userJoin', (data) => {
    console.log(data)
})