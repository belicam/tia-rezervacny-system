(function() {
    "use strict";

    angular
        .module('app.editHall')
        .controller('EditHallController', EditHallController);
    
    /* @ngInject */
    function EditHallController (hall, hallService, $state, $rootScope) {
        var ctrl = this;

        ctrl.hall = hall;
        ctrl.editHall = editHall;

        function editHall() {
            $rootScope.$broadcast('$globalLoadStart');
            hallService.editHall(ctrl.hall.Id, ctrl.hall)
                .then(function () {
                    $rootScope.$broadcast('$globalLoadEnd');
                    $state.go('myHalls');
                });
        }
    }
    
})();