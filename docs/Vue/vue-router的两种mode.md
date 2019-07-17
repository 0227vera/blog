# vue-router

前后端分离的项目 利用Ajax可以在不刷新浏览器的情况下异步数据请求交互

SPA --- 单页面应用（只有一个html文件，真个网站的所有内容都这一个html里，通过js来处理）

页面交互式是无刷新的，<font color=red>页面跳转也是无刷新的</font>

实现单页面应用的就是现在要说的前后端分离+前端路由

实现前端路由其实就是匹配不同的url路径，进行解析，加载不同的组件，然后动态的渲染在指定的html容器中

## 1. vue-router中的两种模式（mode）

### 1. hash模式

* 在vue项目中的地址中一般会有一个`#`，<font color=red>这个`#`后面就是`hash`值，`hash`的变化，并不会导致浏览器向服务器发送请求，浏览器不发出请求，页面就不会刷新。</font> 但是`hash`变化会促发`hashchange`这个事件，通过这个事件我们可以知道`hash`发生了哪些变化，然后监听`hashchange`来实现页面更新的部分

`hash`模式背后的原理就是在window上面监听`onhaschange`事件

```js
window.onhashchange = function(event) {
  console.log(event.oldURL, event.newURL)
  // do something 
  // eg:
  let hash = location.hash.slice(1)
  document.body.color = hash // 通过页面hash来改变页面的颜色
}
```

图解如下：

![图解](../.vuepress/public/img/vue/router.png)

根据上图，选择`mode`之后，程序根据你选择的`mode`类型创建不同的`history`对象（`hash：HashHistory`，或者`history：HTML5History`或者`abstract：AbstractHistory`）

```js
switch (mode) {
  case 'history':
    this.history = new HTML5History(this, options.base)
    break
  case 'hash':
    this.history = new HashHistory(this, options.base, this.fallback)
    break
  case 'abstract':
    this.history = new AbstractHistory(this, options.base)
    break
  default:
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `invalid mode: ${mode}`)
    }
}
```

`HashHistory`有两个方法：`HashHistory.push()`将新路由添加到浏览器访问历史的栈顶；和`HashHistory.replace()`替换掉当前栈顶的路由

![图解](../.vuepress/public/img/vue/hash-push.png)

![图解](../.vuepress/public/img/vue/hash-replace.png)

因为hash发生变化的utl会被浏览器记录（历史访问栈）下来，所以浏览器的前进后退都可以用 ===> 浏览器没有请求服务器，但是页面状态和url一一关联起来

### 2. history

因为HTML5标准发布，多了两个API，pushState()和replaceState()。

<font color=red>1.通过这两个API可以改变url地址而且不会发送请求</font>

2. 不仅可以读取历史记录栈，还可以对浏览器历史记录进行修改

除此之外，还有popState()事件，当浏览器跳转到新的状态时，将触发popState事件

* 修改历史状态
  * 1. window.history.pushState(stateObject, title, URL)
  * 2. window.history.replaceState(stateObject, title, URL)

* 切换历史状态
  * 1. history.go(-2) -------> 后退两次
  * 2. history.go(2) -------> 前进两次
  * 3. history.back() -------> 后退
  * 4. history.forward() -------> 前进

### 区别

  * hashchange只能改变`#`后面的url片段。而pushState()设置的新的URL可以式与当前URL同源的任意URL
  * history模式则会将URL修改得就和正常请求后端URL一样，如果后端没有配置对应得/user/id的路由处理，则会返回404错误

当刷新页面之类的操作时候，浏览器会给服务器发送请求，所以这个实现需要服务器的支持，需要把所有都重定向到根页面，这也是为什么history模式下面刷新总是会报404的问题

## 2. router和route的区别

* $router式vue-router的实例，想要导航到不同URL，则使用$router.push或者$router.replace()或者$router.go()

* $route是从当前跳转对象里面可以获取name、path、query、params等

## 3. query和params的使用区别(东动态组件传参)
1. `query`参数传递，在跳转的时候是既可以使用`name`跳转也可以是使用`path`跳转的 ，（这个地方也有人说query只能够是path跳转，亲测之后用name也是可以的）
2. `params`是路由的一部分，必须要在路由后面添加参数名，`query`是直接拼接在url后面的参数，没有也没有关系
3. `params`一旦设置在路由，`params`就是路由的一部分，如果路由有`params`传参，但是跳转的时候没有这个参数，会导致跳转失败，或者页面没有内容

* 现在网上有一种我不是很同意的说法，但是又能够说明一些道理，`query`相当于`get`请求，页面跳转的时候可以在地址栏看到请求参数，而`params`相当于`post`请求，参数不会再地址栏显示

<back-to-top />