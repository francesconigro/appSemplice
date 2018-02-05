app.controller("navbarController", function($scope, $http, $location, $rootScope, authService ){


	$scope.logout= function(){

		var promise = authService.logout();

		promise.then(
			function(response){
				$location.path('/login');
			},
			function(error){
				alert(error.statusText);
			});

	}


});