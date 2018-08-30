let app = angular.module('formBuildApp', ["ngRoute" , 'ui.bootstrap']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/home', {
        templateUrl: 'components/home.html',
        controller : 'homeCtrl as homeCtrl'
        })
        .when('/builder', {
            templateUrl: 'components/builder.html',
            controller : 'buildCtrl as buildCtrl'
        })
        .when('/form/:id?', {
            templateUrl: 'components/formSubmit.html',
            controller : 'formSCtrl as formSCtrl'
        })
        .when('/formSub/:id?', {
            templateUrl: 'components/formAllS.html',
            controller : 'formAllSCtrl as formAllSCtrl'
        })
       .otherwise({ redirectTo: '/home' });

        
}]);










