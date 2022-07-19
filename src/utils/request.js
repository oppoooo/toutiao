import axios from 'axios'
import store from '@/store/index'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 拦截器
// 请求拦截器
// 每次请求都会执行的函数
request.interceptors.request.use(
  (config) => {
    // 每次请求都会自动发送
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
