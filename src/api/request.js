import axios from 'axios'

const request = axios.create({
  timeout: 5000
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res.data
  } else {
    return console.log('请求失败')
  }
})

export default request
