const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
const server = app.listen(1337);
const io = require('socket.io')(server);

var chatlog = "";

io.on('connection', function (socket) {
    var sockhandle = "";

    socket.on('announceentry', function (data) {
        console.log("announceentry");
        sockhandle = data.handle;
        chatlog = chatlog + "<p>" + data.handle + " has entered the room."
        io.emit('updatechatlog', {log : chatlog } );
    });

    socket.on('newpost', function (data) {
        console.log("newpost");
        chatlog = chatlog + "<p>" + sockhandle + " says: " + data.msg;
        io.emit('updatechatlog', {log : chatlog } );
    });

    socket.on('disconnect', function () {
        console.log("disconnect");
        chatlog = chatlog + "<p>" + sockhandle + " has left the room.";
        io.emit('updatechatlog', {log : chatlog } );
    });
});


// socket.on('getsocketid', function () {
//     socket.emit('pushsocketid', {msg: "Socket ID is: " + socket.id });
// });

// socket.on('setbgtogreen', function () {
//     io.emit('setbgcolorgreen');
// });