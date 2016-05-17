import { changeTime } from './redux/actions';

angular.module('ontime.directives', ['ontime.services'])

.directive('realtimeDatetime', ['$interval', 'Timezone', '$ngRedux', function($interval, Timezone, $ngRedux) {
	return {
		template: '<div class="city-datetime"><h1 class="no-margin-bottom">{{time}}</h1><h2>{{date}}</h2></div>',
		restrict: 'E',
		replace: true,
		scope: {
			currentDatetime: '=',
			currentDatetimeWithoutTimeOffset: '='
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
				currentDateObjWithoutTimeOffset = null,
				unsubscribe = $ngRedux.subscribe(
					() => {
						let state = $ngRedux.getState();
						timeChangedOffset = state.timeChangedOffset;
					}
				);

			element.on('$destroy', () => {
		      $interval.cancel(intervalId);
		      unsubscribe();
		    });

			intervalId = $interval(() => {
				currentDateObj = Timezone.getDateObjByTimezone(timezoneVal, timeChangedOffset);
				currentDateObjWithoutTimeOffset = Timezone.getDateObjByTimezone(timezoneVal);
				scope.currentDatetime = currentDateObj;
				scope.currentDatetimeWithoutTimeOffset = currentDateObjWithoutTimeOffset;
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
	  		scope.$watch('trigger', (value) => {
		        if(true === value) {
		        	$timeout(() => {
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
			scope.currentDatetimeWithoutTimeOffset = null;
			scope.setDatetime = null;

			scope.$watch('city.editTime', (value) => {
				if(true === value) {
					scope.setDatetime = scope.currentDatetime;
				}
			});
			
			scope.handleChange = function() {
				let offset = scope.setDatetime.getTime() - scope.currentDatetimeWithoutTimeOffset.getTime();
				$ngRedux.dispatch(changeTime(offset));
			};
		}
	};
});