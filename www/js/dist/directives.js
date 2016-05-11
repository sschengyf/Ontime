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

	angular.module('ontime.directives', ['ontime.services']).directive('realtimeDatetime', ['$interval', 'Timezone', function ($interval, Timezone) {
		return {
			template: '<div class="city-datetime"><h2>{{time}}</h2><h2>{{date}}</h2></div>',
			restrict: 'E',
			replace: true,
			scope: {
				currentDatetime: '='
			},
			link: function link(scope, element, attrs) {

				if (undefined === attrs.timezone) {
					return false;
				}

				var intervalId,
				    timezone = attrs.timezone,
				    timezoneVal = Timezone.convertTimezoneFormat('number', timezone),
				    currentDateObj = null;

				element.on('$destroy', function () {
					$interval.cancel(intervalId);
				});

				intervalId = $interval(function () {
					currentDateObj = Timezone.getDateObjByTimezone(timezoneVal);
					scope.currentDatetime = currentDateObj;
					scope.time = Timezone.formatDatetime(currentDateObj, 'HH:mm');
					scope.date = Timezone.formatDatetime(currentDateObj, 'yyyy-MM-dd');
				}, 1000);
			}
		};
	}]).directive('focusMe', function ($timeout) {
		return {
			restrict: 'A',
			scope: { trigger: '=focusMe' },
			link: function link(scope, element) {
				scope.$watch('trigger', function (value) {
					if (value === true) {
						$timeout(function () {
							element[0].focus();
							scope.trigger = false;
						});
					}
				});
			}
		};
	}).directive('cityWithDatetime', function () {
		return {
			templateUrl: 'templates/cityWithDatetime.html',
			restrict: 'E',
			replace: true,
			scope: {
				city: '=city'
			},
			link: function link(scope, element, attrs) {
				scope.currentDatetime = null;
				scope.setDatetime = null;
				scope.handleChange = function () {
					var offset = scope.currentDatetime.getTime() - scope.setDatetime.getTime();
					console.log(offset / 1000 / 60);
				};
			}
		};
	});

/***/ }
/******/ ]);