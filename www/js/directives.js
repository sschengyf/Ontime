'use strict';

angular.module('intime.directives', ['intime.services'])

.directive('realtimeDatetime', ['$interval', 'Timezone', function($interval, Timezone) {
	return {
		template: '<h2 class="city-datetime">{{datetime}}</h2>',
		restrict: 'E',
		replace: true,
		link: function(scope, element, attrs) {

			if(undefined === attrs.timezone) {
				return false;
			}

			var intervalId,
				timezone = attrs.timezone,
				timezoneVal = Timezone.convertTimezoneFormat('number', timezone);

			element.on('$destroy', function() {
		      $interval.cancel(timeoutId);
		    });

			intervalId = $interval(function() {
				scope.datetime = Timezone.getDatetimeByTimezone(timezoneVal);
			}, 1000);
		}  
   };  
}]);