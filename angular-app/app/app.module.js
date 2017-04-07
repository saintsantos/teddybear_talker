;(function() {
    angular
        .module('teddybeartalker', [
            'teddybeartalker.config',
            'home.module',
            'settings.module',
            'file.module',
            'angularFileUpload' 
        ]).controller('mainCtrl', function($rootScope, $state) {
            console.log("Starting");
        })
})();
