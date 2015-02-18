(function(){
	'use strict';
	angular
		.module('app.core')
		.factory('instrumentService',instrumentService);

	instrumentService.$http = ['$http','api'];

	function instrumentService($http,api){
		var service = {
			getInstruments: getInstruments
		}
		return service;

		function getInstruments(){
			return $http.get(api+'/instruments')
				.then(getInstrumentList)
				.catch(function(){
					exception.catcher('XHR Failed for getAccount')(message);
					sessionService.removeSession();
                    $location.url('/');
				});

			function getInstrumentList(data){
				return data.data;
			}
		}
	}
})();
