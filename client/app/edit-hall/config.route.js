(function() {
    "use strict";

    angular
        .module('app.editHall')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var editHall = {
            url: '/edit-hall/:id',
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
                    templateUrl: 'edit-hall/edit-hall.html',
                    controller: 'EditHallController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: { /* @ngInject */
                hall: function ($stateParams, hallService) {
                    return hallService.getHall($stateParams.id);
                }
            }
        };

        $stateProvider.state('editHall', editHall);
    }

})();