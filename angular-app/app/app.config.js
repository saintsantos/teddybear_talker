(function() {
    /**
     * Definition of the main app module and its dependencies
     */

    angular
        .module('teddybeartalker.config', [
            'ui.router'
        ])

        .constant('urlConstant', {
          baseUrl: 'http://localhost:8080'
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
        .state('voice', {
            url: '/voice',
            templateUrl: '/components/voices/voice.tpl.html',
            controller: 'VoiceController'
        })
        .state('jingle', {
            url: '/jingle',
            templateUrl: '/components/jingles/jingle.tpl.html',
            controller: 'JingleController'
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
