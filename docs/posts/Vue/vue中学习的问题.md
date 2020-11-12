# vue 中好的问题

## 什么是 MVVM

MVVM 最早是由微软提出来，他借鉴了桌面应用程序的 MVC 思想，在前端页面中，把 Model 用纯 js 对象（data）表示，view 负责显示（页面），两者做到了最大限度的分离，把 Model 和 view 关联起来就是 viewmodel。

viewmodel 负责把 model 的数据同步到 view 显示出来，还负责把 view 的修改同步会 model，view 和 model 之间的同步工作完全是自动的，无需人为干涉

因此开发者只需要关注逻辑，不需要手动操作 dom，不需要关注数据状态的同步问题，复杂的数据状态维护完全由 mvvm 来统一管理

![图解](../../.vuepress/public/img/vue/mvvm.png)

## MVVM 与 MVC 的区别

MVC----有一个 Controller（C），使用 Model 通过控制 Controller 去控制 view 的更新，只是做到了 Model 层级的变化去实时改变 view 层的变化

MVVM---就是 Model 层和 View 层只互通的，两者任何一个修改都会试对方发生变化，并且两者做到了最大限度的分离

## AMD、CMD、CommonJS、和 ES6 的对比（模块化开发）

1. AMD --- requireJS（异步模块）

define 定义，require 引入

2. CMD --- SeaJS（同步模块）

define 定义，require 引入

3. CommonJS module.exports（nodeJS）

`exports.DEFAULT_COLOR = '#409eff'`定义，require 引入

4. ES6 特性 export/import

## vue 优点

mvvm 优点就是 vue 优点：

1. 数据和视频之间的的同步工作完全是自动的，无需人为的干涉，所以开发者只需关注业务逻辑

2. 不需要手动操作 dom，不需要关注数据状态的同步问题，复杂的数据状态维护完全由 mvvm 来统一管理，节省了很多精力

## vue 的生命周期

![图解](../../.vuepress/public/img/vue/vue-hook.png)

## 数据双向绑定原理（自我实现最简单的数据双绑）

[跳转](/JavaScript/对象.html#其他方法)

## v-if 和 v-show 的区别

1. v-if 是‘真正’的条件渲染，因为它会确保在切换过程中条件快中的子组件会被销毁和重建

2. v-show 知识单纯的控制 display，不管 true/false 都会加载和渲染

选择： 两者来比较就知道，v-if 开销比较大，v-show 只是在开始的时候有开销，如果是十分频繁的操作，建议使用 v-show，如果是加载进入总是默认值加载，建议使用 v-if

## 组件传值

1. parent---->child 通过 prop

2. child---->parent 通过\$emit

3. child---->child 通过 eventBus/vuex

## 计算属性（computed）

计算属性的定义：

1. 当依赖的属性发生变化的时候，计算属性会重新计算，反之则使用缓存中的属性值

2. 计算属性和 vue 中的 data 的数据一样，都是响应式的，只不过他必须依赖某一个或者多个数据实现，并且只有他依赖的数据值变了。他才会更新

## watch 的作用

watch 主要作用是监听某个数据值的变化。和计算属性相比除了没有缓存，作用是一样的

## vue-router 相关

[跳转](./vue-router的两种mode.html#vue-router)

## keep-alive

[跳转](./keep-alive.html)

## mixins

[跳转](./mixins.html)

## 自定义指令

[跳转](./自定义指令.html)

## diff 算法

[跳转](./diff.html)

## vue/react 中 key 的作用

1. 不带 key 的情况下，对于简单列表页渲染来说 diff 节点更快，这一点没有错误，但是显然这不是 key 的作用

2. key 的作用是什么呢？
   > 首先一点要知道，key 是给每一个 vnode 的唯一 id，可以依靠 key 更准确更快地拿到 oldVnode 中对应的 vnode 节点

- 更准确：带 key 就不可以`就地复用`，在 sameNode 函数`a.key === b.key`对比中可以避免就地复用的情况，所以更加准确
- 更快：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快（也就是说 map 是比遍历更快的）

<back-to-top />

<gitask />
