# html中的问题

## canvas内存问题

1. 前两天做一个H5的项目时候遇到一个canvas的问题，有多个页面使用canvas,ios总是有一些页面的canvas无法加载出来，也没有报错信息，偶尔会报错：`Error: TypeError: null is not an object (evaluating 't.imageSmoothingEnabled') `

问题的原因：[地址](https://stackoverflow.com/questions/40482586/getcontext2d-returns-null-in-safari-10/43482153)

开始以为是加载了天多的canvas，canvas确实加载的特别多，1. echarts加载了4个canvas，fabric加载20个canvas导致直接canvas会经常加载出不来

优化的过程：

1. 后来将echarts改成svg渲染，发现并没有什么用

2. fabric的canvas渲染改成两个canvas，解决了部分ios机型的问题，但在iphoneX上面还是加载不出来

3. 相当内存问题，canvas的宽高大小直接影响所占内存，fabric这个插件会根据屏幕的dpr重新计算canvas的高度，导致每个canvas的宽高都乘以了一个dpr系数，这样相当每次渲染canvas的时候canvas所占内存是原来的9倍修改方案：<font color=red>不再乘以ratina屏的dpr系数，在高清屏里面，手动设置fabric.devicePixelRatio = 1</font>

<gitask />