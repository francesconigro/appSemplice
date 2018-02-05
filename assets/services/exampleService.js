app.service('exampleService', function($http, $q, mainUrl){


	this.comando1 = function(parameters){

		var deferred = $q.defer();


		var req = {
			 method: 'POST',
			 url: mainUrl + '/api/test',
			 data: { "dataSent":parameters}
			}


			$http(req)
			.then(function(response){
				deferred.resolve(response.data);
			},
			function(error){
				deferred.reject(error);
			});



		return deferred.promise;

	}


})