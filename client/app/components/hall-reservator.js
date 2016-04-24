(function () {
    "use strict";

    var app = angular.module('app.components');


    var hallReservator = {
        templateUrl: 'components/hall-reservator.html',
        controller: HallReservatorController,
        controllerAs: '$ctrl',
        bindings: {
            hall: '=',
            event: '<',
            reservations: '='
        }
    };


    app.component('hallReservator', hallReservator);

    /////////////////////////////

    /* @ngInject */
    function HallReservatorController() {
        var ctrl = this;

        ctrl.svg = {
            width: 720,
            height: 480
        };
    }


})();