import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Users from '@/views/user/User.vue'
import Rights from '@/views/right/Right.vue'
import Roles from '@/views/right/Role.vue'
import Goods from '@/views/goods/Goods.vue'
import Params from '@/views/goods/Params.vue'
import Categories from '@/views/goods/Categories.vue'
import GoodsList from '@/views/goods/GoodsList.vue'
import GoodsAdd from '@/views/goods/GoodsAdd.vue'
import Reports from '@/views/reports/Reports.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [{
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
    },
    {
      path: 'goods',
      name: 'goods',
      component: Goods,
      redirect: {name: 'goodsList'},
      children: [
        {
          path: 'goodsList',
          name: 'goodsList',
          component: GoodsList
        },
        {
          path: 'goodsAdd',
          name: 'goodsAdd',
          component: GoodsAdd
        }
      ]
    },
    {
      path: 'params',
      name: 'params',
      component: Params
    },
    {
      path: 'categories',
      name: 'categories',
      component: Categories
    },
    {
      path: 'reports',
      name: 'reports',
      component: Reports
    }
    ]
  }
  ]
})
