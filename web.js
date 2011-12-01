require.paths.unshift(__dirname + '/lib');

var express = require('express');
var uuid = require('node-uuid');

var app = express.createServer(
     express.logger(),
     express.static(__dirname + '/public')
     );
var io = require('socket.io');
var socket = io.listen(app);

app.get('/', function(request, response) {
    var socket_id = uuid();

    response.render('home.ejs', {
	  layout: false,
          socket_id: socket_id
        });

});

app.get('/test', function(request, response) {
  response.send('OK!');
  var randomnumber=Math.floor(Math.random()*11);
  socket.sockets.send(JSON.stringify({ my: 'data' , num: randomnumber}));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
