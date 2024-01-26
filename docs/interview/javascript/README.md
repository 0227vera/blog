# js面试整理

## 数据类型

* 基础数据类型：null，undefined，string，number，boolean，symbol，object
  * 原始类型：number、string、boolean、symbol
  * 引用类型：object、array、function

## 拷贝的问题

1. 深拷贝：就是对对象以及对象的所有子对象进行复制

2. 浅拷贝：只复制一层对象的属性，并不包括对象里面的为引用类型的属性值，因此修改拷贝后的属性都是引用类型的就会影响原对象

::: details 查看演示代码
<<< @/docs/.vuepress/public/demo/js/deepclone.js
:::

## prototype 和 proto 的关系式什么

所有的对象都有 proto 属性，他指向对象的构造函数的 prototype

## bind、call、apply 区别

call 和 apply 其实是一样的，区别就在于传参时参数是一个一个传或者是以一个数组的方式来传。call 和 apply 都是在调用时生效，改变调用者的 this 指向。

bind 也是改变 this 指向，不过不是在调用时生效，而是返回一个新函数。

## es5的继承问题

```js
function Suber(name, age) {
  this.name = name
  this.age = age
  this.method = function () {
    console.log('this is suber method')
  }
}

Suber.prototype.color = '#333333'
Suber.prototype.sayHello = function () {
  console.log('hi Hello')
}

// 先拿到自身属性和方法
function Sub(name, age, value) {
  Suber.call(this, name, age)
  this.value = value
}
// 再拿原型的属性和方法
Sub.prototype = Suber.prototype
Sub.prototype.constructor = Sub

let s = new Sub('xuanliao', 27, 'nick')
console.log('---------->', s.name, s.age, s.value, s.color)
s.sayHello()
```

## 闭包

1. 什么是闭包

函数执行后返回结果是一个内部函数，并被外部变量所引用，如果内部函数持有被执行函数作用域的变量，既形成闭包

2. 闭包原理

函数执行分成两个阶段(预编译阶段和执行阶段)。

* 在预编译阶段，如果发现内部函数使用了外部函数的变量，则会在内存中创建一个“闭包”对象并保存对应变量值，如果已存在“闭包”，则只需要增加对应属性值即可。
* 执行完后，函数执行上下文会被销毁，函数对“闭包”对象的引用也会被销毁，但其内部函数还持用该“闭包”的引用，所以内部函数可以继续使用“外部函数”中的变量

利用了函数作用域链的特性，一个函数内部定义的函数会将包含外部函数的活动对象添加到它的作用域链中，函数执行完毕，其执行作用域链销毁，但因内部函数的作用域链仍然在引用这个活动对象，所以其活动对象不会被销毁，直到内部函数被烧毁后才被销毁。

3. 优点

* 3.1. 可以从内部函数访问外部函数的作用域中的变量，且访问到的变量长期在内存中，可以使用
* 3.2. 避免变量全局污染
* 3.3. 把变量储存在独立的作用域，作为私有成员存在

4. 缺点

* 4.1. 内存泄漏
* 4.2. 对速度的影响，内部的层级决定了引用的外部变量在查找时经过的作用链长度
* 4.3. 可能获取意外值

5. 使用场景

* 5.1 模块封装

```js
var fn = (function () {
  var foo = 0
  function func () {}
  fn.prototype.bar = function () {
    return foo
  }
  return func
})
```

* 5.2 循环中使用

```js
for (var i = 0;  i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j)
    }, 0)
  })(i)
}
```


## 说一下你对防抖和节流的理解

1. 防抖(debounce)：在函数需要频繁触发时，只有当有足够空闲的时间时，才执行一次。就好像在百度搜索时，每次输入之后都有联想词弹出，这个控制联想词的方法就不可能是输入框内容一改变就触发的，他一定是当你结束输入一段时间之后才会触发。

2. 节流(thorttle)：预定一个函数只有在大于等于执行周期时才执行，周期内调用不执行。就好像你在淘宝抢购某一件限量热卖商品时，你不断点刷新点购买，可是总有一段时间你点上是没有效果，这里就用到了节流，就是怕点的太快导致系统出现 bug。

区别：在发生持续触发事件时，防抖设置事件延迟并在空闲时间去触发事件，而节流则是隔一定的时间触发一次。

### 使用场景和实现

1. 防抖：

* 在时间出发n秒后再执行回调，如果在这n秒以内又被触发了，则重新计时
* 适用场景：
  * 按钮的提交：防止重复提交
  * 搜索框检索，防止频繁调用接口影响体验和对服务器造成压力

```js
const debounce = (func, wait) => {
  let timeout
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

const debounce = (func, wait, immediate) => {
  let timeout
  return function () {
    const context = this
    const args = arguments
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout (() => {
        timeout = null
      })
      if (callNow) fn.apply(this, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}
```

2. 节流：

* 规定在一个时间内，只能触发一次函数，如果这个时间内多次触发，只生效一次
* 适用场景：
  * 拖拽场景：防止dom大量的重拍影响性能
  * 缩放场景：频繁触发resize，性能

```js
const throttle = (fn, wait) => {
  let timeout
  return function () {
    const context = this
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(context, args)
      })
    }
  }
}
```

## 你再工作中是如何解决跨域问题的

1. jsonp: 通过回调函数的形式，执行请求之后的方法，思想来源 script 的 src

2. 后端配置允许访问（access-control-allow-origin）请求头的设置

3. webpack 中的 proxyTable

4. 使用代理（charles）

## 类数组和数组的区别，dom 的类数组如何转换成数组

区别：

