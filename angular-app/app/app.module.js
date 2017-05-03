;(function() {
    angular
        .module('teddybeartalker', [
            'teddybeartalker.config',
            'home.module',
            'settings.module',
            'voice.module',
            'jingle.module',
            'ngFileUpload',
            'angularFileUpload',
            'angularAudioRecorder'
        ]).controller('mainCtrl', function($rootScope, $state) {
            console.log("Starting");
        })
})();
