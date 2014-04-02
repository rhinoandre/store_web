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
		if($scope.rows > 0)	$scope.rows.length = 0;

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
					$scope.isUpdate = true;
			});
		} else {
			$scope.row = {};
			$scope.CustomerID = null;
			$scope.isUpdate = false;
		}
	}

	$scope.save = function(){

		$scope.showLoader();

		if($scope.isUpdate){
			$http.post($scope.server("customers_serv/customer/"), $scope.row)
				.success(function(data){
					alert('Alterado com sucesso!');
					console.log(data);
					history.back(1);
				});
		} else {
			$http.put($scope.server("customers_serv/customer/"), $scope.row)
				.success(function(data){
					alert('Salvo com sucesso!');
					console.log(data);
					$location.path('/clientes');
				});
		}
	}

	$scope.delete = function(){
		$scope.showLoader();

		//if(confirm('Deseja realmente excluir o contato: ' + $scope.row.ContactName + '?')){
			$http.delete($scope.server('customers_serv/customer/'), $scope.row)
				 .success(function(data){
				 	//alert('Cliente removido com sucesso!');
				 	console.log(data);
				 	//$location.path('/clientes');
				 });
		//}
	}
}
