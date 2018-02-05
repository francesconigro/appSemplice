app.controller("navbarController", function($scope, $http, $location, $rootScope){


	$scope.logout= function(){



		var req = {
		 method: 'POST',
		 url: 'https://rocky-stream-78333.herokuapp.com/api/logout',
		 headers: {
		   'Content-Type': 'application/json',
		    'x-auth': localStorage.getItem('token')
		 },
		 data: {  }
		}


		$http(req)
		.then(function(response){
			
			localStorage.setItem('token', '');
			localStorage.setItem('loggedUser', '');

			$rootScope.globals = {
		        	currentUser: null,
		        	token: null
		        };


			$location.path("/login")
		},
		function(error){
			alert(error.statusText);
		});


		





	}


});