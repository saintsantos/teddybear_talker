;(function() {

    function HomeController($scope, $state) {
        $scope.goToHome = function() {
            $state.go('home');
						$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
        $scope.goToUpload = function() {
            $state.go('upload');
        }
    }

  angular
    .module('home.controller', ['ui.materialize'])
    .controller('HomeController', HomeController);
})();
