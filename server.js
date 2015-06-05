var port = 4000;
//Grab express and set to app variable.
var express = require('express');
var app = express();

//SEt route to index page.
/*app.get('/', function(req, res) {
	res.send("Hello world from server!");
});*/

//Get static resources in public folder.
app.use(express.static(__dirname + '/public'));

app.get('/bookshelf', function(req, res) {
	console.log("[+] Bookshelf get request...");

	 var book1 = {
		title: 'Clean Code',
		author: 'Robert C. Martin',
		year: '2008',
		isbn: '978-0132350884'
	};

	var book2 = {
		title: 'The Pragmatic Programmer',
		author: 'Andrew Hunt',
		year: '1999',
		isbn: '978-0201616224'
	};

	 var book3 = {
		title: 'The C++ Programming Language',
		author: 'Bjarne Stroustrup',
		year: '2013',
		isbn: '978-0321563842'
	};

	var books = [book1, book2, book3];
	res.json(books);
});

app.listen(port);
console.log("Server listening on port " + port);