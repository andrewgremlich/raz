var socket = io()

socket.emit('event', {
    'hello': 'world'
})

socket.on('usrJoin', (data) => {
    console.log(data)
})