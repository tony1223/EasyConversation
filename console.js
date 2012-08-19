
var express = require('express');
var app = express();
var events = require("events");

var events = new events.EventEmitter();
app.use(express.bodyParser());

app.get('/console/:id', function(req, res){
	events.on("receieve-"+res.id,function(message){
		res.send(message);
	});
});

app.get('/post/:id', function(req, res){
	res.sendfile("node.html");
});

app.post('/post/:id', function(req, res){
	events.emit("receieve-"+res.id,req.body.content);
	res.sendfile("node.html");
});

app.listen(3000);
console.log('Listening on port 3000');