;(function() {

    function HomeController($scope, $state, HomeService, FileService, FileUploader) {

      $scope.weekEvents = [];
      $scope.dayEvents = [];
      //console.log($scope.dayEvents);
      HomeService.getWeek().then(function(events) {
        $scope.weekEvents = events.data;
        $scope.dayEvents = events.data.monday;
        console.log($scope.weekEvents);
        console.log($scope.weekEvents);
      });

      var updateDay = function(day) {
        console.log(day);
        switch(day) {
          case 'Monday':
            $scope.dayEvents = $scope.weekEvents.monday;
            break;
          case 'Tuesday':
            $scope.dayEvents = $scope.weekEvents.tuesday;
            break;
          case 'Wednesday':
            $scope.dayEvents = $scope.weekEvents.wednesday;
            break;
          case 'Thursday':
            $scope.dayEvents = $scope.weekEvents.thursday;
            break;
          case 'Friday':
            $scope.dayEvents = $scope.weekEvents.friday;
            break;
          case 'Saturday':
            $scope.dayEvents = $scope.weekEvents.saturday;
            break;
          case 'Sunday':
            $scope.dayEvents = $scope.weekEvents.sunday;
            break;
        }
        $scope.day = day;
      }

        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.day = "Monday";


        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
        $scope.goToFile = function() {
            $state.go('file');
        }

        $scope.uploader = new FileUploader({
          url: 'http://localhost:8080/voice/upload'
        });

        $scope.setDay = function(day) {
          updateDay(day);
        }

        $scope.checkUpload = function() {
          console.log($scope.uploader);
        }

        $scope.deleteEvent = function(event) {
          //console.log(event);
          HomeService.deleteEvent(event.id).then(function(result) {
            console.log(event);
          })
          HomeService.getWeek().then(function(events) {
            $scope.weekEvents = events.data;

          });
        }

        $scope.submit = function() {
          console.log("Uploading!!");
        }

    }

  angular
    .module('home.controller', ['ui.materialize', 'ngFileUpload'])
    .controller('HomeController', HomeController);
})();
