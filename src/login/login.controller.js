(function(){
	'use strict';
	angular
		.module('app.login')
		.controller('loginController',loginController);

	loginController.$inject = ['$location','userService','sessionService'];

	function loginController($location,userService,sessionService){
		var vm = this;
		vm.users = null;
		vm.login = login;	// login form submit function

		activate();

		function activate(){
			getSession();		// check if session exist,if yes then redirect to dashboard
			getUsers();
		}

		function getSession(){
			var name = sessionService.getSession();
			if(name)
				$location.url('/dashboard');
		}

		function getUsers(){
			return userService.getUsers().then(function(data){
				vm.users = data;
			});
		}

		function login(){
			if(vm.selectedUser){
				sessionService.setSession(vm.selectedUser);
				$location.url('/dashboard');
			}
		}

	}

})();