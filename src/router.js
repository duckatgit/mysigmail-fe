import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/basic',
      meta: { title: 'Basic signature details' },
      component: () =>
        import(/* webpackChunkName: "basic" */ './views/Basic.vue')
    },
    {
      path: '/social',
      meta: { title: 'Social media links' },
      component: () =>
        import(/* webpackChunkName: "social" */ './views/Social.vue')
    },
    {
      path: '/options',
      meta: { title: 'Signature options' },
      component: () =>
        import(/* webpackChunkName: "options" */ './views/Options.vue')
    },
    {
      path: '/addons',
      meta: { title: 'Signature addons' },
      component: () =>
        import(/* webpackChunkName: "addons" */ './views/Addons.vue')
    },
    {
      path: '/projects',
      meta: { title: 'Projects' },
      component: () =>
        import(/* webpackChunkName: "projects" */ './views/Projects.vue')
    },
    {
      path: '/sign-up',
      component: () =>
        import(/* webpackChunkName: "projects" */ './views/auth/Signup.vue')
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      props: true,
      component: () =>
        import(/* webpackChunkName: "projects" */ './views/auth/VerifyEmail.vue')
    }

  ]
})
