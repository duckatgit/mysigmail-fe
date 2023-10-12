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
        >
        <p
          v-if="error"
          class="error"
        >{{ error }}</p>
        <p
          style="color: #007bff; cursor: pointer;"
          @click="resendAPI"
        > Didn't Get Email? Resend</p>
        <button @click="verifyOTP">Verify</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      otp: '',
      error: ''
    }
  },
  methods: {
    async verifyOTP () {
      const params = this.$route.query.email
      try {
        const URL = 'http://localhost:4200/api/auth/verify-email'

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
          alert('Email verified Success')
        } else {
          alert('Invalid OTP')
        }
      } catch (error) {
        console.error('An error occurred:', error)
      }
    },
    async resendAPI () {
      const params = this.$route.query.email
      try {
        const URL = 'http://localhost:4200/api/auth/resend-verify-email'

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
          alert('Email resend Success')
        } else {
          alert('Server Error')
        }
      } catch (error) {
        console.error('An error occurred:', error)
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
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
}
</style>
