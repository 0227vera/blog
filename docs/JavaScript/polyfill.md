# polyfill

使用es6的一些方法的时候都是会用的，但是有时候去做浏览器兼容的时候总是直接使用polyfill.js了

这个地方就通过自己的学习来了解一些操作数组的方法

## 说明forEach的工作原理

```js
if (!Array.prototype.forEach) {
  if (Object.prototype.toString.call(this) !== '[object Array]') {
    return 'forEach为数组方法'
  }
  Array.prototype._forEach = function (a, b) {
    for ( let i = 0; i < this.length; i++ ) {
      a.call(b, this[i], i, this) // 将a的上下文指向b，forEach中的三个参数分别是当前值，当前序号，数组本身
    }
  }
}
```

## 手动实现call

```js
if (!Function.prototype.call) {
  Function.prototype.call = function (oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('当前调用call方法的不是函数！')
    }
    var args = [].slice(arguments, 1)
    // 获取需要指定的this，如果是null、undefined的时候我们去window当为this
    var self = oThis || window
    // 借助一个不可变量存入到self中
    const fn = Symbol('fn')
    self[fn] = this
    // 调取函数
    var result = self[fn](...args)
    // 执行完成之后删除过渡的属性，避免污染作用域
    delete self[fn]
    // 返回call之后的结果
    return result
  }
}
```

## 手动实现apply

当我们知道call的首先原理的时候，显然再去理解apply的原理就会简单很多了

```js
if (!Function.prototype.apply) {
  Function.prototype.apply = function (oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('当前调用call方法的不是函数！')
    }
    var args = arguments[1] // 因为对于apply来讲只会取第二个参数数组作为实参
    // 获取需要指定的this，如果是null、undefined的时候我们去window当为this
    var self = oThis || window
    // 借助一个不可变量存入到self中
    const fn = Symbol('fn')
    self[fn] = this
    // 调取函数
    var result = self[fn](...args)
    // 执行完成之后删除过渡的属性，避免污染作用域
    delete self[fn]
    // 返回call之后的结果
    return result
  }
}
```

## 手动实现bind

当我们实现了call和apply之后，就可以尝试着去实现一下bind，这个相对来讲我觉得是比较难的

```js
if (!Function.prototypt.bind) {
  Function.prototype.bind = function (oThis) { // 1
    if (typeof this !== 'function') {
      return 'bind需要function调用'
    }
    var self = this
    var args = [].slice.call(arguments, 1) // 这个地方为1处的参数，取oThis之后的参数去做数据初始化
    return function () { // 2
      // 这个地方注意一下bind的使用，func.bind(this),这个时候并没有调用func；需要func.bind(this)()
      return self.call(oThis, args.concat([].slice.call(arguments)))
      // 这个地方arguments为2的参数，两个地方的arguments得弄清楚就明白了bind的实现原理了
    }
  }
}
```

在mdn上的解释是只有以上的这些的，但是如果使用new关键字的时候使用以上的方法是有一些问题，所以我们还需要对以上的方法进行进一步的优化

```js
if (!Function.prototypt.bind) {
  if (typeof this !== 'function') {
    return 'bind需要function调用'
  }
  var self = this
  var args = [].slice.call(arguments, 1)
  var fBound = function () {
    if (this instanceof fBound) {
      // 如果在bind之后的函数在调用的时候this指向fBound，说明使用new关键字在生成，我们需要把调用者的this指回去
      return self.apply(this, args.concat([].slice.call(arguments)))
    } else {
      // 否则还是走原来bind(oThis)的oThis
      return self.apply(oThis, args.concat([].slice.call(arguments)))
    }
  }
  // 同时我们在使用new的时候需要去把原型链维护好
  var cont = function () {}
  // 如果绑定的函数有prototype属性则需要指定到fBound，没有的话fBound为空对象
  if (this.prototype) {
    cont.prototype = this.prototype
  }
  fBound.prototype = new cont()
  return fBound
}
```
这样就可以兼容到所有的情况了，这里面一些比较绕的东西，我觉得我在不记得时候应该好好看一下

## 手动实现一个new关键字

```js
function _new () {
  var args = [].slice.call(arguments, 1)
  var constructor = args.shift() // 先把构造函数推出去，同时也方便了之后apply的参数赋值
  var context = Object.create(constructor.prototype) // 这个地方要使用prototype，因为function的prototype是一个对象，不能够是constructor，因为他是一个函数
  var result = context.apply(constructor, args)
  return (typeof result === 'object' && result !== null) ? result : context
}
```

<back-to-top />

<gitask />
