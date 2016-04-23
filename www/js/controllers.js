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

.controller('CityAddCtrl', function($scope, LocalJsonResource, $location, UserCities) {

	var userCities = UserCities.all();

	LocalJsonResource.read('cities.json').get(function(data) {
		var cities = data.cities;

		cities = cities.filter(function(city) {
			return !(userCities.findIndex(function(userCity) {
				return userCity.id === city.id || (userCity.name === city.name && userCity.country === city.country);
			}) > -1);
		});

		$scope.cities = cities;
	});

	var gotoCities = function() {
		$location.path('/cities').replace();
	}

	$scope.cancel = function() {
		gotoCities();
	};

	$scope.addCity = function(city) {
		UserCities.add(city);
		gotoCities();
	};
});
