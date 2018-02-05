app.controller("loginController", function($scope, $http, $location,$rootScope){

		$scope.email = 'test@test.it';
		$scope.password = 'test01';



		// function init(){

		// 	if (localStorage.getItem('token')){
		// 		 $location.path('/pagina1');
		// 	}


		// }






		$scope.login = function(){

			$scope.loginError = false;

			var email = $scope.email;
			var password = $scope.password;

			var req = {
			 method: 'POST',
			 url: 'https://rocky-stream-78333.herokuapp.com/api/login',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: { "mail":email,
						"password": password }
			}


			$http(req)
			.then(function(response){
				var loggegUser = response.data;

				localStorage.setItem('loggedUser',JSON.stringify(loggegUser));
				localStorage.setItem('token', response.headers()['x-auth']);


				var currentUser = JSON.parse(localStorage.getItem('loggedUser'));
        		var token = localStorage.getItem('token');


		        $rootScope.globals = {
		        	currentUser: currentUser,
		        	token: token
		        };



				
				$location.path("/pagina1")
			},
			function(error){
				$scope.loginError = true;
			});


		}




		// init();
});