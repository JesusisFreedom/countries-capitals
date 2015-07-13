/**
 * Created by austinadams on 7/11/15.
 */
describe('Routes', function () {
  beforeEach(function () {
    module('countriesApp')
  });

  describe('/countries', function () {
    it('resolves countries', function () {
      mockCdService();
      inject(function (countriesDataService, $route, $rootScope, $httpBackend, $location) {
        templateMocks($httpBackend);
        $rootScope.$apply(function () {
          $location.path('/countries');
        });
        expect(countriesDataService.countries).toHaveBeenCalled();
      });
    });
  });

  describe('/countries/:code', function () {
    it('resolves countries', function () {
      mockCdService();
      inject(function (countriesDataService, $route, $rootScope, $httpBackend, $location) {
        templateMocks($httpBackend);
        $rootScope.$apply(function () {
          $location.path('/countries');
        });
        expect(countriesDataService.countries).toHaveBeenCalled();
      });
    });
  });
});