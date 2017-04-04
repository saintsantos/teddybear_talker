;(function() {

    function SettingsController($scope, $state) {
        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToUpload = function() {
            $state.go('upload');
        }
    }

  angular
    .module('settings.controller', [])
    .controller('SettingsController', SettingsController);
})();
