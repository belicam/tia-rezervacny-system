(function () {
    "use strict";

    angular
        .module('app.services')
        .factory('authenticationService', authenticationService);

    /* @ngInject */
    function authenticationService(storageService, sessionService, storageNames) {

        var service = {
            logout: logout,
            tokenAvailable: tokenAvailable,
            storageDataAvailable: storageDataAvailable,
            isAuthenticated: isAuthenticated,
            setLoggedUser: setLoggedUser,
            setToken: setToken,
            getToken: getToken,
            createSessionFromStorage: createSessionFromStorage
        };

        return service;

        ////////////////////////////

        function createSessionFromStorage() {
            sessionService.setToken(getTokenObject());
            sessionService.setUser(getUserObject());
        }

        function getTokenObject() {
            return angular.fromJson(storageService.getItem(storageNames.token));
        }

        function getUserObject() {
            return angular.fromJson(storageService.getItem(storageNames.userInfo));
        }

        function getToken() {
            return getTokenObject().Access_token;
        }

        function tokenAvailable() {
            return !!getTokenObject();
        }

        function setToken(data) {
            storageService.setItem(storageNames.token, angular.toJson(data));
            sessionService.setToken(data);
        }

        function logout() {
            storageService.removeItem(storageNames.token);
            storageService.removeItem(storageNames.userInfo);
            sessionService.destroy();
        }

        function storageDataAvailable() {
            return tokenAvailable() && !!getUserObject();
        }

        function isAuthenticated() {
            return storageDataAvailable() && !!sessionService.isCreated();
        }

        function setLoggedUser(user) {
            storageService.setItem(storageNames.userInfo, angular.toJson(user));
            sessionService.setUser(user);
        }
    }
})();