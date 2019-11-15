import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // headers: { 'Access-Control-Allow-Origin': '*' },
  baseURL: 'http://127.0.0.1:8080/', // api的base_url
  timeout: 30000, // 请求超时时间
})
export default service