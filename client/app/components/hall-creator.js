(function () {
    "use strict";

    var app = angular.module('app.components');


    var hallCreator = {
        templateUrl: 'components/hall-creator.html',
        controller: HallCreatorController,
        controllerAs: '$ctrl',
        bindings: {
            hall: '='
        }
    };

    app.component('hallCreator', hallCreator);

    /////////////////////////////

    /* @ngInject */
    function HallCreatorController(hallService) {
        var ctrl = this;

        ctrl.svg = {
            width: 720,
            height: 480
        };
    }

})();