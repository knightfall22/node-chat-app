const PATH = require('path'),
      HTTP = require('http'),
PUBLICPATH = PATH.join(__dirname, '../public'),
   EXPRESS = require('express'),
      PORT = process.env.PORT || 3000,
  SOCKETIO = require('socket.io'),
{ generateMessage, generateLocationMessage} = require('./utils/message');


let app = EXPRESS(),
 server = HTTP.createServer(app),
     io = SOCKETIO(server); 

app.use(EXPRESS.static(PUBLICPATH));

io.on('connection',(socket) => {
    console.log('New user Connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to the App'));
    socket.broadcast.emit('newMessage',generateMessage('Admin', 'new user has joined'))

    socket.on('createMessage',(message,callback) => {
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('this is from the sever');
    });
    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude))   
    })

    socket.on('disconnect',() => {
        console.log('Client has disconnected');
    })

})

server.listen(PORT,() => {
    console.log(`App started on port ${PORT}`);
    console.log(`Go to http://localhost:${PORT}/`);
    
})

console.log(PUBLICPATH);
