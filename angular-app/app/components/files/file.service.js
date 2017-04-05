;(function() {

  angular
    .module('file.service', [])
    .factory('FileService', function($http, $q, urlConstant) {

      /*myApp.service('fileUpload', ['$https:', function ($https:) {
         this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);

            $https:.post(uploadUrl, fd, {
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
            })

            .success(function(){
            })

            .error(function(){
            });
         }
      }]);
      */
      function uploadFile(file) {
        var fd = new FormData();
        fd.append('file', file);
        console.log(fd);
        return;
        /*var xhrParams = {
          method: 'POST',
          url: 'test',
          params: {
            file: fd.file
          }
        }
        return $http(xhrParams);*/
        //TODO - Make file upload actually work
      }
      return {
        uploadFile: uploadFile
      }

    })
})();
