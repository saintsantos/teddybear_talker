;(function() {

    function HomeController($scope, $state, HomeService, VoiceService, JingleService, FileUploader) {

      $scope.dayEvents = [];
      $scope.editing = false;
      $scope.createNew = false;
      $scope.day = "Monday";

      VoiceService.getAllVoices().then(function(result) {
        $scope.voices = result.data;
        console.log($scope.voices);
      });
      HomeService.getDay($scope.day).then(function(result) {
        $scope.dayEvents = result.data;
        console.log($scope.dayEvents);
      });
      JingleService.getAllJingles().then(function(result) {
        $scope.jingles = result.data;
        console.log($scope.jingles);
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
        $scope.goToJingle = function() {
            $state.go('jingle');
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
          HomeService.deleteEvent(id).then(function(result) {
            //console.log(event);
            HomeService.getDay($scope.day).then(function(result) {
              $scope.dayEvents = result.data;
              //console.log($scope.dayEvents);
            });
          })
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
          var event_voice = $scope.voices.filter(function(voice) {
            return voice.voice_name == updatedEvent.voice_name;
          });
          updatedEvent.voice_id = event_voice[0].voice_id;
          var event_jingle = $scope.jingles.filter(function(jingle) {
            return jingle.jingle_name == updatedEvent.jingle_name;
          });
          updatedEvent.jingle_id = event_jingle[0].jingle_id;
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
          var event_voice = $scope.voices.filter(function(voice) {
            return voice.voice_name == newEvent.voice_name;
          });
          newEvent.voice_id = event_voice[0].voice_id;
          var event_jingle = $scope.jingles.filter(function(jingle) {
            return jingle.jingle_name == newEvent.jingle_name;
          });
          newEvent.jingle_id = event_jingle[0].jingle_id;
          //console.log(newEvent);
          //Disabled service calls
          HomeService.addEvent(newEvent).then(function(result) {
            console.log(result.data);
            HomeService.getDay($scope.day).then(function(result) {
              $scope.dayEvents = result.data;
              //console.log($scope.dayEvents);
              $scope.createNew = false;
            })
          })
        }
    }

  angular
    .module('home.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('HomeController', HomeController);
})();
