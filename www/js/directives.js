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
				scope.datetime = Timezone.formatDatetime(Timezone.getDateObjByTimezone(timezoneVal), 'HH:mm');
			}, 1000);
		}  
   };  
}])

.directive('focusMe', function($timeout) {
	return {
	  	restrict: 'A',
	    scope: { trigger: '=focusMe' },
	    link: function(scope, element) {
	  		scope.$watch('trigger', function(value) {
		        if(value === true) {
		        	$timeout(function() {
		        		element[0].focus(); 
		        		scope.trigger = false;
		        	});
		        }
	      	});
	    }
  	};
})

.directive('cityWithDatetime', function() {
	return {
		templateUrl: 'templates/cityWithDatetime.html',
		restrict: 'E',
		replace: true,
		scope: {
			city: '=city'
		}
	};
});