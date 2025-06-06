// Importing Modules/Packages
const { Server } = require('socket.io');
const PORT = process.env.PORT || 9000;
const express = require('express');
const { join } = require('path');
const app = express();

app.use(express.static(join('../client')));

// Starting Server
const expressServer = app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

const io = new Server(expressServer, {
    cors: ['http://localhost:3000', 'http://localhost:8000']
});

const getRooms = () => {
    let rooms = [];
    io.sockets.adapter.rooms.forEach(room => {
        rooms.push(room);
    });
    return rooms;
}

// Emmiting all connected users to all sockets
const emitRooms = () => {
    io.emit('get_rooms', getRooms());
}

io.on('connection', socket => {
    console.log('A user connected to server 2!');
    emitRooms();
    
    socket.on('join_room', room => {
        socket.join(room);
    });

    socket.on('message', ({ Room, Message }) => {
        // Sending Messages to all connected sockets in a specific room
        socket.to(Room).emit('message', {
            Message,
            Name: 'Girl'
        });

        socket.on('typing', ({ Room }) => {
            socket.to(Room).emit('Typing...');
        });

        socket.on('stopped_typing', ({ Room }) => {
            socket.to(Room).emit('Stopped Typing');
        });
    });
});