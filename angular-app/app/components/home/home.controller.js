;(function() {

    function HomeController($scope, $state, HomeService, FileService, FileUploader) {

      $scope.newEvent = false;
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

        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.day = "Day";


        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
        $scope.goToFile = function() {
            $state.go('file');
        }
        
        $scope.uploader = new FileUploader();

        $scope.setDay = function(day) {
          $scope.day = day;
        }

    }

  angular
    .module('home.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('HomeController', HomeController);
})();