import vue from 'vue';
import vuex from 'vuex';
import state from './states.js';
import getters from './getters.js'
import apiDTO from './modules/api.js';

vue.use(vuex)
let modules = {
  apiDTO,
}

const store = new vuex.Store({
  state,
  getters,
  modules,
});

export default store