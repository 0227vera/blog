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

### 3. 三次握手，四次挥手是什么

### 4. TCP和UDP区别

[背](https://juejin.cn/post/7275549394492080188?searchId=2024011122365246C2C762656BAAD137D8)

### 5. 移动端弹性布局

1. flex
2. position: fixed
3. calc计算内容高度

### 6. http2.0 和http1.1的区别

[背](https://juejin.cn/post/6844903897899728909?searchId=20240111232600F20C2E5917AE3ED958C9)

#### 7. 数组洗牌,  [1, 2, 3, 4, 5]随机打乱

```js
// 数组洗牌,  [1, 2, 3, 4, 5]随机打乱

const createRandomIndex = (length, arr = []) => {
  const randomIndex = Math.floor(Math.random() * length)
  if (arr.includes(randomIndex)) {
    return createRandomIndex(length, arr)
  } else {
    arr.push(randomIndex)
    return arr.length === length ? arr : createRandomIndex(length, arr)
  }
}

const randomArr = (arr)=> {
  const randomIndex = createRandomIndex(arr.length)
  return randomIndex.map(item => arr[item])
}

const newArr = randomArr([1, 2, 3, 4, 5])

console.log(newArr)
```


O(n)的时间复杂度
```js
const arr = [1, 2, 3, 4, 5]

const randomArr = (arr)=> {
  for(let i = 1; i < arr.length; i++) {
    const index = Math.floor(Math.random() * (i + 1))
    if (i !== index) {
      const tem = arr[index]
      arr[index] = arr[i]
      arr[i] = tem
    }
  }
  return arr
}

const newArr = randomArr([1, 2, 3, 4, 5])
```

### 8. 数组专树、树转数组，扩展树求节点和

```js
const arr = [{
  id: 2,
  name: '部门B',
  parentId: 0
},
{
  id: 3,
  name: '部门C',
  parentId: 1
},
{
  id: 1,
  name: '部门A',
  parentId: 2
},
{
  id: 4,
  name: '部门D',
  parentId: 1
},
{
  id: 5,
  name: '部门E',
  parentId: 2
},
{
  id: 6,
  name: '部门F',
  parentId: 3
},
{
  id: 7,
  name: '部门G',
  parentId: 2
},
{
  id: 8,
  name: '部门H',
  parentId: 4
}]

/**
 * 数组转树
 */

const arrToTree = arr => {
  const tree = {}
  const res = []
  arr.forEach(item => {
    tree[item.id] = item
  })
  arr.forEach(item => {
    if (tree[item.parentId]) {
      if (!tree[item.parentId].children) {
        tree[item.parentId].children = [item]
      } else {
        tree[item.parentId].children.push(item)
      }
    } else {
      res.push(item)
    }
  })
  return res
}

const tree = arrToTree(arr)

const deleteArr = (obj, attr) => {
  const res = {
    newObj: {},
    [attr]: null
  }
  for(let key in obj) {
    if (key !== attr) {
      res.newObj[key] = obj[key]
    } else {
      res[key] = obj[key]
    }
  }
  return res
}

const treeToArr = (tree, arr = []) => {
  tree.forEach(item => {
    // es6环境： const { ...newObj, children } = item
    const { newObj, children } = deleteArr(item, 'children')
    arr.push(newObj)
    if (children?.length) {
      treeToArr(item.children, arr)
    }
  })
  return arr
}
console.log(treeToArr(tree))


function layerSum(root) {
  if (root.children?.length) {
    root.sum = root.children.reduce((sum, item) => {
      sum += item.value
      if (item.children?.length) {
        item.sum = layerSum(item).sum
      }
      return sum
    }, 0)
  }
  return root
}

const res = layerSum({
  value: 2,
  deep: 1,
  children: [
    { value: 6, deep: 2, children: [ { value: 1, deep: 3 } ] },
    { value: 3, deep: 2, children: [ { value: 2, deep: 3 }, { value: 3, deep: 3 }, { value: 4, deep: 3 } ] },
    { value: 5, deep: 2, children: [ { value: 7, deep: 3 }, { value: 8, deep: 3, children: [{
      value: 10, deep: 4
    }] } ] }
  ]
})
console.log(res)
```

球多叉树的最大深度
```js
const autoTree = {
  value: 2,
  deep: 1,
  children: [
    { value: 6, deep: 2, children: [ { value: 1, deep: 3 } ] },
    { value: 3, deep: 2, children: [ { value: 2, deep: 3 }, { value: 3, deep: 3 }, { value: 4, deep: 3 } ] },
    { value: 5, deep: 2, children: [ { value: 7, deep: 3 }, { value: 8, deep: 3, children: [{
      value: 10, deep: 4
    }] } ] }
  ]
}

const res = layerSum(autoTree)

console.log(res)

const getMaxDeep = (tree, deep) => {
  if (tree.children?.length) {
    tree.children.forEach(item => {
      if (item.children?.length) {
        deep = getMaxDeep(item, item.deep)
      } else {
        deep = item.deep
      }
    })
  } else {
    deep = tree.deep
  }
  return deep
}

const deep = getMaxDeep(autoTree)
console.log(deep)

```

## 题目3

### 1. 实现一个方法扁平数组

```js
const flatArr = (arr, newArr = []) => {
  arr.forEach(item => {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      flatArr(item, newArr)
    } else {
      newArr.push(item)
    }
  })
  return newArr
}

console.log(flatArr([[1,[2,3],4]]))
```

### 2. virtual dom 是如何diff的，一个列表有abcd，描述一下其diff的细节

## 题目4

### 1. 缓存

### 2. dns

### 3. 顺时针打印矩阵

### 4. promise原理、实现Promise.all

### http/tcp、http2

### 安全相关

## 题目5

### 1. 二分法

```js
const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
const findIndex = (arr, target) => {
  const len = arr.length
  let start = 0
  let end = len - 1
  while(start <= end) {
    const middle = Math.floor((start + end) / 2)
    const guess = arr[middle]
    if (guess === target) {
      return middle
    }
    if (guess > target) {
      end = middle - 1
    } else {
      start = middle + 1
    }
  }
  return -1
}

console.log(findIndex(arr, 7))
```


## 题目6

Webpack：
 1. webpack的理解，是什么，解决什么问题。
 2. webpack打包后的代码实际是怎么运行起来的。
 3. webpack中loader是怎样的执行顺序。
 4. webpack里面拆包时chunk、hash的区别。

1. 定义一个数据结构dom，实现一个render(dom)方法，渲染出<ul><li>1</li><li>2</li><li>3</li></ul>。
2. 实现一个class，调用new NodeList([1,2,3,4,5])返回一个链表。
3. 查找两个链表（new NodeList([1,2,3,4,5])、new NodeList([2,3,7,6]）中的相同值。

## 题目7

### 1. nuxt和vue的生命周期
### 2. 介绍下promise原理和api
### 3. 14290023.23 为 14,290,023.23，使用正则和非正则

## 题目8

### 1. 间隔指定时间输出内容

### 2. 异步并发控制，指定个数并发任务

### 3. 指定金额和个数发红包，需要考虑边界情况

## 题目9

### 1. 数组问题

输入 [[‘a’, ‘b’],[‘c’,’d’],[1,2],[‘d’]]
输出 [‘ac1d’, ‘ac2d', ‘ad1d', ‘ad2d’, ‘bc1d’, ‘bc2d', ‘bd1d', ‘bd2d']

### 2. 静态页面缓存有哪些方式，对应的属性分别是什么含义

### 3. 当连接不安全外网时，可能会遇到页面注入广告信息等，该怎么解决

### 4. 原型链继承原理，__proto__和prototype的区别

### 5. 有一系列访问的urls，给定最大并发请求数max（max小于urls的数组长度)，当所有url都执行完会调用callback，写函数满足当前条件



## 以下几块一定要熟练

### 0. css基础：布局相关、排错问题、工程化

### 1. js基础： 防抖节流以及取消正在进行中的请求、promise、事件循环（done）、this和箭头函数、继承

### 1.1 js 代码题：红绿灯、sleep、间隔时间打印

### 2. 浏览器：页面请求过程以及渲染、缓存

### 3. 使用框架：vue、mpx；key的作用，diff算法

### 3.1 工程化： webpack、vite常见问题

### 4. 网络： http1.1和http2、TCP、UDP、DNS、异步请求的数量控制、暂停网络请求、自动请求规定次数

### 5. 算法：树转数组、数组转树、二分法查找、二叉树、链表

### 6. 正则：邮箱、电话、驼峰式下划线相互转化

### 7. 性能优化： 哪些指标、哪些方式、具体项目：科大讯飞公文流转H5

### 8. 项目准备：科大讯飞（表单设计、公文流转）、滴滴（出租车小程序性能优化、扫码付、三段式升级）



## 练习

时间循环的好题目

```js
new Promise((resolve, reject) => {
  console.log(1)
  new Promise((resolve, reject) => {
    console.log(2)
    setTimeout(() => {
      resolve(3)
      console.log(4)
    })
  }).then(data => {
    setTimeout(() => {
      console.log(5) 
    })
    console.log(data)
  })
  setTimeout(() => {
    resolve(6)
    console.log(7)
  })
}).then(data => {
  console.log(data)
  setTimeout(() => {
    console.log(8)
  })
  console.log(9)
})

// 1 2 4 3 7 6 9 5 8
```

虚拟dom：

页面运行中性能：减少操作dom的次数，减少每次操作dom的数据负责度

1. 为什么需要虚拟dom，因为在之前jq或者js去操作dom时候会造成大量的页面重绘和重排，性能比较差，如果频繁操作还可能造成页面卡死的情况，而虚拟dom实质上是js对象，通过js去表达dom的属性事件等，通过对比新老js对象，只去把差异更新在真正的dom上

2. 优点：性能好

3. 缺点：无法做到极致的性能，例如vscode直接最小化操作dom进行极致的性能优化

key的作用

1. 没有key的情况oldStartIndex、oldEndIndex和newStartIndex、newEndIndex，依次遍历比较

2. 有key的情况，将有key的元素拉出单独比较，效率更高

深度优先遍历、广度优先遍历、二叉树遍历

为什么vue3性能远远高于vue2
object.defineProptory劫持的是属性，但是Proxy劫持的是整个对象

```js
const tree = [{
  value:"a",
  children:[
    {
      value:"c",
      children:[
        {
          value:"f",
          children:[]
        },
        {
          value:"g",
          children:[]
        }
      ]
    },
    {
      value:"b",
      children: [
        {
          value:"d",
          children:[
            {
              value:"e",
              children:[
                {
                  value: "h",
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}]
```
```js
// 深度优先
const dfs = (root, goal) => {
  const stack = [...root]
  let dir = ''
  while(stack.length) {
    const node = stack.shift()
    dir += `${node.value}-`
    if (node.value === goal) {
      dir = dir.slice(0, -1)
      return dir
    }
    const child = node.children || []
    for(let i = child.length -1; i >=0; i--) {
      const item = child[i]
      stack.unshift(item)
    }
  }
  return -1
}

// 广度优先
const bfs = (root, goal) => {
  const stack = [...root]
  let dir = ''
  while(stack.length) {
    const node = stack.shift()
    dir += `${node.value}-`
    if (node.value === goal) {
      dir = dir.slice(0, -1)
      return dir
    }
    node.children.forEach(item => stack.push(item))
  }
  return -1
}

console.log(bfs(tree, 'h'))
console.log(dfs(tree, 'g'))
```


### 防抖节流以及取消正在进行中的请求

```js
// 在wait内只能执行一次
const debounce = (fn, wait, immediate) => {
    let timer = 0
    return function () {
        const context = this
        const arg = [].slice.call(arguments)
        if (immediate) {
            let callNow = !timer
            if (callNow) fn.apply(context, arg)
            clearInterval(timer)
            timer = setTimeout(() => {
                fn.apply(context, arg)
            }, wait)
        } else {
            clearInterval(timer)
            timer = setTimeout(() => {
                timer = 0
                fn.apply(content, arg)
            }, wait)
        }
    }
}

// 每wait 执行一次
const throttle = (fn, wait) => {
    let timer = 0
    return function() {
        const context = this
        const arg = [].slice.call(arguments)
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, arg)
                timer = 0
            }, wait)
        }
    }
}
```

取消请求：

```js
let control;
async function getList() {
  control?.abort()
  controller = new AbortController()
  try {
    const list = await fetch('url', {
      signal: controller.signal
    })
    console.log(list)
  } catch (error) {
    console.log(error)
  }
}
```

批量请求：

```js
const fetch = (url, index) => {
  return new Promise(resolve => {
    const time = Math.random() * 1000
    setTimeout(() => {
      resolve({
        url,
        index,
        time
      })
    }, time)
  })
}

function concuiRequest(urls, maxNum) {
  return new Promise((resolve) => {
    if (!urls.length) {
      resolve([])
    }
    let index = 0
    const result = []
    let finishCount = 0
    async function request() {
      const i = index
      const url = urls[index]
      index++
      try {
        const res = await fetch(url, index)
        result[i] = res
      } catch (error) {
        result[i] = error
      } finally {
        console.log(result)
        if (finishCount === urls.length) {
          resolve(result)
        }
        if (index < urls.length) {
          request()
        }
      }
    }
    for(let i = 0; i < Math.min(urls.length, maxNum); i++) {
      console.log(i)
      request()
    }
  })
}

let urls = []
for (let i = 0; i < 20; i++) {
  urls.push(`url---${i}`)
}
console.log(urls)

concuiRequest(urls, 3).then(res => {
  console.log(res)
})
```





