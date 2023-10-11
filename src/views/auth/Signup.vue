<template>
  <div class="signup-form">
    <div class="form-container">
      <h1>Sign Up</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <div class="flex-row">
            <div class="flex-col">
              <label for="firstName">First Name</label>
              <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                required
              >
            </div>
            <div class="flex-col">
              <label for="lastName">Last Name</label>
              <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                required
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
          >
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <select
            id="gender"
            v-model="formData.gender"
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            required
          >
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: 'male'
      }
    }
  },
  methods: {
    async submitForm () {
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

        if (response.ok) {
          const result = await response.json()
          console.log('Signup successful:', result)
        } else {
          console.error('Signup failed:', response.statusText)
        }
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }

  }
}
</script>

<style>
/* Styles */
.signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
}

h1 {
  color: #333;
}

.form-group {
  margin: 10px 0;
}

.flex-row {
  display: flex;
  justify-content: space-between;
}

.flex-col {
  flex: 1;
  margin: 12px;
}

label {
  display: block;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
