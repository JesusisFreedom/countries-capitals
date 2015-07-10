angular.module('countriesApp')
  .controller('CountriesCtrl',['$scope','countries','$location','countriesDataService', function ($scope, countries, $location, countriesDataService) {
    $scope.countries = countries;

    $scope.loadCountry = function(country){
      $location.path('countries/'+country.countryCode);
    };
  }]);