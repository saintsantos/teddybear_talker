;(function() {

    function HomeController($scope, $state) {
        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
        $scope.goToUpload = function() {
            $state.go('upload');
        }
    }

  angular
    .module('home.controller', [])
    .controller('HomeController', HomeController);
})();
