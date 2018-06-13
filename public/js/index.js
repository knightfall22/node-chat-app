 let socket = io(); //Make request to open up connection and keep the connection open

 socket.on('connect', function () {
     console.log(" connected to server");


      socket.on('newMessage',(message) => {
          console.log('New message',message);  
      });

      socket.on('Welcome',function (greeting) {
          console.log(greeting);
      })

     socket.on('newUser',function (message) {
          console.log(message);
      })
 });




 socket.on('disconnect', function () {
     console.log("Disconnected from server");
 })