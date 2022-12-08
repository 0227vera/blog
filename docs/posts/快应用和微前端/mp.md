# 小程序

## 小程序与H5的差别

### 1. 运行环境方面

* H5的宿主环境是浏览器，只要有浏览器就可以使用，包括常见的浏览器（Google Chrome、Safari等）、app的webview、小程序的webview
* 小程序的宿主环境是移动app，如微信、支付宝、抖音、头条、百度等；用微信小程序为例子，微信将浏览器内核重构的内置解析器，并不是一个完整的浏览器，没有window和document对象，显然也没有dom和bom的概念

### 2. 渲染机制方面

* H5就是web渲染，浏览器渲染
  * 请求服务过程
    * DNS查询（根据域名解析对应的ip地址）
    * TCP链接（链接建立、数据传送以及释放）
    * HTTP请求及响应
    * 服务端响应
    * 客户端渲染
  * 客户端渲染过程
    * 解析html生成dom树
    * 解析css生成cssom树
    * 将dom和cssom树规则合并生成渲染树
    * 遍历渲染树开始布局，技术每个节点的位置信息
    * 将渲染树每个节点绘制到屏幕
* 小程序在宿主环境下渲染，例如微信，执行小程序的文件分别是，wxml、wxss、js文件，提供了双线模型（渲染层和逻辑层）
  * 双线模型
    * 渲染层：相关的渲染任务全在webview线程里执行，一个小程序有多个界面，所以渲染层存在多个webview线程
    * 逻辑层：一个单独执行js的线程，在这个环境下执行都是小程序业务逻辑的代码，就是jscore来执行js脚本
    * 这两个线程都会经过微信客户端（Native）的WeixinJsBridage进行通信，逻辑层把数据变化通知渲染层，触发视图层页面更新，视图层把触发的事件通知逻辑层进行业务处理
  * 小程序渲染逻辑
    * 在渲染层将wxml先转化为js对象，也就是虚拟的dom
    * 在逻辑层将虚拟dom对象生成真实dom树，交给渲染层渲染
    * 当视图有数据更新时，逻辑层调用小程序环境的setData方法将数据从逻辑层传递到渲染层
    * 经过diff算法，把差异应用到真实的Dom树上，渲染出正确的UI界面完成视图更新
