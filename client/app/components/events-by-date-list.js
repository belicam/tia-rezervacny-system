(function() {
    "use strict";

    var app = angular.module('app.components');

    var eventsByDateList = {
        bindings: {
            list: '<'
        },
        controller: EventsByDateListController,
        controllerAs: '$ctrl',
        templateUrl: 'components/events-by-date-list.html'
    };

    app.component('eventsByDateList', eventsByDateList);

    /* @ngInject */
    function EventsByDateListController (sessionService, $state) {
        var ctrl = this;

        ctrl.goToReservation = goToReservation;

        function goToReservation(eventId) {
            if (sessionService.isCreated()) {
                $state.go('createReservation', { id: eventId });
            } else {
                $state.go('login');
            }
        }
    }

})();