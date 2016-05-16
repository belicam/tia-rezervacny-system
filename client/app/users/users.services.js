(function() {
    "use strict";

    angular
        .module('app.users')
        .factory('adminService', adminService);
    
    /* @ngInject */
    function adminService ($http, api, $q) {
        var service = {
            getAllUsers: getAllUsers,
            deactivateUser: setDeactivateUser,
            updateUser: updateUser
        };

        return service;

        //////////////////////
        
        function getAllUsers() {
            var deferred = $q.defer();

            $http.get(api + '/user')
                .then(
                    getAllUsersSuccess,
                    getAllUsersFail
                );

            return deferred.promise;

            function getAllUsersSuccess(response) {
                deferred.resolve(response.data);
            }
            
            function getAllUsersFail(err) {
                deferred.reject(err);
            }
        }

        function setDeactivateUser(id, deactivate) {
            return $http.put(api + '/user/' + id + "/deactivate/" + deactivate)
                .then(
                    deactivateSuccess,
                    deactivateFail
                );
            
            function deactivateSuccess() {
                return true;
            }
            
            function deactivateFail() {
                return false;
            }
        }

        function updateUser(id, userData) {
            return $http.put(api + '/user/' + id, userData)
                .then(
                    updateSuccess,
                    updateFail
                );
            
            function updateSuccess() {
                return true;
            }
            
            function updateFail () {
                return false;
            }
        }
    }
})();