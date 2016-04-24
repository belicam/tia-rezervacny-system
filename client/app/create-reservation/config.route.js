(function() {
    "use strict";

    angular
        .module('app.createReservation')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var createReservation = {
            url: '/create-reservation/:id',
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
                    templateUrl: 'create-reservation/create-reservation.html',
                    controller: 'CreateReservationController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: { /* @ngInject */
                event: function(eventService, $stateParams) {
                    return eventService.getEvent($stateParams.id);
                },
                hall: function(hallService, event) {
                    return hallService.getHall(event.Hall.Id);
                }
            }
        };

        $stateProvider.state('createReservation', createReservation);
    }

})();