![图片信息](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/28/1711fdea965124a3~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

### 3. 生命周期方面

* H5打开重新加载所有的状态，关闭销毁所有的状态，可以理解为只有冷启动，没有热启动
* 小程序存在热启动和冷启动的不同，主要是是用在前后台的切换

![小程序冷启动热启动切换](https://res.wx.qq.com/wxdoc/dist/assets/img/life-cycle.5558d9eb.svg)

### 4. 系统权限方面

* H5只能调用浏览器的能力，无法调取相关系统权限，如蓝牙、通讯录、网络状态等等，需要app额外提供bridge来满足这样的需求
* 小程序可以调用这些并能够到达natice的流畅性

### 5. 开发语言方面

* H5：html、css、js
* 小程序：不同的app有自己定义独特的语言，但目前是微信相对比较领先

### 6. 更新机制方面

* H5：无需审核，上线即可全量替换
* 小程序：需要审核，且无法全量覆盖
  * 微信：官方文档说的是24小时100%覆盖，实测并没有，大概只能达到93%左右
  * 支付宝：官方文档上未说明多长时间版本全部覆盖，同样的时间大概覆盖率在95%左右

## 小程序本身相关知识点

### 小程序的生命周期

![小程序的生命周期](https://res.wx.qq.com/wxdoc/dist/assets/img/life-cycle.5558d9eb.svg)

### 一个页面的生命周期

![双线生命周期](https://res.wx.qq.com/wxdoc/dist/assets/img/page-lifecycle.2e646c86.png)

### 小程序如何优化进入时候的白屏问题

微信提供了相关的文档配置，可以做初始渲染缓存，`"initialRenderingCache": "static"`，来缓存一些之前的页面和数据状态，在逻辑层初始化之前，先将页面展示，这个时候页面还没有交互，得等逻辑层初始化完毕之后才能响应用户时间

## MPX的相关开发

### 类vue开发

* 类vue开发，完成的vue+webpack机制，提高开发效率

### 增强型小程序框架
* 增强型小程序框架，非转义型
  * 用户遇到框架编译的问题相对较少
  * 小程序的技术规范还在发展中，对新的技术规范，大部分可以直接使用
  * 代码体积小：不需要大量添加因为转义编译时候框架类的代码注入，特别在早期没有自定义组件的时候

### 数据响应

* Mobx observable将data数据转化为响应式数据
* 低版本使用的mobx和mixins来进行相应式数据管理，主要解决：尽可能减少setData的频次和尽可能减少单词setData传输的数据
* 1. 将组件编译成render函数，当render函数依赖数据发生变化时才出发setData，这个和vue的更新机制非常相似
* 2. 每次setData，均和元数据尽心diff对比，只将差异点进行setData来保证setDate的传输量最低

### 编译构建

* webpack编译构建
  * 基于依赖分析和动态添加entry实现按需打包，入口文件只有app.mpx
    * 核心是通对json中配置的page和usingComponents来递归添加entry的方式来打包出产物
    * 通过CommonsChunkPlugin/SplitChunksPlugin的能力抽离复用模块

### 如何抹平差异

* 绝大部分能力通过loaded和plugin完成，个性化差异提供条件判断
  * 模版语法/基础组件差异：
  * json配置差异：
  * wxs语法差异
  * 页面/组件对象差异
  * api调用差异
  * webview briage差异

### 性能测算的指标

* 框架运行时体积
  * 计算方法：同样的功能实现，dist生成的体积减去native编写的项目的体积
* 页面渲染耗时
  * 手动触发刷新页面，到页面执行onReady的耗时
  * 动态渲染的框架，onReady并不代表真正渲染完成，可以以页面触发onReady后1000ms以内，在没有任何操作情况下出现setData回调时，最好完成setData回调作为页面渲染完成来计算渲染耗时，这种办法是由于小程序本身没有performance api，用这些侧面的数据来说明相关问题
  * 动态渲染通常情况下是大于静态渲染的
* 页面更新耗时
  * 无后台数据
  * 有后台数据
  * 大数据场景
* 局部更新耗时
* setData调用

### mpx是如何完成spa的模式转化为4个文件的（wxml、wxss、js、json）

* 1. *.mpx  -->  json-compiler  -->  extractor
* 2. 通过webpack的SingleEntryPlugin动态添加entry依赖添加到webpack的编译流程中
* 3. extractor做了哪些事情
    * 确定路径
    * 以路径作为模块入口，创建childCompiler
    * childCompiler启动后，创建loaderContext中，提取文本，并传会context
    * loader处理（包括正则、文件生成、抹平不同端等），进入到module.build阶段，
    * createAssets阶段，输出chunk
    * 将输出的chunk构建为一个原生的nodejs模块并执行

### 如何基于mpx做小程序体积优化

* 1. 基础优化时段
  * 资源压缩
  * 工程精简（去除冗余代码）
  * 资源CDN化
  * 异步加载
* 2. 分析体积
  * webpack-bundle-analyzer分析包的相互依赖关系
  * 提取公共包发npm包，分包异步化
* 3. 分包配置，减轻主包体积
  * 添加logo页，将home页面分包，减少主包体积
* 4. 实际体积访问比
  * 计算30天每个页面平均pv / 页面的体积 = a
  * 根据业务判断不同的预期访问率b
  * 当a >= b 维持现状，并持续维护
  * 当a < b 使用H5方案降级，节省分包对应的体积
* 5. 多次运用的组件主包引用
  * 如nav-bar组件每个页面都需要使用，我们将其，提升到主包，用较小的主包空间换取了几十次的分包冗余，我们认为是值的

### 分包异步化

![图示分包异步化](https://dpubstatic.udache.com/static/dpubimg/c7ac0180-6914-46c6-aaed-c1d3cface8e1.jpeg)

* 优点：
  * 很好解决了要么主包引用体积大，要么各个分包引用冗余严重的矛盾
* 缺点：
  * 平台支持问题，目前只有微信支持，（支付宝正在同步支持中）
  * 交互和体验有一定影响
  * 对于业务来讲有一定的改造成本

### ref是如何实现的

this.$refs时会通过selectAllComponents/SelectQuery.selectAll方法获取组件实例数组或数组节点查询对象，确保开发者能拿到列表渲染中所有的组件实例/节点信息。

