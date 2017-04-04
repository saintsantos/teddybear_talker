;(function() {

    function HomeController($scope, $state) {

        $scope.events = [];
        var event1 = {}
        event1.hour = 10;
        event1.min = 5;
        event1.file = "file1";
        $scope.events.push(event1);

        var event2 = {}
        event2.hour = 9;
        event2.min = 30;
        event2.file = "file2";
        $scope.events.push(event2);

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
    .module('home.controller', ['ui.materialize'])
    .controller('HomeController', HomeController);
})();
