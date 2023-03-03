import Vue from "vue"
import Vuex from 'vuex'
import { getUserInfo } from '@/api/api'
Vue.use(Vuex)
// 定义对象属性
const state = {
    count: 0,
    switchShow: true,
    menuShow: true,
    path: '',
    name: '',
    dxName: '',
    fwObj: {},
    erName: '',
    zlzcName: '',
    jztObj: {},
    tagName: '',
    bkObj: {},
    zgsObj: {},
    butShow: false,
    bkBut: '',
    zgsBut: localStorage.getItem('zgsBut') || '',
    token: '',
    bkSelValue: '',
    fgsSelValue: localStorage.getItem('fgsSelValue') || '',
    SaveCompanyId: localStorage.getItem('SaveCompanyId') || '',
    mapVal: '',
    user: localStorage.getItem('user') || {},
}

// mutations里面放置的是我们操作state对象属性的方法
const mutations = {
    // 删除用户信息
    delUser (state) {
        state.user = ''
    },
    // 储存用户信息
    setUser (state, user) {
        state.user = user
    },
    // 清空用户信息
    delUser (state) {
        state.user = {}
    },
    // count增加方法
    countAdd (state, n = 0) {
        return (state.count += n)
    },
    // count减少方法
    countReduce (state, n = 0) {
        return (state.count -= n)
    },
    // 修改开关属性的方法
    switchKG (state, n) {
        return (state.switchShow = n)
    },
    // 监测左侧菜单的方法
    menuKG (state, n) {
        return (state.menuShow = n)
    },
    // 监测路由的方法
    rouPath (state, n) {
        return (state.path = n)
    },
    // 分公司名字
    fgsName (state, n) {
        return (state.name = n)
    },
    // 板块人事党课财务选型
    dxName (state, n) {
        return (state.dxName = n)
    },
    // 服务点数据合计
    fwObj (state, n) {
        return (state.fwObj = n)
    },
    // 二级name
    erName (state, n) {
        return (state.erName = n)
    },
    // 租赁资产名字
    zlzcName (state, n) {
        return (state.zlzcName = n)
    },
    // 金字塔悬浮数据
    jztObj (state, n) {
        return (state.jztObj = n)
    },
    // 驾驶舱点击标签name
    tagName (state, n) {
        return (state.tagName = n)
    },
    // 板块驾驶舱模拟数据
    bkObj (state, n) {
        return (state.bkObj = n)
    },
    // 子公司驾驶舱模拟数据
    zgsObj (state, n) {
        return (state.zgsObj = n)
    },
    // 返回按钮监控
    butShow (state, n) {
        return (state.butShow = n)
    },
    // 板块单选框
    bkBut (state, n) {
        return (state.bkBut = n)
    },
    // 子公司单选框
    zgsBut (state, n) {
        localStorage.setItem('zgsBut', n)
        return (state.zgsBut = n)
    },
    // token
    token (state, n) {
        return (state.token = n)
    },
    bkSelValue (state, n) {
        return (state.bkSelValue = n)
    },
    fgsSelValue (state, n) {
        localStorage.setItem('fgsSelValue', n)
        return (state.fgsSelValue = n)
    },
    SaveCompanyId (state, n) {
        localStorage.setItem('SaveCompanyId', n)
        return (state.SaveCompanyId = n)
    },
    onMapVal (state, n) {
        return (state.mapVal = n)
    }
}

// actions异步操作
const actions = {
    // 删除用户信息
    delUserAction ({ commit }) {
        localStorage.removeItem('user')
        localStorage.removeItem('fgsSelValue')
        localStorage.removeItem('zgsBut')
        localStorage.removeItem('SaveCompanyId')
        commit('delUser')
    },
    async getUserAction ({ commit, state }) {
        // 1. 获取登录人信息
        const res = await getUserInfo()
        if (res.data.code === 0) {
            localStorage.setItem('user', JSON.stringify(res.data.data))
            commit('setUser', { ...res.data.data })
            if (state.SaveCompanyId === '') {
                commit('SaveCompanyId', res.data.data.companyId)
            }
        }

        // 返回数据=》外边调用，可以通过.then或者await获取
        // return 的值相当于resolve(值)
        return res
    },
    actionCountAdd (context, n = 0) {
        return context.commit('countAdd', n)
    },
    actionsCountRenduce ({ commit }, n = 0) {
        return commit('countReduce', n)
    }
}

// getters获取state
const getters = {
    getterCount (state) {
        return (state.count += 100)
    },
    menus: state => {
        return state.user.menus
    },
    directory: state => {
        return state.user.directory
    },
    btn: state => {
        return state.user.buts
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
