angular.module('starter.controllers', [])

.controller('CitiesCtrl', function($scope, UserCities, GeoLocation, Timezone) {

  var userCities = UserCities.all(),
      currentTimezone = Timezone.getCurrentTimezone();

  userCities.map(function(city) {
    city.datetime = Timezone.getDatetimeByTimezone(Timezone.convertTimezoneFormat('number', city.timezone));
  });

  GeoLocation.getCurrentAreaInfo().then(function(areaInfo) {
    var currentCity = {
      id: 'currentLocation',
      name: areaInfo.cityName,
      country: areaInfo.country,
      timezone: currentTimezone,
      datetime: Timezone.getCurrentDatetime()
    }

    userCities.unshift(currentCity);
  });

  $scope.userCities = userCities;

});
