var app = angular.module("Bookshelf", [])

.controller('bookshelfController', ['$scope', '$http', function($scope, $http) {
	console.log("[+] Controller Initialised...")
	$scope.test = "hello!";

	var refreshList = function() {
		$http.get('/bookshelf').success(function(response) {
			console.log("[+] Data received...");
			$scope.books = response;
			$scope.book = null;
		});
	};

	refreshList();

	$scope.addBook = function() {
		//console.log("[+] Book would have been added...");
		//console.log($scope.book);

		$http.post('/bookshelf', $scope.book).success(function(response) {
			console.log(response);
			console.log("[+] Adding book to database...");
			refreshList();
		});
	};

	$scope.deleteBook = function(id) {
		//console.log(id);

		$http.delete('/bookshelf/' + id).success(function(response) {
			//console.log(response);
			console.log("[+] Deleting book data...");
			refreshList();
		});
	};

	$scope.editBook = function(id) {
		console.log(id);

		$http.get('/bookshelf/' + id).success(function(response) {
			//Put the respective properties into the edit boxes.
			$scope.book = response;
			console.log("[+] Loading book data to edit...");
		});
	};

	$scope.updateBook = function() {
		//console.log($scope.book._id);
		$http.put('/bookshelf/' + $scope.book._id, $scope.book).success(function(response) {
			console.log("[+] Updated book data...");
			refreshList();
		});
	};

	$scope.clearFields = function() {
		console.log("[+] Clearing text fields...");
		$scope.book = null;
	};
}]);