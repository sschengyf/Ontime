'use strict';

angular.module('intime.services', ['ngStorage'])

.factory('AJAX', function($http, $q) {

  var _get = function(url, params) {

    var deferred = $q.defer();

    $http.get(url, {
      params: params
    }).then(function(response) {
      if(200 === response.status) {
        deferred.resolve(response.data);
      } else {
        console.log(response.status, response.statusText);
      }
    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };

  var _post = function(url, data) {
    var deferred = $q.defer();

    $http.post(url, data).then(function(response) {
      if(200 === response.status) {
        deferred.resolve(response.data);
      } else {
        console.log(response.status, response.statusText);
      }
    }, function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  };

  return {
    get: _get,
    post: _post
  };
})

.factory('UserCities', function($localStorage) {

  return {
    all: function() {

      return [
        {
          id: 7,
          name: 'Tokyo',
          country: 'Japan',
          timezone: '+09:00'
        },
        {
          id: 12,
          name: 'Chengdu',
          country: 'China',
          timezone: '+08:00'
        },
      ];


      return $localStorage.userCities || [];
    },
    add: function(city) {
      var userCities = this.all();
      userCities.push(city);
      $localStorage.userCities = userCities;
    },
    remove: function(city) {
      var userCities = this.all();
      userCities.splice(userCities.indexOf(city), 1);
      $localStorage.userCities = userCities;
    }
  };

})

.factory('Timezone', function() {

  var _formatDatetime = function(date) {
    var result = [];
    result.push(
      date.getFullYear(),
      '-',
      date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
      '-',
      date.getDate(),
      ' ',
      date.getHours(),
      ':',
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    );
    return result.join('');
  };

  var _getDatetimeByTimezone = function(timezone) {
    var s = 1000,
        m = s * 60,
        h = m * 60,
        d = h * 24,
        now = Date.now(),
        date = new Date(),
        timezoneOffsetSeconds = _getCurrentTimezoneOffsetMins() * m;

    date.setTime(now - timezoneOffsetSeconds + (timezone * h));
    return _formatDatetime(date);
  };

  var _getCurrentDatetime = function() {
    var today = new Date();
    return _formatDatetime(today);
  };

  var _getCurrentTimezoneOffsetMins = function() {
    var today = new Date(),
        currentTimezoneOffsetMins = today.getTimezoneOffset();
    return -currentTimezoneOffsetMins;
  };

  var _getCurrentTimezone = function() {
    return _convertTimezoneFormat('hh:mm', _getCurrentTimezoneOffsetMins() / 60);
  };

  var _convertTimezoneFormat = function(format, timezone) {

    var timezoneFormats = {
      'hh:mm': function(timezone) {

        if(isNaN(timezone)) {
          return false;
        }

        var absTimezone = Math.abs(timezone), 
            hours = parseInt(absTimezone),
            minutes = absTimezone * 60 % 60,
            prefix = timezone < 0 ? '-' : '+',
            result = [];

        result.push(
            prefix,
            hours < 10 ? '0' + hours : hours,
            ':',
            minutes < 10 ? '0' + minutes : minutes
          );

        return result.join('');
      },
      'number': function(timezone) {

        var hhmmFormatReg = /^[+-]{1}\d{2}:\d{2}$/;
        if(!hhmmFormatReg.test(timezone)) {
          return false;
        }

        var hoursMinutes = timezone.split(':'),
            hours = parseInt(hoursMinutes[0]),
            minutes = parseInt(hoursMinutes[1]);

        return hours + (minutes / 60);
      }
    };

    if(undefined === timezoneFormats[format]) {
      return false;
    }

    return timezoneFormats[format].call(this, timezone);
  };

  return {
    getCurrentTimezoneOffsetMins: _getCurrentTimezoneOffsetMins,
    getCurrentTimezone: _getCurrentTimezone,
    convertTimezoneFormat: _convertTimezoneFormat,
    getDatetimeByTimezone: _getDatetimeByTimezone,
    getCurrentDatetime: _getCurrentDatetime
  };
})

.factory('GeoLocation', function($cordovaGeolocation, $q, AJAX) {

    var _getCurrentCoords = function() {

      var deferred = $q.defer(),
          posOptions = {timeout: 10000, enableHighAccuracy: false};

      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        deferred.resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        ); 
      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    var _reverseGeocode = function(coords) {

      var reverseGeocodeingURL = "https://maps.googleapis.com/maps/api/geocode/json",
          deferred = $q.defer();

      AJAX.get(reverseGeocodeingURL, {
        latlng: coords.latitude + ',' + coords.longitude,
        location_type: 'ROOFTOP',
        result_type: 'street_address',
        key: 'AIzaSyCRjmhfIjuLWJ1Toq030j7015gtybKplBs'
      }).then(function(data) {
        if('OK' === data.status && data.results.length > 0 && data.results[0].address_components) {
          deferred.resolve(data.results[0].address_components);
        }
      });

      return deferred.promise;
    };

    var _getCurrentAreaInfo = function() {

        var deferred = $q.defer();

        _getCurrentCoords().then(function(coords) {
          _reverseGeocode(coords).then(function(addressComponents) {
            var areaInfo = {},
                areaFields = {
                  administrative_area_level_1: 'cityName',
                  country: 'country'
                },
                areaField;
            addressComponents.forEach(function(item) {
              if(areaField = areaFields[item.types[0]]) {
                areaInfo[areaField] = item.long_name;
              }
            });
            deferred.resolve(areaInfo);
          });
        }, function(err) {
          deferred.reject(err);
        });

        return deferred.promise;
    };
    
    return {
      getCurrentCoords: _getCurrentCoords,
      getCurrentAreaInfo: _getCurrentAreaInfo
    };
})

.factory('System', function(UserCities, GeoLocation, Timezone, $q) {

  var _init = function() {

    var userCities = UserCities.all(),
        currentTimezone = Timezone.getCurrentTimezone(),
        deferred = $q.defer(),
        currentCity = {
          id: 'currentLocation',
          name: '',
          country: '',
          timezone: currentTimezone
        };

    GeoLocation.getCurrentAreaInfo().then(function(areaInfo) {
      currentCity.name = areaInfo.cityName;
      currentCity.country = areaInfo.country;
      userCities.unshift(currentCity);
      deferred.resolve(userCities);
    }, function(err) {
      currentCity.name = 'Could not locate your place.';
      userCities.unshift(currentCity);
      deferred.resolve(userCities);
    });

    return deferred.promise;
  };

  return {
    init: _init
  }
});
