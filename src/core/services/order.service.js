(function(){
	'use strict';
	angular
		.module('app.core')
		.factory('orderService',orderService);

	orderService.$inject = ['$http','api','sessionService'];

	function orderService($http,api,sessionService){
		var service = {
			getOrders : getOrders,
			createOrder : createOrder,
			deleteOrders : deleteOrders
		};
		return service;

		function getOrders(){
			return $http.get(api+'/orders')
				.then(getOrderList)
				.catch(function(){
					exception.catcher('XHR Failed for getAccount')(message);
					sessionService.removeSession();
                    $location.url('/');
				});

			function getOrderList(data){
				return data.data;
			}

		}

		function createOrder(data){
			for(var i=0; i<data.length;i++){
				$http.post(api+'/orders',data[i]);
			}
		}

		function deleteOrders(){
			return $http.delete(api+'/orders');
		}
	}
})();