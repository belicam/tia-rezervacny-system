(function() {
    "use strict";

    angular
        .module('app.home')
        .controller('HomeController', HomeController);
    
    /* @ngInject */
    function HomeController (eventService) {
        var ctrl = this;
        ctrl.loading = false;

        activate();

        function activate () {
            ctrl.loading = true;
            return getEventsOrderedByDate()
                .then(function () {
                    console.log('home loaded');
                    ctrl.loading = false;
                });
        }

        function getEventsOrderedByDate() {
            ctrl.loading = true;
            return eventService.getEventsOrderedByDate()
                .then(function (events) {
                    ctrl.eventsByDate = events;
                    return ctrl.eventsByDate;
                });
        }
    }
    
})();