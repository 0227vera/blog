# Axios在Vue中的使用
#### Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中

### 安装
- 使用 npm:
```
npm install axios
```
- 使用 yarn
```
yarn add axios
```
- 使用 cdn:
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
### 在Vue中封装Axios (salvatore的写法)
```js
// (Axios.js)
import axios from 'axios'
import qs from 'qs'
const reg = /^[\u0391-\uFFE5%]+$/ // 中文的正则检验，如果在传输过程中遇到需要将中文转码传输
axios.interceptors.request.use(request => { // 这个会在每次调取axios的时候都会调用
  if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    request.data = qs.stringify(request.data, { allowDots: true }) // 将传入的json格式的参数序列化复制给data
  }
  if (request.method === 'get' && request.params) { // 当为get请求的时候 在参数中如果有需要中文转码的需求可以使用
    let params = request.params
    for (let key in params) {
      let value = params[key]
      if (typeof value === 'string') {
        let newS = ''
        for (let i = 0; i < value.length; i++) {
          if (reg.test(value.charAt(i))) {
            newS += encodeURI(value.charAt(i))
          } else {
            newS += value.charAt(i)
          }
        }
        params[key] = newS
      }
      params['nocha'] = new Date().getTime() // 加入时间戳，防止缓存
    }
  }
  return request
})
// 在AXios中 需要传入的必要的参数
window.CONTEXT = '/xxxx' // 接口的上下文
export function Axios ({ method, url, params, data, baseURL = window.CONTEXT }) { 
  // axios的baseUrl默认是主项目的上下文，但是如果有时候一个前端项目需要调取多个后端的接口文档的时候就需要传入不同的上下文
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      params,
      data,
      baseURL
    }).then(
      { data } => { data.success ? resolve(data) : reject(data) }, 
      err => { reject(err) }
      ).catch(
        err => { reject(err) }
      )
  })
}
// PS: Promise主要是用来封装异步请求的方法
```
### 统一的接口管理文件

```js
// (servers.js)
import { Axios } from './Axios'
export default {
  auth (params = {}) {
    return Axios({
      method: 'get',
      name: 'who接口',
      url: '/who.do',
      params
    })
  },
  A (params = {}) {
    return Axios({
      method: 'get',
      name: '主项目的get请求',
      url: '/xxxx',
      params
    })
  },
  B (data) {
    return Axios({
      method: 'post',
      name: '主项目的post请求',
      url: '/xxxx',
      data
    })

  },
  C (data) {
    return Axios({
      method: 'get',
      url: `/xxx/${xxx}/xxx`,
      name: '获取另外一个项目的接口',
      baseURL: '/xxx/xxx',
      data
    })
  }
}
```
#### 在项目中的使用

```js
import services from '@/services'
services.A({a:5,b:12}).then(res => {
  // do something
}).catch(err => console.log(err))

```
### 在Vue中封装Axios (老龙的写法)
#### 生成axios实例

```js
const $axios = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

/* request interceptor */
$axios.interceptors.request.use(config => {
  // do something
  return config
}, error => {
  console.warn(error)
  return Promise.reject(error)
})

/* response interceptor */
$axios.interceptors.response.use(res => {
  // do something
  if (Number(res.data.code) === 0) {
    return res.data
  } else {
    return false
  }
}, error => {
  return Promise.reject(error)
})

export default $axios
```

#### 将接口请求归类并写到统一的js文件
```js
export default $axios => {
  return {
    /* 登录 */
    login({ zoneCode, phoneNumber, password }) {
      return $axios.post('/api/v1/user/login', {
        zoneCode,
        phoneNumber,
        password
      })
    }
  }
}
```
![source code](../.vuepress/public/img/vue/api-use.png)

#### 新建Api类
```js
import $axios from './config'
import User from './user' /* 分文件引入api */

class Api {
  constructor($axios) {
    this.$axios = $axios || {}
  }
  get user() {
    const user = User(this.$axios)
    return {
      ...user
    }
  }
}

export default new Api($axios)
```
#### 全局注册
```js
import Vue from 'vue'
import api from '@/api'

export default Vue.use({
  install(_Vue) {
    if (!Vue.prototype.hasOwnProperty('$api')) {
      Object.defineProperty(_Vue.prototype, '$api', {
        get() {
          return api
        }
      })
    }
  }
})
```
#### 组件中使用
```js
this.$api.user.login()
```

### Axios配置文档
[Axios](https://www.kancloud.cn/yunye/axios/234845)

[](https://segmentfault.com/a/1190000019964344)

<gitask />

<back-to-top />