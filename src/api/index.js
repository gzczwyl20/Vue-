import axios from 'axios'
// 配置基准路径
const baseURL = 'http://localhost:8888/api/private/v1/'
// 设置默认基准路径
axios.defaults.baseURL = baseURL

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发送之前做某事
  let token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }
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

// 用户添加接口
export const addUser = (params) => {
  return axios.post('users', params).then(res => {
    return res.data
  })
}

// 根据id查询数据
export const getUserById = (id) => {
  return axios.get(`users/${id}`).then(res => {
    return res.data
  })
}
// 编辑用户信息
export const editUser = (id, params) => {
  return axios.put(`users/${id}`, params).then(res => {
    return res.data
  })
}

// 删除用户信息
export const deleteUser = (id) => {
  return axios.delete(`users/${id}`).then(res => {
    return res.data
  })
}

// 修改用户状态
export const updateUser = (pa) => {
  return axios.put(`users/${pa.id}/state/${pa.status}`).then(res => {
    return res.data
  })
}

// 获取角色列表
export const getRolesList = () => {
  return axios.get('roles').then(res => {
    return res.data
  })
}

// 分配用户角色
export const allotRole = (pa) => {
  return axios.put(`users/${pa.id}/role`, {rid: pa.rid}).then(res => {
    return res.data
  })
}
