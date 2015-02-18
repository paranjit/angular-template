(function () {
    'use strict';

    var core = angular.module('app.core');

    /*var config = {
        appErrorPrefix: '[Angular Template Error] ',
        appTitle: 'Angular Template',
        imageBasePath: '/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };*/

    //core.value('config', config);

    core.config(configure);

    configure.$inject = ['$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl:'/src/login/login.html',
                controller:'loginController',
                controllerAs:'vm'
            })
            .state('dashboard',{
                url:'/dashboard',
                templateUrl:'/src/dashboard/dashboard.html',
                controller:'dashboardController',
                controllerAs:'vm'
            });
    }
})();
