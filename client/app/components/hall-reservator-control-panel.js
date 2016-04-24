(function () {
    "use strict";

    var app = angular.module('app.components');

    var hallReservatorControlPanel = {
        restrict: 'E',
        templateUrl: 'components/hall-reservator-control-panel.html',
        controllerAs: '$ctrl',
        controller: HallReservatorControlPanelController,
        bindings: {
            hall: '=',
            reservations: '=',
            eventId: '@'
        }
    };

    app.component('hallReservatorControlPanel', hallReservatorControlPanel);


    /* @ngInject */
    function HallReservatorControlPanelController() {
        var ctrl = this;

        ctrl.reserveSelectedSeats = reserveSelectedSeats;

        function reserveSelectedSeats() {
            ctrl.reservations = [];
            for (var i = 0; i < ctrl.hall.Rows.length; i++) {
                for (var j = 0; j < ctrl.hall.Rows[i].Seats.length; j++) {
                    if (ctrl.hall.Rows[i].Seats[j].selected) {
                        var reservation = {
                            Event: ctrl.eventId,
                            Row: ctrl.hall.Rows[i].Id,
                            Seat: ctrl.hall.Rows[i].Seats[j].Id,
                            RowNumber: ctrl.hall.Rows[i].Number,
                            SeatNumber: ctrl.hall.Rows[i].Seats[j].Number
                        };
                        ctrl.reservations.push(reservation);
                    }
                }
            }
        }

    }
})();