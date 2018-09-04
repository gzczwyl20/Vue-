import axios from 'axios'
// 配置基准路径
const baseURL = 'http://localhost:8888/api/private/v1/'
// 设置默认基准路径
axios.defaults.baseURL = baseURL

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发送之前做某事
  let token = localStorage.getItem('mytoken')
  config.headers['Authorization'] = token
  return config
}, function (error) {
  // 用请求错误做某事
  return Promise.reject(error)
})
// 登录
export const login = (params) => {
  return axios.post('login', params)
    .then((res) => {
      return res.data
    })
}

// 获取所有数据
export const getUserDate = (params) => {
  return axios.get('users', {
    params: params
  }).then(res => {
    return res.data
  })
}
