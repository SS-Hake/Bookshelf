var port = Number(process.env.PORT || 4000);
//Grab express and set to app variable.
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('books', ['books']);
//body parser so i can read req/res.body.
var bodyParser = require('body-parser');

//SEt route to index page.
/*app.get('/', function(req, res) {
	res.send("Hello world from server!");
});*/

//Get static resources in public folder.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/bookshelf', function(req, res) {
	console.log("[+] Bookshelf get request...");

	db.books.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/bookshelf', function(req, res) {
	console.log(req.body);

	db.books.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/bookshelf/:id', function(req, res) {

	var id = req.params.id;

	console.log(id);

	db.books.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/bookshelf/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.books.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.listen(port);
console.log("Server listening on port " + port);