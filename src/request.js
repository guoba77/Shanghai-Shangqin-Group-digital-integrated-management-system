import axios from "axios"
import { getToken } from "./utils/token"
import { message } from "ant-design-vue"
import router from './router/index'
import store from "@/store/index"
import { resetRouter } from '@/router/index.js'
const service = axios.create({
    baseURL: 'http://180.153.245.109:8081/',
    // baseURL: 'http://192.168.2.37:8081/',
    timeout: 200000000
})
// 请求拦截器
service.interceptors.request.use((config) => {
    // 在发送前获取并设置token
    config.headers['token'] = getToken('token')
    return config
}, (error) => {
    return Promise.reject((error))
})
// 响应拦截器
let isToken = false
service.interceptors.response.use(response => {
    let { code, msg } = response.data
    if (code === 401) {
        if (!isToken) {
            isToken = true
            // 需要加一个确认按钮 提示
            message.error(msg)
            setTimeout(() => {
                resetRouter()
                localStorage.removeItem('token')
                store.dispatch('delUserAction')
                router.push('/')
            }, 100)
        }
    }
    // else if(code != 0){
    //     message.error(msg)
    // }
    return response
}, (error) => {
    return Promise.reject(error)
})

export default service
