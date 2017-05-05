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

      function updateVoice(voice) {
        var xhrParams = {
          method: 'PUT',
          url: urlConstant.baseUrl + '/voice/' + voice.voice_id,
          data: voice
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

      function testVoice(id) {
        var xhrParams = {
          method: 'POST',
          url: urlConstant.baseUrl + '/test/voice/' + id
        }
        return $http(xhrParams);
      }

      return {
        getAllVoices:getAllVoices,
        updateVoice: updateVoice,
        deleteVoice: deleteVoice,
        testVoice: testVoice
      }

    })
})();
