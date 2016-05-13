var express = require('express');
var path         = require('path');
var app = new express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

app.set('port', 3001);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(3001);