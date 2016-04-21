'use strict';

angular.module('intime.controllers', [])

.controller('CitiesCtrl', function($scope, System) {
  System.init().then(function(userCities) {
    $scope.userCities = userCities;
  });
});
