# vue面试问题

## 1. 说下Vue数据双向绑定的原理

* vue内部通过Object.defineProperty方法属性拦截方式，把data对象里每个数据的读写转化成`getter/seeter`

## 2. 说说Vuex的作用以及应用场景

* vuex作用：
  * Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

* 应用场景：
  * 中大型当页面应用

## 3. 说说Vue组件的数据通信方式

* 父---->子
  * 父属性绑定，子props接收
* 父---->子孙
  * 父`provide:{}`，后代`inject:{}`
* 子---->父
  * 子`this.$emit('eventname')`，父`v-on:(@)eventname`，也可以通过ref直接调用自己的方法
* 兄弟组件
  * `eventBus`，注意需要`new vue()`，使用完成时候记得off，以免在之后的操作中多次提交

## 4. Vue的源码有看过吗？说说vuex工作原理

* vuex工作原理

## 5. 为什么说虚拟 dom会提高性能，解释一下它的工作原理

* 虚拟DOM的工作原理：通过JavaScript对象来描述真是的DOM
* 提高性能，当数据发生变化的时候，只需要局部刷新页面（这也是为什么尽量不要去操作dom的原因，真是的dom操作会引起模块元素的重排/重绘（重新渲染））

## 6. 请你详细介绍一些 package.json 里面的配置

* name：项目名称
* version：版本
* repository：仓库
* scripts：脚本运行
* dependencies：生产环境依赖（npm i -S (name)）
* devDependencied：开发环境依赖（npm i -D (name)）
* browserslist：js、css等兼容版本情况
* proxy：如果接口情况比较简单的时候可以直接在这个地方做代理

## 7. 为什么说Vue是一套渐进式框架

* 个人理解：
  * 视图模板引擎/组件系统/客户端路由/大规模状态管理/构建工具，这些功能都是非强制性的，用到什么时候引入什么，不一定需要全部整合
  * 没有多做职责之外的事情，绝非侵入式框架

## 8. vue-cli提供的几种脚手架模板有哪些，区别是什么

## 9. 计算属性的缓存和方法调用的区别

* 两者返回的最终的结果是完全一样的

* 如何使用这两者取决于是否需要缓存，在vue中如果某个属性需要多个属性大量的计算得到，建议使用计算属性，利用缓存（这样可以少的执行getter）

* 计算属性根据所依赖的属性自动执行，方法调用是必须要手动去处理调用的

## 10. axios、fetch与ajax有什么区别

* ajax；最早出现的发送后端请求技术，隶属于原始js中，核心使用XMLHttpRequest对象，多个请求之间如果有先后关系的话，就会出现回调地狱。（无法确定哪个先完成先返回）
* axios：axios不是原生JS的，需要进行安装，它不带可以在客户端使用，也可以在nodejs端使用。Axios也可以在请求和响应阶段进行拦截。同样也是基于`promise`对象的。
* fetch：fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住fetch不是ajax的进一步封装，而是原生js。Fetch函数就是原生js，没有使用XMLHttpRequest对象。当下的兼容性比较差

## 11. vue中央事件总线的使用

## 12. 你做过的Vue项目有哪些，用到了哪些核心知识点

1. 散装vue，没什么技术可讲的

2. 工作流H5:vue+vue-cli2+vue-router+vue-store+axios(Promise再次封装统一管理)+vux

3. 公文流转web端:vue+vue-cli2+vue-router+vue-store+axios(Promise再次封装统一管理)+element-ui

4. 公文流转H5:vue+vue-cli3+vue-router+vue-store+axios(Promise再次封装统一管理)+vant+keep-alive+mixins

## 13. 实现MVVM的思路分析

[详解](./vue中学习的问题.html#什么是mvvm)

## 14. 批量异步更新策略及 nextTick 原理

## 15. 说说Vue开发命令 npm run dev 输入后的执行过程

1. 运行`package.json`脚本
2. 运行`webpack.conf.js`,entry和output确定入口文件和出口文件，根据相关的module里面的loader解析不同的文件
3. vue中常用的loader（为什么需要loader？因为webpack只识别js）有：
  * bable-loader：处理js兼容问题的
  * uer-loader：处理图片和字体图标，通常会设置一个限制大小，转化base64
  * css-loader+less-loader/(node-loader+sass-loader)：处理css以及css预处理器的解析
  * vue-loader：解析`.vue`的文件
4. plugins：运行相关插件的功能
5. devServer：根据devServer里面的相关配置起一个服务

## 16. vue-cli中常用到的加载器有哪些

* 除了上面15上面说的之外，还有`postcss`以及配置
  * 使用下一代css语法
  * 自动补全浏览器浅醉
  * 自动将px-->rem
  * css代码压缩
* autoprefixer：补全兼容样式写法的前缀

## 17. Vue中如何利用 keep-alive 标签实现某个组件缓存功能

* keep-alive加在全局中的include可以为数组，<font color=red>注意name所指的是组件的name，不是在router里面的name</font>
* 全局路由钩子beforeEach+meta中设置的属性判断是否需要缓存
* 当个组件的路由钩子beforeRouteEnter/beforeRouteLeave判断什么情况需要缓存以及在缓存的时候什么时候需要刷新页面

[详解](./keep-alive.html)

## 18. pc端页面刷新时如何实现vuex缓存

* 使用localstorage？

## 19. vue-router如何响应 路由参数 的变化(动态组件传参)

[详解](./vue-router的两种mode.html#vue-router)

## 20. Vue 组件中 data 为什么必须是函数

* 因为如果是Object的话，Object是引用数据类型，引用它的组件其中一个改变，其他的组件的指都会发生改变,这个和`vue`的设计没有关系，是js本身的特性带来的，也就是说，如果某个组件只供使用一次也可以使用`Object`，举个例子就很好说明了

Object

```js
const MyComponent = function(){}
MyComponent.prototype.data = {
  a:1,
  b:2
}
const component1 = new MyComponent()
const component2 = new MyComponent()
component1.data.a = 5
component2.data.a // ---->5
```

Function
```js
const MyComponent = function(){}
MyComponent.prototype.data = function(){
  return {
    a:1,
    b:2
  }
}
const component1 = new MyComponent()
const component2 = new MyComponent()
component1.data.a = 5
component2.data.a // ---->1
```


<back-to-top />