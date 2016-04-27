'use strict';

angular.module('intime.directives', ['intime.services'])

.directive('realtimeDatetime', ['$interval', 'Timezone', function($interval, Timezone) {
	return {
		template: '<div class="city-datetime"><h2>{{time}}</h2><h2>{{date}}</h2></div>',
		restrict: 'E',
		replace: true,
		link: function(scope, element, attrs) {

			if(undefined === attrs.timezone) {
				return false;
			}

			var intervalId,
				timezone = attrs.timezone,
				timezoneVal = Timezone.convertTimezoneFormat('number', timezone),
				currentDateObj = null;

			element.on('$destroy', function() {
		      $interval.cancel(timeoutId);
		    });

			intervalId = $interval(function() {
				currentDateObj = Timezone.getDateObjByTimezone(timezoneVal);
				scope.time = Timezone.formatDatetime(currentDateObj, 'HH:mm');
				scope.date = Timezone.formatDatetime(currentDateObj, 'yyyy-MM-dd');
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