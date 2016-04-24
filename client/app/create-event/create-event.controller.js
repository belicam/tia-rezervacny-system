(function() {
    "use strict";

    angular
        .module('app.createEvent')
        .controller('CreateEventController', CreateEventController);
    
    /* @ngInject */
    function CreateEventController (eventService, $state, hallService) {
        var ctrl = this;

        ctrl.eventData = {};
        ctrl.createEvent = createEvent;

        ctrl.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        activate();

        function createEvent() {
            return eventService.createEvent(ctrl.eventData)
                .then(function() {
                    $state.go('myEvents');
                });
        }

        function activate() {
            return hallService.getAllHallsByOwner()
                .then(function (halls) {
                    if (!halls || halls.length === 0) {
                        console.log('no halls');
                    } else {
                        ctrl.availableHalls = halls;
                        ctrl.eventData.Hall = halls[0].Id;
                    }
                });
        }



    }
    
})();