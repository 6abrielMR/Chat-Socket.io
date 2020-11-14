var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
    return res.status(200).send('Hola mundo desde una ruta.');
});

var messages = [{
    id: 1,
    text: "Bienvenido al chat privado de Socket.io y NodeJS de Gabriel Montes...",
    nickname: "Bot - gabrielmontes.es"
}];

io.on('connection', function(socket){
    console.log('El cliente con IP: ' + socket.handshake.address + 'se ha conectado...');
    
    //enviar mensajes
    socket.emit('messages', messages);
    
    //recibir mensajes
    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(8080, function(){
    console.log('Servidor está funcionando en http://localhost:8080');
});