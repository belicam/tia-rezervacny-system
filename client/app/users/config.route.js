(function() {
    "use strict";

    angular
        .module('app.users')
        .config(config);

    config.$inject = ['$stateProvider'];

    /* @ngInject */
    function config ($stateProvider) {

        var users = {
            url: '/users',
            parent: 'root',
            views: {
                header: {
                    templateUrl: 'layout/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'ctrl'
                },
                content: {
                    templateUrl: 'users/users.html',
                    controller: 'UsersController',
                    controllerAs: 'ctrl'
                }
            },
            resolve: {
                /* @ngInject */
                allUsers: function (adminService, $state, accountService) {
                    return adminService.getAllUsers()
                        .then(allUsersSuccess)
                        .catch(allUsersFail);
                    
                    function allUsersSuccess(users){
                        return users;
                    }
                    
                    function allUsersFail(err) {
                        if (err.status === 401) {
                            accountService.logout();
                            $state.go('login');
                        }
                    }
                }
            }
        };

        $stateProvider.state('users', users);
    }

})();