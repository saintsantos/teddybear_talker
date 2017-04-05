;(function() {
    angular
        .module('teddybeartalker', [
            'teddybeartalker.config',
            'home.module',
            'settings.module',
            'file.module'
        ]).controller('mainCtrl', function($rootScope, $state) {
            console.log("Starting");
        })
})();
