;(function() {
    angular
        .module('teddybeartalker', [
            'teddybeartalker.config',
            'home.module',
            'settings.module',
            'file.module',
            'ngFileUpload' 
        ]).controller('mainCtrl', function($rootScope, $state) {
            console.log("Starting");
        })
})();
