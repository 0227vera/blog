# JS开发中常用的工具函数

## 1. isStatic：检测数据是不是除了symbol外的原始数据

```js
let isStatic = value =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean' ||
  typeof value === 'undefined' ||
  typeof value === 'null'
```

## 2. isPrimitive：检验数据是不是原始数据

```js
let isPrimitive = value => isStatic(value) || typeof value === 'symbol'
```

## 3.isObject:判断数据是不是引用类型的数据

eg:array、function、object、regexexs、new String()

```js
let isObject = value =>
  (value !== null) &&
  (typeof value === 'object' || typeof value === 'function')
```

## 4. isObjectLike：检查value是否是类对象

```js
let isObjectLike = value => value !== null && typeof value === 'object'
```

## 5. getRawType：获取精确的数据类型

```js
let getRawType = value =>
  Object.prototype.toString.call(value).match(/\[object (.*?)\]/)[1].toLowerCase()
```

## 6. isNative：判断value是不是浏览器的内置函数

```js
let isNative = value =>
  typeof value === 'function' &&
  /native code/.test(value.toString())
```

## 7. isLength：检查value是不是有效的类数组长度

```js
let isLength = value =>
typeof value === 'number' && // 数组长度一定是数字
value > -1 && // 数组长度一定不为负数
value % 1 == 0 && // 数组长度一定是整数
value <= Number.MAX_SAFE_INTEGER // 数组长度肯定小于无穷大
```

## 8. isArrayLike：检查value是不是类数组

```js
let isArrayLike = value =>
  isLength(value.length) && // 长度必须先满足
  getRawType(value) !== 'function' // 函数肯定不能当作类数组的，在这里，字符串是当作类数组的
```
## 9. isEmpty：检查value是不是为空

```js
let isEmpty = value => {
  if (!value) { // 这其中包含String、Number、Boolean、undefined、null
    return true
  }
  if (getRawType(value) === 'array') { // 数组类型的时候
    return !value.length
  } else if (getRawType(value) === 'obiect') { // 对象类型的时候
    return !Object.keys(value).length
  }
  return false
}
```

## 10. camelize：横线转驼峰

```js
const camelizeGeg = /-(\w)/g  // 表示-加字母的形式
let  camelize = value =>
  value.replace(camelizeGeg, (str, c) => c ? c.toUpperCase() : '')
```

## 11. hyphenate：驼峰转横线

```js
const hyphenateReg = /\B([A-Z])/g // \B可以理解为任意字符
let hyphenate = value =>
  value.replace(hyphenateReg, '-$1').toLowerCase() // $1表示匹配到的大写字母
```

## 12. extend：将属性混合到目标对象中
有Object.assign() 这个玩意真的没什么用

```js
let extend = (to,from) => {
  for(let [key,value] of Object.entries(from)){
    to[key] = value
  }
  return to
}
```

## 13. Object.assign: 对象属性的复制，浅拷贝

```js
Object.assign = Object.assign || function (){
  if (arguments.length === 0) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  let target = arguments[0]
  let args = [].slice(arguments)
  args.forEach(item => {
    for(let [key,value] of Object.entries(item)){
      target[key] = value
    }
  })
  return target
}
```

## 14. clone：克隆数据，可深度克隆

```js
let clone = (value,deep) => {
  if (isPrimitive(value)) { // 如果是原始数据类型，直接返回
    return value
  }
  if (isArrayLike(value)) { // 如果是类数组
    value = [].slice.call(value)
    return value.map(item => deep ? clone(item,deep) : item)
  } else if (getRawType(value) === 'object' || getRawType(value) === 'array') {
    let target = {}
    for (let key in value) {
      value.hasOwnProperty(key) && ( target[key] = deep ? clone(value[key],deep) : value[key])
    }
    return target
  }
  let type = getRawType(value)
  switch (type) {
    case 'date' :
    case 'regexp' :
    case 'error' :
      return new window[type](value)
    break
  }
}
```

思想就是，如果是原始数据类型直接返回值，没有深浅之分，如果是数组和对象类的引用数据类型，遍历的方法返回是深拷贝，还是浅拷贝

## 15. 识别各种浏览器以及平台

```js
//运行环境是浏览器
let inBrowser = typeof window !== 'undefined'
//运行环境是微信
let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
//浏览器 UA 判断
let UA = inBrowser && window.navigator.userAgent.toLowerCase()
let isIE = UA && /msie|trident/.test(UA)
let isIE9 = UA && UA.indexOf('msie 9.0') > 0
let isEdge = UA && UA.indexOf('edge/') > 0
let isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
let isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

export default {
  inBrowser,
  inWeex,
  weexPlatform,
  UA,
  isIE,
  isIE9,
  isEdge,
  isAndroid,
  isIOS,
  isChrome
}
```

