import ngRedux from 'ng-redux';
import { timeChanger } from './redux/reducers';
import { combineReducers } from 'redux';

angular.module('ontime', ['ionic', 'ontime.controllers', 'ontime.services', 'ontime.directives', 'ngCordova', 'ngRedux'])

.run(($ionicPlatform) => {
  $ionicPlatform.ready(() => {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(($stateProvider, $urlRouterProvider, $ngReduxProvider) => {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:

  .state('cities', {
    url: '/cities',
    templateUrl: 'templates/cities.html',
    controller: 'CitiesCtrl'
  })

  .state('add', {
    url: '/add',
    templateUrl: 'templates/add.html',
    controller: 'CityAddCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/cities');

  $ngReduxProvider.createStoreWith({
    timeChangedOffset: timeChanger
  });
});
