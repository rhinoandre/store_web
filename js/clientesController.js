function clientesController($scope, $http, $routeParams, $location){
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
		$http.get($scope.server("customers_serv/customers")).success(function(data){
			$scope.rows = data;
		})
	}

	$scope.loadRow = function(){
		if($routeParams.id != null){
			$scope.showLoader();
			$http.get($scope.server("customers_serv/customer/id/"+$routeParams.id))
				.success(function(data){
					$scope.row = data;
					$scope.row.isUpdate = true;
			});
		} else {
			$scope.row = {};
			$scope.CustomerID = null;
			$scope.row.isUpdate = false;
		}
	}

	$scope.save = function(){

		$scope.showLoader();
		$http.post($scope.server("customers_serv/customer/"), $scope.row)
			.success(function(data){
				alert("Salvo com sucesso!");
				console.log(data);
				$scope.row.isUpdate = true;
			});
	}
}
