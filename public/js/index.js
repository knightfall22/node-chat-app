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
    let messageTextBox = document.getElementById('message');
    socket.emit('createMessage',{
        from:'User',
        text:messageTextBox.value
    },function () {
        messageTextBox.value = '';
    })
})

let locationButton = document.getElementById('send-location');


locationButton.addEventListener('click',() => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
     
    locationButton.setAttribute('disabled',true)
    locationButton.textContent = "Sending Location ....."

    navigator.geolocation.getCurrentPosition(function (position) {
         locationButton.removeAttribute('disabled')
         locationButton.textContent = "Send location"
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })

    },function () {
        locationButton.removeAttribute('disabled')
        alert('Unable to fetch location')
    })
})