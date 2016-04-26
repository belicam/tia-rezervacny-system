(function () {
    "use strict";

    angular
        .module('app.components')
        .directive('globalSpinner', globalSpinner);

    /* @ngInject */
    function globalSpinner ($rootScope) {
        var directive = {
            restrict: 'E',
            templateUrl: 'components/global-spinner.directive.html',
            link: link
        };

        return directive;

        function link (scope, element, attr) {
            $rootScope.$on('$globalLoadStart', function () {
                element.removeClass('hidden');
            });

            $rootScope.$on('$globalLoadEnd', function () {
                element.addClass('hidden');
            });
        }
    }
})();