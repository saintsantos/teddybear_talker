;(function() {

  angular
    .module('file.service', [])
    .factory('FileService', function($http, $q, urlConstant) {

      function getAllSongs() {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/voice/'
        }
        return $http(xhrParams);
      }

      return {
        getAllSongs:getAllSongs
      }

    })
})();
