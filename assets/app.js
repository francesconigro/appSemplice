var app = angular.module("appsemplice", ["ngRoute"]);

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

app.run(['$rootScope', '$location', '$http',
    function ($rootScope, $location, $http) {
        // keep user logged in after page refresh


        var unsecuredPages = ['/login', '/pagina1'];


        var currentUser = JSON.parse(localStorage.getItem('loggedUser'));
        var token = localStorage.getItem('token');


        $rootScope.globals = {
        	currentUser: currentUser,
        	token: token
        };


        // if ($rootScope.globals.currentUser) {
        //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        // }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if (unsecuredPages.indexOf($location.path()) === -1 && !$rootScope.globals.token) {
                $location.path('/login');
                return;
            }



            if ($location.path() == '/login'){
				if (localStorage.getItem('token')){
					 $location.path('/pagina1');
				}
            }
        });


    }]);







