import { defaultCurrentCity } from './const';

angular.module('ontime.services', ['ngStorage', 'ngResource'])

.factory('AJAX', function($http, $q) {

  const _get = function(url, params) {

    let deferred = $q.defer();

    $http.get(url, {
      params: params
    }).then(
      (response) => {if(200 === response.status) {
        deferred.resolve(response.data);
      } else {
        console.log(response.status, response.statusText);
      }}, (err) => {
        deferred.reject(err); 
      }
    );

    return deferred.promise;
  };

  const _post = function(url, data) {
    let deferred = $q.defer();

    $http.post(url, data).then(
      (response) => {
        if(200 === response.status) {
          deferred.resolve(response.data);
        } else {
          console.log(response.status, response.statusText);
        }  
      }, (err) => {
        deferred.reject(err);
      }
    );

    return deferred.promise;
  };

  return {
    get: _get,
    post: _post
  };
})

.factory('LocalJsonResource', function($resource) {
  return {
    read: function(file) {
      return $resource('json/' + file);
    }
  };
})

.factory('UserCities', function($localStorage) {

  return {
    all: function() {
      return $localStorage.userCities || [];
    },
    add: function(city) {
      try {
        var userCities = this.all();
        userCities.push(city);
        $localStorage.userCities = userCities;
        return true;
      }
      catch(err) {
        console.log(err);
        return false;
      }
    },
    remove: function(city) {
      try {
        var userCities = this.all();
        userCities.splice(userCities.indexOf(city), 1);
        $localStorage.userCities = userCities;
        return this.all();
      }
      catch(err) {
        console.log(err);
        return false;
      }
    },
    save: function(userCities) {
      $localStorage.userCities = userCities;
    },
    clearAll: function () {
      $localStorage.userCities = [];
    }
  };

})

.factory('Timezone', function($filter) {

  const _formatDatetime = function(date, format) {
    return $filter('date')(date, format);
  };

  const _getDateObjByTimezone = function(timezone, timeChangedOffset = 0) {
    const s = 1000,
        m = s * 60,
        h = m * 60,
        d = h * 24;
    let now = Date.now(),
        date = new Date(),
        timezoneOffsetSeconds = _getCurrentTimezoneOffsetMins() * m;

    date.setTime(now - timezoneOffsetSeconds + (timezone * h) + timeChangedOffset);
    return date;
  };

  const _getCurrentDatetime = function() {
    var today = new Date();
    return _formatDatetime(today, 'yyyy-mm-dd hh:mm:ss');
  };

  const _getCurrentTimezoneOffsetMins = function() {
    let today = new Date(),
        currentTimezoneOffsetMins = today.getTimezoneOffset();
    return -currentTimezoneOffsetMins;
  };

  const _getCurrentTimezone = function() {
    return _convertTimezoneFormat('hh:mm', _getCurrentTimezoneOffsetMins() / 60);
  };

  const _convertTimezoneFormat = function(format, timezone) {

    const timezoneFormats = {
      'hh:mm': function(timezone) {

        if(isNaN(timezone)) {
          return false;
        }

        let absTimezone = Math.abs(timezone), 
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

        const hhmmFormatReg = /^[+-]{1}\d{2}:\d{2}$/;
        if(!hhmmFormatReg.test(timezone)) {
          return false;
        }

        let hoursMinutes = timezone.split(':'),
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
    getDateObjByTimezone: _getDateObjByTimezone,
    getCurrentDatetime: _getCurrentDatetime,
    formatDatetime: _formatDatetime
  };
})

.factory('GeoLocation', function($cordovaGeolocation, $q, AJAX) {

    const _getCurrentCoords = function() {

      let deferred = $q.defer(),
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

    const _reverseGeocode = function(coords) {

      const reverseGeocodeingURL = "https://maps.googleapis.com/maps/api/geocode/json";
      let deferred = $q.defer();

      AJAX.get(reverseGeocodeingURL, {
        latlng: coords.latitude + ',' + coords.longitude,
        location_type: 'ROOFTOP',
        result_type: 'street_address',
        language: 'en',
        key: 'AIzaSyCRjmhfIjuLWJ1Toq030j7015gtybKplBs'
      }).then(function(data) {
        if('OK' === data.status && data.results.length > 0 && data.results[0].address_components) {
          deferred.resolve(data.results[0].address_components);
        }
      });

      return deferred.promise;
    };

    const _getCurrentAreaInfo = function() {

        let deferred = $q.defer();

        _getCurrentCoords().then(function(coords) {
          _reverseGeocode(coords).then(function(addressComponents) {
            let areaInfo = {},
                areaFields = {
                  administrative_area_level_1: 'city',
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

.factory('City', function(GeoLocation, Timezone, $q) {

  const _getCurrentCity = function() {
    
    let deferred = $q.defer(),
        currentTimezone = Timezone.getCurrentTimezone(),
        currentCity = defaultCurrentCity;

    currentCity.timezone = currentTimezone;

    GeoLocation.getCurrentAreaInfo().then(function(areaInfo) {
      currentCity.name = areaInfo.city;
      currentCity.country = areaInfo.country;
      deferred.resolve(currentCity);
    }, function(err) {
      currentCity.name = 'Unknown Place';
      deferred.reject(currentCity);
    });

    return deferred.promise;
  };

  return {
    getCurrentCity: _getCurrentCity
  }
});
