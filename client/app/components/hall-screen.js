(function () {
    "use strict";

    angular
        .module('app.components')
        .directive('hallScreen', hallScreen);

    function hallScreen($timeout) {

        var directive = {
            restrict: 'E',
            replace: true,
            templateNamespace: 'svg',
            templateUrl: 'components/hall-screen.html',
            bindToController: true,
            link: linkfn,
            controller: HallScreenController,
            controllerAs: 'ctrl',
            scope: {
                screenX: '=',
                screenY: '=',
                mode: '@'
            }
        };

        return directive;

        /* @ngInject */
        function HallScreenController() {
            var ctrl = this;

            ctrl.screenWidth = 200;
            ctrl.screenHeight = 20;
        }

        function linkfn(scope, elem, attr, ctrl) {

            if (ctrl.mode === "edit") {
                $(elem[0]).mousedown(emousedown);
                $(window).mouseup(emouseup);
                $(window).mousemove(emousemove);

                var grabbed = false;
                var dim = $('.svg')[0].getBoundingClientRect();
                var leftBound = 0;
                var rightBound = dim.width - ctrl.screenWidth;

                init();
            }

            function init() {
                $timeout(timeoutFn);

                function timeoutFn() {
                    dim = $('.svg')[0].getBoundingClientRect();
                    rightBound = dim.width - ctrl.screenWidth;

                    if (!ctrl.screenX) {
                        ctrl.screenX = dim.width / 2 - ctrl.screenWidth / 2;
                    }
                }
            }

            function emousedown(e) {
                grabbed = true;
            }

            function emouseup(e) {
                grabbed = false;
            }

            function emousemove(e) {
                if (grabbed) {
                    var newx = (getCoords(e).x - ctrl.screenWidth / 2);
                    if (newx >= leftBound && newx <= rightBound) {
                        ctrl.screenX = newx;
                        scope.$apply();
                    }
                }
            }

            function getCoords(evt) {
                var e = evt.target;
                var x = evt.clientX - dim.left;
                var y = evt.clientY - dim.top;

                return {
                    x: x,
                    y: y
                };
            }
        }
    }
})();