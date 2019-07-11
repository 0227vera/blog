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
  isLength(value) && // 长度必须先满足
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

[资料来源](https://segmentfault.com/a/1190000019601333)

<back-to-top />