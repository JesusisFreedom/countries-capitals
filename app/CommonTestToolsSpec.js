/**
 * Created by austinadams on 7/12/15.
 */

templateMocks = function ($httpBackend) {
  $httpBackend.whenGET('views/countries.html').respond('...');
  $httpBackend.whenGET('views/home.html').respond('...');
};

mockCdService = function () {
  module(function ($provide) {
    $provide.value('countriesDataService', {
      countries: jasmine.createSpy('countries').and.returnValue({data: []}),
      neighbors: jasmine.createSpy('countries').and.returnValue({data: []}),
      capitalInfo: jasmine.createSpy('countries').and.returnValue({data: []})
    });
  });
};