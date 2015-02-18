(function(){
	'use strict';
	angular
		.module('app.dashboard')
		.controller('dashboardController',dashboardController);

	dashboardController.$inject = ['$location','sessionService','orderService','userService','instrumentService'];

	function dashboardController($location,sessionService,orderService,userService,instrumentService){
		var vm = this;
		vm.name = null;
		vm.orderList = null;
		var instrumentList = null;
		vm.signOut = signOut;
		vm.deleteAll = deleteAll;
		vm.refresh = refresh;
		vm.createOrder = createOrder;

		activate();

		function activate(){
			getSession();
			getOrders();
			getInstrumentList();
		}

		function getSession(){
			var selectedUser = sessionService.getSession();
			if(!selectedUser)
				signOut();
			else
				vm.name = selectedUser.name;
		}

		function getOrders(){
			return orderService.getOrders().then(function(data){
				vm.orderList = data;
			});
		}


		function createOrder(){
			var data = createOrderData();
			orderService.createOrder(data);

			function createOrderData(){
				var data = {
					side : ((Math.random()*10)<5?"Buy":"Sell") ,
					symbol: instrumentList[parseInt(Math.random()*10)].symbol,
					quantity: vm.tradeCount,
					limitPrice :  Math.round((Math.random()*1000) * 100) / 100,
					traderId : sessionService.getSession().id
				};
				return data;
			}
		}

		function getInstrumentList(){
			return instrumentService.getInstruments().then(function(data){
				instrumentList = data;
			})
		}

		function signOut(){
			sessionService.removeSession();
			$location.url('/');
		}

		function deleteAll(){
			orderService.deleteOrders();
		}

		function refresh(){
			getOrders();
		}
	}

})();