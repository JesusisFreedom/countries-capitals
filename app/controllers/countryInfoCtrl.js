angular.module('countriesApp')
  .controller('CountryInfoCtrl',['$scope','countriesDataService','countries','$routeParams', function ($scope, countriesDataService, countries, $routeParams) {
    $scope.country = countriesDataService.currentCountry($routeParams.country_code);
    countriesDataService.capitalInfo($scope.country);
    countriesDataService.neighbors($scope.country);
  }]);