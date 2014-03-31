//URL to the REST Service
SERVER_URL = "http://localhost/store_service/";

//Start the angular APP
var app = angular.module('app', ['ngRoute','ngResource']);//angular.module('app', ['ngRoute', 'ngResource']);

app.run(['$rootScope', function($rootScope){
	//Uma flag que define se o ícone de acesso ao servidor deve estar ativado
	$rootScope.showLoaderFlag = false;

	//Força que o ícone de acesso ao servidor seja ativado
	$rootScope.showLoader=function(){
		$rootScope.showLoaderFlag=true;
	}	
	//Força que o ícone de acesso ao servidor seja desativado
	$rootScope.hideLoader=function(){
		$rootScope.showLoaderFlag=false;
	}

	//Método que retorna a URL completa de acesso ao servidor.
	// Evita usar concatenação no conteroller
	$rootScope.server=function(url){
		return SERVER_URL + url;
	}
}]);

app.config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
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
				if($error && $error.text)
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