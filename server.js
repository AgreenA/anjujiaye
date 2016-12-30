var path = require('path');
var express = require('express');

//var index1 = require('./views/index')
//var index2 = require('./views/index')
//var index3 = require('./views/index')

var app = express();
var viewsPath=path.join(__dirname,"views");
app.use("/",express.static(viewsPath));

var publicPath=path.join(__dirname,"static");
app.use("/static",express.static(publicPath));

app.get('/login', function(req, res){
    res.send('hello, node')
});

app.listen(16947, function(){
    console.log('server run at port 16947');
});
module.exports=app;
