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

      function updateFile(file) {
        var xhrParams = {
          method: 'PUT',
          url: urlConstant.baseUrl + '/voice/' + file.id,
          data: file
        }
        return $http(xhrParams);
      }

      function deleteFile(id) {
        var xhrParams = {
          method: 'DELETE',
          url: urlConstant.baseUrl + '/voice/' + file.id
        }
        return $http(xhrParams);
      }

      return {
        getAllSongs:getAllSongs,
        updateFile: updateFile,
        deleteFile: deleteFile
      }

    })
})();
