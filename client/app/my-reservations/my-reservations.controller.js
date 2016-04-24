(function() {
    "use strict";

    angular
        .module('app.myReservations')
        .controller('MyReservationsController', MyReservationsController);
    
    /* @ngInject */
    function MyReservationsController (reservationService) {
        var ctrl = this;

        activate();

        function activate() {
            return getMyReservations().then(function() {
                console.log('my reservations loaded');
            });
        }

        function getMyReservations() {
            return reservationService.getReservationsByOwner()
                .then(function(reservations) {
                    ctrl.myReservations = reservations;
                    return ctrl.myReservations;
                });
        }

    }
    
})();