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
    access_token: '',
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
    },
    FB_ACCESS_TOKEN(state, token) {
      state.access_token = token;
    }
  },
  actions: {
    fbGetUserData({ commit, getters }) {
      if (getters.FB) {
        getters.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
          user => commit('FB_USER', user)
        )
        getters.FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            commit('FB_ACCESS_TOKEN', response.authResponse.accessToken);
          }
        });
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
    access_token: state => state.access_token,
    FB: state => state.FB,
  }
})
