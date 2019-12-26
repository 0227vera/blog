# 视频学习关键点记录

这一部分的学习，只要是想先学习一些基础的东西，能够简单的完成一个网站

## http

使用http起一个服务

```js
const http = require('http');

const server = http.createServer((req, res) => {});
server.listen(8080);
```

## fs

全称：File System

```js
const fs = require('fs');
fs.readFile('地址', (err, data) => {
  if (err) {new Error err}
  console.log(data)
})
fs.writeFile('地址', '内容', (err, data) => {
  if (err) new Error(err)
})
```

## get请求的数据处理

```js
const urlLib = require('url');
const http = require('http');

const server = http.createServer((req, res) => {
  const obj = urlLib.parse(req.url, true)
  const url = obj.pathname
  const GET = obj.query
});
server.listen(8080);
```

## post请求的数据处理

```js
const querystring = require('querystring');
const http = require('http');

const server = http.createServer((req, res) => {
  let str = ''
  req.on('data', data => {
    str += data
  })
  req.on('end', () => {
    const POST = querystring.parse(str)
  })
});
server.listen(8080);
```

## 文件上传的数据处理

multer：

```js
const express = require('express')

let server = express();
server.listen(8080);
const multer = require('multer');
const objMulter = multer({
  dest: './www/upload/',
  limit: 2 * 1024 * 1024 // 文件大小
});
server.use(objMulter.any()) // 可以接收任何类型，任何数量的
server.use('/upload', (req, res) => {
  console.log(req.files)
  // 然后用fs.rename()重命名把文件类型加上
})
```

## 模块化

1. 系统模块：
http、
querystring、
url、
Crypo（加密）、
Events（事件）、
OS（操作系统的相关信息）、
Path（路径相关）、
Net（网络操作）、
Stream（流操作）、
Timers（定时器）、
ZLIB（压缩）
等
2. 自己写模块：（CMD规范）

```js
// 抽取的模块 module.js
module.exports = () => {
  var name = 'salvatore';
  this.changeName = changeName => {
      name = changeName;
  };
  this.getName = () => {
      return name
  }
  this.setName = newname => {
      name = newname;
  }
  return this
}
// 使用模块
const module = require('./module.js')
```

## express框架

```js
const express = require('express');
const server = express()
// post数据使用，中间件
const bodyParser = require('body-parser') // 只能解决数据类的东西
server.use(bodyParser.urlencoded({
  extended: false,// 扩展,true--->启用扩展模式
  limit: 2 * 1024 // 限制2M，默认是100K
}))
server.use('路径', (req, res, next) => { // use = post or get

  // get数据
  const get = req.query
  // post数据 body-parser
  const post = req.body
  req.test = 3
  next()
})
server.use('和上面相同的路劲', (req, res, next) => {
  console.log('和上面的形成链式操作', res.test)  // 3
  res.send('aaa')
  res.end()
})
server.listen(8080)
```

## 中间键

express-static

```js
const static = require('express-static');
const express = require('express');
const server = express()
server.listen(8080)
server.use(static('./www'))
```

## cookie、session以及加签名的问题的问题

```js
const secret = 'aghahgaljdsfhajgha'
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const express = require('express');
const server = express()
const keys = ['qqq','www','eee'] // session的密钥
server.use(cookieParser(secret))
server.use(cookieSession({
  keys,
  name: 'sess', // session的名字
  maxAge: 20 * 60 * 1000 // 过期时间

})) // 放在cookie后面
server.use('路径', (req, res, next) => {
  // cookie的发送
  // req.secret = secret // cookie的一个密钥
  res.cookie('key','value',{
    path: '/aaa',
    maxAge: 30 * 24 * 60 * 60 * 1000, // ms为单位
    signed: true // 添加签名
  })
  // cookie的读取
  // 签名的cookies
  console.log('签名cookies--->', res.signedCookies)

  // 没有签名的cookies
  console.log('没有签名cookies--->', req.cookies) // 可以访问底下的，不能向上访问

  // 删除cookie，某一条cookie
  res.clear('key')

  // session 的读取
  console.log(req.session)
  // 删除session
  delete req.session // delete删除的是服务器上面的东西
  res.send('ok')
  res.end()
})

server.listen(8080)
```

## route路由的问题

```js
// server.js
const express = require('express')
const userRouter = require('./userRouter')
let server = express()
server.listen(8080)
server.use('/user', userRouter)
```

```js
// userRouter.js
const express = require('express')
module.exports = () => {
  const router = express.Router()
  router.get('/login', (req, res) => {
    // 做登陆的操作
  })
  router.get('/register', (req, res) => {
    // 做注册的操作
  })
  return router
}
```

## SQL的问题

```js
const mysql = require('mysql');
let db = mysql.createConnection({ // 连接
  host:'localhost',
  port:'3306',
  user:'root',
  password:'root',
  database:'newtest'
});
// mysql.createPool() 连接池
// 2，查询 (curd) 非常典型的异步操作，肯定会有回调函数
db.query('SELECT * FROM `user_table`;', (err, data) => {
  if (err) {
    throw err
  } else {
    console.log('--------->', JSON.stringify(data))
  }
});
```

[资料跳转](https://github.com/0227vera/node-study/tree/master/MySql)

## 学习完成的项目地址