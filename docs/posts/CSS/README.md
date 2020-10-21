# 盒模型

## 对盒模型的理解

在 CSS 中我们广泛地使用两种"盒子": 块级盒子和内联盒子,这两种盒子会在页面流和元素之间的关系表现出不同的行为

1. 块级盒子

- 盒子会在内联方向向上扩展并占据父容器在该方向上的所有可用空间,在绝大多数情况下意味着盒子会和父容易一样宽
- 每个盒子都会换行
- w/h 属性可以发挥作用
- 内边距,外边距和边框会将其他元素从当前盒子周围"推开"

2. 内联盒子

- 盒子不会产生换行
- w/h 属性不起作用
- 内边距,外边距以及边框会被应用但是不会把其他内联盒子推开

![盒模型图解](../../.vuepress/public/img/box-sizing/box-sizing.png)

## 标准盒模型

```css
box-sizing: content-box;
```

![CSS 标准盒模型](../../.vuepress/public/img/box-sizing/content-box.png)

- content-box 是默认值。如果你设置一个元素的宽为 100px，那么这个元素的内容区会有 100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

## IE 盒模型

```css
box-sizing: border-box;
```

![CSS IE盒模型](../../.vuepress/public/img/box-sizing/IE-box.png)

- border-box 告诉浏览器去理解你设置的边框和内边距的值是包含在 width 内的。也就是说，如果你将一个元素的 width 设为 100px,那么这 100px 会包含其它的 border 和 padding，内容区的实际宽度会是 width 减去 border + padding 的计算值。大多数情况下这使得我们更容易的去设定一个元素的宽高。
- border-box 不包含 margin

[MDN 详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)

<back-to-top />

<gitask />
