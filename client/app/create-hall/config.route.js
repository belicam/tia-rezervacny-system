(function() {
    "use strict";

    angular
        .module('app.createHall')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var createHall = {
            url: '/create-hall',
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
                    templateUrl: 'create-hall/create-hall.html',
                    controller: 'CreateHallController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: {}
        };

        $stateProvider.state('createHall', createHall);
    }

})();