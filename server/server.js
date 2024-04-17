// Importing Modules/Packages
const { Server } = require('socket.io');
const PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const { join } = require('path');

app.use(express.static(join('../client')));

app.get('/GraphQL', (req, res) => {
    res.json('Nazir!');
});

// Starting Server
const expressServer = app.listen(PORT, () => {
    console.log('Listening on port: ',PORT);
});


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

const io = new Server(expressServer, { cors: 'http://localhost:5173' });

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