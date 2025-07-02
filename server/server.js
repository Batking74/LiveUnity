// Importing Modules/Packages
const { Server } = require('socket.io');
const PORT = process.env.PORT || 1000;
const express = require('express');
const { join } = require('path');
const app = express();

app.get('/api/GraphQL', (req, res) => {
    res.json('Nazir!');
});

// Serve static files from the client/dist directory
app.use(express.static(join(__dirname, '../client/dist')));

app.get('*', (req, res) => res.sendFile(join(__dirname, '../client/dist/index.html')));

// Starting Server
const expressServer = app.listen(PORT, () => console.log('Listening on port: ', PORT));

const getVisitors = () => {
    let visitors = [];
    io.sockets.sockets.forEach(socket => {
        visitors.push(socket.user);
    });
    return visitors;
}

// Emmiting all connected users to all sockets
const emitToVisitors = () => {
    io.emit('get_visitors', getVisitors());
}

const io = new Server(expressServer, { cors: ['https://liveunity.nazirsportfolio.com', 'http://localhost:3000', 'http://localhost:1000'] });

io.on('connection', socket => {
    console.log('A user connected!');
    socket.on('new_visted_user', user => {
        console.log('new visted user', user);
        socket.user = user;
        emitToVisitors();
    });

    socket.on('disconnect', e => {
        emitToVisitors();
        console.log('A user disconnected');
    });
});