const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Sepultura'));
bands.addBand(new Band('Slipknot'));
bands.addBand(new Band('Iron Maiden'));
bands.addBand(new Band('Pantera'));

// Sockets
io.on('connection', client => {
    console.log('Client connected');

    client.emit('allbands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // client.on('message', (payload) => {
    //     console.log('message', payload);
    //     io.emit('message', { admin: 'message' });
    // });

    client.on('new-message', (payload) => {
        client.broadcast.emit('new-message', payload);
    });

    client.on('band-vote', (payload) => {
        bands.voteForBand(payload.id);
        io.emit('allbands', bands.getBands());
    });

    client.on('addband', (payload) => {
        bands.addBand(new Band(payload['name']));
        io.emit('allbands', bands.getBands());
    });

    client.on('deleteband', (payload) => {
        bands.deleteBand(payload['id']);
        io.emit('allbands', bands.getBands());
    });
});