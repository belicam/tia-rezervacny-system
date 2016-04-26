(function () {
    "use strict";

    var core = angular.module('app.core');

    // var api = 'http://localhost:32966/api';
    var api = 'http://tiars.azurewebsites.net/api';

    core.value('api', api);

    var storageNames = {
        token: "@inject:storagetokenvar",
        userInfo: "@inject:storageuservar"
    };

    core.value('storageNames', storageNames);

})();