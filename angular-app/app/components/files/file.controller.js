;(function() {

    function FileController($scope, $state) {
        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
    }

  angular
    .module('file.controller', ['ui.materialize'])
    .controller('FileController', FileController);
})();
