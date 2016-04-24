(function() {
    "use strict";

    angular
        .module('app.services')
        .factory('accountService', accountService);

    /* @ngInject */
    function accountService ($http, authenticationService, api) {
        
        var service = {
            signup: signup,
            login: login,
            logout: logout
        };

        return service;

        //////////////////////

        function signup(email, password, name, isOrganizer) {
            var url = api + '/user/signup',
                postData = {
                    Email: email,
                    Password: password,
                    isOrganizer: isOrganizer,
                    Name: name
                };

            return $http.post(url, postData)
                .then(signupSuccess)
                .catch(signupFail);

            function signupSuccess(response) {
                var user = angular.copy(response.data),
                    token = angular.copy(response.data.Token);

                delete user.Token;

                authenticationService.setLoggedUser(user);
                authenticationService.setToken(token);
                return response.status;
            }

            function signupFail(err) {
                console.log("loginFail:", err.data);
                return err.status;
            }
        }

        function login(email, password) {
            var url = api + '/user/login',
                postData = {
                    Email: email,
                    Password: password
                };

            return $http.post(url, postData)
                .then(loginSuccess)
                .catch(loginFail);

            function loginSuccess(response) {
                var user = angular.copy(response.data),
                    token = angular.copy(response.data.Token);

                delete user.Token;

                authenticationService.setLoggedUser(user);
                authenticationService.setToken(token);
                return response.status;
            }

            function loginFail(err) {
                return err.status;
            }
        }

        function logout() {
            authenticationService.logout();
        }
    }

})();