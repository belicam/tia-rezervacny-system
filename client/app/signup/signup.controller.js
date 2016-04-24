(function () {
    "use strict";

    angular
        .module('app.signup')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController(accountService, $state) {
        var ctrl = this;

        ctrl.signup = signup;

        function signup() {
            ctrl.serverError = false;
            ctrl.wrongData = false;
            ctrl.requestStarted = true;

            accountService.signup(ctrl.email, ctrl.password, ctrl.name, ctrl.isOrganizer)
                .then(signupCallback);


            function signupCallback(status) {
                ctrl.requestStarted = false;
                if (status == 200) {
                    $state.go('home');
                } else if (status == 500) {
                    ctrl.serverError = true;
                } else {
                    ctrl.wrongData = true;
                }
            }
        }
    }

})();