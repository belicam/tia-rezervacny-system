(function() {
    "use strict";

    angular
        .module('app.createReservation')
        .controller('CreateReservationController', CreateReservationController);
    
    /* @ngInject */
    function CreateReservationController (event, hall, $state, reservationService) {
        var ctrl = this;

        ctrl.event = event;
        ctrl.reservations = [];

        ctrl.createReservations = createReservations;

        activate();

        function createReservations () {
            return reservationService.createReservations(ctrl.reservations)
                .then(function() {
                    console.log('reserved');
                    $state.go('myReservations');
                });
        }

        function activate() {
            return reservationService.getEventReservedSeats(event.Id)
                .then(markReserved);

            function markReserved(reservedSeatsList) {
                for (var i = 0; i < reservedSeatsList.length; i++) {
                    for (var j = 0; j < hall.Rows.length; j++) {
                        for (var k = 0; k < hall.Rows[j].Seats.length; k++) {
                            if (hall.Rows[j].Seats[k].Id == reservedSeatsList[i].Id) {
                                hall.Rows[j].Seats[k].reserved = true;
                            }
                        }
                    }
                }
                ctrl.hall = hall;
                return ctrl.hall;
            }
        }
    }
    
})();