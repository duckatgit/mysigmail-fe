import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/dashboard/basic',
      meta: { title: 'Basic signature details' },
      component: () =>
        import(/* webpackChunkName: "basic" */ './views/Basic.vue')
    },
    {
      path: '/dashboard/social',
      meta: { title: 'Social media links' },
      component: () =>
        import(/* webpackChunkName: "social" */ './views/Social.vue')
    },
    {
      path: '/dashboard/options',
      meta: { title: 'Signature options' },
      component: () =>
        import(/* webpackChunkName: "options" */ './views/Options.vue')
    },
    {
      path: '/dashboard/addons',
      meta: { title: 'Signature addons' },
      component: () =>
        import(/* webpackChunkName: "addons" */ './views/Addons.vue')
    },
    {
      path: '/dashboard/projects',
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
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () =>
        import(/* webpackChunkName: "projects" */ './views/auth/Signin.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () =>
        import(/* webpackChunkName: "projects" */ './views/auth/ForgotPassword')
    },
    {
      path: '/set-new-password',
      name: 'set-new-password',
      component: () =>
        import(/* webpackChunkName: "projects" */ './views/auth/ForgotPassword')
    }

  ]
})