1. 数组有索引
2. 数组有长度，对象没有

什么是类数组

1. 拥有length属性，且索引为非负整数
2. 不具有数组的方法

eg:

```js
let e = {  
  length: 3,  
  "0": 1,  
  "1": 'sss',  
  "2": 'rerer'
}
for (var i = 0; i < e.length; i++) {  
    console.log(e[i]);
}
e instanceof Array  // false
e instanceof Object // true
```

如何判断快速判断数组和类数组

Object.prototype.toStrong.call()

[object Array]
[object Object]

```js
function isArrayLike(o) {     
  if (
      o && // o is not null, undefined, etc.          
      typeof o === 'object' && // o is an object          
      isFinite(o.length) && // o.length is a finite number          
      o.length >= 0 && // o.length is non-negative          
      o.length===Math.floor(o.length) &&  // o.length is an integer          
      o.length < 4294967296 // o.length < 2^32    
    )                    
    return true; // Then o is array-like  else          
    return false;                       // Otherwise it is not
}
```

如何转化

```js
let e = { 
  length: 3,  
  "0": 1,  
  "1": 'sss',  
  "2": 'rerer'
}

// 1. array.from
console.log(Array.from(e))
// 2. slice
console.log([].slice.call(e))
// 3. dom时候
console.log(...e)
```

## 介绍下 promise 的特性、优缺点，内部是如何实现的，动手实现 Promise

1. Promise特性

* 1. Promise有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)
* 2. Promise对象接受一个回调函数作为参数, 该回调函数接受两个参数，分别是成功时的回调resolve和失败时的回调reject；另外resolve的参数除了正常值以外， 还可能是一个Promise对象的实例；reject的参数通常是一个Error对象的实例。
* 3. then方法返回一个新的Promise实例，并接收两个参数onResolved(fulfilled状态的回调)；onRejected(rejected状态的回调，该参数可选)
* 4. finally方法不管Promise状态如何都会执行，该方法的回调函数不接受任何参数
* 5. Promise.all()方法将多个Promise实例，包装成一个新的Promise实例，该方法接受一个由Promise对象组成的数组作为参数(Promise.all()方法的参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例)，注意参数中只要有一个实例触发catch方法，都会触发Promise.all()方法返回的新的实例的catch方法，如果参数中的某个实例本身调用了catch方法，将不会触发Promise.all()方法返回的新实例的catch方法
* 6. Promise.race()方法的参数与Promise.all方法一样，参数中的实例只要有一个率先改变状态就会将该实例的状态传给Promise.race()方法，并将返回值作为Promise.race()方法产生的Promise实例的返回值

2. Promise优点

* 1. 统一异步 API
  * Promise 的一个重要优点是它将逐渐被用作浏览器的异步 API ，统一现在各种各样的 API ，以及不兼容的模式和手法。
* 2. 和事件对比
  * 和事件相比较， Promise 更适合处理一次性的结果。在结果计算出来之前或之后注册回调函数都是可以的，都可以拿到正确的值。 Promise 的这个优点很自然。但是，不能使用 Promise 处理多次触发的事件。链式处理是 Promise 的又一优点，但是事件却不能这样链式处理。
* 3. 和回调对比
  * 解决了回调地狱的问题，将异步操作以同步操作的流程表达出来。
* 4. Promise 带来的额外好处是包含了更好的错误处理方式（包含了异常处理），并且写起来很轻松（因为可以重用一些同步的工具，比如 Array.prototype.map() ）。

3. Promise缺点

* 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
* 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
* 当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
* Promise 真正执行回调的时候，定义 Promise 那部分实际上已经走完了，所以 Promise 的报错堆栈上下文不太友好。

## 箭头函数和普通函数的区别

1. 箭头函数不能绑定arguments，而是使用`rest`的`...`解决方案
2. 箭头函数是匿名函数，不能作为构造函数不能使用new
3. 箭头函数没有原型属性
4. 箭头函数不能绑定this，会将离自己最近的一个普通函数的this作为自己的this
5. call、apply、bing都无法改变箭头函数的this指向

## 移动设备Android与 iOS 的软键盘弹出的处理方式有什么不同

1. Android：入框获取焦点，键盘弹起，页面（webview）高度会发生改变，高度为可视区高度（原高度减去软键盘高度），除了因为页面内容被撑开可以产生滚动，webview本身不能滚动。

2. IOS：在 IOS 上，输入框（input、textarea 或 富文本）获取焦点，键盘弹起，页面（webview）并没有被压缩，或者说高度（height）没有改变，只是页面（webview）整体往上滚了，且最大滚动高度（scrollTop）为软键盘高度。

## iPhone 里面 Safari 上如果一个输入框 fixed 绝对定位在底部，当软键盘弹出的时候会有什么问题，如何解决

flex + scrollIntoView

## Object.is有什么用，和===有什么区别？

`Object.is`可以判断NaN等于自身，而`+0`不等于`-0`

```js
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## 打印值

```js
function Person () {
  getAge = function () {
    console.log(10)
  }
  return this  // 这个地方this的作用：在3的是是把this指向全局对象
}
Person.getAge = function () {
  console.log(20)
}
Person.prototype.getAge = function () {
  console.log(30)
}
var getAge = function () {
  console.log(40)
}
function getAge () {
  console.log(50)
}
Person.getAge()             // 1.  20

getAge()                    // 2.  40

Person().getAge()           // 3. 10

getAge()                    // 4. 10

new Person.getAge()         // 5. 20

new Person().getAge()       // 6. 30

new new Person().getAge()   // 7. 30

new (new Person().getAge) () // 8. 30  对7的解释
```