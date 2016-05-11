/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	angular.module('ontime.controllers', []).controller('CitiesCtrl', function ($scope, System, $location, UserCities) {

		System.init().then(function (userCities) {
			$scope.userCities = userCities;
		});

		$scope.gotoAdd = function () {
			$location.path('/add').replace();
		};

		$scope.remove = function (city) {
			var userCities = UserCities.remove(city);
			userCities[0] = $scope.userCities[0];
			$scope.userCities = userCities;
		};
	}).controller('CityAddCtrl', function ($scope, LocalJsonResource, $location, UserCities) {

		var userCities = UserCities.all();

		LocalJsonResource.read('cities.json').get(function (data) {
			var cities = data.cities;

			cities = cities.filter(function (city) {
				return !(userCities.findIndex(function (userCity) {
					return userCity.id === city.id || userCity.name === city.name && userCity.country === city.country;
				}) > -1);
			});

			$scope.cities = cities;
		});

		var gotoCities = function gotoCities() {
			$location.path('/cities').replace();
		};

		$scope.cancel = function () {
			gotoCities();
		};

		$scope.addCity = function (city) {
			UserCities.add(city);
			gotoCities();
		};
	});

/***/ }
/******/ ]);