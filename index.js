const path = require('path');
const uuidv4 = require('uuid/v4');
// uuidv4();

const fastify = require('fastify')({
  logger: true
});

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, './static'),
  prefix: '/'
});

fastify.register(require('fastify-ws'), {
  library: 'uws'
});

fastify.get('/hello', async (request, reply) => {
  reply.type('application/json').code(200);
  return {
    hello: 'world'
  };
});

fastify.ready(err => {
  if (err) throw err;

  console.log('Server started.');

  fastify.ws
    .on('connection', socket => {
      console.log('Client connected.');
      socket.on('message', msg => socket.send(msg));
      socket.on('close', () => console.log('Client disconnected.'));
    });
});

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
