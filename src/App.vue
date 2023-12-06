<template>
  <div>
    <div
      v-if="!currentPathname.includes('dashboard')"
      id="app"
      v-page-loading="app.loading"
    >
      <div v-if="currentPathname === '/sign-up' || currentPathname === '/'">
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
      <div v-if="currentPathname === '/faq'">
        <FAQ />
      </div>
    </div>
    <div
      v-if="currentPathname.includes('dashboard')"
      id="new-app"
      v-page-loading="app.loading"
    >
      <sidebar />
      <config-panel />
      <preview />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import ConfigPanel from "./components/ConfigPanel";
import Preview from "./components/Preview";
import { mapState } from "vuex";
import Signup from "./views/auth/Signup.vue";
import VerifyEmail from "./views/auth/VerifyEmail.vue";
import Signin from "./views/auth/Signin.vue";
import ForgotPassword from "./views/auth/ForgotPassword.vue";
import SetNewPassword from "./views/auth/SetNewPassword.vue";
import FAQ from "./views/FAQ.vue";
import { EventBus } from "./util/EventBus";

import Vue from "vue";
import Notifications from "vt-notifications";

Vue.use(Notifications);
export default {
  name: "App",
  components: {
    Sidebar,
    ConfigPanel,
    Preview,
    Signup,
    VerifyEmail,
    Signin,
    ForgotPassword,
    SetNewPassword,
    FAQ,
  },

  data() {
    return {
      currentPathname: window.location.pathname, // Initialize the variable with the current path
      token: localStorage.getItem("token"),
    };
  },

  computed: {
    ...mapState(["app", "basic", "options"]),
  },
  watch: {
    "$route.path": function (newPath, oldPath) {
      this.currentPathname = newPath; // Update the variable when the route changes
    },
  },

  async created() {
    this.$store.commit("SET_LOADING", true);
    await this.$store.dispatch("addInitialProject");
    this.$store.commit("SET_LOADING", false);
  },
  async mounted() {
    const currentPath = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const google = localStorage.getItem("googleApi");
    if (google) {
      const baseURL = process.env.VUE_APP_API_BASE_URL;

      const URL = `${baseURL}/upload/googleAuthCallback`;

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }), // Send 'code' in the request body
      });
      const result = await response.json();
      this.token = result.accessToken;
      this.userName = result.name;
      EventBus.$emit("dataChanged", this.userName);
    }
    if (!google) {
      if (currentPath.includes("dashboard")) {
        try {
          const baseURL = process.env.VUE_APP_API_BASE_URL;
          const URL = `${baseURL}/auth/validate-token`;
          const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.token}`, // Include the bearer token
            },
          });
          console.log(response);
          if (response.status === 401) {
            this.$notify(
              {
                group: "top",
                title: "Session Expired!",
              },
              4000
            );
            this.$router.push({ path: "/sign-in" });
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    }
  },
};
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
