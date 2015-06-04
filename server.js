var port = 4000;
//Grab express and set to app variable.
var express = require('express');
var app = express();

//SEt route to index page.
app.get('/', function(req, res) {
	res.send("Hello world from server!");
});


app.listen(port);
console.log("Server listening on port " + port);