(function() {
    "use strict";

    angular
        .module('app.editHall')
        .controller('EditHallController', EditHallController);
    
    /* @ngInject */
    function EditHallController (hall, hallService, $state) {
        var ctrl = this;

        ctrl.hall = hall;
        ctrl.editHall = editHall;

        function editHall() {
            hallService.editHall(ctrl.hall.Id, ctrl.hall)
                .then(function () {
                    $state.go('myHalls');
                });
        }
    }
    
})();