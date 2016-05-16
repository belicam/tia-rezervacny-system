(function () {
    "use strict";

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    /* @ngInject */
    function UsersController(allUsers, adminService) {
        var ctrl = this;

        ctrl.users = allUsers;

        ctrl.deactivateUser = deactivateUser;
        ctrl.updateUser = updateUser;

        function deactivateUser(index) {
            adminService.deactivateUser(ctrl.users[index].Id, !ctrl.users[index].Deactivated)
                .then(function () {
                    ctrl.users[index].Deactivated = !ctrl.users[index].Deactivated;
                });
        }

        function updateUser(index) {
            return adminService.updateUser(ctrl.users[index].Id, ctrl.users[index])
                .then(function() {});
        }
    }

})();