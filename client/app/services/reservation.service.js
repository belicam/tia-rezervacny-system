(function() {
    "use strict";

    angular
        .module('app.services')
        .factory('reservationService', reservationService);


    /* @ngInject */
    function reservationService ($http, api) {
        var service = {
            getReservationsByOwner: getReservationsByOwner,
            getEventReservedSeats: getEventReservedSeats,
            createReservations: createReservations,
            cancelReservation: cancelReservation
        };

        return service;

        ////////////////////////

        function createReservations (reservationsList) {
            return $http.post(api + '/reservation/multiple', reservationsList)
                .then(createReservationsSuccess)
                .catch(createReservationsFail);

            function createReservationsSuccess(response) {
                return response.data;
            }

            function createReservationsFail(err) {
                console.log('createReservations fail:', err.data);
                return [];
            }
        }

        function cancelReservation (reservationId) {
            return $http.delete(api + '/reservation/' + reservationId)
                .then(cancelReservationSuccess)
                .catch(cancelReservationFail);

            function cancelReservationSuccess(response) {
                return response.data;
            }

            function cancelReservationFail(err) {
                console.log('cancelReservation fail:', err.data);
                return [];
            }
        }

        function getEventReservedSeats(eventId) {
            return $http.get(api + '/reservation/byEvent/' + eventId)
                .then(getEventReservedSeatsSuccess)
                .catch(getEventReservedSeatsFail);

            function getEventReservedSeatsSuccess(response) {
                return response.data;
            }

            function getEventReservedSeatsFail(err) {
                console.log('getEventReservedSeats fail:', err.data);
                return [];
            }
        }


        function getReservationsByOwner() {
            return $http.get(api + '/reservation/byOwner')
                .then(getReservationsByOwnerSuccess)
                .catch(getReservationsByOwnerFail);

            function getReservationsByOwnerSuccess(response) {
                return _.groupBy(response.data, function (r) {
                    return r.Event.Id;
                });
            }

            function getReservationsByOwnerFail(err) {
                console.log('getReservationsByOwner fail:', err.data);
                return [];
            }
        }
    }

})();