# react脚手架

## 基础安装

1. `npm i create-react-app -g`

2. `npm run eject | yarn eject` (npm没什么好说的，如果使用yarn请先确定您的电脑上面安装了yarn)

3. `npm start | yarn start`

4. `npm run build` (建议用完脚手架之后看一下webpack的配置是怎么写的，再之后的开发中需要修改打包相关的信息的时候会快很多)

## 全家桶安装

## redux安装和使用

`npm i redux -S`

`npm i redux-thunk -S` 处理异步问题

`npm i react-redux -S` 根据接口来使用store

使用:

(一) Provider: 组件再应用的最外层,传入store即可,只用一次

(二) Connect:负责从外部获取组件需要的参数 `npm install babel-plugin-transform-decorators-legacy -D` 装饰器方便connect的书写,在package里面添加`"plugins": [ ["@babel/plugin-proposal-decorators", { "legacy": true }]]`(babel的配置)

## react-router4

`npm i react-router-dom -S`(dom和native相对应,web和H5)

> 这一块是我早之前收集的，现在应该很多都过时了，目前正在集成新的脚手架，使用的是`reacr + hooks + mobx + js/ts`

<gitask />