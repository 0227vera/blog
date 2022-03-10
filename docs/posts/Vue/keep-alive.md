# keep-alive

前两天项目中有一个需要缓存的需求，使用了一把keep-alive，那叫一个艰难啊，开始在别人的`demo`上面模仿着写,出了各种问题还不好解决，最后还是决定撸文档来解决

`vue keep-alive`官方文档先附上，文档在这个上面就好[`vue keep-alive`](https://cn.vuejs.org/v2/api/#keep-alive)

我说一下我自己遇到的坑吧

1. name的问题，因为自己平常写代码，习惯不是很好，在写组件的时候不喜欢加上`name`属性，在文档中有明显的说明 <font color=red>匹配首先检查组件自身的`name`选项，如果`name`选项不可用，则匹配它的局部注册名称 (父组件`components`选项的键值)。匿名组件不能被匹配。</font>也即是说我自己写的组件是匿名组件，`keep-alive`不会识别，也不会缓存，<font color=red> `include`中的name为组件内部的name而非router中的name</font>

2. 路由钩子函数使用的问题，缓存肯定是要动态的，所以肯定是要结合路由钩子去实现动态缓存，哪些组件需要缓存哪些不要，什么情况需要什么情况不要缓存，这些都需要考虑，不说其中的设计问题了，给出最后的解决方案吧

```js
routes: [
    {
      path: '/',
      name: '...',
      component: () => import('@/...'),
      meta: {
        index: 1,
        keepAlive: false
      }
    },
    {
      path: '/...',
      name: '...',
      component: () => import('@/...'),
      meta: {
        index: 2,
        keepAlive: false
      }
    },
    {
      path: '/...',
      name: '...',
      component: () => import('@/...'),
      meta: {
        index: 2,
        keepAlive: true
      }
    },
    {
     path: '/...',
      name: '...',
      component: () => import('@/...'),
      meta: {
        index: 3,
        keepAlive: true
      }
    }
  ]
```

有可能需要使用缓存的情况`keepAlive`均设置为`true`

在全局的守卫中进行一次判断

```js
router.beforeEach((to, from, next) => {
  if (to.meta.keepAlive) {
    store.commit('keepAlive', to.name)
  }
  next()
})
```

上面不难看出使用store在动态存储需要使用缓存组件的名字

3. 在组件中使用路由钩子的时候next和store先后顺序的问题，一定要先将`store`里面的值修改之后再执行`next`,否则无效，这个其实很好理解，如果先跳进页面了，即使修改缓存组件也不再生效了
```js
beforeRouteEnter: (to, from, next) => {
  if (to.query.type !== Store.state.currentType && Store.state.currentType) {
    Store.commit('deleteKeepAlive', from.name)
  }
  next()
},
```

上面的业务代码不用管，只需要知道先后顺序就好



<gitask />