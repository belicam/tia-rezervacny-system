(function() {
    "use strict";

    angular
        .module('app.createHall')
        .controller('CreateHallController', CreateHallController);
    
    /* @ngInject */
    function CreateHallController (hallService, $state, $rootScope) {
        var ctrl = this;

        ctrl.hall = {
            ScreenX: 0,
            ScreenY: 0
        };

        ctrl.createHall = createHall;

        function createHall () {
            $rootScope.$broadcast('$globalLoadStart');
            hallService.createHall(ctrl.hall)
                .then(function () {
                    $rootScope.$broadcast('$globalLoadEnd');
                    $state.go('myHalls');
                });
        }
    }
    
})();