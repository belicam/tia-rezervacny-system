(function() {
    "use strict";

    angular
        .module('app.myHalls')
        .controller('MyHallsController', MyHallsController);
    
    /* @ngInject */
    function MyHallsController (hallService) {
        var ctrl = this;

        activate();

        function activate() {
            return getMyHalls().then(function() {
                console.log('my halls loaded');
            });
        }

        function getMyHalls() {
            return hallService.getAllHallsByOwner()
                .then(function(halls) {
                    ctrl.myHalls = halls;
                    return ctrl.myHalls;
                });
        }
    }
    
})();