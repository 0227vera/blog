# js中的问题
js，vue，react的问题就都写在这个地方了，因为vue和react也是可以拆分为html、css、js的

## 1. react中setState的第二个参数

最近在表单设计器中，需要在打印的时候去改变页面样式，再打印完成之后再修改回来，所以需要一个值去判断用哪一种样式渲染，什么时候修改完成，<font color=red>setState有第二个参数表示页面更新之后的回调</font>，这个地方的第二个参数同`vue`中的`nextTick()`函数

>扩展一点：setState()方法在正常的声明周期里面是异步的，但是在setTImeout等中式同步的,主要因为isBatchingUpdates为false，会直接更新数据

## 2. 鼠标的坐标问题

刚做了一个关于元素拖动的东西，以前也做过一些关于位置的东西，总是搞容易搞混淆一些含义，今天有点时间，想把这个东西搞得透一点

1. clientX/clientY ------ 相对于浏览器可视区左上角（0，0）的坐标

2. screenX/screenY ------ 相对于设备屏幕左上角（0，0）的坐标  （在这个地方，也就是说，clientY-screenY是一个定值，一般使用clientY，和client都要注意滚动条的情况）

3. offsetX/offsetY ------ 相对于事件源左上角（0，0）的坐标（target和currentTarget的区别）（这个用的也是比较多的）

4. pageX/pageY ---------- 相对于整个网页的左上角（0，0）的坐标

5. X/Y ------------------ 本来是IE的属性，相对于用css动态定位（position）的最内层包含元素

![图解如下](../.vuepress/public/img/event-position.png)

## 3. html2canvas还是canvas的所占内存的问题，在转化为canvas的时候有一个最大的宽高的问题

![图解](../.vuepress/public/img/canvas.jpg)

针对这个问题在打印的时候做了分段打印的改变，开始做的是每一页调用一次html2canvas，但是发现了另一个问题，html2canvas没调用一次都会请求页面上所有的静态资源（除了js），所以减小颗粒度，每次在不超多最大宽高的时候调用一次，但是在调用超过3次的时候，需要等待的时间很长，整个生成的时候就到20秒左右，因为是图片系统打印的时间有还需要一段时间，大概也是10s左右，这个是无法忍受的，所以最后我选择弃用了这种方案

<back-to-top />

<gitask />