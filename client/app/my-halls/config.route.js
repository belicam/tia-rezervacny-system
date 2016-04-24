(function() {
    "use strict";

    angular
        .module('app.myHalls')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var myHalls = {
            url: '/my-halls',
            data: {
                authenticated: true,
                isOrganizer: true
            },
            parent: 'root',
            views: {
                header: {
                    templateUrl: 'layout/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                content: {
                    templateUrl: 'my-halls/my-halls.html',
                    controller: 'MyHallsController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: {}
        };

        $stateProvider.state('myHalls', myHalls);
    }

})();