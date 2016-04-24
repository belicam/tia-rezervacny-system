(function() {
    "use strict";

    angular
        .module('app.login')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var login = {
            url: '/login',
            parent: 'root',
            views: {
                header: {
                    templateUrl: 'layout/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                content: {
                    templateUrl: 'login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: {}
        };

        $stateProvider.state('login', login);
    }

})();