import Vue from 'vue'
import Vuex from 'vuex'
import Tool from '../common/js/common'
import Config from '../common/js/config'

Vue.use(Vuex);

const state = {
  //语言
  lang: {},
  langOption: Config.lang,
  currLang: localStorage.languageType || Config.lang[0].value,
};

const mutations = {
  changeLang(state, newLang) {
    state.currLang = newLang;
    localStorage.languageType = newLang;
    initLang();
  },
};

export default new Vuex.Store({state, mutations});
