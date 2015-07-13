/**
 * Created by austinadams on 7/11/15.
 */

describe('CountriesCtrl', function(){
  beforeEach(module('countriesApp'));
  describe('controller', function(){
    mockCdService();
    var ctrl, scope;
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('CountriesCtrl', {
        $scope : scope,
        countries: {}
      });
    }));

    it('loadCountry changes the path', function(){
      inject(function($httpBackend, countriesDataService, $location) {
        templateMocks($httpBackend);
        scope.loadCountry({countryCode: "US"});
        expect($location.path()).toEqual('/countries/US');

      });
    });
  });
});