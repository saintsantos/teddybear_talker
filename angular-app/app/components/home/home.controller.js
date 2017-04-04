;(function() {

    function HomeController($scope, $state) {

        $scope.events = [];
        var event1 = {}
        event1.hour = 10;
        event1.min = 5;
        event1.file = "file1";
        $scope.events.push(event1);

        var event2 = {}
        event2.hour = 9;
        event2.min = 30;
        event2.file = "file2";
        $scope.events.push(event2);

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
