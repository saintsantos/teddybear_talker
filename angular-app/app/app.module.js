;(function() {
    angular
        .module('teddybeartalker', [
            'teddybeartalker.config',
            'home.module',
            'settings.module',
            'upload.module'
        ]).controller('mainCtrl', function($rootScope, $state) {
            console.log("Starting");
        })
})();
