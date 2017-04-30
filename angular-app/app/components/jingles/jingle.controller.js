;(function() {

    function JingleController($scope, $state, JingleService, FileUploader) {

      $scope.editing = false;

      $scope.jingles = [];
      JingleService.getAllJingles().then(function(result) {
        $scope.jingles = result.data;
        console.log($scope.jingles);
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
          JingleService.updateJingle(file).then(function(result) {
            JingleService.getAllJingles().then(function(result) {
              $scope.jingles = result.data;
              $scope.editing = false;
              //console.log(result.data);
            });
          });
      }

        //This handles file uploads
        $scope.uploader = new FileUploader({
          url: 'http://localhost:8080/voice/upload'
        });

      $scope.deleteJingle = function(id) {
        //console.log(id);
        JingleService.deleteJingle(id).then(function() {
          JingleService.getAllJingles().then(function(result) {
            $scope.jingles = result.data;
          });
        })
      }

    }

  angular
    .module('jingle.controller', ['ui.materialize', 'angularFileUpload'])
    .controller('JingleController', JingleController);
})();
