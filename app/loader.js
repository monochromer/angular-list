;(function() {
  'use strict';

  angular
    .module('app')
    .service('loader', Loader);

    function Loader() {
      var self = this;
      self.pageElement = document.querySelector('.app-page');
      self.show = self.show.bind(self);
      self.hide = self.hide.bind(self);
    }

    Loader.prototype = {
      show: function() {
        this.pageElement.classList.add('app-page_loading');
      },

      hide: function() {
        this.pageElement.classList.remove('app-page_loading');
      }
    };

})();
