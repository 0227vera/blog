# 标签

### 行内标签（内联标签） 和 块级标签

1. 行内标签（内联标签）

  一个行内元素只占据他对应标签的边框所包含的空间，一般情况下，行内元素只能包含数据和其他行内元素
  eg: a、span、strong、u（下划线）、em(强调)、i(斜体)、sub(下标),sup(上标)

2. 块级标签

  占据一整行，高度、行高、内边距和外边距都可以改变，可以容纳块级标签和其他内联标签
  eg: div、p、h1-h6、ul、li、dl（定义列表、跟ul…li类似）、dt（定义了定义列表中的项目）、dd（定义描述项目的内容、跟dt一起搭配）

3. 行内块标签 （这一类标签比较特殊，即具有行内标签的特性，又可以设置宽高）
  eg: img input （最典型的两个）

### h5新增的一些标签

1. 布局类

* header、mian、footer 等相关语义化的标签

2. 功能类

* figure:定义带图片的文章 figcaption:作为figure标签的标题

* progress:进度条（兼容性较差，一般使用其他元素模拟）

* 一些新的标签的兼容性可能比较差，所以用的也比较少，但是canvas不一样，canvas用的还是比较多的，特别是基于canvas开发出来的大量的第三方的插件或者框架和引擎，比如：

  * [babylonJS](https://www.babylonjs.com/)
  * [threeJS](https://threejs.org/)

* canvas （使用canvas做手写签批）（下面是签名的例子）

<canvas-sign />

### 网上的一些资料

1. [SignaturePad源码和demo](https://codepen.io/theonelucas/pen/PjzYeg)

2. 标注功能(类似于微信截图功能)资料来源 [fabric.js](https://get.fabric.io/)

3. [标注功能事件demo](http://fabricjs.com/events)

4. [网上优秀使用和讲解](https://blog.csdn.net/sufu1065/article/details/80116758) 

5. [](https://vipstone.github.io/drawingboard/drawingboard/index.html)

6. [vue生成canvas海报图](https://segmentfault.com/a/1190000019975772)

### 容易忽视的标签

1. meta元素可提供有关页面的元信息

* content 定义与heep-equiv或者name属性相关的元信息

不想在这搞太多的理论性的东西，搞点实际用途吧

1. 设置类型

```html
  <meta charset="UTF-8">
```

2. 设置页面刷新时间

```html
<meta http-equiv="refresh" content="3;url=https://www.baidu.com"> 
<!-- 没有地址则是刷新，有地址则是跳转 -->
```

3. 设置浏览器缓存时间

 设置网页在缓存时间过期的时间，一旦过期就需要在服务器上面重新加载

```html
<meta http-equiv=expires content=Tue Aug 13 2019 08:59:13 GMT>
```

4. 禁止页面缓存

```html
<meta http-equiv="pragma" content="no-cach">
```
当接口返回数据可能频繁的发生变化的时候我们肯定是不希望接口走缓存的，所以这个时候会用到他

5. 设置cookie

```html
<meta http-equiv=Set-Cookie Content=cookievalue=xxx; expires=Tue Aug 13 2019 08:59:13 GMT; path=/ >
```

这个就不用多说了，cookie在我们平常的开发中太多了，只不过很多时候没有使用这种方法而已

6. window-target

这一条属性主要是为了防止你的页面被别人的框架打开了

content选项
 值|解释
--|:--:
_blank | 在新窗口中打开链接
_self | 默认。在相同的框架中打开被链接的文档
_top | 在整个窗口中打开被链接的文档
_parent | 在父框架集中打开被链接文档
framname | 在指定框架中打开被链接的文档

```html
<meta http-equiv=widow-target Content=_top>
```

7. viewport
什么是viewport？ 手机浏览器会把页面放在一个虚拟的窗口，通常这个虚拟的窗口是会比屏幕宽的，用户通过平移和缩放来看不同的部分

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```
height: 和width相对指，指定高度

initial-scale: 初始缩放比例，也就是当页面第一次load的时候的缩放比例

maximum-scale: 允许用户缩放的最大比例

minimum-scale: 允许用户缩放的最小比例

user-scalable: 用户是否允许手动缩放


在移动端开发的过程中需要注意这上面的值

<back-to-top />

<gitask />