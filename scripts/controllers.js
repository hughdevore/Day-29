angular.module('app.controller',['app.services'])
.controller('AppCtrl', function($scope, $http) {

	$scope.filter = '';
	$scope.stateList = [];
	$scope.displayError = true;
	$scope.stateTable = true;
	$scope.filterValue = $('#filter');
	$scope.AlphaStateList = [];
	$scope.name = true;
	$scope.abbreviation = true;

	// Making a get request to the server
	var promise = $http.get('https://tiny-pizza-server.herokuapp.com/collections/fancy-table')
	.success(function(response) {
	// Successfully received a response from the server
		$scope.stateList = response;

	})

	.error(function(err) {
	// Got an error back from the server
		$scope.displayError = false;
		$scope.error = err;
	})

	$scope.onNameClick = function() {
		if($scope.name) {
			$scope.AlphaStateList = _.sortBy($scope.stateList, function(element){
				return element.name;
				});
			$scope.name = false;
			$scope.stateList = $scope.AlphaStateList;
		} else {
			$scope.stateList = $scope.AlphaStateList.reverse();
			$scope.name = true;
		}
	}

	$scope.onAbbrevClick = function() {
		if($scope.name) {
			$scope.AlphaStateList = _.sortBy($scope.stateList, function(element){
				return element.abbreviation;
				});
			$scope.stateList = $scope.AlphaStateList;
			$scope.abbreviation = false;
		} else {
			$scope.stateList = $scope.AlphaStateList.reverse();
			$scope.abbreviation = true;
		}
	}

	$scope.onFilter = function() {
		$scope.filterValue.$watch();
	}

});