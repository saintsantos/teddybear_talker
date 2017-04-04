;(function() {
    /**
     * Definition of the main app module and its dependencies
     */

    angular
        .module('teddybeartalker', [
            'ngRoute'
        ])
        .config(config);

    config.$inject = [
        '$routeProvider',
        '$httpProvider',
        '$locationProvider',
        '$compileProvider'];

    function config($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
        //$locationProvider.html5Mode(false);
        $routeProvider
        .when('/', {
            templateUrl: 'app/components/home/home.tpl.html',
            controller: 'HomeController',
            controllerAs: 'main'
        })
        .when('/settings', {
            templateUrl: 'app/components/settings/settings.tpl.html',
            controller: 'SettingsController',
            controllerAs: 'main'
        })
        .when('/upload', {
            templateUrl: 'app/components/upload/upload.tpl.html',
            controller: 'UploadController',
            controllerAs: 'main'
        })
        .otherwise({
            redirectTo: '/'
        });
    }

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
