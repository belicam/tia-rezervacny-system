(function () {
    "use strict";

    var app = angular
        .module('app.components');

    /* @ngInject */
    var localSpinner = {
        template: '<img data-ng-src="assets/img/load-spin-16.gif" alt=""/>'
    };

    app.component('localSpinner', localSpinner);

})();