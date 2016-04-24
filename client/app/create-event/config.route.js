(function() {
    "use strict";

    angular
        .module('app.createEvent')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var createEvent = {
            url: '/create-event',
            data: {
                authenticated: true,
                isOrganizer: true
            },
            parent: 'root',
            views: {
                header: {
                    templateUrl: 'layout/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                content: {
                    templateUrl: 'create-event/create-event.html',
                    controller: 'CreateEventController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: {}
        };

        $stateProvider.state('createEvent', createEvent);
    }

})();