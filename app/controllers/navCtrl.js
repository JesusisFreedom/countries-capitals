angular.module('countriesApp')
  .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
    //Available links
    $scope.links = {
      "Home": "/",
      "Countries": "/countries"
    };
    //Watch the path for changes to update the current link
    $scope.$watch(
      function () {
        return $location.path();
      },
      function () {
        $scope.active = $location.path();
      });
  }]);