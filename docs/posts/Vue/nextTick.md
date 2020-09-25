# vue的nextTick

首先检查是否支持MutationObserver，如果支持，就用这个。(MutationObserver支持为IE11+)

然后判断是否支持setImmediate，如果支持，则用这个(setImmediate IE10支持)

否则就用setTimeout

> 可能你还没有注意到，`Vue `在更新` DOM `时是异步执行的。只要侦听到数据变化，`Vue `将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个` watcher `被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和` DOM `操作是非常重要的。然后，在下一个的事件循环“tick”中，`Vue `刷新队列并执行实际 (已去重的) 工作。`Vue `在内部对异步队列尝试使用原生的` Promise.then`、`MutationObserver `和` setImmediate`，如果执行环境不支持，则会采用` setTimeout(fn, 0) `代替。[资料来源](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

```js
if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
  var counter = 1
  var observer = new MutationObserver(nextTickHandler)
  var textNode = document.createTextNode(counter)
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = function () {
    counter = (counter + 1) % 2
    textNode.data = counter
  }
} else {
  const context = inBrowser
      ? window
      : typeof global !== 'undefined' ? global : {}
    timerFunc = context.setImmediate || setTimeout
}
return function (cb, ctx) {
    var func = ctx
      ? function () { cb.call(ctx) }
      : cb
    callbacks.push(func)
    if (pending) return
    pending = true
    timerFunc(nextTickHandler, 0)
  }
```

<gitask />
