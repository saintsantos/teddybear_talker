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
    .module('upload.controller', ['ui.materialize'])
    .controller('UploadController', UploadController);
})();
