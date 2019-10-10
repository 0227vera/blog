# 使用脚手架初始化项目

前两天vv同学让我帮他初始化一个vue+element-ui+echarts的项目，我就直接简单的写一下这个地方的方法，希望对vv有帮助

## 1. 使用vue-cli2的初始化方法

1. `vue init webpack vue-name`然后根据自己的实际需要选择Y/N，一般情况下是可以一路回车的

如果全局没有vue和vue-name这两个包，请先全局安装这两个包 `npm i vue webpack -g`

如果当前的脚手架的版本是3，请先执行`npm install -g @vue/cli-init`拉取一下旧版本

2. 根据自己项目中的需求去修改build和config文件夹下面的相关文件，eg:proxy,打包的配置文件等

3. 我的习惯将axios再封装一层services，封装方法见详情[axios在vue中的使用](./axios.html)，这一步可以根据自己的习惯去完成，也可以不要

4. 然后根据相关官网可以添加相关的项目依赖，以及是全局引入还是按需引入

## 2. 使用vue-cli3的初始化方法

1. `vue create vue-name`第一项选择`Manually select features`之后就是按照自己的需求是填写

如果全局没有vue-vli3的话，请先`npm install -g @vue/cli`

2. 添加`vue.config.js`,用户配置的覆盖，和vue-cli2中的道理是一样的,附上一个我常做的一种覆盖

```js
const path = require('path')
const config = require('./package.json')
const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  publicPath: './',
  indexPath: path.resolve(__dirname, './dist/' + config.version + '/index.html'),
  outputDir: path.resolve(__dirname, './dist/' + config.version),
  assetsDir: 'static',
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 10000
      }))
    config.plugin('version')
      .use(require.resolve('copy-webpack-plugin'), [
        [{
          from: './version',
          to: '../'
        }]
      ])
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375,
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  devServer: {
    open: true,
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: require('./proxy')
  },
  // devtool: 'eval-source-map',
  transpileDependencies: [ 'vue-echarts', 'resize-detector' ]
}

```

3,4和第一种方法是一样的

<back-to-top />