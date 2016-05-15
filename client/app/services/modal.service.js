(function() {
    "use strict";
    
    angular
        .module('app.services')
        .factory('modalService', modalService);
    
    /* @ngInject */
    function modalService ($uibModal) {
        var service = {
            hallInUse: hallInUse,
            eventInUse: eventInUse
        };

        return service;

        /////////////////////////

        function hallInUse() {
            return $uibModal.open({
                templateUrl: 'modals/hall-used.html',
                controller: function() {},
                controllerAs: 'ctrl',
                bindToController: true
            });
        }

        function eventInUse() {
            return $uibModal.open({
                templateUrl: 'modals/event-used.html',
                controller: function() {},
                controllerAs: 'ctrl',
                bindToController: true
            });
        }
    }
})();