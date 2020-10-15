# html 中的问题

## canvas 内存问题

1. 前两天做一个 H5 的项目时候遇到一个 canvas 的问题，有多个页面使用 canvas,ios 总是有一些页面的 canvas 无法加载出来，也没有报错信息，偶尔会报错：`Error: TypeError: null is not an object (evaluating 't.imageSmoothingEnabled') `

问题的原因：[地址](https://stackoverflow.com/questions/40482586/getcontext2d-returns-null-in-safari-10/43482153)

开始以为是加载了天多的 canvas，canvas 确实加载的特别多，1. echarts 加载了 4 个 canvas，fabric 加载 20 个 canvas 导致直接 canvas 会经常加载出不来

优化的过程：

1. 后来将 echarts 改成 svg 渲染，发现并没有什么用

2. fabric 的 canvas 渲染改成两个 canvas，解决了部分 ios 机型的问题，但在 iphoneX 上面还是加载不出来

3. 相当内存问题，canvas 的宽高大小直接影响所占内存，fabric 这个插件会根据屏幕的 dpr 重新计算 canvas 的高度，导致每个 canvas 的宽高都乘以了一个 dpr 系数，这样相当每次渲染 canvas 的时候 canvas 所占内存是原来的 9 倍修改方案：<font color=red>不再乘以 ratina 屏的 dpr 系数，在高清屏里面，手动设置 fabric.devicePixelRatio = 1</font>

<gitask />
