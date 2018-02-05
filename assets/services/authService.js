
var authModule = angular.module('AuthModule', []);

authModule.service('authService', function($http,  $q, $rootScope, $location){


	this.__clearCredentials = function(){
		localStorage.setItem('token', '');
		localStorage.setItem('loggedUser', '');

		$rootScope.globals = {
	        	currentUser: null,
	        	token: null
	        };


        $rootScope.authenticated = false;

	    $http.defaults.headers.common['x-auth'] = '';    
	}


	this.__setCredentials = function(){

		if (!localStorage.getItem('loggedUser'))
		{
			this.__clearCredentials();
			return;
		}

		var currentUser = JSON.parse(localStorage.getItem('loggedUser'));
        var token = localStorage.getItem('token');


        $rootScope.globals = {
        	currentUser: currentUser,
        	token: token
        };


        $rootScope.authenticated = true;        


        if ($rootScope.globals.token) {
            $http.defaults.headers.common['x-auth'] = $rootScope.globals.token;
        }
	}



	this.mainUrl = "";

	this.init = function(url){

		if (!url)
			throw "Url non fornita"

		this.mainUrl = url;


        this.__setCredentials();

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.token) {
                $location.path('/login');
                return;
            }


            if ($location.path() == '/login'){
				if (localStorage.getItem('token')){
					 $location.path('/pagina1');
				}
            }
        });
	}


	this.login = function(username, password){
		var self = this;
		var deferred = $q.defer();
		var req = {
			 method: 'POST',
			 url: self.mainUrl + '/api/login',
			 data: { "mail":username,"password": password }
			}

			$http(req)
			.then(function(response){
				var loggegUser = response.data;

				localStorage.setItem('loggedUser',JSON.stringify(loggegUser));
				localStorage.setItem('token', response.headers()['x-auth']);

				self.__setCredentials();

	
				deferred.resolve();
			},
			function(error){
				deferred.reject(error);
			});


			return deferred.promise;

	}

	this.logout = function(){
		var self = this;
		var req = {
		 method: 'POST',
		 url: self.mainUrl + '/api/logout',
		 data: {  }
		}



		var deferred = $q.defer();

		$http(req)
		.then(function(response){
			
			self.__clearCredentials();
			

			deferred.resolve();
		},
		function(error){
			deferred.reject(error);
		});



		return deferred.promise;
	}




})