// Importing Modules/Packages
const { Server } = require('socket.io');
const PORT = process.env.PORT || 7000;
const express = require('express');
const { join } = require('path');
const app = express();

app.use(express.static(join('../client')));

// Starting Server
const expressServer = app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

const io = new Server(expressServer, { cors: ['http://localhost:4001', 'http://localhost:8000'] });


const getOnlineUsers = () => {
    let clients = [];
    io.sockets.sockets.forEach(socket => {
        if(socket.user) {
            clients.push(socket.user);
        }
    });
    return visitors;
}


io.on('connection', socket => {
    console.log('A user connected to server 3!');

    const emitToOnlineUsers = () => {
        socket.broadcast.emit('users', getOnlineUsers());
    }

    socket.on('add_user', user => {
        socket.emit('server_message', {
            Name: 'King Naz',
            Message: 'Welcome!'
        });
        
        socket.broadcast.emit('server_message', {
            Name: 'RoommChat',
            Message: `${user.Name} just joined the chat`
        })
        socket.user = user;
        emitToOnlineUsers();
    });

    socket.on('disconnect', () => {
        const { user } = socket;
        if (user) {
            socket.broadcast.emit('server_message', {
                Name: 'RoommChat',
                Message: `${user.Name} just left the chat`
            })
        }
    });
});