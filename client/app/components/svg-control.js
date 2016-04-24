(function() {
    "use strict";

    angular
        .module('app.components')
        .directive('svgControl', svgControl);


    /* @ngInject */
    function svgControl () {
        var directive = {
            restrict: 'E',
            scope: {
                clickAction: '&',
                controlType: '@'
            },
            bindToController: true,
            controller: SvgControlController,
            controllerAs: 'ctrl',
            templateUrl: 'components/svg-control.html'
        };

        return directive;
        
        /////////////////////////
        
        /* @ngInject */
        function SvgControlController () {
            var ctrl = this;
            
            ctrl.iconClass = setIconClass(ctrl.controlType);

            function setIconClass(type) {
                var classes = {
                    'zoomIn': 'glyphicon glyphicon-plus',
                    'zoomOut': 'glyphicon glyphicon-minus',
                    'up': 'glyphicon glyphicon-chevron-up',
                    'down': 'glyphicon glyphicon-chevron-down',
                    'left': 'glyphicon glyphicon-chevron-left',
                    'right': 'glyphicon glyphicon-chevron-right',
                    'reset': 'glyphicon glyphicon-repeat'
                };

                return classes[type];
            }
        }
    }
})();