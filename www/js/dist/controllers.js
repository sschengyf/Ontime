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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _actions = __webpack_require__(41);

	var _const = __webpack_require__(42);

	angular.module('ontime.controllers', []).controller('CitiesCtrl', function ($scope, $location, UserCities, $ngRedux, City, Timezone) {

		$scope.userCities = UserCities.all();

		_const.defaultCurrentCity.timezone = Timezone.getCurrentTimezone();

		$scope.currentCity = _const.defaultCurrentCity;

		City.getCurrentCity().then(function (currentCity) {
			$scope.currentCity = currentCity;
		});

		$scope.gotoAdd = function () {
			$location.path('/add').replace();
		};

		$scope.remove = function (city) {
			$scope.userCities = UserCities.remove(city);;
		};

		$scope.resetDatetime = function () {
			$ngRedux.dispatch((0, _actions.changeTime)(0));
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

/***/ },

/***/ 40:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CHANGE_TIME = 'change_time';

	exports.CHANGE_TIME = CHANGE_TIME;

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.changeTime = undefined;

	var _actionTypes = __webpack_require__(40);

	var actionTypes = _interopRequireWildcard(_actionTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var changeTime = function changeTime(timeChangedOffset) {
		return {
			type: actionTypes.CHANGE_TIME,
			timeChangedOffset: timeChangedOffset
		};
	};

	exports.changeTime = changeTime;

/***/ },

/***/ 42:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	var defaultCurrentCity = exports.defaultCurrentCity = {
	   id: '0',
	   name: 'Locating...',
	   country: '',
	   timezone: ''
	};

/***/ }

/******/ });