(function () {
    "use strict";

    angular.module('app',
        [
            'app.core',
            'app.services',
            'app.components',

            'app.layout',
            'app.root',
            'app.home',
            'app.login',
            'app.signup',
            'app.createEvent',
            'app.createHall',
            'app.createReservation',
            'app.editHall',
            'app.myEvents',
            'app.myHalls',
            'app.myReservations'
        ]);
})();