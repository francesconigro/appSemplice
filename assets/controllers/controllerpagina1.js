app.controller("controllerpagina1", function($scope, $http, $location, exampleService){
	$scope.helloworld = "Benvenuto nella Pagina 1";



	$scope.eseguiComando = function(){


			var complexObject = {
				property1: 54,
				property2 : "testo",
				property3 : {
					propertyA: '2017-12-12',
					propertyB: 43

				}

			}

			var promise = exampleService.comando1(complexObject);

			promise
			.then(function(response){
				alert("ok");
				console.log(response);
			},
			function(error){

				if (error.status == 401){
					localStorage.setItem('token', "");
					localStorage.setItem('loggedUser', '');
					$location.path('/login');
					return;
				}


				alert(error.statusText);
			});


	}

});