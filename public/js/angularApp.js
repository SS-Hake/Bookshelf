var app = angular.module("Bookshelf", [])

.controller('bookshelfController', ['$scope', '$http', function($scope, $http) {
	console.log("[+] Controller Initialised...")
	$scope.test = "hello!";

	$http.get('/bookshelf').success(function(response) {
		console.log("[+] Data received...");
		$scope.books = response;
	});

}]);