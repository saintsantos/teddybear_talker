;(function() {

    function UploadController($scope, $state) {
        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
    }

  angular
    .module('upload.controller', [])
    .controller('UploadController', UploadController);
})();
