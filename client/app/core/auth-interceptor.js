(function () {
    "use strict";

    angular
        .module('app.core')
        .factory('authInterceptor', authInterceptor);

    /* @ngInject */
    function authInterceptor($injector) {
        return {
            request: requestfn,
            response: responsefn
        };

        function requestfn($config) {
            if (!!$injector.get('sessionService').getToken()) {
                $config.headers['Reserv-Sys-Token'] = $injector.get('sessionService').getToken().AccessToken;
            }

            return $config;
        }

        function responsefn(response) {
            if (response.status === 401) {
                $injector.get('authenticationService').logout();
                $injector.get('$state').go('login');
            }
            return response;
        }
    }
})();