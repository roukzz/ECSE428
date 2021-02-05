import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/pages/Hello'
import Registration from '@/components/Registration'
import Login from '@/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path: '/Signup',
      name: 'Registration',
      component: Registration
    },{
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
