(function () {
    "use strict";

    angular
        .module('app.components')
        .directive('hallSector', hallSector);

    function hallSector() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateNamespace: 'svg',
            templateUrl: 'components/hall-sector.html',
            bindToController: true,
            link: linkfn,
            controller: HallSectorController,
            controllerAs: 'ctrl',
            scope: {
                rows: '=',
                mode: '@'
            }
        };

        return directive;

        /* @ngInject */
        function HallSectorController() {
            var ctrl = this;

        }

        function linkfn(scope, elem, attr, ctrl) {
            ctrl.seatRadius = 10;
        }
    }
})();