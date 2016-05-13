;(function() {
  'use strict';

  angular
    .module('app')
    // .value('restURL', 'https://angular-list.firebaseio.com/')
    // .service('firebaseRef', function(restURL) {
    //   return new Firebase(restURL)
    // })
    .factory('users', users);


    users.$inject = ['$http', '$q'];

    function users($http, $q) {
      var apiURL = 'https://angular-list.firebaseio.com/' + 'users/';
      // var fbRef = new Firebase(apiURL);
      var keyField = 'keyId';

      // модель для работы с пользователями
      function UserModel(data) {
        if (data) {
          this.setData(data);
        }
      }

      UserModel.prototype.setData = function(data) {
        angular.extend(this, data);
      };

      UserModel.prototype.delete = function () {
        return $http
          .delete(apiURL + this[keyField] + '.json')
          .success(function(data) {
            // Как-нибудь обрабатываем успешный запрос
          })
          .error(function(data, status, headers, config) {
            // Что-нибудь делаем в случае ошибки
        });
      };

      UserModel.prototype.update = function () {
        return $http
          .put(apiURL + this[keyField] + '.json', this)
          .success(function() {
            // Как-нибудь обрабатываем успешный запрос
          })
          .error(function(data, status, headers, config) {
            // Что-нибудь делаем в случае ошибки
          });
      };

      UserModel.prototype.create = function () {
        return $http
          .post(apiURL + '.json', this)
          .success(function() {
            // Как-нибудь обрабатываем успешный запрос
          })
          .error(function(data, status, headers, config) {
            // Что-нибудь делаем в случае ошибки
          });
      };

      var usersService = {
        findAll: function () {
          var deferred = $q.defer();
          var scope = this;
          var users = [];

          $http.get(apiURL + '.json').success(function(data) {
            Object.keys(data).forEach(function(key) {
              var u = new UserModel(data[key]);
              u.setData({
                'keyId': key
              });
              users.push(u);
            });
            deferred.resolve(users);
          }).error(function() {
            deferred.reject();
          });

          return deferred.promise;
        },

        findOne: function (id) {
          var deferred = $q.defer();
          var scope = this;
          var data = {};

          $http.get(apiUrl + '.json').success(function(data) {
            deferred.resolve(new UserModel(data));
          })
          .error(function() {
            deferred.reject();
          });
          return deferred.promise;
        },

        createEmpty: function () {
          return new UserModel({});
        }

      };

      return usersService;
    };

})();
