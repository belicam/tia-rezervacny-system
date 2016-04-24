(function () {
    "use strict";

    angular
        .module('app.core')
        .factory('storageService', storageService);


    /* @ngInject */
    function storageService($window) {

        var fakeStorage = {},
            localStorageAvailable = true;

        var service = {
            determineLocalStorage: determineLocalStorage,
            setItem: setItem,
            getItem: getItem,
            removeItem: removeItem
        };

        return service;

        /////////////////////////////

        function determineLocalStorage() {
            var testKey = 'test',
                testVal = 'testVal';

            try {
                $window.localStorage.setItem(testKey, testVal);
                var value = $window.localStorage.getItem(testKey) === testVal;
                $window.localStorage.removeItem(testKey);
                localStorageAvailable = value;
            } catch (e) {
                localStorageAvailable = false;
            }
        }

        function setItem(k, v) {
            if (localStorageAvailable) {
                $window.localStorage.setItem(k, v);
            } else {
                fakeStorage[k] = v;
            }
        }

        function getItem(k) {
            var result;

            if (localStorageAvailable) {
                result = $window.localStorage.getItem(k);
            } else {
                result = fakeStorage[k];
            }
            return result;
        }

        function removeItem(k) {
            var result;

            if (localStorageAvailable) {
                result = $window.localStorage.removeItem(k);
            } else {
                result = fakeStorage[k];
                delete fakeStorage[k];
            }

            return result;
        }
    }
})();