(function () {
    "use strict";

    angular
        .module('app.root')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var root = {
            url: '',
            abstract: true,
            templateUrl: 'root/root.html',
            resolve: {}
        };

        $stateProvider.state('root', root);
    }
    
})();