(function(){
	'use strict';

	angular
		.module('app.core')
		.factory('sessionService',sessionService);

	sessionService.$inject = [];

	function sessionService(){
		var service = {
			setSession : setSession,
			getSession : getSession,
			removeSession : removeSession
		}
		return service;

		function setSession(userName){

			sessionStorage.setItem('user',JSON.stringify(userName));
		}

		function getSession(){
			return JSON.parse(sessionStorage.getItem('user'));
		}

		function removeSession(){
			sessionStorage.removeItem('user');
		}
	}
})();