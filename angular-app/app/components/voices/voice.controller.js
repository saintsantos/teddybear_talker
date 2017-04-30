(function() {

    function VoiceController($scope, $state, VoiceService, FileUploader) {

      $scope.editing = false;

      $scope.voices = [];
      VoiceService.getAllVoices().then(function(result) {
        $scope.voices = result.data;
        //console.log($scope.sounds);
      });


      $scope.goToHome = function() {
          $state.go('home');
      }
      $scope.goToSettings = function() {
          $state.go('settings');
      }
      $scope.goToJingle = function() {
          $state.go('jingle');
      }


      $scope.selectVoice = function(file) {
          //call function to get array and assign here.
          $scope.chosen_id = file.audio_id;
          $scope.chosen_file = file;
          $scope.editing = !$scope.editing;

          //console.log(file);
        }

      $scope.updateFile = function(file) {
          //console.log(file);
          FileService.updateFile(file).then(function(result) {
            FileService.getAllSongs().then(function(result) {
              $scope.sounds = result.data;
              $scope.editing = false;
              //console.log(result.data);
            });
          });
      }

        //This handles file uploads
        $scope.uploader = new FileUploader({
          url: 'http://localhost:8080/voice/upload'
        });

      $scope.deleteVoice = function(id) {
        //console.log(id);
        VoiceService.deleteVoice(id).then(function() {
          VoiceService.getAllVoices().then(function(result) {
            $scope.voices = result.data;
          });
        })
      }

    }

  angular
    .module('voice.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('VoiceController', VoiceController);
})();
