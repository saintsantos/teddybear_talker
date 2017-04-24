;(function() {

    function HomeController($scope, $state, HomeService, FileService, FileUploader) {

      $scope.dayEvents = [];
      $scope.editing = false;
      $scope.createNew = false;
      $scope.day = "Monday";

      FileService.getAllSongs().then(function(result) {
        $scope.sounds = result.data;
        //console.log($scope.sounds);
      });
      HomeService.getDay($scope.day).then(function(result) {
        $scope.dayEvents = result.data;
        //console.log($scope.dayEvents);
      });
        $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $scope.goToHome = function() {
            $state.go('home');
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
        $scope.goToFile = function() {
            $state.go('file');
        }

        $scope.setDay = function(day) {
          $scope.day = day;
          HomeService.getDay(day).then(function(result) {
            $scope.dayEvents = result.data;
            //console.log($scope.dayEvents);
          });
        }

        $scope.checkUpload = function() {
          //console.log($scope.uploader);
        }

        $scope.deleteEvent = function(id) {
          /*HomeService.deleteEvent(event.id).then(function(result) {
            console.log(event);
          })*/
          HomeService.getDay($scope.day).then(function(result) {
            $scope.dayEvents = result.data;
            //console.log($scope.dayEvents);
          });
          //console.log(id);
        }

        $scope.selectEvent = function(event) {
            //call function to get array and assign here.
            $scope.chosen_id = event.id;
            $scope.chosen_event = event;
            $scope.chosen_event.day = $scope.day;
            $scope.editing = !$scope.editing;
            //console.log(event);
          }

        $scope.updateEvent = function(updatedEvent, day) {
          //console.log(event.id);
          var choice = $scope.sounds.filter(function(sound) {
            return sound.name == updatedEvent.file_name;
          });
          updatedEvent.file_id = choice[0].audio_id;
          updatedEvent.id = $scope.chosen_event.id;
          //console.log(updatedEvent);
          //Disabled service calls
          HomeService.updateEvent(updatedEvent).then(function(result) {
            //console.log(result.data);
            HomeService.getDay($scope.day).then(function(result) {
              $scope.dayEvents = result.data;
              $scope.editing = false;
              //console.log($scope.dayEvents);
            })
          });

        }

        $scope.addEvent = function(newEvent) {
          var choice = $scope.sounds.filter(function(sound) {
            return sound.name == newEvent.file_name;
          });
          newEvent.file_id = choice[0].audio_id;
          //console.log(newEvent);
          //Disabled service calls
          HomeService.addEvent(newEvent).then(function(result) {
            console.log(result.data);
          })
          HomeService.getDay($scope.day).then(function(result) {
            $scope.dayEvents = result.data;
            //console.log($scope.dayEvents);
            $scope.createNew = false;
          })
        }
    }

  angular
    .module('home.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('HomeController', HomeController);
})();
