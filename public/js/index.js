 let socket = io(); //Make request to open up connection and keep the connection open

 socket.on('connect', function () {
     console.log(" connected to server");


      socket.on('newMessage',(message) => {
          console.log('New message',message);  
          let li = document.createElement('li');
          li.textContent = `${message.from}: ${message.text}`;
          document.getElementById('messages').appendChild(li)
      });

      socket.on('disconnect',function() {
          console.log("disconnected from server");
      })


 });


document.getElementById('message-form').addEventListener('submit',(e) => {
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text: document.getElementById('message').value
    },function () {
        
    })
})