##  16. 获取浏览器信息

```js
export default function getExplorerInfo() {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}
```

## 17. isPCBroswer：检测是否为PC端浏览器模式

```js
export default function isPCBroswer() {
    let e = navigator.userAgent.toLowerCase()
        , t = "ipad" == e.match(/ipad/i)
        , i = "iphone" == e.match(/iphone/i)
        , r = "midp" == e.match(/midp/i)
        , n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
        , a = "ucweb" == e.match(/ucweb/i)
        , o = "android" == e.match(/android/i)
        , s = "windows ce" == e.match(/windows ce/i)
        , l = "windows mobile" == e.match(/windows mobile/i);
    return !(t || i || r || n || a || o || s || l)
}
```

## 18: 简单的实现Set
```js
window.Set = window.Set || function () {
  function Set (arr) {
    this.items = arr ? unique(arr) : []
    this.size = this.arr.length
  }
  Set.prototype = {
    add: function (value) {
      if (!this.has(value)) {
        this.items.push(value)
        this.size++
      }
      return this
    },
    clear:function() {
      this.size = 0
      this.items = []
    },
    delete: function (value) {
      return this.items.some ((v,i) => {
        if (v === value) {
          this.items.splice(i,1)
          return true
        }
        return false
      })
    },
    has: function (value) {
      return this.items.some(item => item === value)
    },
    values: function () {
      return this.items
    }
  }
}

function unique(arr){
    if(!isArrayLink(arr)){ //不是类数组对象
        return arr
    }
    let result = []
    let objarr = []
    let obj = Object.create(null)
    
    arr.forEach(item => {
        if(isStatic(item)){//是除了symbol外的原始数据
            let key = item + '_' + getRawType(item);
            if(!obj[key]){
                obj[key] = true
                result.push(item)
            }
        }else{//引用类型及symbol
            if(!objarr.includes(item)){
                objarr.push(item)
                result.push(item)
            }
        }
    })
    
    return result
}
```

## 19. cached记忆函数：缓存函数的运算结果
```js
function cached (fn) {
  let cache= = Object.create(null)
  return function cachedFn (str) {
    let hit = cache(str)
    let hit || (cache(str) = fn(str))
  }
}
```

## 20. 文件下载

```js
export default function downloadFile (filename, data) {
  let DownloadLink = document.createElement('a')
  if (DownloadLink) {
    document.body.appendChild(DownloadLink)
    DownloadLink.style = 'display: none'
    DownloadLink.download = filename
    DownloadLink.href = data

    if (document.createEvent) {
      let DownloadEvt = document.createEvent('MouseEvents')
      DownloadEvt.initEvent('click', true, false)
      DownloadLink.dispatchEvent(DownloadEvt)
    } else if (document.createEventObject) {
      DownloadLink.fireEvent('onclick');
    } else if (typeof DownloadLink.onclick == 'function') {
      DownloadLink.onclick();
    }
    document.body.removeChild(DownloadLink)
  }
}
```

## 21. 全屏展示和退出

```js
function toFullScreen(){
    let elem = document.body;
    elem.webkitRequestFullScreen 
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
    ? elem.msRequestFullscreen()
    : elem.requestFullScreen
    ? elem.requestFullScreen()
    : alert("浏览器不支持全屏");
}
function exitFullscreen(){
    let elem = parent.document;
    elem.webkitCancelFullScreen 
    ? elem.webkitCancelFullScreen()
    : elem.mozCancelFullScreen
    ? elem.mozCancelFullScreen()
    : elem.cancelFullScreen
    ? elem.cancelFullScreen()
    : elem.msExitFullscreen
    ? elem.msExitFullscreen()
    : elem.exitFullscreen
    ? elem.exitFullscreen()
    : alert("切换失败,可尝试Esc退出");
}
export default {
  toFullScreen,
  exitFullscreen
}
```

## 22. performance.timing： 利用performance.timing进行性能分析

```js
window.onload = function(){
    setTimeout(function(){
        let t = performance.timing
        console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
        console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
        console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
        console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
        console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
        console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
        console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))

        if(t = performance.memory){
            console.log('js内存使用占比 ：' + (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
        }
    })
}
```

<back-to-top />