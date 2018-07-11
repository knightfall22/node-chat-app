 let socket = io(); //Make request to open up connection and keep the connection open

function scrollToBottom() {
   //SELCTORS
   let messages = jQuery('#messages');
   let newMessage = messages.children('li:last-child');
   //HEIGHTS
   let clientHeight = messages.prop('clientHeight');
   let scrollTop = messages.prop('scrollTop');
   let scrollHeight = messages.prop('scrollHeight');
   let newMessageHeight = newMessage.innerHeight();
   let lastMessageHeight = newMessage.prev().innerHeight();
   if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
       messages.scrollTop(scrollHeight);
   }
}

 socket.on('connect', function () {
     console.log(" connected to server");


      socket.on('newMessage',(message) => {
           let formattedTime = moment(message.createdAt).format('hh:mm a');
          let template = jQuery('#message-template').html();
          let html = Mustache.render(template,{
              text:message.text,
              from:message.from,
              createdAt:formattedTime
          });

          jQuery('#messages').append(html);
          scrollToBottom();

        //   let li = document.createElement('li');
        //   let formattedTime = moment(message.createdAt).format('hh:mm a');
        //   li.textContent = `${message.from} ${formattedTime} : ${message.text}`;
        //   document.getElementById('messages').appendChild(li)
      });

      socket.on('newLocationMessage',(message) => {
            let formattedTime = moment(message.createdAt).format('hh:mm a');
                let template = jQuery('#location-message-template').html();
                    let html = Mustache.render(template, {
                                   from: message.from,
                                    url: message.url,
                                   createdAt: formattedTime
                               });
                        jQuery('#messages').append(html);
                        scrollToBottom()

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
        locationButton.textContent = "Send location";
        alert('Unable to fetch location')
    })
})