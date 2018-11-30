// socket.on('setbgcolorpink', function () {
//     $("body").css('background-color', 'pink');
// });

// $("#greendiv").click(function(){
//     socket.emit('setbgtogreen');
// });

var newSession = true;

$(document).ready(function (){
    var socket = io();

    if (newSession) {
        var userhandle = prompt("Please enter a chat room name", "Player1");
        if (userhandle != null) {
            socket.emit('announceentry', { handle: userhandle });
        }
        newSession = false;
    }

    socket.on('updatechatlog', function (data) {
        console.log("updatechatlog");
        $("#chathistory").html(data.log);
    });

    
    $("#sendbtn").click(function(){
        console.log("sendbtn");
        let msgtext = $("#messagetext").val();
        socket.emit('newpost', {msg: msgtext});
        $("#messagetext").val("");
    });

});
