const PATH = require('path'),
      HTTP = require('http'),
PUBLICPATH = PATH.join(__dirname, '../public'),
   EXPRESS = require('express'),
      PORT = process.env.PORT || 3000,
  SOCKETIO = require('socket.io');


let app = EXPRESS(),
 server = HTTP.createServer(app),
     io = SOCKETIO(server); 

app.use(EXPRESS.static(PUBLICPATH));

io.on('connection',(socket) => {
    console.log('New user Connected');
    


    socket.emit('newMessage',{
        from:'kanae',
        text:'Sup kaneki wanna fight',
        createdAt:1234
    });


    socket.on('createMessage',(message) => {
        console.log('create message',message);
    })

    socket.on('disconnect',() => {
        console.log('Client has disconnected');
    })

})

server.listen(PORT,() => {
    console.log(`App started on port ${PORT}`);
    
})

console.log(PUBLICPATH);
