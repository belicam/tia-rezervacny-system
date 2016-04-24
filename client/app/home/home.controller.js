(function() {
    "use strict";

    angular
        .module('app.home')
        .controller('HomeController', HomeController);
    
    /* @ngInject */
    function HomeController (eventService) {
        var ctrl = this;

        activate();

        function activate () {
            return eventService.getEventsOrderedByDate()
                .then(function (events) {
                    ctrl.eventsByDate = events;
                    return ctrl.eventsByDate;
                });
        }
    }
    
})();