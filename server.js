var app = require('./api.js');
var port = 5000;
var http = require('http');

// Listen HTTP server on port 8080
http.createServer(app).listen(port,function(){
	console.log('Express server listening on port https://localhost/'+port);
});
