# CSS面试整理

## css 选择器的优先级

!important > 行内样式 > id > class > tag > 属性名

## 居中问题

::: details 查看演示代码
<<< @/docs/.vuepress/public/demo/html/center.html
:::

注意：如果你对table布局不是很了解，非逼问下不要说这一种方式，说了你需要思考下一个人table布局和div的不同，以及各自的好坏

## 盒模型

盒模型分为标准盒模型和怪异盒模型

通过box-sizing来设置，其中border-box来设置怪异盒模型，content-box来设置标准盒模型

使用上的区别是怪异盒模型会讲padding、boeder、width算成盒子的width，而标准盒模型只会算content的width

## position 和 z-index

1. position 有哪几种？

- static：默认定位属性值。该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。

- relative：相对于自己定位

- absolute：相对于祖元素有定位的元素定位

- fixed：在祖元素 transform 不为 none 的时候更具窗口定位，有 transform 的时候基于 transform 定位

- sticky：粘性布局时候会使用到，但是即使是在移动端兼容性也比较差，所以我目前还没有过

2. z-index：只在 position 不为 static 的时候生效；没有定义 z-index 的值，元素按照他们出现在 dom 中的顺序堆叠（层级越低，出现的位置越考上）。非静态定位的元素（及其子元素）将始终覆盖在静态定位（static）的元素，而不管 html 层级结构

显示问题，z-index 相对于父元素设置，什么意思呢？AB 同一级 C 为 B 的子级，z-index 值得顺序:C>A>B,A 永远会在 C 的上面，这个例子就很能够说明情况

## 你了解flex吗？

第一：flex由flex content（通过设置display：flex来设置）和flex item（对单个item进行属性设置）组成

第二：通常使用多的有哪些布局

第三：常见的问题，是如何解决的（我遇到的一个是：横向滚动时候无滚动条时候，给content天假`flex-shrink: 0`）

## 过度和动画的区别是什么

1. transition：可以在一定的时间内实现元素得状态过渡为最终状态，用于模拟一种过渡动画效果但是功能有限，只能制作简单得动画效果

2. animation：可以制作类似于 flash 动画，通过关键帧控制动画的每一步，控制更为精确，从而可以制作更为复杂的动画

3. js 动画与 css 动画差异：js 动画代码上面复杂一些性能不如 css 好，好处在于能够让动画停止取消等，有事件操作

## sticky-footer 的解决方案（常见的H5开发时候的一种全局布局方式）

这个方法就是为了让 footer 流式布局，实现方案有几种，我按照我想到的说几种吧

1. flex：1 的做法，注意兼容性

2. content.height：calc(100%-footer.height)

3. `posotion:fixed`布局

3. 类似于圣杯布局的做法

```html
<body>
  <div class="wrapper">
    <div class="content"></div>
  </div>
  　 　　
  <div class="footer"></div>
</body>
```

## reset.css 和 normalize.css 的区别和选择

1. reset.css 主要是将浏览器中的默认样式全部去除

2. normalize.css 主要是标准化样式(消除浏览器之间的样式差异)

选择还是要看需求，如果是比较个性的需要使用大量的 css 的选择 reset 会比较好，其他的使用 normalize