function funcionariosController($scope, $http, $routeParams, $location){
	$scope.rows = null;
	$scope.row = null;

	$scope.loadAll = function(){
		$scope.showLoader();

		$http.get($scope.server('/employees_serv/employees')).success(function(data){
			$scope.rows = data;
		});
	}

	$scope.loadRow = function(id){
		$scope.showLoader();

		$http.get($scope.server('/employees_serv/employee/id/'+id)).success(function(data){
			$scope.row = data;
			$scope.isUpdate = true;
		});
	}

	$scope.save = function(){
		$scope.showLoader();

		$scope.put($scope.server('/employees_serv/employee', $scope.row)).success(function(data){
			alert('Altearado com sucesso!');
			$scope.loadAll();
		});
	}

	$scope.new = function(){
		$scope.row = {
			EmployeeID:0,
			FirstName: '',
			LastName:'',
			HomePhone:''
		}
	}

}