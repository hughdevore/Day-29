angular.module('app.controller',['app.services'])
.controller('AppCtrl', function($scope, $http) {

	$scope.filter = '';

	$scope.displayError = true;
	$scope.stateTable = true;
	$scope.name = true;
	$scope.upArrow = true;
	$scope.downArrow = true;

	$scope.stateList = [];
	$scope.changedStateList = [];

	// Making a get request to the server and sorting the initial response
	var promise = $http.get('https://tiny-pizza-server.herokuapp.com/collections/fancy-table')
	.success(function(response) {
	// Successfully received a response from the server
		$scope.stateList = _.sortBy(response, function(element){
			return element.name;
		});
		$scope.changedStateList = $scope.stateList
	})

	.error(function(err) {
	// Got an error back from the server
		$scope.displayError = false;
		$scope.error = err;

	})

	$scope.onClick = function() {
		if($scope.name) {
			$scope.changedStateList = $scope.changedStateList.reverse();
			$scope.name = false;
			$scope.upArrow = false;
			$scope.downArrow = false;
		} else {
			$scope.changedStateList = $scope.changedStateList.reverse();
			$scope.name = true;
			$scope.upArrow = true;
			$scope.downArrow = true;
		}
	}

	$scope.$watch('filter', function() {
		$scope.changedStateList = _.filter($scope.stateList, function(element){
			var name = element.name.toLowerCase().indexOf($scope.filter.toLowerCase());
			var abbreviation = element.abbreviation.toLowerCase().indexOf($scope.filter.toLowerCase());
			return name >= 0 || abbreviation >= 0;
		});
	});

});