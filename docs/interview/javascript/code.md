# 常见的代码问题

## 写一个mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b,...,a+nb 的时间，执行一次fn，然后写一个 myClear，停止上面的 mySetInterVal

::: details 查看演示代码
<<< @/docs/.vuepress/public/demo/js/mySetInterVal.js
:::

## 实现 add(1)(2)(3)

```js
/**
 * add(1)(2)(3)
 */

const add = function()  {
  if(!add.result) add.result = 0
  add.result = [...arguments].reduce((sum,item) => sum + item, add.result)
  return add
}

const s = add(1, 2)(3)(4,5).result
console.log(s)
```

## 如何实现Promise

::: details 查看演示代码
<<< @/docs/.vuepress/public/demo/js/promise.js
:::

## 手写数组转树

::: details 查看演示代码
<<< @/docs/.vuepress/public/demo/js/arrToTree.js
:::

## 随便打开一个网页，用 JavaScript 打印所有以 s 和 h 开头的标签，并计算出标签的种类

```js
const allTags = [...document.querySelectorAll('*')].reduce((arr, item) => {
  if (!arr.includes(item.localName)){
    arr.push(item.localName)
  }
  return arr
}, [])

console.log('所有品类------->', allTags.length)
console.log('s/h标签名------->', allTags.filter(item => item[0] === 's' || item[0] === 'h'))
```

## 1000*1000 的画布，上面有飞机、子弹，如何划分区域能够更有效的做碰撞检测，类似划分区域大小与碰撞检测效率的算法，说一下大致的思路

::: details 查看演示代码
<<< @/docs/.vuepress/public/demo/js/impact-checking.js
:::

扩展：在三维里面两个物体的碰撞，其实和上面的作法是一样，就不写了

延展思维：两个矩阵点乘

::: details 查看演示代码
<<< @/docs/.vuepress/public/demo/js/matrix-multi.js
:::

## 给定一个数组，按找到每个元素右侧第一个比它大的数字，没有的话返回-1 规则返回一个数组

```js
/*
 * 示例：
 * 给定数组：[2,6,3,8,10,9]
 * 返回数组：[6,8,8,10,-1,-1]
 */
const func = arr => arr.reduce((newArr, item, index) => {
  newArr[index] = arr.slice(index).filter(f => f > item)?.[0] || -1
  return newArr
}, [])

console.log(func([2,6,3,8,10,9]))
```

## 类设计：使用面相对象设计一个停车场管理系

::: details 查看演示代码
<<< @/docs/.vuepress/public/demo/js/parkcar.js
:::

## 手写代码实现kuai-shou-front-end=>KuaiShouFrontEnd

```js
const str = 'kuai-shou-front-end'
// NOTE: 横线转驼峰
const lineToW = str => str.replace(/(-\w)/g, $1 => $1[1].toUpperCase())
// NOTE: 驼峰转横线
const wToLine = str => str.replace(/[A-Z]/g, $1 => `-${$1.toLowerCase()}`)
console.log(wToLine(lineToW(str)))
```

## 用尽量短的代码实现一个 arrary 的链式操作，将数组中的大于 10 的值进行一个累加

```js
const sum10 = arr => arr.reduce((sum, item) => item <= 10 ? (sum + +item) : sum, 0)
console.log(sum10([1,2,3,4,5,11])) // 15
```