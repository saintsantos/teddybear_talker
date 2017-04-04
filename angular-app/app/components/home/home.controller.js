;(function() {

    function HomeController($scope, $state) {
        $scope.goToHome = function() {
            $state.go('home');
						$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }
        $scope.goToSettings = function() {
            $state.go('settings');
        }
        $scope.goToUpload = function() {
            $state.go('upload');
        }	
    }

		function Weekday_Dropdown($scope) {  
				$scope.values = [  
					{'Dropdown': 'D1'},  
        ];  
        $scope.colorcode = [  
						{'hashCode': 'Su', 'description': 'Sunday'},
						{'hashCode': 'Mo', 'description': 'Monday'},  
            {'hashCode': 'Tu', 'description': 'Tuesday'},  
            {'hashCode': 'We', 'description': 'Wednesday'},  
            {'hashCode': 'Th', 'description': 'Thursday'}, 
						{'hashCode': 'Fr', 'description': 'Friday'},
						{'hashCode': 'Sa', 'description': 'Saturday'}
        ];  
    }  

  angular
    .module('home.controller', ['ui.materialize'])
    .controller('HomeController', HomeController);
})();
