angular.module('countriesApp')
  .run(['$rootScope', '$location', '$timeout', function($rootScope, $location, $timeout){
    $rootScope.$on('$routeChangeStart',function() {
      $rootScope.viewLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess',function() {
      $timeout(function(){
        $rootScope.viewLoading = false;
      });
    });
    $rootScope.$on('$routeChangeError',function() {
      $location.path('/error');
    });
  }])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/countries', {
        templateUrl: 'views/countries.html',
        controller: "CountriesCtrl",
        resolve: {
         countries: ['countriesDataService', function(countriesDataService){
          return countriesDataService.countries();
         }]
        }
      })
      .when('/countries/:country_code', {
        templateUrl: 'views/country.html',
        controller: 'CountryInfoCtrl',
        resolve: {
          countries: ['countriesDataService', function(countriesDataService){
            return countriesDataService.countries();
          }]
        }
      })
      .when('/error', {})
      .otherwise('/error');
  }]);