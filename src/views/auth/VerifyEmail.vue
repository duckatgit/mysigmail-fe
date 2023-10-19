<template>
  <div id="app">
    <div class="container">
      <div class="verification-box">
        <h2>Email Verification</h2>
        <p>A verification code has been sent to your email. Please enter the code below:</p>
        <input
          v-model="otp"
          type="text"
          placeholder="Enter OTP"
          :class="{'validate': formSubmitted }"
        >

        <p
          style="color: #007bff; cursor: pointer;"
          @click="resendAPI"
        > Didn't Get Email? Resend</p>
        <button
          style="cursor: pointer;"
          @click="verifyOTP"
        >Verify</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      otp: '',
      formSubmitted: false

    }
  },
  methods: {
    async verifyOTP () {
      const params = this.$route.query.email
      if (this.otp === '' || this.otp.trim() === '') {
        this.formSubmitted = true
      } else {
        try {
          const baseURL = process.env.VUE_APP_API_BASE_URL

          const URL = `${baseURL}/api/auth/verify-email`

          const response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: params,
              OTP: Number(this.otp)
            })
          })

          if (response.status === 200) {
            this.$notify(
              {
                group: 'top',
                title: 'Your email has been verified successfully. Now you can login'
              },
              4000
            )
            this.$router.push({ name: 'sign-in' })
          } else {
            this.formSubmitted = true

            this.$notify(
              {
                group: 'top',
                title: 'Invalid OTP'
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
    },
    async resendAPI () {
      const params = this.$route.query.email
      try {
        const baseURL = process.env.VUE_APP_API_BASE_URL

        const URL = `${baseURL}/auth/resend-verify-email`

        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: params
          })
        })

        if (response.status === 200) {
          this.$notify(
            {
              group: 'top',
              title: 'Email has been resend successfully!'
            },
            4000
          )
        } else {
          this.$notify(
            {
              group: 'top',
              title: 'Server Error!'
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
</script>

<style scoped>
.container {
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.verification-box {
  padding: 20px;
}

h2 {
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
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

button:hover {
  background-color: #1b3e63;
}

.validate {
  border: 1px solid red !important;
}

</style>
