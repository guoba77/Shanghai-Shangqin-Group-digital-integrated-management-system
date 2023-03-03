import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
Vue.use(Router)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
  return routerPush.call(this, location).catch(err => { })
}
export const asyncRoutes = {
  path: '/menu',
  name: 'menu',
  component: () => import('@/views/menu'),
  children: [
    // 权限、
    {
      path: '/permission',
      name: '/permission',
      show: true,
      meta: { title: '用户管理', butShow: false },
      component: () => import('@/views/page/PER/index.vue')
    },
    // 驾驶舱
    {
      path: '/jsc',
      name: '/jsc',
      show: true,
      meta: { title: '上海上勤集团数字一体化管理系统', butShow: false },
      component: () => import('@/views/page/JSC/jsc')
    },
    // 财务列表
    {
      path: '/FwDetail',
      name: '/FwDetail',
      show: true,
      meta: { title: '集团服务列表', butShow: true },
      component: () => import('@/views/page/FW/FwDetail.vue')
    },
    {
      path: '/cwsjgl',
      name: '/cwsjgl',
      show: true,
      meta: { title: '公司财务数据', butShow: false },
      component: () => import('@/views/page/CW/cwsjgl')
    },
    {
      path: '/cwsclb',
      name: '/cwsclb',
      show: true,
      meta: { title: '财务数据上传列表', butShow: false },
      component: () => import('@/views/page/CW/cwsclb')
    },
    // 存量资产
    {
      path: '/clzcgl',
      name: '/clzcgl',
      show: true,
      meta: { title: '租赁资产数据', butShow: false },
      component: () => import('@/views/page/ZC/clzcgl')
    },
    {
      path: '/zcsc',
      name: '/zcsc',
      show: true,
      meta: { title: '区域统计列表', butShow: false },
      component: () => import('@/views/page/ZC/zcsc')
    },
    //员工数据管理
    {
      path: '/ygsjgl',
      name: '/ygsjgl',
      show: true,
      meta: { title: '人员数据管理', butShow: false },
      component: () => import('@/views/page/YG/ygsjgl')
    },
    {
      path: '/ygsjjl',
      name: '/ygsjjl',
      show: true,
      meta: { title: '人事子公司数据列表', butShow: false },
      component: () => import('@/views/page/YG/ygsjjl')
    },
    //党建
    {
      path: '/djDY',
      name: '/djDY',
      show: true,
      meta: { title: '党员数据管理', butShow: false },
      component: () => import('@/views/page/DY/djRY')
    },
    // 暂时没用到-----------
    {
      path: '/djsjgl',
      name: '/djsjgl',
      show: true,
      meta: { title: '党员发展情况列表', butShow: false },
      component: () => import('@/views/page/DY/djsjgl')
    },
    {
      path: '/dzzSJ',
      name: '/dzzSJ',
      show: true,
      meta: { butShow: false },
      component: () => import('@/views/page/DY/dzzSJ')
    },
    // -------
    //服务项目管理
    {
      path: '/fwxmgl',
      name: '/fwxmgl',
      show: true,
      meta: { title: '服务点数据管理', butShow: false },
      component: () => import('@/views/page/FW/fwxmgl')
    },
    {
      path: '/fwxmjl',
      name: '/fwxmjl',
      show: true,
      meta: { title: '服务点数据记录', butShow: false },
      component: () => import('@/views/page/FW/fwxmjl')
    },
    // 其他 营收
    {
      path: '/Revenue',
      name: '/Revenue',
      meta: { title: '营收数据管理', butShow: false },
      component: () => import('@/views/page/ZC/Revenue.vue')
    },
    // 一级人事子菜单
    {
      path: '/rs-primaryIndex',
      name: '/rs-primaryIndex',
      meta: { title: '集团人事指标', butShow: true },
      component: () => import('@/views/page/JSC/components/primary-chart/rs-index')
    },
    // 一级财务子菜单
    {
      path: '/cw-primaryIndex',
      name: '/cw-primaryIndex',
      meta: { title: '集团财务指标', butShow: true },
      component: () => import('@/views/page/JSC/components/primary-chart/cw-index')
    },
    // 一级物业子菜单
    {
      path: '/wy-primaryIndex',
      name: '/wy-primaryIndex',
      meta: { title: '集团租赁资产指标', butShow: true },
      component: () => import('@/views/page/JSC/components/primary-chart/znzc-index')
    },
    // 一级党建子菜单
    {
      path: '/dj-primaryIndex',
      name: '/dj-primaryIndex',
      meta: { title: '集团党建指标', butShow: true },
      // component: () => import('@/views/page/JSC/components/primary-chart/dj-index')
      component: () => import('@/views/page/JSC/components/primary-chart/newDj-index')
    },
    // 一级服务子菜单
    {
      path: '/fw-primaryIndex',
      name: '/fw-primaryIndex',
      meta: { title: '集团服务指标', butShow: true },
      component: () => import('@/views/page/JSC/components/primary-chart/fw-index')
    },
    // 二级财务子菜单
    {
      path: '/secondaryIndex',
      name: '/secondaryIndex',
      meta: { butShow: true },
      component: () => import('@/views/page/JSC/secondary-chart/index')
    },
    // 三级财务子菜单
    {
      path: '/threeIndex',
      name: '/threeIndex',
      meta: { butShow: true },
      component: () => import('@/views/page/JSC/three-level-chart/index')
    },
    // 三级总览子菜单
    {
      path: '/threeMenuIndex',
      name: '/threeMenuIndex',
      meta: { title: '', butShow: false, selShow: true },
      component: () => import('@/views/page/JSC/three-level-chart/menuThree')
    },
    // 子公司数据管理
    {
      path: '/Subsidiary',
      name: '/Subsidiary',
      meta: { title: '子公司数据管理列表', butShow: false },
      component: () => import('@/views/page/other/Subsidiary.vue')
    },
    //子公司其他车辆数据
    {
      path: '/SubsidiaryCar',
      name: '/SubsidiaryCar',
      meta: { title: '子公司车辆数据列表', butShow: false },
      component: () => import('@/views/page/other/SubsidiaryCar.vue')
    },
    // 子公司房间数据
    {
      path: '/SubHouse',
      name: '/SubHouse',
      meta: { title: '子公司房间数据列表', butShow: false },
      component: () => import('@/views/page/other/SubHouse.vue')
    },
    {
      path: '/SubHouseRate',
      name: '/SubHouseRate',
      show: true,
      meta: { title: '子公司房间出租率列表', butShow: true },
      component: () => import('@/views/page/other/SubHouseRate.vue')
    }
    // 二级板块子菜单
    // {
    //   path: '/menuBk',
    //   name: 'menuBk',
    //   component: () => import('@/views/page/JSC/three-level-chart/menuBk')
    // },
  ]
}
const router = new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    // // 权限、
    // {
    //   path: '/menu',
    //   name: 'menu',
    //   component: () => import('@/views/menu'),
    //   children: [
    //     // 财务列表
    //     {
    //       path: '/SubHouseRate',
    //       name: '/SubHouseRate',
    //       show: true,
    //       meta: { title: '子公司房间出租率列表', butShow: true },
    //       component: () => import('@/views/page/other/SubHouseRate.vue')
    //     },
    //   ]
    // },
    {
      path: '/404',
      name: '/404',
      component: () => import('@/views/404/404.vue'),
    },
    {
      path: '/Department',
      name: '/Department',
      show: true,
      component: () => import('@/views/Department/index.vue')
    },
    {
      path: '/Synopsis',
      name: '/Synopsis',
      show: true,
      component: () => import('@/views/Synopsis/index.vue')
    },
    {
      path: '/login',
      name: '/login',
      show: true,
      component: () => import('@/views/Login/index')
    }
  ]
})
export function resetRouter () {
  const newRouter = router
  router.matcher = newRouter.matcher // reset router
}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router