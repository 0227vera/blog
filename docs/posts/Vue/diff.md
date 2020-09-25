# diff算法

## 1. 当数据发生变化时，vue是怎么样更新节点的？

渲染真是DOM的开销是非常大的，比如有些时候我们修改了某个数据，如果直接渲染到真是的dom树上会引起整个dom树的重绘和重排，但是我们理想状态只是需要一小块的dom更新

virtual DOM：先根据真是的dom树生成一棵虚拟的dom树，当virtual DOM某个节点的数据改变后会生成一个新的Vnode。然后Vnode和oldVnode做对比，发现不一样的地方就直接修改真是的dom上，然后oldVnode的值为Vnode

实际上，diff的过程就是调用patch的函数，比较新旧节点，一边比较一边给真实的dom打补丁

## 2. virtual DOM和真实的DOM的区别

1. virtual DOM的表现

```js
var Vnode = {
  tag: 'div',
  children: {
    { tag: 'p', text: '123' }
  }
}
```

2. 真实的DOM

```html
<div>
  <p>123</p>
</div>
```

## 3. diff的比较方式

看虚拟的dom中的结构就知道，diff的比较只会在同层级进行比较，不会跨层级进行比较

```html
<div>
    <p>123</p>
</div>

<div>
    <span>456</span>
</div>
```

根据上面的代码，比较同一层的两个div以及第二层的p和span，但是不会拿div和span进行比较，如下图的成对比较的情况：

![图解](../.vuepress/public/img/vue/diff1.png)

## 4. diff的流程图

![图解](../.vuepress/public/img/vue/diff2.png)

## patch方法

```js
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
        let parentEle = api.parentNode(oEl)  // 父元素
        createEle(vnode)  // 根据Vnode生成新元素
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
        }
    }
    // some code
    return vnode
}
```

先判断是否值得去比较这个节点，如果值得去比较的话，如果值得比较的话执行patchVnode（值得比较说明这个节点没有改变，如果改变了直接替换掉旧节点）
不值得比较的话直接替换掉oldVnode

那么有一个问题，如果父节点不一样，子节点之后的全部一样呢？这种情况会直接替换父节点，在diff也有一种数据单向流，上级修改了下级不管是否修改都会直接上级替换

```js
function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

如果两个节点值得去比较的时候patchVnode方式是什么呢？

```js
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
```

实际上patchVnode需要完成的事情是：

1. 找到对应真是的dom--->el
2. 判断Vnode和oldVnode是否指向同一个对象，如果是，就是没有改变
3. 如果是文本且文本不一样，赋值
4. 如果oldVnode有子节点而Vnode没有，直接删除子节点
5. 如果oldVnode没有子节点，而Vnode有，则将Vnode真实化之后添加到el
6. 如果都有子节点，执行updateChildren函数比较子节点

可想而知道上面的1->5都是比较好实现，但是第6点想想都是一个恶心的过程

```js
updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {   // 对于vnode.key的比较，会把oldVnode = null
            oldStartVnode = oldCh[++oldStartIdx]
        }else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        }else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        }else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode)
            api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode)
            api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else {
           // 使用key时的比较
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
            }
            idxInOld = oldKeyToIdx[newStartVnode.key]
            if (!idxInOld) {
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                newStartVnode = newCh[++newStartIdx]
            }
            else {
                elmToMove = oldCh[idxInOld]
                if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                }else {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = null
                    api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
    }else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}
```

先解释这个函数做了什么

1. 将Vnode的子节点Vch和oldVnode的子节点oldCh提取出来
2. oldCh和vCh各有两个变量，StartInx和EndIdx，他们的两个变量相互比较，一共4中比较方式，如果4种比较都没有匹配，如果设置了key，就用key比较，在比较的过程中，变量会往中间靠，一旦StartIdx > EndIdx表明oldCH至少有一个已经遍历完了，结束比较

<font color=red>单看代码，容易睡着，建议先看图解，弄懂什么原理之后再去看代码</font>

红色为oldCh和vCh：

![图解](../.vuepress/public/img/vue/diff3.png)

把他们提取出来跟别用s和e表示头child和尾child

![图解](../.vuepress/public/img/vue/diff4.png)

现在分别对oldS、oldE、S、E两两做sameVnode比较，有四种比较方式，当其中两个能够匹配上那么真实dom中的相应节点会移到Vnode相应的位置

* 如果是oldS和E匹配上了，那么真是dom中的第一个节点会移到最后
* 如果oldE和S匹配上了，那么真实dom中的最后一个节点移到最前，匹配上的两个指针向中间移动
* 如果四种匹配没有一对成功的，那么遍历oldChild，S挨个和他们匹配，匹配成功旧再真实dom将成功移到最前面，如果没有成功，那么旧插入到dom中的oldS的位置，oldS和S指针向中间移动

![图解](../.vuepress/public/img/vue/diff5.png)

1. 第一步

```js
oldS = a
oldE = d
S = a
E = b
```

oldS和S匹配，则将dom中的a节点放到第一个，已经是第一个了就不管了，此时dom的位置为：a b d

2. 第二步

```js
oldS = b
oldE = d
S = c,
E = b;
```

oldS和E匹配，就将原本的b节点移动到最后，因为E是最后一个节点，他们位置要一致，这就是上面说的：当其中两个能匹配上那么真实dom中的相应节点会移到Vnode相应的位置，此时dom的位置为：a d b

3. 第三步

```js
oldS = d
oldE = d
S = c
E = d
```

oldE和E匹配，位置不变此时dom的位置为：a d b

4. 第四步

```js
oldS++
oldE--
oldS > oldE
```

遍历结束，说明oldCh先遍历完。就将剩余的vCh节点根据自己的的index插入到真实dom中去，此时dom位置为：a c d b

这个匹配过程的结束有两个条件

* oldS > oldE表示oldCh先遍历完，那么就将多余的vCh根据index添加到dom中去（如上图）
* S > E表示vCh先遍历完，那么就在真实dom中将区间为[oldS, oldE]的多余节点删掉

![图解](../.vuepress/public/img/vue/diff6.png)

![图解](../.vuepress/public/img/vue/diff7.png)

<back-to-top />

<gitask />