import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('@/views/menu1'),
      children: [
        //驾驶舱
        {
          path: '/jsc',
          name: '驾驶舱',
          iconClass: 'heat-map',
          children: [
            {
              path: 'jsc1',
              name: '板块驾驶舱',
              component: () => import('@/views/page/JSC/jsc1')
            },
            {
              path: '/jsc/menuBk',
              name: '板块驾驶舱',
              component: () => import('@/views/page/JSC/three-level-chart/menuBk')
            },
            {
              path: '/threeMenuIndex',
              name: '子公司驾驶舱',
              component: () => import('@/views/page/JSC/three-level-chart/menuThree')
            },
          ]
        },
        {
          path: '/cw',
          name: '财务数据管理',
          iconClass: 'stock',
          children: [
            {
              path: '/cwsjgl',
              name: '财务列表',
              component: () => import('@/views/page/CW/cwsjgl')
            },
            {
              path: '/cwsclb',
              name: '财务数据上传记录',
              component: () => import('@/views/page/CW/cwsclb')
            }
          ]
        },
        {
          path: '/zlzc',
          name: '租赁资产管理',
          iconClass: 'credit-card',
          children: [
            {
              path: '/clzcgl',
              name: '公司资产管理',
              component: () => import('@/views/page/ZC/clzcgl')
            },
            {
              path: '/zcsc',
              name: '资产数据上传记录',
              component: () => import('@/views/page/ZC/zcsc')
            }
          ]
        },
        {
          path: '/rs',
          name: '人事数据管理',
          iconClass: 'team',
          children: [
            {
              path: '/ygsjgl',
              name: '公司员工数据',
              component: () => import('@/views/page/YG/ygsjgl')
            },
            {
              path: '/ygsjjl',
              name: '员工数据记录',
              component: () => import('@/views/page/YG/ygsjjl')
            }
          ]
        },
        {
          path: '/dj',
          name: '党建数据管理',
          iconClass: 'user',
          children: [
            {
              path: '/djsjgl',
              name: '公司党组织数据',
              component: () => import('@/views/page/DY/djsjgl')
            },
            {
              path: '/djDY',
              name: '公司党员数据',
              component: () => import('@/views/page/DY/djRY')
            },
            {
              path: '/dzzSJ',
              name: '党组织数据记录',
              component: () => import('@/views/page/DY/dzzSJ')
            },
            {
              path: '/dySJ',
              name: '党员数据记录',
              component: () => import('@/views/page/DY/dySJ')
            }
          ]
        },
        {
          path: '/fw',
          name: '服务项目管理',
          iconClass: 'database',
          children: [
            {
              path: '/fwxmgl',
              name: '公司服务项目数据',
              component: () => import('@/views/page/FW/fwxmgl')
            },
            {
              path: '/fwxmjl',
              name: '服务项目数据记录',
              component: () => import('@/views/page/FW/fwxmjl')
            }
          ]
        },
        // 一级人事子菜单
        {
          path: '/rs-primaryIndex',
          name: 'rs-primaryIndex',
          show: false,
          component: () => import('@/views/page/JSC/components/primary-chart/rs-index')
        },
        // 一级财务子菜单
        {
          path: '/cw-primaryIndex',
          name: 'cw-primaryIndex',
          show: false,
          component: () => import('@/views/page/JSC/components/primary-chart/cw-index')
        },
        // 一级物业子菜单
        {
          path: '/wy-primaryIndex',
          name: 'wy-primaryIndex',
          show: false,
          component: () => import('@/views/page/JSC/components/primary-chart/znzc-index')
        },
        // 一级党建子菜单
        {
          path: '/dj-primaryIndex',
          name: 'dj-primaryIndex',
          show: false,
          component: () => import('@/views/page/JSC/components/primary-chart/dj-index')
        },
        // 一级服务子菜单
        {
          path: '/fw-primaryIndex',
          name: 'fw-primaryIndex',
          show: false,
          component: () => import('@/views/page/JSC/components/primary-chart/fw-index')
        },
        // 二级财务子菜单
        {
          path: '/secondaryIndex',
          name: 'secondaryIndex',
          show: false,
          component: () => import('@/views/page/JSC/secondary-chart/index')
        },
        // 三级财务子菜单
        {
          path: '/threeIndex',
          name: 'threeIndex',
          show: false,
          component: () => import('@/views/page/JSC/three-level-chart/index')
        }
      ]
    }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
