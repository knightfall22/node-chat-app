const PATH = require('path'),
      HTTP = require('http'),
PUBLICPATH = PATH.join(__dirname, '../public'),
   EXPRESS = require('express'),
      PORT = process.env.PORT || 3000,
  SOCKETIO = require('socket.io'),
{generateMessage} = require('./utils/message');


let app = EXPRESS(),
 server = HTTP.createServer(app),
     io = SOCKETIO(server); 

app.use(EXPRESS.static(PUBLICPATH));

io.on('connection',(socket) => {
    console.log('New user Connected');

    socket.emit('Welcome',generateMessage('admin','Welcome to the App'));
    socket.broadcast.emit('newUser',generateMessage('admin', 'new user has joined'))

    socket.on('createMessage',(message,callback) => {
        console.log('create message',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('this is from the sever');
        // socket.broadcast.emit('newMessage',{
        //      from: message.from,
        //      text:message.text,
        //      completedAt:new Date().getTime()
        // })
    });

    socket.on('disconnect',() => {
        console.log('Client has disconnected');
    })

})

server.listen(PORT,() => {
    console.log(`App started on port ${PORT}`);
    
})

console.log(PUBLICPATH);
