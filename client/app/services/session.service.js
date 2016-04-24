(function() {
    "use strict";

    angular
        .module('app.services')
        .service('sessionService', sessionService);
    
    
    /* @ngInject */
    function sessionService() {
        var user = null,
            token = null;

        var session = {
            getUser: getUser,
            setUser: setUser,
            getToken: getToken,
            setToken: setToken,
            isCreated: isCreated,
            destroy: destroy
        };

        return session;

        ////////////////////////////////////

        function getUser() {
            return user;
        }

        function getToken() {
            return token;
        }

        function setUser(userData) {
            user = angular.copy(userData);
        }

        function setToken(tokenData) {
            token = angular.copy(tokenData);
        }

        function isCreated() {
            return !!getToken() && !!getUser();
        }

        function destroy() {
            token = null;
            user = null;
        }
    }
})();