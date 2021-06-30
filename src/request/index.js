import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/request/token'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})

//request拦截器
service.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers['Bearer'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    //全局统一处理 Session超时
    if (response.headers['session_time_out'] == 'timeout') {
      store.dispatch('fedLogOut')
    }

    const res = response.data;
    return response.data;
  },
  error => {//如果后面有覆盖Message，则这里的Message不会生效。
    const data = error.response.data.detail
    Message({
      type: 'error',
      showClose: true,
      message: data.msg
    })
    return Promise.reject(error.response)//默认情况下后面不再需要处理大部分报错信息.
  })

export default service
