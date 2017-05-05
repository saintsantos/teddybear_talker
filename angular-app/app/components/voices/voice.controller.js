(function() {

    function VoiceController($scope, $state, VoiceService, FileUploader, urlConstant) {

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


      $scope.selectVoice = function(voice) {
          //call function to get array and assign here.
          $scope.chosen_id = voice.voice_id;
          $scope.chosen_voice = voice;
          $scope.editing = !$scope.editing;

          //console.log(file);
        }

      $scope.updateVoice = function(voice) {
          //console.log(voice);
          VoiceService.updateVoice(voice).then(function(result) {
            VoiceService.getAllVoices().then(function(result) {
              $scope.voices = result.data;
              $scope.editing = false;
              //console.log(result.data);
            });
          });
      }

        //This handles file uploads
        $scope.uploader = new FileUploader({
          url: urlConstant.baseUrl + '/voice/upload'
        });

      $scope.deleteVoice = function(id) {
        console.log(id);
        /*VoiceService.deleteVoice(id).then(function() {
          VoiceService.getAllVoices().then(function(result) {
            $scope.voices = result.data;
          });
        })*/
        $scope.editing = false;
      }

    }

  angular
    .module('voice.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('VoiceController', VoiceController);
})();
