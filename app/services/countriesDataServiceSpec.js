describe("Countries Data Service", function () {
  beforeAll(function () {
    resolvedData = {
      geonames: [{
        name: 'USA'
      }]
    };
  });

  beforeEach(module('countriesApp'));


  it('Calls a list of countries from the server on success AND Caches it', function () {
    inject(function (countriesDataService, $rootScope, $httpBackend) {

      $httpBackend.expectGET('http://api.geonames.org/countryInfoJSON?username=austinFWD').respond(resolvedData);

      countriesDataService.countries();

      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingRequest();
      //Verify Cache
      expect(countriesDataService.countries()).toEqual(resolvedData.geonames);
    });
  });

  xit('Calls Capital info from server and returns a modified object', function (done) {
    var country = {
      countryName: "USA",
      countryCode: "US"
    };
    inject(function (countriesDataService, $httpBackend) {
      $httpBackend.expectGET('http://api.geonames.org/searchJSON?username=austinFWD').respond(resolvedData);

      var promise = countriesDataService.capitalInfo( country.countryCode );
      $httpBackend.flush();
      promise.then(function(data){
        country = data;
        expect(country.capitalData).toBeDefined();
        expect(country.capitalData).toEqual(resolvedData.geonames);
        $httpBackend.verifyNoOutstandingRequest();
        done();
      });

    });
  });
});