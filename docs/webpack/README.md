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
  <back-to-top />