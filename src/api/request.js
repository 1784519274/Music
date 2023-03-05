import axios from 'axios'

const request = axios.create({
  timeout: 5000
})

request.interceptors.request.use((config) => {
  return config
})

request.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res.data
    } else {
      console.log('请求异常，返回code不是200')
      return res.data
    }
  },
  () => {
    console.log('网络异常')
  }
)

export default request
