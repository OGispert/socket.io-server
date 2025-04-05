
const { io } = require('../index');

// Sockets
io.on('connection', client => {
    console.log('Client connected');

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });

    client.on('message', (payload) => {
        console.log('message', payload);
    });

    io.emit('message', { admin: 'message' });
});