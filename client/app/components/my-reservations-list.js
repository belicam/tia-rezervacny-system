(function() {
    "use strict";

    var app = angular.module('app.components');

    var myReservationsList = {
        bindings: {
            list: '<'
        },
        controller: MyReservationsListController,
        controllerAs: '$ctrl',
        templateUrl: 'components/my-reservations-list.html'
    };

    app.component('myReservationsList', myReservationsList);

    /* @ngInject */
    function MyReservationsListController (reservationService, $state) {
        var ctrl = this;
        
        ctrl.cancelReservation = cancelReservation;

        function cancelReservation(reservationId) {
            return reservationService.cancelReservation(reservationId)
                .then(function() {
                    console.log('reservation deleted');
                    $state.reload();
                });
        }
    }

})();