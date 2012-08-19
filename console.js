
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
	res.send('<form action="/post/mobile" method="POST"> \
    <textarea name="content" cols="50" rows="30"></textarea>\
    <input type="submit" value="submit" />\
</form>')
});

app.post('/post/:id', function(req, res){
	events.emit("receieve-"+res.id,req.body.content);
	res.send('<form action="/post/mobile" method="POST"> \
    <textarea name="content" cols="50" rows="30">'+req.body.content+'</textarea>\
    <input type="submit" value="submit" />\
</form>');

});

app.listen(3000);
console.log('Listening on port 3000');