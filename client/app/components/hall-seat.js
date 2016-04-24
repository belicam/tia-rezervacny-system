(function () {
    "use strict";

    angular
        .module('app.components')
        .directive('hallSeat', hallSeat);

    function hallSeat() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateNamespace: 'svg',
            templateUrl: 'components/hall-seat.html',
            bindToController: true,
            controller: HallSeatController,
            controllerAs: 'ctrl',
            scope: {
                seat: '=',
                seatRadius: '@radius'
            }
        };

        return directive;

        /* @ngInject */
        function HallSeatController() {
            var ctrl = this;

            ctrl.seat.selected = false;
            ctrl.toggleSelect = toggleSelect;

            function toggleSelect() {
                if (!ctrl.seat.reserved) {
                    ctrl.seat.selected = !ctrl.seat.selected;
                }
            }
        }
    }
})();