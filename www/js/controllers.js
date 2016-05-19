import { changeTime } from './redux/actions';
import { defaultCurrentCity } from './const';

angular.module('ontime.controllers', [])

.controller('CitiesCtrl', function($scope, $location, UserCities, $ngRedux, City, Timezone) {

	$scope.userCities = UserCities.all();

	defaultCurrentCity.timezone = Timezone.getCurrentTimezone();

	$scope.currentCity = defaultCurrentCity;

	City.getCurrentCity().then((currentCity) => {
		$scope.currentCity = currentCity;
	});

	$scope.gotoAdd = function() {
		$location.path('/add').replace();
	};

	$scope.remove = function(city) {
		$scope.userCities = UserCities.remove(city);;
	};

	$scope.resetDatetime = function() {
		$ngRedux.dispatch(changeTime(0));
	};
})

.controller('CityAddCtrl', function($scope, LocalJsonResource, $location, UserCities) {

	let userCities = UserCities.all();

	LocalJsonResource.read('cities.json').get(function(data) {
		let cities = data.cities;

		cities = cities.filter(function(city) {
			return !(userCities.findIndex(function(userCity) {
				return userCity.id === city.id || (userCity.name === city.name && userCity.country === city.country);
			}) > -1);
		});

		$scope.cities = cities;
	});

	const gotoCities = function() {
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
