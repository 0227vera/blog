# 字节面试准备

## 题目1

### 1. 盒子模型的理解

1. 盒子模型分为标准盒模型和怪异盒模型，通过box-sizing来设置，标准盒模型为content-box;怪异盒模型为border-box,不同的浏览器的表现方式不一致,chrome默认值为content-box,IE默认值是border-box,怪异盒模型也叫IE盒模型
2. 其中标准盒模型的width = content；IE盒模型width = content + padding + border

### 2. 跨域的理解，如何解决跨域？纯前端方法如何解决跨域？

* 跨域是基于浏览器同源（所谓同源就是，同一协议，同一ip，同一端口）策略的限制，目的是为了客户端的数据安全
* 常见的解决跨域的方式有：
    * NGINX 反向代理
    * 服务端对CORS的设置：Access-Control-Allow-Origin添加白名单(设置header信息)，多用于生产环境
* 前端处理方式
    * jsonp（比较老的处理方式，当然兼容性比较好原理是script的src不受同源策略的限制）（缺点只支持get请求，服务端需要将数据以callback包裹返回）
    * 开发阶段如果是现代框架如vue、react；我们常用的还有proxy的代理；优点是简单，缺点是只能在开发环境中使用
    * 开发阶段和测试阶段比较简单粗暴的就是使用抓包工具；如charles
    * 开发阶段还有就是黑科技一点的直接使用Google插件

### 3. webpack相关面试整理


### 4. css选择器

```html
<body>
  <div class="box" />
</body>

<style>
.box, .box::after {
  background-color: red;
}

.box {
  background-color: green;
}

div .box {
  background-color: yellow;
}
</style>
```

结果是box容器背景色是yellow

#### 5. 微任务，宏任务

```js
setTimeout(function() {
  console.log(1)
}, 0);
new Promise(function(resolve) {
  console.log(2);
  for(var i=0 ; i < 10000 ; i++) {
    if (i == 9999) {
      resolve();
    }
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);
```

2 3 5 4 1

### 6. this作用域问题

```js
var A = 2;
const B = {
  f1: function() {
    return this.A
  },
  f2: () => {
    return this.A
  },
  A: 10
}

console.log(B.f1(), B.f2());
const f1 = B.f1,
f2 = B.f2;
console.log(f1(), f2());
```
浏览器：
10 2
2 2

node环境：
10 undefined
undefined undefined

### 7. 下划线转驼峰

a_b_ccc_D_EEE_f ==> aBCccdeEEF

```js
const transformStr = str => str.replace(/(_\w)/g, $ => $[1].toUpperCase())

const transform_str = str => str.replace(/[A-Z]/g, s => `_${s.toLowerCase()}`)

const newStr = transformStr('a_b_ccc_D_EEE_f')
console.log(newStr)
const newerStr = transform_str(newStr)
console.log(newerStr)
```

## 题目2

### 1. 浏览器地址栏输入地址后，浏览器是如何加载网页的

0. 根据地址找到ip，也就是dns查询
1. TCP链接，然后http请求，服务端响应，客户端渲染如下：
2. 解析html生成dom树
3. 解析css生成cssom树
4. dom树和cssom树合并生成渲染树
5. 然后对dom树进行便利开始布局，计算每一个节点的位置信息，样式等
6. 将渲染的每个节点绘制到屏幕

### 2. DNS解析的具体过程

1. 浏览器缓存验证
2. 本地机器缓存验证
3. DNS服务器（单位、学校等）缓存验证
4. 根DNS服务器请求解析
5. 根DNS服务器返回给本地DNS域名一个顶级DNS服务器地址
6. 本地DNS服务器向上一步获取的顶级DNS服务器发送解析请求
7. 接受请求的顶级服务器查找并返回name server服务器，也就是我要访问网站域名提供商的服务器
8. name server服务器查询储存的域名和ip映射表，把查询出来的域名ip地址连同TTL值返回给本地DNS服务器
9. 本地DNS服务器缓存这个域名和ip的对应关系


