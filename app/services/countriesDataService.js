angular.module('countriesApp')
  .constant('countriesDataServiceParams', {
    username: 'austinFWD'
  })
  .factory('countriesDataService', ['$http', '$q', 'countriesDataServiceParams', function ($http, $q, countriesDataServiceParams) {
    var countryCache = [],
      requestedCountry = {};
    return {
      //State Methods
      currentCountry: function (country) {
        if(country) {
          if(angular.isString(country)){
            country = _.find(countryCache, function(obj){
              return obj.countryCode === country;
            });
          }
          requestedCountry = country;
          return requestedCountry;
        }
        else return requestedCountry;
      },
      //Data Methods
      neighbors: function (country) {
        var params = angular.extend({}, countriesDataServiceParams, {
            country: country.countryCode
          }),
          url = 'http://api.geonames.org/neighboursJSON';

        var defer = $q.defer();
        $http({
          method: 'GET',
          url: url,
          params: params
        })
          .error(function () {
            defer.reject("Cannot Access Data");
          })
          .success(function (data) {
            country.neighbors = data.geonames;
            defer.resolve(country.neighbors);
          });
        return defer.promise;
      }
      ,
      capitalInfo: function (country) {
        var params = angular.extend({}, countriesDataServiceParams, {
            country: country.countryCode,
            q: country.countryCode,
            name_equals: country.capital
          }),
          url = 'http://api.geonames.org/searchJSON';

        var defer = $q.defer();
        $http({
          method: 'GET',
          url: url,
          params: params
        })
          .error(function () {
            defer.reject("Cannot Access Data");
          })
          .success(function (data) {
            if (data.geonames.length > 0) {
              country.capitalData = data.geonames[0];
            }
            defer.resolve(country);
          });
        return defer.promise;
      }
      ,
      countries: function () {
        if (countryCache.length === 0) {
          var params = countriesDataServiceParams,
            url = 'http://api.geonames.org/countryInfoJSON';

          var defer = $q.defer();
          $http({
            method: 'GET',
            url: url,
            params: params
          })
            .error(function () {
              defer.reject("Cannot Access Data");
            })
            .success(function (data) {
              countryCache = data.geonames;
              defer.resolve(countryCache);
            });
          return defer.promise;
        }
        else {
          return countryCache;
        }
      }
    };


  }])
;