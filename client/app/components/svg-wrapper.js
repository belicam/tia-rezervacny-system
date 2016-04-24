(function() {
    "use strict";

    angular.module('app.components')
        .directive('svgWrapper', svgWrapper);

    /* @ngInject */
    function svgWrapper () {
        var directive = {
            templateUrl: 'components/svg-wrapper.html',
            bindToController: true,
            controller: SvgWrapperController,
            controllerAs: 'ctrl',
            link: linkFn,
            scope: {
                svg: '<svgSize',
                hall: '=',
                mode: '@'
            }
        };
        
        return directive;
        
        /* @ngInject */
        function SvgWrapperController () {
            var ctrl = this;
        }


        function linkFn(scope, elem, attr, ctrl) {
            var panZoomOpts = {
                events: {
                    drag: false,
                    doubleClick: false,
                    mouseWheel: false
                },
                initialViewBox: {
                    width: ctrl.svg.width,
                    height: ctrl.svg.height
                },
                zoomFactor: 0.1,
                animationTime: 50
            };

            var svgPanZoomRef = $('#svg-el').svgPanZoom(panZoomOpts);

            ctrl.panUp = panUpFn;
            ctrl.panDown = panDownFn;
            ctrl.panLeft = panLeftFn;
            ctrl.panRight = panRightFn;
            ctrl.zoomIn = zoomInFn;
            ctrl.zoomOut = zoomOutFn;
            ctrl.reset = resetFn;

            function resetFn() {
                svgPanZoomRef.reset();
            }

            function zoomInFn() {
                svgPanZoomRef.zoomIn();
            }

            function zoomOutFn() {
                svgPanZoomRef.zoomOut();
            }

            function panLeftFn() {
                svgPanZoomRef.panLeft();
            }

            function panRightFn() {
                svgPanZoomRef.panRight();
            }

            function panUpFn() {
                svgPanZoomRef.panUp();
            }

            function panDownFn() {
                svgPanZoomRef.panDown();
            }
        }
    }

})();