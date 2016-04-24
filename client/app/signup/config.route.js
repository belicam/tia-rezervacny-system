(function() {
    "use strict";

    angular
        .module('app.signup')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var signup = {
            url: '/signup',
            parent: 'root',
            views: {
                header: {
                    templateUrl: 'layout/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                content: {
                    templateUrl: 'signup/signup.html',
                    controller: 'SignupController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: {}
        };

        $stateProvider.state('signup', signup);
    }

})();