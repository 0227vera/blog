# js的数据类型及其检测

## js的数据类型

* 基础数据类型 ---> null，undefined，string，number，boolean，symbol，object

* 原始类型（Number、String、Boolean）和引用类型（Object、Array、Function）

  * 我的理解：原始类型的值，即它们是最基本的数据类型，不能再细分了，是Number你只可能是数值，是String你就是字符串，是Boolean就只可能是true或者false；但是引用类型的值他们是可以继续往下分的，对象了的值可以是数组，也可以是方法，什么样的值都可合成对象，数组和函数就不用多说了，至于null和undefined，一般将它们看成两个特殊值。

## 常见的检验数据类型的方法

* typeof运算符
* instanceof运算符
* Object.prototype.toString方法

1. typeof运算符

```js
typeof 'a' // 'string'
typeof 325 // 'number'
typeof true // 'boolean'
typeof [1,2,3] // 'object'
typeof { a: 3, b: 5 } // 'object'
typeof function(){console.log(1)} // 'function'
// 可以看的出来typeof在Array和Object上面是不准的，那接下来的两种就直接比较Array和Object
```

2. instanceof运算符

```js
let arr = [1,1,3]
let obj = { a: 1 }
arr instanceof Array // true
arr instanceof Object // true
obj instanceof Object // true
obj instanceof Array // false
// instanceof 可以说也是分不出来的，当然提前已经知道是两种中的一种也是可以分出来的
```

3. Object.prototype.toString方法

```js
Object.prototype.toString.call([]) // "[object Array]"
Object.prototype.toString.call([]) // "[object Object]"
// 所以通过利用Object原型链上面的tuString方法是可以分开的，我们可以封装得到准确的获取类型的方法
function getType (type) {
    return Object.prototype.toString.call(type).match(/\[object (.*?)\]/)[1].toLowerCase()
}
```