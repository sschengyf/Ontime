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

	angular.module('ontime.directives', ['ontime.services']).directive('realtimeDatetime', ['$interval', 'Timezone', '$ngRedux', function ($interval, Timezone, $ngRedux) {
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

				var intervalId = void 0,
				    timezone = attrs.timezone,
				    timezoneVal = Timezone.convertTimezoneFormat('number', timezone),
				    timeChangedOffset = 0,
				    currentDateObj = null,
				    unsubscribe = $ngRedux.subscribe(function () {
					var state = $ngRedux.getState();
					timeChangedOffset = state.timeChangedOffset;
					console.log(state);
				});

				element.on('$destroy', function () {
					$interval.cancel(intervalId);
					unsubscribe();
				});

				intervalId = $interval(function () {
					currentDateObj = Timezone.getDateObjByTimezone(timezoneVal, timeChangedOffset);
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
	}).directive('cityWithDatetime', function ($ngRedux) {
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
					var offset = scope.setDatetime.getTime() - scope.currentDatetime.getTime();
					$ngRedux.dispatch((0, _actions.changeTime)(offset));
					console.log(offset);
				};
			}
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

/***/ }

/******/ });