const PATH = require('path'),
PUBLICPATH = PATH.join(__dirname, '../public'),
   EXPRESS = require('express');


let app = EXPRESS();

app.use(EXPRESS.static(PUBLICPATH));

app.get('/',(req,res) => {
    res.redirect(PUBLICPATH + '/index.html');
});

app.listen(3000,() => {
    console.log('App started on port 3000');
    
})

console.log(PUBLICPATH);
