app.controller("controllerpagina1", function($scope, $http, $location){
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


			var req = {
			 method: 'POST',
			 url: 'https://rocky-stream-78333.herokuapp.com/api/test',
			 headers: {
			   'Content-Type': 'application/json',
			   'x-auth': localStorage.getItem('token')
			 },
			 data: { "test":complexObject}
			}


			$http(req)
			.then(function(response){
				var data = response.data;

				alert("ok");
				console.log(data);
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

		// function init(){

		// 	if (!localStorage.getItem('token')){
		// 		 $location.path('/login');
		// 	}


		// }


		// init();

});