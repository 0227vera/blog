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

## 将react的技术栈集成到自己的脚手架中

由于之前的技术栈一直是vue，没有使用过整体的react的项目开，一直没有把react集成到脚手架中，原因：

1. 自己对react本身的不熟悉，不能做到即装即用
2. 没有实际的项目经验，无法指定具体的使用场景

目前已经使用react开发过一个PC端，一个移动端的项目了，先集成一版可以使用的，再之后使用过程中，如果有深的理解或者其他的收获，会持续优化版本

先集成h5的模版--使用技术栈： react + react-router-dom + mobx + js + less(module)

之后会集成PC端的模版--使用技术栈：react + react-router-dom + mobx + ts + styled-componentss

### 以下记录集成h5的模版开发过程中遇到的问题

1. 使用create-react-app初始化简单的模版，并删除所有不需要的文件

2. 修改webpack配置，其实是把原先的webpack相关配置全部重写了，让项目跑起来

3. 添加路由表、mobx文件和使用demo

4. 添加修改babel的配置

5. 修改eslint，说实话之前我自己对eslint的了解还是太少了，停留在寻找demo直接使用的阶段，趁这个机会刚好把eslint多了解一下，会在eslint下面有文档更新

6. 添加react文档（包括目录说明、使用技术栈以及理由等）

> [脚手架使用地址](https://www.npmjs.com/package/nic-cli)



<gitask />