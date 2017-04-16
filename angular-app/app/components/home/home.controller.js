;(function() {

    function HomeController($scope, $state, HomeService, FileService, FileUploader) {

      $scope.dayEvents = [];
      $scope.editing = false;
      $scope.day = "Monday";

      FileService.getAllSongs().then(function(result) {
        $scope.sounds = result.data;
        console.log($scope.sounds);
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
            console.log($scope.dayEvents);
          });
        }

        $scope.checkUpload = function() {
          console.log($scope.uploader);
        }

        $scope.deleteEvent = function(id) {
          /*HomeService.deleteEvent(event.id).then(function(result) {
            console.log(event);
          })
          HomeService.getDay($scope.day).then(function(result) {
            $scope.dayEvents = result.data;
            //console.log($scope.dayEvents);
          });*/
          console.log(id);
        }

        $scope.selectEvent = function(event) {
            //call function to get array and assign here.
            $scope.chosen_id = event.id;
            $scope.chosen_event = event;
            $scope.chosen_event.day = $scope.day;
            console.log(event);
          }

        $scope.updateEvent = function(updatedEvent, day) {
          //console.log(event.id);
          var choice = $scope.sounds.filter(function(sound) {
            return sound.name == updatedEvent.file_name;
          });
          updatedEvent.file_id = choice[0].audio_id;
          updatedEvent.id = $scope.chosen_event.id;
          console.log(updatedEvent);
          //Disabled service calls
          /*HomeService.updateEvent(event).then(function(result) {
            console.log(result.data);
          })
          HomeService.getDay($scope.day).then(function(result) {
            $scope.dayEvents = result.data;
            //console.log($scope.dayEvents);
          })*/

        }

        $scope.addEvent = function(event) {
          var choice = $scope.sounds.filter(function(sound) {
            return sound.name == event.file_name;
          });
          event.file_id = choice[0].audio_id;
          console.log(event);
          //Disabled service calls
          /*HomeService.addEvent(event).then(function(result) {
            console.log(result.data);
          })
          HomeService.getDay($scope.day).then(function(result) {
            $scope.dayEvents = result.data;
            //console.log($scope.dayEvents);
          })*/
        }

        $scope.editVisable = false;
        $scope.createVisable = false;


        $scope.edit_showHide = function() {
          $scope.editVisable = $scope.editVisable ? false : true;
        }

        $scope.create_showHide = function() {
          $scope.createVisable = $scope.createVisable ? false : true;
        }
    }

  angular
    .module('home.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('HomeController', HomeController);
})();
