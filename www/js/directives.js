import { changeTime } from './redux/actions';

angular.module('ontime.directives', ['ontime.services'])

.directive('realtimeDatetime', ['$interval', 'Timezone', '$ngRedux', function($interval, Timezone, $ngRedux) {
	return {
		template: '<div class="city-datetime"><h2>{{time}}</h2><h2>{{date}}</h2></div>',
		restrict: 'E',
		replace: true,
		scope: {
			currentDatetime: '='
		},
		link: (scope, element, attrs) => {

			if(undefined === attrs.timezone) {
				return false;
			}

			let intervalId,
				timezone = attrs.timezone,
				timezoneVal = Timezone.convertTimezoneFormat('number', timezone),
				timeChangedOffset = 0,
				currentDateObj = null,
				unsubscribe = $ngRedux.subscribe(
					() => {
						let state = $ngRedux.getState();
						timeChangedOffset = state.timeChangedOffset;
						console.log(state);
					}
				);

			element.on('$destroy', () => {
		      $interval.cancel(intervalId);
		      unsubscribe();
		    });

			intervalId = $interval(() => {
				currentDateObj = Timezone.getDateObjByTimezone(timezoneVal, timeChangedOffset);
				scope.currentDatetime = currentDateObj;
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

.directive('cityWithDatetime', function($ngRedux) {
	return {
		templateUrl: 'templates/cityWithDatetime.html',
		restrict: 'E',
		replace: true,
		scope: {
			city: '=city'
		},
		link: function(scope, element, attrs) {
			scope.currentDatetime = null;
			scope.setDatetime = null;
			
			scope.handleChange = function() {
				let offset = scope.setDatetime.getTime() - scope.currentDatetime.getTime();
				$ngRedux.dispatch(changeTime(offset));
				console.log(offset);
			};
		}
	};
});