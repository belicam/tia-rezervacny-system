(function() {
    "use strict";

    angular
        .module('app.core')
        .config(config);


    /* @ngInject */
    function config ($httpProvider, $urlRouterProvider, $locationProvider) {

        $httpProvider.interceptors.push('authInterceptor');

        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise(otherwise);

        ///////////////////////////////////

        function otherwise($injector) {
            var $state = $injector.get('$state');
            $state.go('home');
        }

    }

})();