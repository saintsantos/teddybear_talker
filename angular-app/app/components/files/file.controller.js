;(function() {

    function FileController($scope, $state, FileService, FileUploader) {

      $scope.editing = false;

      $scope.sounds = [];
      FileService.getAllSongs().then(function(result) {
        $scope.sounds = result.data;
        //console.log($scope.sounds);
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

      $scope.deleteFile = function(id) {
        //console.log(id);
        FileService.deleteFile(id).then(function() {
          FileService.getAllSongs().then(function(result) {
            $scope.sounds = result.data;
          });
        })
      }

    }

  angular
    .module('file.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('FileController', FileController);
})();
