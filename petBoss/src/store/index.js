import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import login from './modules/login'
import cardDetails from './modules/cardDetails'
import memberData from './modules/toindex'
import peopleDetailTwo from './modules/peopleDetailTwo'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    test,
    login,
    cardDetails,
    memberData,
    peopleDetailTwo
  },
  strict: debug
})
