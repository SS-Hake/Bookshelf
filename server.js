var port = Number(process.env.PORT || 4000);
//Grab express and set to app variable.
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('books', ['books']);
//body parser so i can read req/res.body.
var bodyParser = require('body-parser');

//Get static resources in public folder.
app.use(express.static(__dirname + '/public'));
//Use body parser to read request contents.
app.use(bodyParser.json());


app.get('/bookshelf', function(req, res) {
	console.log("[+] Bookshelf get request...");
	//Return all of the books in the database for display with angular.
	db.books.find(function(err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/bookshelf', function(req, res) {
	//Method which adds the contents of the reqest to the database,
	//then returns the updated contents of the databse for display.
	//Log the contents of the added book.
	//console.log(req.body);
	//Insert the book details.
	db.books.insert(req.body, function(err, doc) {
		//If there's and error, display it.
		if(err) console.log(err);
		//log the new database contents and send them back as response.
		//console.log(doc);
		res.json(doc);
	});
});

app.delete('/bookshelf/:id', function(req, res) {
	//Deletes the entry with the specified ID.
	var id = req.params.id;
	console.log(id);
	//Remove the object with is from database. Send updated database back to client.
	db.books.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/bookshelf/:id', function(req, res) {
	//Gets the entry with specified ID and returns it to be displayed for editing.
	var id = req.params.id;
	console.log(id);
	db.books.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/bookshelf/:id', function(req, res) {
	//Updates the entry with the specified ID with the contents of the req.
	//Contents of the req are from $scope.book.
	var id = req.params.id;

	db.books.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {title: req.body.title, author: req.body.author, year: req.body.year, isbn: req.body.isbn}},
		new: true}, function(err, doc) {
			res.json(doc);
		}
	);
});

//Run on the environments chosen port, or 4000 if there isn't one.
app.listen(port);
console.log("Server listening on port " + port);