 let socket = io(); //Make request to open up connection and keep the connection open

 socket.on('connect', function () {
     console.log(" connected to server");


      socket.on('newMessage',(message) => {
          let li = document.createElement('li');
          li.textContent = `${message.from}: ${message.text}`;
          document.getElementById('messages').appendChild(li)
      });

      socket.on('newLocationMessage',(location) => {
          let li = document.createElement('li'),
              a = document.createElement('a');
               a.textContent = 'My current location'
               li.textContent = `${location.from}: `;
               a.setAttribute('href',location.url);
               a.setAttribute('target','_blank');
               li.appendChild(a);
          document.getElementById('messages').appendChild(li)
      })

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

let locationButton = document.getElementById('send-location');


locationButton.addEventListener('click',() => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
    
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })

    },function () {
        alert('Unable to fetch location')
    })
})