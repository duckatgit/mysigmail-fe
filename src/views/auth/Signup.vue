<template>
  <div class="row">
    <div class="banner-side">
      <img
        :src="SignupBanner"
        height="520"
        width="520"
        style="margin-left: 80px;"
      >
    </div>
    <div class="login-page">
      <div class="auth-card">
        <div class="login-container">
          <h2 class="heading-login-text text-center">Create Account</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group mb-b">
              <label>First Name</label>
              <input
                v-model="formData.firstName"
                type="text"
                :class="fieldErrors.firstName ? 'form-control validate' : 'form-control'"
              >
            </div>

            <div class="form-group mb-b">
              <label>Last Name</label>
              <input
                v-model="formData.lastName"
                type="text"
                :class="fieldErrors.lastName ? 'form-control validate' : 'form-control'"
              >
            </div>

            <div class="form-group mb-b">
              <label>Email Address</label>
              <input
                v-model="formData.email"
                type="email"
                :class="fieldErrors.email ? 'form-control validate' : 'form-control'"
              >
            </div>

            <div class="form-group mb-b">
              <label>Password</label>
              <div class="position-relative">
                <input
                  v-model="formData.password"
                  type="password"
                  :class="fieldErrors.password ? 'form-control validate' : 'form-control'"
                >
              </div>
            </div>

            <div class="form-group mb-b">
              <label>Gender</label>
              <select
                v-model="formData.gender"
                :class="fieldErrors.gender ? 'form-control validate' : 'form-control'"
              >
                <option
                  value=""
                  disabled
                >Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

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
              >Register</button>
            </div>
          </form>

          <div
            class="already text-center"
            style="margin-top: 16px"
          >
            <p>
              Already have an account?
              <router-link
                to="/sign-in"
                class="sidebar__nav-item"
              >Login</router-link>

            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupBanner from '../../assets/img/signup-banner.png'

export default {
  data () {
    return {
      SignupBanner,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: ''
      },
      fieldErrors: {}
    }
  },

  methods: {
    async submitForm () {
      this.fieldErrors = {} // Clear previous errors

      for (const field in this.formData) {
        if (this.formData[field] === '' || this.formData[field].trim() === '') {
          this.fieldErrors[field] = true
        }
      }
      if (Object.keys(this.fieldErrors).length > 0) {

      } else {
        try {
          const URL = 'http://localhost:4200/api/auth/sign-up'
          const payload = this.formData

          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstName: payload.firstName,
              lastName: payload.lastName,
              gender: payload.gender,
              email: payload.email,
              password: payload.password
            })
          })
          const result = await response.json()

          if (response.status === 200) {
            this.$router.push({ name: 'verify-email', query: { email: payload.email } })
          } else {
            this.$notify(
              {
                group: 'top',
                title: result.data
              },
              4000
            )
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

input.form-control {
  background: #f6f6f6 !important;
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

.validate {
  border: 1px solid red !important;
}
</style>
