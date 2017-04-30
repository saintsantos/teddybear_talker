;(function() {

  angular
    .module('jingle.service', [])
    .factory('JingleService', function($http, $q, urlConstant) {

      function getAllJingles() {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/jingle/'
        }
        return $http(xhrParams);
      }

      function updateJingle(jingle) {
        var xhrParams = {
          method: 'PUT',
          url: urlConstant.baseUrl + '/jingle/' + jingle.jingle_id,
          data: jingle
        }
        return $http(xhrParams);
      }

      function deleteJingle(id) {
        var xhrParams = {
          method: 'DELETE',
          url: urlConstant.baseUrl + '/jingle/' + id
        }
        return $http(xhrParams);
      }

      return {
        getAllJingles:getAllJingles,
        updateJingle: updateJingle,
        deleteJingle: deleteJingle
      }

    })
})();
