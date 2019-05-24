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

### 在Vue中封装Axios
#### 生成axios实例
```js
import axios from 'axios'

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

<back-to-top />