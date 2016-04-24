(function () {
    "use strict";

    var app = angular.module('app.components');

    var sectorCreatePopover = {
        require: {
            hallCreatorControlPanel: '^hallCreatorControlPanel'
        },
        bindings: {
            hall: '=',
            seatSpacing: '='
        },
        controller: SectorCreatePopoverController,
        controllerAs: '$ctrl',
        templateUrl: 'components/sector-create-popover.html'
    };

    app.component('sectorCreatePopover', sectorCreatePopover);

    /* @ngInject */
    function SectorCreatePopoverController () {
        var ctrl = this;

        ctrl.numRows = 5;
        ctrl.numSeats = 5;

        ctrl.popoverTemplate = 'components/sector-create-popover-tpl.html';

        ctrl.generate = generate;
        ctrl.$onInit = onInit;


        function onInit() {
            ctrl.svgSize = ctrl.hallCreatorControlPanel.svgSize;
        }

        function generate() {
            var rows = [];

            var startX = ctrl.svgSize.width / 2 - ((ctrl.numSeats - 3) * ctrl.seatSpacing + ctrl.numSeats * 10 * 2) / 2;
            var startY = ctrl.svgSize.height / 2 - ((ctrl.numRows - 3) * ctrl.seatSpacing + ctrl.numRows * 10 * 2) / 2;

            for (var i = 0; i < ctrl.numRows; i++) {
                var row = {
                    Number: i + 1,
                    Seats: []
                };
                rows.push(row);

                for (var j = 0; j < ctrl.numSeats; j++) {
                    var seat = {
                        x: startX + j * ctrl.seatSpacing + j * 10 * 2,
                        y: startY + i * ctrl.seatSpacing + i * 10 * 2,
                        Number: j + 1
                    };
                    rows[rows.length - 1].Seats.push(seat);
                }
            }

            ctrl.hall.Rows = rows;
            ctrl.isOpened = false;
        }

    }
})();