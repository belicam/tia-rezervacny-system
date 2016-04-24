(function() {
    "use strict";

    angular
        .module('app.createHall')
        .controller('CreateHallController', CreateHallController);
    
    /* @ngInject */
    function CreateHallController (hallService, $state) {
        var ctrl = this;

        ctrl.hall = {
            ScreenX: 0,
            ScreenY: 0
        };

        ctrl.createHall = createHall;

        function createHall () {
            hallService.createHall(ctrl.hall)
                .then(function () {
                    console.log('createHall finished');
                    $state.go('myHalls');
                });
        }
    }
    
})();