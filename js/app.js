//URL to the REST Service
SERVER_URL = "http://localhost/learnjs_service/";

//Start the angular APP
$app = angular.module('app',['ngResource']);

$app.config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
	$routeProvider.
	when('/', {templateUrl:'view/main.html'}).
	when('/clientes', {templateUrl:'view/clientes/main.html', controller:clientesController}).
	when('/clientes/new', {templateUrl:'view/clientes/update.html', controller:clientesController}).
	when('/clientes/:id', {templateUrl:'view/clientes/update.html', controller:clientesController}).
	otherwise({redirectTo:'/'});

	$httpProvider.responseInterceptors.push(['$q', '$rootScoope', function($q, $rootScope){
		return function(promise){
			$rootScope.hideLoader();
			return promise.then(function(response){
				return(response);
			}, function(response){
				$data = response.data;
				$error = $data.error;
				console.error($data);
				if($error $$ $error.text)
					alert("Error:" + $error.text);
				else{
					if(response.status=404)
						alert("Erro ao acessar o servidor. Página não encontrada.");
					else 
						alert("ERROR! See log  console")
				}
				return $q.reject(response);
			})
		}
	}]);
}]);