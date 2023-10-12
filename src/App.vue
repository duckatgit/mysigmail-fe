<template>
  <div
    id="app"
    v-page-loading="app.loading"
  >
    <div v-if="currentPathname === '/sign-up'">
      <signup />
    </div>
    <div v-if="currentPathname === '/verify-email'">
      <verifyEmail />
    </div>
    <!-- <sidebar /> -->
    <!-- <config-panel /> -->
    <!-- <preview /> -->
  </div>
</template>

<script>

// import Signup from './views/auth/Signup.vue'
// import Sidebar from './components/Sidebar'
// import ConfigPanel from './components/ConfigPanel'
// import Preview from './components/Preview'
import { mapState } from 'vuex'
import Signup from './views/auth/Signup.vue'
import VerifyEmail from './views/auth/VerifyEmail.vue'

export default {
  name: 'App',
  components: {
    // Sidebar,
    // ConfigPanel,
    // Preview,
    Signup,
    VerifyEmail
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
// #app {
//   display: grid;
//   grid-template-columns: 85px 550px 1fr;
//   height: 100vh;
// }
// .desc {
//   flex-grow: 1;
//   font-size: 12px;
//   line-height: 1.5em;
//   color: #aaa;
// }
</style>
