var http = require("http");
var express = require('express')
var app = express();

var port = process.env.PORT || 8080

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(port, function() {
	console.log('App is running on http://localhost:' + port);
});
/*
http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
}).listen(8888);*/