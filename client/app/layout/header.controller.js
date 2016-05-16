(function() {
    "use strict";

    angular
        .module('app.layout')
        .controller('HeaderController', HeaderController);

    /* @ngInject */
    function HeaderController (accountService, $state, sessionService) {
        var ctrl = this;

        ctrl.logout = logout;
        ctrl.isLoggedIn = isLoggedIn;
        ctrl.userName = userName;
        ctrl.userIsOrganizer = userIsOrganizer;
        ctrl.userIsAdmin = userIsAdmin;

        //////////////////////////////

        function userIsOrganizer() {
            return sessionService.getUser().IsOrganizer;
        }

        function userIsAdmin() {
            return sessionService.getUser().IsAdmin;
        }

        function userName() {
            return sessionService.getUser().Name;
        }

        function isLoggedIn() {
            return sessionService.isCreated();
        }

        function logout() {
            accountService.logout();
            $state.go('home');
        }
    }

})();