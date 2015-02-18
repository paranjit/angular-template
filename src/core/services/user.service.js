(function(){
	'use strict';
	angular
		.module('app.core')
		.factory('userService',userService);

	userService.$inject = ['$http','api','sessionService'];

	function userService($http,api,sessionService){
		var userData = null;
		var service = {
			getUsers : getUsers
		};

		return service;

		function getUsers(){
			return $http.get(api+'/users')
				.then(getUserList)
				.catch(function(){
					exception.catcher('XHR Failed for getAccount')(message);
					sessionService.removeSession();
                    $location.url('/');
				});

			function getUserList(data){
				userData = data.data;
				return data.data;
			}
		}
	}
})();