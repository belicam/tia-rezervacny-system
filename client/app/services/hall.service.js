(function() {
    "use strict";

    angular
        .module('app.services')
        .factory('hallService',hallService);


    /* @ngInject */
    function hallService ($http, api) {
        var service = {
            getAllHallsByOwner: getAllHallsByOwner,
            getHall: getHall,
            editHall: editHall,
            createHall: createHall,
            deleteHall: deleteHall
        };

        return service;

        ////////////////////////

        function getAllHallsByOwner() {
            return $http.get(api + '/hall/byOwner')
                .then(getAllHallsByOwnerSuccess)
                .catch(getAllHallsByOwnerFail);

            function getAllHallsByOwnerSuccess(response) {
                return response.data;
            }

            function getAllHallsByOwnerFail(err) {
                console.log('getAllHallsByOwner fail:', err.data);
                return [];
            }
        }


        function getHall(idHall) {
            return $http.get(api + '/hall/' + idHall)
                .then(getHallSuccess)
                .catch(getHallFail);

            function getHallSuccess(response) {
                return response.data;
            }

            function getHallFail(err) {
                console.log('getHall fail:', err.data);
                return [];
            }
        }

        function createHall(hall) {
            return $http.post(api + '/hall', hall)
                .then(createHallSuccess)
                .catch(createHallFail);
            
            function createHallSuccess (response) {
                return response.data;
            }
            
            function createHallFail (err) {
                console.log('createHall fail:', err.data);
            }
        }

        function editHall(idHall, hall) {
            return $http.put(api + '/hall/' + idHall, hall)
                .then(editHallSuccess)
                .catch(editHallFail);

            function editHallSuccess (response) {
                return response.data;
            }

            function editHallFail (err) {
                console.log('editHall fail:', err.data);
            }
        }

        function deleteHall(hallId) {
            return $http.delete(api + '/hall/' + hallId)
                .then(deleteHallSuccess)
                .catch(deleteHallFail);

            function deleteHallSuccess(response) {
                return response.data;
            }

            function deleteHallFail(err) {
                console.log('deleteHall fail:', err.data);
            }
        }
    }

})();