import axios from 'axios'
import router from './router.js'
import qs from 'qs'
import { Toast } from 'vant';
import store from './store'


const httpInstance = axios.create({
	baseURL: SERVER_PATH,
    responseType: 'json',
    timeout: 1000 * 10,
    params: {},
    data: {},
})

function responseErrorHandler(error) {
    let text = '未知错误'
    const response = JSON.parse(JSON.stringify(error))
    if (response.status) {
        const {msg, code} = response.data
        if (+code == 401) {
            text = '登录失效，重新登录'
            token('token', null)
            router.push({name: 'Login'})
        } else {
            text = msg
        }
    } else {
		text = '网络异常 '
    }
	//请求失败
	Toast.fail(text)
}
/**
 * Axios 请求拦截
 */
httpInstance.interceptors.request.use((config) => {
    const configs = config
    const token = localStorage.getItem("token") || ""
	if (token) config.headers.token = token
	config.headers.common['Accept-Language'] = 'zh-CN'
    if(!config.noLoading) {
		// store.commit("setLoading",1)
	}
    return configs
}, error => Promise.reject(error))
/**
 * Axios 响应拦截
 */
httpInstance.interceptors.response.use((response) => {
	store.commit("setLoading",0)
    if(response.data.code !== 200) {
        if(response.data.code === 40008) {
            localStorage.clear()
            router.replace('/login')
        }
        responseErrorHandler(response)
        return Promise.reject(response.data)
    }
    return response.data
}, (error) => {
	console.error(error)
    store.commit("setLoading",0)
    responseErrorHandler(error)
    return Promise.reject(error)
})

const $http = {
    get: (url, params = null, config = {}) => {
        const normalizedParams = params
        return httpInstance.get(url, {
            params: normalizedParams,
            ...config,
        })
    },
    post: (url, data = null, config = {}) => {
        const p = httpInstance.post(url, data, config)
        return p
	},
	postFormData: (url, data = null, config = {}) => {
		data = qs.stringify(data)
        const p = httpInstance.post(url, data, config)
        return p
	}
}

export { $http }

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', {
            value: $http,
            writable: false,
        })
    },
}
