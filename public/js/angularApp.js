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
		console.log("[+] Book would have been added...");
		//console.log($scope.book);

		$http.post('/bookshelf', $scope.book).success(function(response) {
			console.log(response);
			refreshList();
		});
	};

	$scope.deleteBook = function(id) {
		console.log(id);

		$http.delete('/bookshelf/' + id).success(function(response) {
			console.log(response);
			refreshList();
		});
	};

	$scope.editBook = function(id) {
		console.log(id);

		$http.get('/bookshelf/' + id).success(function(response) {
			//Put the respective properties into the edit boxes.
			$scope.book = response;
			console.log("this is happening");
			console.log(response);
		});
	};

}]);