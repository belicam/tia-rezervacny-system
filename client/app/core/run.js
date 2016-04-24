(function () {
    "use strict";

    angular
        .module('app.core')
        .run(run);

    /* @ngInject */
    function run($rootScope, $state, $stateParams, storageService, authenticationService, sessionService) {

        storageService.determineLocalStorage();

        if (authenticationService.storageDataAvailable()) {
            authenticationService.createSessionFromStorage();
        }

        $rootScope.$on('$stateChangeStart', stateChangeStart);
        $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
        $rootScope.$on('$stateChangeError', stateChangeError);
        $rootScope.$on('$stateNotFound', stateNotFound);

        ////////////////////////

        function stateChangeStart(event, toState, toParams, fromState, fromParams) {
            $rootScope.$broadcast('$globalLoadStart');

            if (toState.data) {
                if (toState.data.authenticated && !sessionService.isCreated()) {
                    event.preventDefault();
                    $state.go('home');

                    if (toState.data.isOrganizer && !sessionService.getUser().isOrganizer) {
                        event.preventDefault();
                        $state.go('home');
                    }
                }
            }
        }

        function stateChangeSuccess(event, toState, toParams, fromState, fromParams) {
            $rootScope.$broadcast('$globalLoadEnd');
        }

        function stateChangeError(event, toState, toParams, fromState, fromParams) {
            $rootScope.$broadcast('$globalLoadEnd');
        }

        function stateNotFound(event, toState, toParams, fromState, fromParams) {
            $rootScope.$broadcast('$globalLoadEnd');
        }

    }

})();