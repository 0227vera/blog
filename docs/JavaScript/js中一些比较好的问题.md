# js中一些比较好的问题

## target和currentTarget区别

1. target返回触发事件的元素

2. currentTarget返回绑定事件的元素

## 事件委托

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。所有用到按钮的事件（多数鼠标事件和键盘事件）都适合采用事件委托技术， 使用事件委托可以节省内存。

## 事件循环

事件循环式一个单线程的循环，用于监视调用堆栈并检查是否有工作即将在任务队列中完成。如果调用堆栈为空并且任务中有回调函数，则将回调函数出堆并推送到调用堆栈中执行

## 如何自定义事件（原生js提供的事件）

1. createEvent，设置事件类型，式html事件还是鼠标事件
2. initEvent，初始化事件，事件名称，是否允许冒泡，是否阻止自定义事件
3. dispatchEvent，触发事件

## 基础数据类型，原始数据类型，引用数据类型

[跳转](./变量.html#js的数据类型)

## var、let和const的问题

[跳转](./变量.html#变量)

## 数据类型判断

[跳转1](./变量.html#js的数据类型)

[跳转2](./对象.html#object的实例方法)

## 数组去重

[跳转](./基本算法.html#_3-1数组去重)

## 对象的深拷贝和浅拷贝

[跳转](./js开发常用的工具函数.html#_13-object-assign-对象属性的复制，浅拷贝)

## prototype和proto的关系式什么

所有的对象都有proto属性，他指向对象的构造函数的prototype

## new一个对象经历了什么，手写new关键字

[跳转](./面向对象.html#new命令的原理)

## this

[跳转](./面向对象.html#this)

## bind、call、apply区别

call和apply其实是一样的，区别就在于传参时参数是一个一个传或者是以一个数组的方式来传。call和apply都是在调用时生效，改变调用者的this指向。

bind也是改变this指向，不过不是在调用时生效，而是返回一个新函数。

## 继承问题

[跳转](./面向对象.html#继承)

## 闭包问题

闭包是指有权访问另一个函数作用域中的变量的函数。桥梁的概念

## Ajax

Ajax是使用客户端上的许多web技术，创建一部web应用的一种web开发技术，借助Ajax，web应用可以异步（在后台）向服务器发送数据和从服务器检索数据，而不会干扰现有页面的显示和行为，将数据交换与表示层分离，Ajax允许网页和扩展web应用程序动态更改内容，而无需重新加载整个页面，实际上，现在通常将json替换为xml，因为js对json有原生优势

使用xml如何封装

```js
let xmlhttp
if (window.XMLHttpRequest) {
  xmlhttp = new XMLHttpRequest()
} else {
  xmlhttp = ActiveXObject('Microsoft.XMLHTTP') // IE5,6
}
xmlhttp.onreadystatechange = () => {
  (xmlhttp.readyState === 4 && xmlhttp.status === 200) && document.getElementById("myDiv").innerHTML = xmlhttp.responseText
}

xmlhttp.open('GET', '/xxx/xxx.txt', true)
xmlhttp.send()
```

使用Ajax的优缺点

优点：

1. 交互性更好，来自服务端的新内容可以动态更新，无需重新加载整个页面
2. 减少与服务器的连接，因为脚本和样式只需要被请求一次
3. 状态可以维护在一个页面，js变量和dom状态将得到保持，因为主容器未被重新加载
4. 基本上包括大部分SPA的优点

缺点：

1. 动态网页很难收藏
2. 网页js不能使用，则Ajax也不能使用
3. 有些网络爬虫不执行js，也不会看到js的加载内容
4. 基本上也包括了大部分SPA的缺点

比较一下Ajax和Fetch

1. Fetch书写比ajax简单
2. fetch基于Promise，不可以取消，因为Promise做不到
3. 在默认情况下面，fetch不接受和发送cookies
4. fetch只对网络报错
5. 兼容性就不用多说了

ajax中的post提交数据

1. 默认是：application/x-www-form-urlencoded（可以加上 ;charset=UTF-8）key-value字符串的提交

2. 有文件上传时候：multipart/form-data

3. 现代一点的是：application/json，可以传送各种格式的数据

## 同源策略

同源策略可防止js发生跨域请求，源被定义为URI，主机名和端口号的组合。此策略可防止页面的恶意脚本通过该页面的文档对象模型，访问另一个网页上的敏感数据

## 跨域

1. jsonp: 通过回调函数的形式，执行请求之后的方法，思想来源script的src

2. 后端配置允许访问（access-control-allow-origin）请求头的设置

3. webpack中的proxyTable

## 基本算法

[跳转](./基本算法.html#_1-排序算法)

两个有序数组的合并

```js
let arrA = [0,1,2,3,4,5,6,55]
let arrB = [2,3,4,5,6,7,8,9,10]

let mergeSortAB = (arrA, ArrB) => {
  let arr = []
  while (arrA.length * arrB.length !== 0) {
    if (arrA[0] > arrB[0]) {
      arr.push(arrB[0])
      arrB.shift()
    } else {
      arr.push(arrA[0])
      arrA.shift()
    }
  }
  return arrA.length ? arr.concat(arrA) : arr.concat(arrB)
}
```

<back-to-top />