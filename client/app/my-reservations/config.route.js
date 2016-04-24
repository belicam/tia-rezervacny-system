(function() {
    "use strict";

    angular
        .module('app.myReservations')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var myReservations = {
            url: '/my-reservations',
            data: {
                authenticated: true
            },
            parent: 'root',
            views: {
                header: {
                    templateUrl: 'layout/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                content: {
                    templateUrl: 'my-reservations/my-reservations.html',
                    controller: 'MyReservationsController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: {}
        };

        $stateProvider.state('myReservations', myReservations);
    }

})();