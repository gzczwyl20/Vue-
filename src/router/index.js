import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/views/user/User.vue'
import Rights from '@/views/right/Right.vue'
import Roles from '@/views/right/Role.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'users',
          name: 'users',
          component: Users
        },
        {
          path: 'rights',
          name: 'rights',
          component: Rights
        },
        {
          path: 'roles',
          name: 'roles',
          component: Roles
        }
      ]
    }
  ]
})
