import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    name: '',
    email: '',
    personalID: '',
    picture: '',
    FB: undefined
  },
  mutations: {
    FB_IS_CONNECTED(state, isConnected) {
      state.isConnected = isConnected;
    },
    FB_SDK(state, FB) {
      state.FB = FB;
    },
    FB_USER(state, user) {
      state.name = user.name;
      state.email = user.email;
      state.personalID = user.id;
      state.picture = user.picture.data.url;
    }
  },
  actions: {
    fbGetUserData({ commit, getters }) {
      if (getters.FB) {
        getters.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
          user => commit('FB_USER', user)
        )
      }
    },
    fbSdkLoaded({ commit, dispatch }, payload) {
      commit('FB_IS_CONNECTED', payload.isConnected);
      commit('FB_SDK', payload.FB)
      if (payload.isConnected) dispatch('fbGetUserData');
    },
    fbOnLogin({ commit, dispatch }) {
      commit('FB_IS_CONNECTED', true);
      dispatch('fbGetUserData');
    },
    fbOnLogout({ commit }) {
      commit('FB_IS_CONNECTED', false);
    }
  },
  getters: {
    isConnected: state => state.isConnected,
    name: state => state.name,
    email: state => state.email,
    personalID: state => state.personalID,
    picture: state => state.picture,
    FB: state => state.FB,
  }
})
