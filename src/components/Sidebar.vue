<template>
  <div class="sidebar">
    <div class="sidebar__nav">
      <router-link
        v-for="item in nav"
        :key="item.name"
        :to="item.path"
        tag="div"
        class="sidebar__nav-item"
      >{{ item.name
      }}</router-link>
    </div>
  </div>
</template>

<script>
import nav from '../db/navigation'

export default {
  name: '',

  data () {
    return {
      nav: nav.sidebar,
      token: localStorage.getItem('token')
    }
  },
  async mounted () {
    try {
      const URL = 'http://localhost:4200/api/auth/validate-token'

      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}` // Include the bearer token
        }
      })

      if (response.status === 401) {
        this.$notify(
          {
            group: 'top',
            title: 'Session Expired!'
          },
          4000
        )
        this.$router.push({ path: '/sign-in' })
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.sidebar {
  border-right: 1px solid #ddd;

  &__nav {
    &-item {
      padding: 25px 10px;
      font-size: 12px;
      cursor: pointer;
      text-align: center;

      &.active {
        background-color: $color-primary;
        color: #fff;

        &:hover {
          background-color: $color-primary;
          color: #fff;
        }
      }

      &:hover {
        background-color: #eee;
        color: #000;
      }
    }
  }
}
</style>
