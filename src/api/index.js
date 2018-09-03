import axios from 'axios'
// 配置基准路径
const baseURL = 'http://localhost:8888/api/private/v1/'
// 设置默认基准路径
axios.defaults.baseURL = baseURL

// 登录
export const login = (params) => {
  return axios.post('login', params)
    .then((res) => {
      return res.data
    })
}
