app.controller('clientesController', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location){
	//Cleaning the client list and the specific line
	$scope.rows = null;
	$scope.row = null;

	//Pagination
	$scope.currentPage = 0;
	$scope.pageSize = 15;

	$scope.numberOfPages =	function(){
		return Math.ceil($scope.rows.length / $scope.pageSize);
	}

	$scope.loadAll = function(){
		$scope.showLoader();
		$http.get($scope.server("/customers_serv/customers"), config)
	}
}]);
