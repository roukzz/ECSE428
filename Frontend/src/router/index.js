import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Registration from '@/components/Registration'
import RecoverPassword from '@/components/RecoverPassword'
import ResetPassword from '@/components/ResetPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/Login"
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }, {
      path: '/Signup',
      name: 'Registration',
      component: Registration
    }, {
      path: '/Home',
      name: 'Home',
      component: Home
    }, {
      path: '/RecoverPassword',
      name: 'Recover Password',
      component: RecoverPassword
    }, {
      path: '/resetPassword/:resetLink',
      name: 'Reset Password',
      component: ResetPassword
    }
  ]
})
