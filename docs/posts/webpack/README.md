# webpack

## 认识webpack和基本配置含义

* 安装
  npm i -g webpack-cli
  
  webpack init -y

* webpack.config.js (最简单的配置)

```js
module.exports = {
  mode : '', // none | development | production
  entry: '', // 单入口---SPA | 多入口---MPA 多入口的话是一个对象
  output: { // 输出 配置必须是一个对象
    path:'', // 文件路径， 推荐使用 path.resolve(__dirname,'')
    filename:'' // 文件名
  }
}
```

说一下mode的三个选项

1. none --- 不优化，是什么样还是什么样
2. development --- 开发环境，会输出一些调试信息，也设置了process.env.NODE_ENV
3. production --- 最高级别的优化，启用压缩，忽略错误

## package.json的版本相关的问题

版本形式可以简化为：`x.y.z`

`x`--->重大模块或者设计的重构和变更，会升级x版本号

`y`--->一些大的版本更改，通常是一些API的变更

`z`--->一些小的调整或者bug变更

那`^`和`~`等是什么意思呢？

前面什么都没有意思就很好了解了，就是指定在某一个版本

`^`--->会更新大版本下的所有小版本，eg:^1.10.1会自动更新到1.10.2，也可以自动更新到1.11.1但是不可以更新到2.y.z

`~`--->会更新最小的所有版本，eg:~1.10.1会自动更新到1.10.2，但是不会自动更新到1.11.1

`>`、`>=`、`<`、`<=`--->这个就是我们直接理解的意思了

[webpack官网](https://www.webpackjs.com/)

## 有一点疑问

为什么每次在项目下`npm i`之后`package-lock.json`都会发生变化



<gitask />