import { Canvas } from './modules/prototypes/Canvas.js';

const socket = io();
const StartGame = ((socket) => {
  const canvas =  new Canvas(socket, 1);
})(socket);

socket.emit('chat message', 'Hello there!');

socket.on('chat message', msg => console.log(msg));
