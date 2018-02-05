app.controller("loginController", function($scope, $http, $location,$rootScope, authService){

		$scope.email = 'test@test.it';
		$scope.password = 'test01';

		$scope.login = function(){

			$scope.loginError = false;

			var promise = authService.login($scope.email,  $scope.password);

			promise.then(function(response){
				$location.path("/pagina1")
			},
			function(error){
				$scope.loginError = true;
			});

		}
});