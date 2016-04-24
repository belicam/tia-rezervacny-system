(function() {
    "use strict";

    angular
        .module('app.myEvents')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var myEvents = {
            url: '/my-events',
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
                    templateUrl: 'my-events/my-events.html',
                    controller: 'MyEventsController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: {}
        };

        $stateProvider.state('myEvents', myEvents);
    }

})();