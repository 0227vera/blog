# js中的问题
js，vue，react的问题就都写在这个地方了，因为vue和react也是可以拆分为html、css、js的

## 1. react中setState的第二个参数

最近在表单设计器中，需要在打印的时候去改变页面样式，再打印完成之后再修改回来，所以需要一个值去判断用哪一种样式渲染，什么时候修改完成，<font color=red>setState有第二个参数表示页面更新之后的回调</font>