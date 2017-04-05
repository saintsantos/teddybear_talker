;(function() {
    /**
     * Definition of the main app module and its dependencies
     */

    angular
        .module('teddybeartalker.config', [
            'ui.router'
        ])

        .constant('urlConstant', {
          baseUrl: 'http://localhost:3000'
        })


    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
        //$locationProvider.html5Mode(false);
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/components/home/home.tpl.html',
            controller: 'HomeController'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: '/components/settings/settings.tpl.html',
            controller: 'SettingsController'
        })
        .state('file', {
            url: '/file',
            templateUrl: '/components/files/file.tpl.html',
            controller: 'FileController'
        })
        $urlRouterProvider.otherwise('/');
    });

    /**
     * Run block
     */
    angular
        .module('teddybeartalker')
        .run(run);
        run.$inject = ['$rootScope', '$location'];

        function run($rootScope, $locatiom) {
            //Put stuff you want running on page load here
        }
})();
