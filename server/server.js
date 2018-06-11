const PATH = require('path'),
PUBLICPATH = PATH.join(__dirname, '../public'),
   EXPRESS = require('express'),
      PORT = process.env.PORT;


let app = EXPRESS();

app.use(EXPRESS.static(PUBLICPATH));

app.get('/',(req,res) => {
    res.redirect(PUBLICPATH + '/index.html');
});

app.listen(PORT,() => {
    console.log(`App started on port ${PORT}`);
    
})

console.log(PUBLICPATH);
