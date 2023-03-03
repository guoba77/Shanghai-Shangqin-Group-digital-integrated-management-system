// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router, { asyncRoutes } from '@/router/index'
import Antd from 'ant-design-vue'
import store from './store/index'
import 'ant-design-vue/dist/antd.css'
import "lib-flexible"
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import VideoPlayer from 'vue-video-player'
import axios from 'axios'
import dataV from '@jiaminghi/data-view'
import { hasBtn } from '@/utils/per'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.prototype.hasBtn = hasBtn
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(dataV)
Vue.use(Antd)
// Vue.prototype.baseUrl = 'http://192.168.1.106:8081/renren-fast/'
Vue.prototype.baseUrl = 'http://180.153.245.109:8081/'

// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('token')) {
//     if (to.path !== '/') {
//       // next('/')
//     } next()
//   } next()
// })
router.beforeEach(async (to, from, next) => {
  if (localStorage.getItem('token')) {
    next()
    // 拿用户信息  .,
    // if (store.state.user === '') {
    //   const roles = await store.dispatch('getUserAction')
    // }
    // if (store.getters.menus) {
    // }
    const roles = await store.dispatch('getUserAction')
    if (roles.data.code === 0) {
      if (store.getters.menus.length > 0) {
        const selectRoutes = asyncRoutes
        // 筛选权限路由
        const res = asyncRoutes.children.filter((item) => {
          return store.getters.menus.includes(item.name)
        })
        selectRoutes.children = res
        next({ ...to, replace: true })
        router.addRoutes([selectRoutes, { path: '*', redirect: '/404' }])
      }
    }
  } else {
    next()
    if (to.path === '/login') {
      next()
    } else {
      next('/')
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
