var app = angular.module("Bookshelf", [])

.controller('bookshelfController', ['$scope', '$http', function($scope, $http) {
	console.log("[+] Controller Initialised...")
	$scope.test = "hello!";

	var refreshList = function() {
		//Used to refresh the $scope.books - updates with whatever changes
		//have been made, and displays all books on initial load.
		$http.get('/bookshelf').success(function(response) {
			console.log("[+] Data received...");
			$scope.books = response;
			$scope.book = null;
		});
	};
	//Initial load.
	refreshList();

	$scope.addBook = function() {
		//Sends the current book attributes to the post route.
		$http.post('/bookshelf', $scope.book).success(function(response) {
			console.log(response);
			console.log("[+] Adding book to database...");
			refreshList();
		});
	};

	$scope.deleteBook = function(id) {
		//Send the id of the clicked book to the delete route.
		$http.delete('/bookshelf/' + id).success(function(response) {
			//console.log(response);
			console.log("[+] Deleting book data...");
			refreshList();
		});
	};

	$scope.editBook = function(id) {
		//Gets the clicked books entry in the database for editing.
		//Sends the current books id to the get route.
		$http.get('/bookshelf/' + id).success(function(response) {
			//Put the respective properties into the edit boxes.
			$scope.book = response;
			console.log("[+] Loading book data to edit...");
		});
	};

	$scope.updateBook = function() {
		//Sends the current books id with new book attributes to be updated.
		$http.put('/bookshelf/' + $scope.book._id, $scope.book).success(function(response) {
			console.log("[+] Updated book data...");
			refreshList();
		});
	};

	$scope.clearFields = function() {
		//Sets the current book attributes to null, clears all the text boxes.
		console.log("[+] Clearing text fields...");
		$scope.book = null;
	};
}]);