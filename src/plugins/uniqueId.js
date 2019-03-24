import Vue from 'vue';

Vue.use({
  install: function (Vue/*, options*/) {
    Object.defineProperty(Vue.prototype, 'uniqId', {
      get: function uniqId () {
        return this._uid;
      }
    });
  }
});
