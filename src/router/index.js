import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/views/login'
import Register from '@/views/register'
import ChildInfo from '@/views/childInfo'
import ChildList from '@/views/childList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/childInfo',
      name: 'ChildInfo',
      component: ChildInfo
    },
    {
      path: '/childList',
      name: 'ChildList',
      component: ChildList
    }
  ]
})
