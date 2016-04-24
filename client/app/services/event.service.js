(function() {
    "use strict";

    angular
        .module('app.services')
        .factory('eventService',eventService);


    /* @ngInject */
    function eventService ($http, api) {
        var service = {
            getEventsByOwner: getEventsByOwner,
            createEvent: createEvent,
            getEvent: getEvent,
            deleteEvent: deleteEvent,
            getEventsOrderedByDate: getEventsOrderedByDate
        };

        return service;

        ////////////////////////

        function getEventsOrderedByDate() {
            return $http.get(api + '/event/orderedByDate')
                .then(getEventsOrderedByDateSuccess)
                .catch(getEventsOrderedByDateFail);

            function getEventsOrderedByDateSuccess(response) {
                return response.data;
            }

            function getEventsOrderedByDateFail(err) {
                console.log('getEventsOrderedByDate fail:', err.data);
                return [];
            }
        }

        function getEventsByOwner() {
            return $http.get(api + '/event/byOwner')
                .then(getEventsByOwnerSuccess)
                .catch(getEventsByOwnerFail);

            function getEventsByOwnerSuccess(response) {
                return response.data;
            }

            function getEventsByOwnerFail(err) {
                console.log('getEventsByOwner fail:', err.data);
                return [];
            }
        }

        function createEvent(eventData) {
            return $http.post(api + '/event', eventData)
                .then(createEventSuccess)
                .catch(createEventFail);
            
            function createEventSuccess(response) {
                return response.data;
            }
            
            function createEventFail(err) {
                console.log('createEvent fail:', err.data);
            }
        }

        function deleteEvent(eventId) {
            return $http.delete(api + '/event/' + eventId)
                .then(deleteEventSuccess)
                .catch(deleteEventFail);

            function deleteEventSuccess(response) {
                return response.data;
            }

            function deleteEventFail(err) {
                console.log('deleteEvent fail:', err.data);
            }
        }

        function getEvent(eventId) {
            return $http.get(api + '/event/' + eventId)
                .then(getEventSuccess)
                .catch(getEventFail);

            function getEventSuccess(response) {
                return response.data;
            }

            function getEventFail(err) {
                console.log('getEvent fail:', err.data);
            }
        }
    }

})();