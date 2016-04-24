(function() {
    "use strict";

    angular
        .module('app.login')
        .controller('LoginController', LoginController);
    
    /* @ngInject */
    function LoginController (accountService, $state) {
        var ctrl = this;

        ctrl.login = login;

        function login() {
            ctrl.serverError = false;
            ctrl.wrongData = false;
            ctrl.requestStarted = true;
            accountService.login(ctrl.email, ctrl.password)
                .then(function(status) {
                    ctrl.requestStarted = false;
                    if (status == 200) {
                        $state.go('home');
                    } else if (status == 500) {
                        ctrl.serverError = true;
                    } else {
                        ctrl.wrongData = true;
                    }
                });
        }
    }
    
})();