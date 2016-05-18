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

	angular.module('ontime.services', ['ngStorage', 'ngResource']).factory('AJAX', function ($http, $q) {

	  var _get = function _get(url, params) {

	    var deferred = $q.defer();

	    $http.get(url, {
	      params: params
	    }).then(function (response) {
	      if (200 === response.status) {
	        deferred.resolve(response.data);
	      } else {
	        console.log(response.status, response.statusText);
	      }
	    }, function (err) {
	      deferred.reject(err);
	    });

	    return deferred.promise;
	  };

	  var _post = function _post(url, data) {
	    var deferred = $q.defer();

	    $http.post(url, data).then(function (response) {
	      if (200 === response.status) {
	        deferred.resolve(response.data);
	      } else {
	        console.log(response.status, response.statusText);
	      }
	    }, function (err) {
	      deferred.reject(err);
	    });

	    return deferred.promise;
	  };

	  return {
	    get: _get,
	    post: _post
	  };
	}).factory('LocalJsonResource', function ($resource) {
	  return {
	    read: function read(file) {
	      return $resource('json/' + file);
	    }
	  };
	}).factory('UserCities', function ($localStorage) {

	  return {
	    all: function all() {
	      var userCities = $localStorage.userCities || [],
	          currentCity = {
	        id: 'currentLocation',
	        name: '',
	        country: '',
	        timezone: ''
	      };

	      if (0 === userCities.length) {
	        userCities.push(currentCity);
	        $localStorage.userCities = userCities;
	      }

	      return userCities;
	    },
	    add: function add(city) {
	      try {
	        var userCities = this.all();
	        userCities.push(city);
	        $localStorage.userCities = userCities;
	        return true;
	      } catch (err) {
	        console.log(err);
	        return false;
	      }
	    },
	    remove: function remove(city) {
	      try {
	        var userCities = this.all();
	        userCities.splice(userCities.indexOf(city), 1);
	        $localStorage.userCities = userCities;
	        return this.all();
	      } catch (err) {
	        console.log(err);
	        return false;
	      }
	    },
	    save: function save(userCities) {
	      $localStorage.userCities = userCities;
	    },
	    clearAll: function clearAll() {
	      $localStorage.userCities = [];
	    }
	  };
	}).factory('Timezone', function ($filter) {

	  var _formatDatetime = function _formatDatetime(date, format) {
	    return $filter('date')(date, format);
	  };

	  var _getDateObjByTimezone = function _getDateObjByTimezone(timezone) {
	    var timeChangedOffset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	    var s = 1000,
	        m = s * 60,
	        h = m * 60,
	        d = h * 24;
	    var now = Date.now(),
	        date = new Date(),
	        timezoneOffsetSeconds = _getCurrentTimezoneOffsetMins() * m;

	    date.setTime(now - timezoneOffsetSeconds + timezone * h + timeChangedOffset);
	    return date;
	  };

	  var _getCurrentDatetime = function _getCurrentDatetime() {
	    var today = new Date();
	    return _formatDatetime(today, 'yyyy-mm-dd hh:mm:ss');
	  };

	  var _getCurrentTimezoneOffsetMins = function _getCurrentTimezoneOffsetMins() {
	    var today = new Date(),
	        currentTimezoneOffsetMins = today.getTimezoneOffset();
	    return -currentTimezoneOffsetMins;
	  };

	  var _getCurrentTimezone = function _getCurrentTimezone() {
	    return _convertTimezoneFormat('hh:mm', _getCurrentTimezoneOffsetMins() / 60);
	  };

	  var _convertTimezoneFormat = function _convertTimezoneFormat(format, timezone) {

	    var timezoneFormats = {
	      'hh:mm': function hhMm(timezone) {

	        if (isNaN(timezone)) {
	          return false;
	        }

	        var absTimezone = Math.abs(timezone),
	            hours = parseInt(absTimezone),
	            minutes = absTimezone * 60 % 60,
	            prefix = timezone < 0 ? '-' : '+',
	            result = [];

	        result.push(prefix, hours < 10 ? '0' + hours : hours, ':', minutes < 10 ? '0' + minutes : minutes);

	        return result.join('');
	      },
	      'number': function number(timezone) {

	        var hhmmFormatReg = /^[+-]{1}\d{2}:\d{2}$/;
	        if (!hhmmFormatReg.test(timezone)) {
	          return false;
	        }

	        var hoursMinutes = timezone.split(':'),
	            hours = parseInt(hoursMinutes[0]),
	            minutes = parseInt(hoursMinutes[1]);

	        return hours + minutes / 60;
	      }
	    };

	    if (undefined === timezoneFormats[format]) {
	      return false;
	    }

	    return timezoneFormats[format].call(this, timezone);
	  };

	  return {
	    getCurrentTimezoneOffsetMins: _getCurrentTimezoneOffsetMins,
	    getCurrentTimezone: _getCurrentTimezone,
	    convertTimezoneFormat: _convertTimezoneFormat,
	    getDateObjByTimezone: _getDateObjByTimezone,
	    getCurrentDatetime: _getCurrentDatetime,
	    formatDatetime: _formatDatetime
	  };
	}).factory('GeoLocation', function ($cordovaGeolocation, $q, AJAX) {

	  var _getCurrentCoords = function _getCurrentCoords() {

	    var deferred = $q.defer(),
	        posOptions = { timeout: 10000, enableHighAccuracy: false };

	    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
	      deferred.resolve({
	        latitude: position.coords.latitude,
	        longitude: position.coords.longitude
	      });
	    }, function (err) {
	      deferred.reject(err);
	    });

	    return deferred.promise;
	  };

	  var _reverseGeocode = function _reverseGeocode(coords) {

	    var reverseGeocodeingURL = "https://maps.googleapis.com/maps/api/geocode/json",
	        deferred = $q.defer();

	    AJAX.get(reverseGeocodeingURL, {
	      latlng: coords.latitude + ',' + coords.longitude,
	      location_type: 'ROOFTOP',
	      result_type: 'street_address',
	      language: 'en',
	      key: 'AIzaSyCRjmhfIjuLWJ1Toq030j7015gtybKplBs'
	    }).then(function (data) {
	      if ('OK' === data.status && data.results.length > 0 && data.results[0].address_components) {
	        deferred.resolve(data.results[0].address_components);
	      }
	    });

	    return deferred.promise;
	  };

	  var _getCurrentAreaInfo = function _getCurrentAreaInfo() {

	    var deferred = $q.defer();

	    _getCurrentCoords().then(function (coords) {
	      _reverseGeocode(coords).then(function (addressComponents) {
	        console.log(addressComponents);
	        var areaInfo = {},
	            areaFields = {
	          administrative_area_level_1: 'cityName',
	          country: 'country'
	        },
	            areaField;
	        addressComponents.forEach(function (item) {
	          if (areaField = areaFields[item.types[0]]) {
	            areaInfo[areaField] = item.long_name;
	          }
	        });
	        deferred.resolve(areaInfo);
	      });
	    }, function (err) {
	      deferred.reject(err);
	    });

	    return deferred.promise;
	  };

	  return {
	    getCurrentCoords: _getCurrentCoords,
	    getCurrentAreaInfo: _getCurrentAreaInfo
	  };
	}).factory('System', function (UserCities, GeoLocation, Timezone, $q) {

	  var _init = function _init() {

	    var userCities = UserCities.all(),
	        currentTimezone = Timezone.getCurrentTimezone(),
	        deferred = $q.defer(),
	        currentCity = userCities[0];

	    currentCity.timezone = currentTimezone;

	    GeoLocation.getCurrentAreaInfo().then(function (areaInfo) {
	      currentCity.name = areaInfo.cityName;
	      currentCity.country = areaInfo.country;
	      UserCities.save(userCities);
	      deferred.resolve(userCities);
	    }, function (err) {
	      currentCity.name = 'Unknown Place';
	      UserCities.save(userCities);
	      deferred.resolve(userCities);
	    });

	    return deferred.promise;
	  };

	  return {
	    init: _init
	  };
	});

/***/ }
/******/ ]);