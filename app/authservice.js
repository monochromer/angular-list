;(function () {
  'use strict';

  angular
    .module('app')
    .service('AuthService', AuthService)


  AuthService.$inject = ['$rootScope', '$firebase', '$firebaseAuth', 'firebaseRef', '$location', '$q'];

  function AuthService($rootScope, $firebase, $firebaseAuth, firebaseRef, $location, $q) {
    var authObj = $firebaseAuth(firebaseRef);
    var exports;

    var userStorageKey = 'authUser';
    var authUser = localStorage.get(userStorageKey) || {
      status: false,
      data: false
    };

    function createUserByEmail() {};

    function signInUserByEmail() {};

    function changeUserPass() {};

    function resetAndSendPassword() {};

    function deleteUser() {
      authObj.removeUser({
          email    : email,
          password : password
      }, function(error) {
          if (error === null) {
              console.log("User removed successfully");
          } else {
              console.log("Error removing user:", error);
          }
      });
    };

    function getUserState() {
      if(authUser.data) {
          var data = authObj.getAuth();
          authUser = {
              status: data ? true : false,
              data: (data == null) ? {} : data
          };
          $.jStorage.set(userStorageKey, authUser);
      };
      return authUser.status;
    };

    function logOut() {
      $firebaseAuth(authObj).$unauth();
      localStorage.removeItem(userStorageKey);
      $rootScope.$userState = this.getUserState();
    };

    function getAuthUser() {
      return authUser.data;
    };

    exports = {
      createUserByEmail: createUserByEmail,
      signInUserByEmail: signInUserByEmail,
      changeUserPass: changeUserPass,
      resetAndSendPassword: resetAndSendPassword,
      deleteUser: deleteUser,
      getUserState: getUserState,
      logOut: logOut,
      getAuthUser: getAuthUser
    };

    return exports;
  };
})();
