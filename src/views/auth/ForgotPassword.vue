<template>
  <div class="row">
    <div class="banner-side">
      <img
        :src="forgotPasswordBanner"
        height="520"
        width="520"
        style="margin-left: 80px;"
      >
    </div>
    <div class="login-page">
      <div class="auth-card">
        <div class="login-container">
          <h2 class="heading-login-text text-center">Forgot Password</h2>
          <form @submit.prevent="submitForm">

            <div class="form-group mb-b">
              <label>Email Address</label>
              <input
                v-model="formData.email"
                type="text"
                :class="{ 'form-control': true, 'validate': formSubmitted }"
              >
            </div>

            <!-- <div
              class="forgot"
            >
              Didn't receive an email?
              <a @click="handleResendEmail">Resend </a>

            </div> -->

            <div
              class="d-flex forget-password"
              style="justify-content: space-between"
            >
              <!-- <p><a href="#">Forgot Password?</a></p> -->
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="continue"
                mat-raised-button
                color="primary"
              >Submit</button>
            </div>
          </form>

          <div
            class="already text-center"
            style="margin-top: 16px"
          >
            <p>
              <router-link
                to="/sign-in"
                class="sidebar__nav-item"
              >Back to login</router-link>

            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import forgotPasswordBanner from '../../assets/img/forgot password-banner.png'

export default {
  data () {
    return {
      forgotPasswordBanner,
      formData: {
        email: ''
      },
      formSubmitted: false
    }
  },

  methods: {
    async submitForm () {
      const payload = this.formData
      try {
        if (payload.email === '' || payload.email.trim() === '') {
          this.formSubmitted = true
        } else {
          const URL = 'http://54.226.37.64:8000/api/auth/forgot-password'

          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: payload.email
            })
          })
          const result = await response.json()

          if (response.ok) {
            this.$notify(
              {
                group: 'top',
                title: 'Email has been sent successfully'
              },
              4000
            )
          } else {
            this.$notify(
              {
                group: 'top',
                title: result.data
              },
              4000
            )
          }
        }
      } catch (error) {
        this.$notify(
          {
            group: 'top',
            title: 'Server Error!'
          },
          4000
        )
      }
    }

  }
}
</script>

<style scoped>
.row {
  display: flex;
}

.banner-side {
  width: 50%;
}

.login-page {
  width: 50%;
}

.login-page div.auth-card {
  box-shadow: 0px 0px 4px 0px rgba(86, 86, 86, 0.25);
  border-radius: 12px;
  padding: 30px 29px 27px;
  max-width: 740px;
  margin: 20px auto;
  width: 60%;
  display: block;
}

h2.heading-login-text {
  font-size: 21px;
  margin: 0 0 30px 0;
  text-align: center;
}

.mb-b {
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 10px;
  outline: none;
}

.form-group label {
  margin-bottom: 5px;
  font-size: 13px;
  color: #242b3a;
  display: block;
  font-weight: 500;
}

.position-relative {
  position: relative !important;
}

.position-icon.uername {
  position: absolute;
  top: 14px;
  left: 10px;
  width: 16px;
}

.login-page .form-control {
  color: #2e2c33;
  font-weight: 400;
  border-radius: 4px;
  background: #f6f6f6;
  height: 45px !important;
  padding: 13px 10px;
  border: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.validate {
  border: 1px solid red !important;
}

input.form-control {
  background: #f6f6f6 !important;
}

.login-container .forgot {
  text-align: end;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;

}

.forgot a {
  color: #3568e5 !important;
  cursor: pointer;
}

.forget-password a {
  color: #3568e5;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}

.text-center {
  text-align: center;
}

button.continue {
  background-color: #255384;
  color: #fff;
  font-size: 16px;
  padding: 6px 40px;
  font-weight: 400;
  box-shadow: none;
  border: 0;
  line-height: 36px;
  border-radius: 5px;
}

.login-page .already p {
  font-size: 13px;
  font-weight: 500;
  margin: 25px 0 0 0;
}

.login-page .already a {
  color: #3568e5;
}
</style>
