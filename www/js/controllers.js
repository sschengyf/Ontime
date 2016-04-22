'use strict';

angular.module('intime.controllers', [])

.controller('CitiesCtrl', function($scope, System, $location) {

  System.init().then(function(userCities) {
    $scope.userCities = userCities;
  });

  $scope.gotoAdd = function() {
  	$location.path('/add').replace();
  };
})

.controller('TimeEditCtrl', function($scope, $stateParams) {

})

.controller('CityAddCtrl', function($scope, LocalJsonResource) {
	LocalJsonResource.read('cities.json').get(function(data) {
		$scope.cities = data.cities;
	});
});
