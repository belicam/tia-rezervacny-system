(function () {
    "use strict";

    var core = angular.module('app.core');

    var api = 'http://localhost:32966/api';

    core.value('api', api);

    var storageNames = {
        token: "@inject:storagetokenvar",
        userInfo: "@inject:storageuservar"
    };

    core.value('storageNames', storageNames);

})();