(function() {
    "use strict";

    var app = angular.module('app.components');

    var myHallsList = {
        bindings: {
            list: '<'
        },
        controller: MyHallsListController,
        controllerAs: '$ctrl',
        templateUrl: 'components/my-halls-list.html'
    };

    app.component('myHallsList', myHallsList);

    /* @ngInject */
    function MyHallsListController (hallService, $state) {
        var ctrl = this;
        ctrl.deleteHall = deleteHall;

        function deleteHall(hallId) {
            return hallService.deleteHall(hallId)
                .then(function() {
                    console.log('hall deleted');
                    $state.reload();
                });
        }

    }

})();