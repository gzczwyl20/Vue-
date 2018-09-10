// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/Store.js'
import VueQuillEditor from 'vue-quill-editor'
import VueAMap from 'vue-amap'
import ECharts from 'vue-echarts'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.component('chart', ECharts)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '6a204f2b675f32f8849ec4b6b7c21e5c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})

Vue.use(VueAMap)
Vue.use(VueQuillEditor)
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
  store,
  components: { App },
  template: '<App/>'
})
