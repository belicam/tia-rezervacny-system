(function() {
    "use strict";

    var app = angular.module('app.components');

    var myEventsList = {
        bindings: {
            list: '<'
        },
        controller: MyEventsListController,
        controllerAs: '$ctrl',
        templateUrl: 'components/my-events-list.html'
    };

    app.component('myEventsList', myEventsList);

    /* @ngInject */
    function MyEventsListController (eventService, $state) {
        var ctrl = this;
        
        ctrl.deleteEvent = deleteEvent;

        function deleteEvent(eventId) {
            return eventService.deleteEvent(eventId)
                .then(function() {
                    $state.reload();
                });
        }
    }

})();