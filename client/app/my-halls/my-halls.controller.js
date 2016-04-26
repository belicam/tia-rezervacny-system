(function() {
    "use strict";

    angular
        .module('app.myHalls')
        .controller('MyHallsController', MyHallsController);
    
    /* @ngInject */
    function MyHallsController (hallService) {
        var ctrl = this;
        ctrl.loading = false;

        activate();

        function activate() {
            ctrl.loading = true;
            return getMyHalls().then(function() {
                console.log('my halls loaded');
                ctrl.loading = false;
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