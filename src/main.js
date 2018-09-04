// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  // ...
  let token = localStorage.getItem('mytoken')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({name: 'login'})
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
