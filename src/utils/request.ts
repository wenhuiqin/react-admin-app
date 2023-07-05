import axios,{AxiosRequestConfig} from "axios";
import store2 from 'store2'

const isDev = process.env.NODE_ENV === 'development'

const instance = axios.create({
  baseURL: isDev? 'http://121.89.205.189:3000/admin':'http://121.89.205.189:3000/admin'
})

instance.defaults.timeout = 60000;

instance.interceptors.request.use((config)=>{
  config.headers.token = store2.get('token') || ''
  return config
},(error)=>{
  return Promise.reject(error)
})

instance.interceptors.response.use((response)=>{
  // 对token进行判断
  if(response.data.code === '10119'){
    store2.remove('token')
    store2.remove('adminname')
    window.location.href='/#/login'
  }
  return response
},(error)=>{
  return Promise.reject(error)
})

// 自定义各种常用的restful api的请求
// axios.get('url', { params: { key: value } })
// axios.post('url', { key: value })
// axios({ url: '', method: 'GET', params: { key: value }})
// axios({ url: '', method: 'POST', data: { key: value }})
export default function request( config: AxiosRequestConfig ) {
  // 接口请求 必须参数  url method  data  headers
  const { url = '', method = 'GET', data = {}, headers = {} } = config

  // 区分不同的数据请求 为了执行时传入的数据请求方式统一性 GEt GeT get GET
  switch (method.toUpperCase()) {
    case 'GET':
      return instance.get(url, { params: data })

    case 'POST': 
      // 可能数据请求方式 表单提交  文件提交   默认json
      // 表单提交
      if (headers['content-type'] === 'application/x-www-form-url-encoded') {
        // 转换参数  URLSearchParams  / 第三方库 qs
        const p = new URLSearchParams()
        for (const key in data) {
          p.append(key, data[key])
        }
        return instance.post(url, p, { headers })
      }

      // 文件提交
      if (headers['content-type'] === 'multipart/form-data') {
        const p = new FormData()
        for (const key in data) {
          p.append(key, data[key])
        }
        return instance.post(url, p, { headers })
      }

      // 默认 application/json
      return instance.post(url, data)
    
    // 修改数据 - 所有的数据的更新
    case 'PUT':
      return instance.put(url, data)

    // 删除数据
    case 'DELETE': 
      return instance.delete(url, { data })  

    // 修改数据 - 部分的数据的更新
    case 'PATCH':
      return instance.patch(url, data)

    default:
      return instance(config)
  }
}