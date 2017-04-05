;(function() {

    function FileController($scope, $state) {

      $scope.sounds = [];
      var sound1 = {}
      sound1.path = "~/Music/test1";
      sound1.name = "Yay!";
      $scope.sounds.push(sound1);

      var sound2 = {}
      sound2.path = "~/Music/test2";
      sound2.name = "Hello!";
      $scope.sounds.push(sound2);

      $scope.goToHome = function() {
          $state.go('home');
      }
      $scope.goToSettings = function() {
          $state.go('settings');
      }
    }

  angular
    .module('file.controller', ['ui.materialize'])
    .controller('FileController', FileController);
})();
