<template>
  <div>
    <div
      v-if="currentPathname !== '/basic'"
      id="app"
      v-page-loading="app.loading"
    >
      <div v-if="currentPathname === '/sign-up'">
        <signup />
      </div>
      <div v-if="currentPathname === '/verify-email'">
        <verifyEmail />
      </div>
      <div v-if="currentPathname === '/sign-in'">
        <Signin />
      </div>
      <div v-if="currentPathname === '/forgot-password'">
        <forgotPassword />
      </div>
      <div v-if="currentPathname === '/set-new-password'">
        <SetNewPassword />
      </div>

    </div>
    <div
      v-if="currentPathname === '/basic'"
      id="new-app"
      v-page-loading="app.loading"
    >
      <sidebar v-if="currentPathname === '/basic'" />
      <config-panel v-if="currentPathname === '/basic'" />
      <preview v-if="currentPathname === '/basic'" />

    </div>
  </div>

</template>

<script>

import Sidebar from './components/Sidebar'
import ConfigPanel from './components/ConfigPanel'
import Preview from './components/Preview'
import { mapState } from 'vuex'
import Signup from './views/auth/Signup.vue'
import VerifyEmail from './views/auth/VerifyEmail.vue'
import Signin from './views/auth/Signin.vue'
import ForgotPassword from './views/auth/ForgotPassword.vue'
import SetNewPassword from './views/auth/SetNewPassword.vue'

import Vue from 'vue'
import Notifications from 'vt-notifications'

Vue.use(Notifications)
export default {
  name: 'App',
  components: {
    Sidebar,
    ConfigPanel,
    Preview,
    Signup,
    VerifyEmail,
    Signin,
    ForgotPassword,
    SetNewPassword
  },

  data () {
    return {
      currentPathname: this.$route.path // Initialize the variable with the current path
    }
  },

  computed: {
    ...mapState(['app', 'basic', 'options'])
  },
  watch: {
    '$route.path': function (newPath, oldPath) {
      this.currentPathname = newPath // Update the variable when the route changes
    }
  },

  async created () {
    this.$store.commit('SET_LOADING', true)
    await this.$store.dispatch('addInitialProject')
    this.$store.commit('SET_LOADING', false)
  }

}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
#app {
  display: grid;
  // grid-template-columns: 85px 550px 1fr;
  height: 100vh;
}
#new-app {
  display: grid;
  grid-template-columns: 85px 550px 1fr;
  height: 100vh;
}
.desc {
  flex-grow: 1;
  font-size: 12px;
  line-height: 1.5em;
  color: #aaa;
}
</style>
