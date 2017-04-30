(function() {

  angular
    .module('voice.service', [])
    .factory('VoiceService', function($http, $q, urlConstant) {

      function getAllVoices() {
        var xhrParams = {
          method: 'GET',
          url: urlConstant.baseUrl + '/voice/'
        }
        return $http(xhrParams);
      }

      function updateVoice(file) {
        var xhrParams = {
          method: 'PUT',
          url: urlConstant.baseUrl + '/voice/' + file.voice_id,
          data: file
        }
        return $http(xhrParams);
      }

      function deleteVoice(id) {
        var xhrParams = {
          method: 'DELETE',
          url: urlConstant.baseUrl + '/voice/' + id
        }
        return $http(xhrParams);
      }

      return {
        getAllVoices:getAllVoices,
        updateVoice: updateVoice,
        deleteVoice: deleteVoice
      }

    })
})();
