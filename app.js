var app = angular.module('app',['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'pages/home.html',
      controller: 'homeCtrl'
    })
    .state('registration',{
      url: '/registration',
      templateUrl: 'pages/registration.html',
      controller: 'registrationCtrl'
    });

  $urlRouterProvider.otherwise('/home');
}])