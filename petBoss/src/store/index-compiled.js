import Vue from 'vue';
import Vuex from 'vuex';
import test from './modules/test';
import login from './modules/login';
Vue.use(Vuex);
var debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
  modules: {
    test: test,
    login: login
  },
  strict: debug
});

//# sourceMappingURL=index-compiled.js.map