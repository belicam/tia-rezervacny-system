(function() {
    "use strict";

    angular
        .module('app.myReservations')
        .controller('MyReservationsController', MyReservationsController);
    
    /* @ngInject */
    function MyReservationsController (reservationService) {
        var ctrl = this;
        ctrl.loading = false;

        activate();

        function activate() {
            ctrl.loading = true;
            return getMyReservations().then(function() {
                console.log('my reservations loaded');
                ctrl.loading = false;
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