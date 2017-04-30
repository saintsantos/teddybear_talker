;(function() {

    function SettingsController($scope, $state) {
        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToFile = function() {
            $state.go('voice');
        }
        $scope.goToJingle = function() {
            $state.go('jingle');
        }
    }

  angular
    .module('settings.controller', ['ui.materialize'])
    .controller('SettingsController', SettingsController);
})();
