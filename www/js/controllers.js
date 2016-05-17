import { changeTime } from './redux/actions';

angular.module('ontime.controllers', [])

.controller('CitiesCtrl', function($scope, System, $location, UserCities, $ngRedux) {

	System.init().then(function(userCities) {
		$scope.userCities = userCities;
	});

	$scope.gotoAdd = function() {
		$location.path('/add').replace();
	};

	$scope.remove = function(city) {
		var userCities = UserCities.remove(city);
		userCities[0] = $scope.userCities[0];
		$scope.userCities = userCities;
	};

	$scope.resetDatetime = function() {
		$ngRedux.dispatch(changeTime(0));
	};
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
