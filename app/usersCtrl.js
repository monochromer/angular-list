;(function () {
  'use strict';

  angular
    .module('app')
    .controller('usersCtrl', usersCtrl)
    .filter('highlight', highlight);


  function highlight() {
    return function (text, search, caseSensitive) {
      if (text && (search || angular.isNumber(search))) {
        text = text.toString();
        search = search.toString();
        if (caseSensitive) {
          return text.split(search).join('<mark class="highlight">' + search + '</mark>');
        } else {
          return text.replace(new RegExp(search, 'gi'), '<mark class="highlight">$&</mark>');
        }
      } else {
        return text;
      }
    };
  };


  usersCtrl.$inject = ['$scope', 'users', 'loader'];

  function usersCtrl($scope, users, loader) {
    // $scope.users = [
    //     {
    //       "id": "1",
    //       "name": "Porter Casey",
    //       "email": "portercasey@pulze.com",
    //       "phone": "+1 (951) 578-3972",
    //       "address": "Concho",
    //       "room": 210,
    //       "avatar": "https://randomuser.me/api/portraits/men/1.jpg"
    //     },
    //     {
    //       "id": "2",
    //       "name": "Patterson Lopez",
    //       "email": "pattersonlopez@pulze.com",
    //       "phone": "+1 (920) 444-3736",
    //       "address": "Winfred",
    //       "room": 100,
    //       "avatar": "https://randomuser.me/api/portraits/men/2.jpg"
    //     },
    //     {
    //       "id": "2",
    //       "name": "Bethany Douglas",
    //       "email": "bethanydouglas@pulze.com",
    //       "phone": "+1 (900) 580-2888",
    //       "address": "Slovan",
    //       "room": 203,
    //       "avatar": "https://randomuser.me/api/portraits/women/3.jpg"
    //     },
    //     {
    //       "id": "3",
    //       "name": "Gayle Bullock",
    //       "email": "gaylebullock@pulze.com",
    //       "phone": "+1 (906) 577-3764",
    //       "address": "Kennedyville",
    //       "room": 201,
    //       "avatar": "https://randomuser.me/api/portraits/women/4.jpg"
    //     },
    //     {
    //       "id": "4",
    //       "name": "Tonya Vance",
    //       "email": "tonyavance@pulze.com",
    //       "phone": "+1 (839) 526-2184",
    //       "address": "Osmond",
    //       "room": 302,
    //       "avatar": "https://randomuser.me/api/portraits/women/5.jpg"
    //     },
    //     {
    //       "id": "5",
    //       "name": "Lori Trujillo",
    //       "email": "loritrujillo@pulze.com",
    //       "phone": "+1 (943) 530-3073",
    //       "address": "Delshire",
    //       "room": 120,
    //       "avatar": "https://randomuser.me/api/portraits/women/6.jpg"
    //     },
    //     {
    //       "id": "6",
    //       "name": "Alba Castro",
    //       "email": "albacastro@pulze.com",
    //       "phone": "+1 (873) 421-3074",
    //       "address": "Carlos",
    //       "room": 108,
    //       "avatar": "https://randomuser.me/api/portraits/women/7.jpg"
    //     },
    //     {
    //       "id": "7",
    //       "name": "Goff Mcfadden",
    //       "email": "goffmcfadden@pulze.com",
    //       "phone": "+1 (800) 529-3138",
    //       "address": "Kidder",
    //       "room": 108,
    //       "avatar": "https://randomuser.me/api/portraits/men/8.jpg"
    //     }
    // ];
    users.findAll().then(function(users) {
      $scope.users = users;
    });

    $scope.sortType = 'name';
    $scope.sortReverse = false;

    $scope.activeUser = null;
    $scope.showModal = false;
    var tempUser = {};

    $scope.toggleActiveUser = function(user) {
      if ($scope.activeUser === user) {
        $scope.activeUser = null;
      } else {
        $scope.activeUser = user;
      }
    }

    $scope.composeNewUser = function() {
      $scope.activeUser = null;
      $scope.newUser = {};
      $scope.showModal = true;
    }

    $scope.createUser = function() {
      var newUser;
      newUser = users.createEmpty();
      angular.extend(newUser, $scope.newUser);
      // newUser.id = $scope.users.length + 1;
      loader.show();
      newUser.create().then(function() {
        $scope.users.push(newUser);
        $scope.newUser = null;
        $scope.showModal = false;
        loader.hide();
      });
    };

    $scope.deleteUser = function(user) {
      var index = $scope.users.indexOf(user);
      loader.show();
      user.delete().then(function() {
        $scope.users.splice(index, 1);
        $scope.activeUser = null;
        loader.hide();
      });
    };

    $scope.editUser = function(user) {
      $scope.showModal = true;
      tempUser = angular.copy(user);
    }

    $scope.saveUser = function(event) {
      event.preventDefault();
      loader.show();
      $scope.activeUser.update().then(function() {
        $scope.showModal = false;
        $scope.activeUser = null;
        loader.hide();
      });
    }

     $scope.resetUser = function(event) {
      event.preventDefault();
      var index = $scope.users.indexOf($scope.activeUser);
      $scope.users[index] = angular.copy(tempUser);
      $scope.showModal = false;
      $scope.activeUser = null;
      $scope.newUser = null;
      tempUser = {};
    }

  };

})();
