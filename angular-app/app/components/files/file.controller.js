;(function() {

    function FileController($scope, $state, FileService, FileUploader) {

      $scope.sounds = [];
      FileService.getAllSongs().then(function(result) {
        $scope.sounds = result.data;
      });


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

      $scope.updateFile = function(file) {
          console.log(file);
          /*FileService.updateFile(file).then(function(result) {
            console.log(result);
          });*/
      }

        //This handles file uploads
        $scope.uploader = new FileUploader({
          url: 'http://localhost:8080/voice/upload'
        });

    }

  angular
    .module('file.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('FileController', FileController);
})();
