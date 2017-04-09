;(function() {

    function FileController($scope, $state, FileService, FileUploader) {

      $scope.sounds = [];
      FileService.getAllSongs().then(function(result) {
        $scope.sounds = result.data;
      });
      /*var sound1 = {}
      sound1.path = "~/Music/test1";
      sound1.name = "Yay!";
      $scope.sounds.push(sound1);

      var sound2 = {}
      sound2.path = "~/Music/test2";
      sound2.name = "Hello!";
      $scope.sounds.push(sound2);*/


      $scope.goToHome = function() {
          $state.go('home');
      }
      $scope.goToSettings = function() {
          $state.go('settings');
      }


      $scope.selectFile = function(file) {
          //call function to get array and assign here.
          $scope.chosen_id = file.audio_id;
          $scope.chosen_file = file;
          console.log(file);
        }

        $scope.uploader = new FileUploader({
          url: 'http://localhost:8080/voice/upload'
        });
    }

  angular
    .module('file.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('FileController', FileController);
})();
