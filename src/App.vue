<template>
  <div id="app">
    <h1>Welcome to POC-vue-facebook</h1>
    <v-facebook-login app-id="378044260408997" @sdk-init="handleFbSdk" @login="handleFbLogin" @logout="handleFbLogout"></v-facebook-login>
    <p>{{fbAuth}}</p>
    <p>{{fbUser}}</p>
  </div>
</template>

<script>
import VFacebookLogin from "vue-facebook-login-component";

export default {
  name: "appMain",
  components: {
    VFacebookLogin
  },
  data() {
    return {
      FB: {},
      fbAuth: false,
      fbUser: false,
    }
  },
  methods: {
    handleFbLogin(response) {
      this.fbAuth = response;
      this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' }, user => {
        this.fbUser = user;
      });
    },
    handleFbLogout(response) {
      this.fbData = response;
    },
    handleFbSdk({ FB }) {
      this.FB = FB;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
