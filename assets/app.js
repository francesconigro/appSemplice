var app = angular.module("appsemplice", ["ngRoute", 'AuthModule']);

app.constant('mainUrl', 'https://rocky-stream-78333.herokuapp.com');

app.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/pagina1', {
			templateUrl: 'assets/views/pagina1.html',
			controller : 'controllerpagina1'
		})
		.when('/pagina2', {
			templateUrl: 'assets/views/pagina2.html',
			controller : 'controllerpagina2'
		})
		.when('/login', {
			templateUrl: 'assets/views/login.html',
			controller: "loginController"
		})
		.otherwise('/pagina1');
});


app.run(['$rootScope', '$location', '$http', 'authService','mainUrl',
    function ($rootScope, $location, $http, authService, mainUrl) {

    	//set default post contenttype header
    	$http.defaults.headers.post['Content-Type'] = 'application/json';
    	//initialize auth Service
		authService.init(mainUrl);

    }]);







