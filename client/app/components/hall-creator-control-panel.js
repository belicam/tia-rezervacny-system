(function () {
    "use strict";

    var app = angular.module('app.components');

    var hallCreatorControlPanel = {
        restrict: 'E',
        templateUrl: 'components/hall-creator-control-panel.html',
        controllerAs: '$ctrl',
        controller: HallCreatorControlPanelController,
        bindings: {
            hall: '=',
            svgSize: '<'
        }
    };

    app.component('hallCreatorControlPanel', hallCreatorControlPanel);


    /* @ngInject */
    function HallCreatorControlPanelController() {
        var ctrl = this;

        ctrl.seatSpacing = 10;
        ctrl.deleteAllSeats = deleteAllSeats;
        ctrl.deleteSelectedSeats = deleteSelectedSeats;

        function deleteSelectedSeats() {
            ctrl.hall.Rows = ctrl.hall.Rows
                .map(filterSeats)
                .filter(filterEmptyRows);

            refreshSeatNumbers();

            ////////////////////////

            function filterSeats(row) {
                row.Seats = row.Seats.filter(filterSelectedSeats);
                return row;
            }

            function filterSelectedSeats(s) {
                return s.selected === false;
            }

            function filterEmptyRows(row) {
                return row.Seats.length > 0;
            }
        }

        function deleteAllSeats() {
            ctrl.hall.Rows = [];
        }

        function refreshSeatNumbers() {
            for (var i = 0; i < ctrl.hall.Rows.length; i++) {
                ctrl.hall.Rows[i].Number = i + 1;
                for (var j = 0; j < ctrl.hall.Rows[i].Seats.length; j++) {
                    ctrl.hall.Rows[i].Seats[j].Number = j + 1;
                }
            }
        }
    }
})();