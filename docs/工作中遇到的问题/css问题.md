# css中的问题

## 1. html2canvas + jsPdf 截图打印的问题

1. 不识别css3的属性，但是我的border不知道为啥不能识别，找到他的源码里面能够拿到属性的值，但是就是不显示，，最终的解决方案是，将border改为background实现，这样就有一个问题，只支持solid这一种borderStyle,不过html2canvas本来只支持borderStyle为solid的方式

## 2. vue-cli3项目种取消预加载css，减少首屏加载时间

```js
// vue.config.js
// 移除 prefetch 插件
config.plugins.delete('prefetch')
// 移除 preload 插件
config.plugins.delete('preload')
```
<gitask />