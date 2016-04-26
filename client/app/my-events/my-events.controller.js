(function() {
    "use strict";

    angular
        .module('app.myEvents')
        .controller('MyEventsController', MyEventsController);
    
    /* @ngInject */
    function MyEventsController (eventService) {
        var ctrl = this;
        ctrl.loading = false;

        activate();

        function activate() {
            ctrl.loading = true;
            return getMyEvents().then(function() {
                console.log('my events loaded');
                ctrl.loading = false;
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