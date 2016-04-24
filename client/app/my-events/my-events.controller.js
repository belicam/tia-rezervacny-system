(function() {
    "use strict";

    angular
        .module('app.myEvents')
        .controller('MyEventsController', MyEventsController);
    
    /* @ngInject */
    function MyEventsController (eventService) {
        var ctrl = this;

        activate();

        function activate() {
            return getMyEvents().then(function() {
                console.log('my events loaded');
            });
        }

        function getMyEvents() {
            return eventService.getEventsByOwner()
                .then(function(events) {
                    ctrl.myEvents = events;
                    return ctrl.myEvents;
                });
        }
    }
    
})();