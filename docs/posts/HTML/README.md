# HTML

## 标签

### doctype

doctype 是一种标准通用标记语言的文档类型声明，目的是告诉标准通用标记语言解析器要使用什么样的文档类型来定义解析文档

声明是用来指示 web 浏览器关于页面使用哪个 html 版本进行编写的指令，必须在文档的第一行，位于 html 标签之前

浏览器本身分为两种模式：标准模式和怪异模式，浏览器通过 doctype 来区分这两种模式，如果没有 doctype 浏览器就会进入怪异模式，在这个模式下面，样式和标准模式存在差异，而 dom 标准和 html 标准规定标准模式下的行为，没有对怪异模式的规定，所以不同浏览器在怪异模式下面的的处理是不同的

### html

`<html>` 元素 表示一个HTML文档的根（顶级元素），所以它也被称为*根元素*。所有其他元素必须是此元素的后代。

#### head

`<head>` 元素 规定文档相关的配置信息（元数据），包括文档的标题，引用的文档样式和脚本等。

##### meta

`<meta>` 元素表示那些不能由其它 HTML 元相关（meta-related）元素（(`<base>`、`<link>`, `<script>`、`<style>` 或 `<title>`）之一表示的任何元数据信息。

meta 元素定义的元数据的类型包括以下几种：

* 如果设置了 name 属性，meta 元素提供的是文档级别（document-level）的元数据，应用于整个页面。
* 如果设置了 http-equiv 属性，meta 元素则是编译指令，提供的信息与类似命名的HTTP头部相同。
* 如果设置了 charset 属性，meta 元素是一个字符集声明，告诉文档使用哪种字符编码。
* 如果设置了 itemprop 属性，meta 元素提供用户定义的元数据。

以下为部分设置的例子：

1. 设置类型

```html
<meta charset="UTF-8" />
```

2. 设置页面刷新时间

```html
<meta http-equiv="refresh" content="3;url=https://www.baidu.com" />
<!-- 没有地址则是刷新，有地址则是跳转 -->
```

3. 设置浏览器缓存时间

设置网页在缓存时间过期的时间，一旦过期就需要在服务器上面重新加载

```html
<meta http-equiv="expires" content="Tue" Aug 13 2019 08:59:13 GMT />
```

4. 禁止页面缓存

```html
<meta http-equiv="pragma" content="no-cach" />
```

当接口返回数据可能频繁的发生变化的时候我们肯定是不希望接口走缓存的，所以这个时候会用到他

5. 设置 cookie

```html
<meta http-equiv=Set-Cookie content=cookievalue=xxx; expires=Tue Aug 13 2019 08:59:13 GMT; path=/ >
```

这个就不用多说了，cookie 在我们平常的开发中太多了，只不过很多时候没有使用这种方法而已

6. window-target

这一条属性主要是为了防止你的页面被别人的框架打开了

content 选项
值|解释
--|:--:
\_blank | 在新窗口中打开链接
\_self | 默认。在相同的框架中打开被链接的文档
\_top | 在整个窗口中打开被链接的文档
\_parent | 在父框架集中打开被链接文档
framname | 在指定框架中打开被链接的文档

```html
<meta http-equiv="widow-target" content="_top" />
```

7. viewport
  什么是 viewport？ 手机浏览器会把页面放在一个虚拟的窗口，通常这个虚拟的窗口是会比屏幕宽的，用户通过平移和缩放来看不同的部分

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
```

height: 和 width 相对指，指定高度

initial-scale: 初始缩放比例，也就是当页面第一次 load 的时候的缩放比例

maximum-scale: 允许用户缩放的最大比例

minimum-scale: 允许用户缩放的最小比例

user-scalable: 用户是否允许手动缩放

在移动端开发的过程中需要注意这上面的值

##### title

`<title>` 元素 定义文档的标题，显示在浏览器的标题栏或标签页上。它只应该包含文本，若是包含有标签，则它包含的任何标签都将被忽略。

##### link

HTML外部资源链接元素 (`<link>`) 规定了当前文档与外部资源的关系。该元素最常用于链接样式表，此外也可以被用来创建站点图标(比如PC端的“favicon”图标和移动设备上用以显示在主屏幕的图标) 。

##### style

style 全局属性 包含应用到元素的 CSS 样式声明。要注意样式最好定义在单独的文件中。这个属性以及 `<style>` 元素的主要目的是快速装饰。例如用于测试目的。

>用法注解：这个属性不能用于传递语义信息。即使所有样式都移除了，页面也应该保留正确语义。通常它不应用于隐藏不相关的信息；这应该使用 hidden 属性来实现。

#### body

`<body>` 元素表示文档的内容。document.body 属性提供了可以轻松访问文档的 body 元素的脚本。

注意：body有一些方法[body属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/body#%E5%B1%9E%E6%80%A7)

##### 行内标签（内联标签） 和 块级标签 

1. 行内标签（内联标签）

一个行内元素只占据他对应标签的边框所包含的空间，一般情况下，行内元素只能包含数据和其他行内元素
eg: a、span、strong、u（下划线）、em(强调)、i(斜体)、sub(下标),sup(上标)

2. 块级标签

占据一整行，高度、行高、内边距和外边距都可以改变，可以容纳块级标签和其他内联标签
eg: div、p、h1-h6、ul、li、dl（定义列表、跟 ul…li 类似）、dt（定义列表中的项目）、dd（定义描述项目的内容、跟 dt 一起搭配）

3. 行内块标签 （这一类标签比较特殊，即具有行内标签的特性，又可以设置宽高）
  eg: img input （最典型的两个）

##### canvas

* 一些新的标签的兼容性可能比较差，所以用的也比较少，但是 canvas 不一样，canvas 用的还是比较多的，特别是基于 canvas 开发出来的大量的第三方的插件或者框架和引擎，比如：

  * [babylonJS](https://www.babylonjs.com/)
  * [threeJS](https://threejs.org/)

* canvas （使用 canvas 做手写签批）（下面是签名的例子）

<canvas-sign />

* 相关实例

1. [SignaturePad 源码和 demo](https://codepen.io/theonelucas/pen/PjzYeg)

2. 标注功能(类似于微信截图功能)资料来源 [fabric.js](https://get.fabric.io/)

3. [标注功能事件 demo](http://fabricjs.com/events)

4. [网上优秀使用和讲解](https://blog.csdn.net/sufu1065/article/details/80116758)

5. [画板](https://vipstone.github.io/drawingboard/drawingboard/index.html)

6. [vue 生成 canvas 海报图](https://segmentfault.com/a/1190000019975772)

##### [video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)、[audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

1. `<video>` 元素 用于在HTML或者XHTML文档中嵌入媒体播放器，用于支持文档内的视频播放。你也可以将 `<video>`  标签用于音频内容，但是 `<audio>` 元素可能在用户体验上更合适。

2. `<audio>` 元素用于在文档中嵌入音频内容。 `<audio>` 元素可以包含一个或多个音频资源， 这些音频资源可以使用 src 属性或者`<source>` 元素来进行描述：浏览器将会选择最合适的一个来使用。也可以使用 MediaStream 将这个元素用于流式媒体。

## html 语义化

什么是语义化？ 就是用合理正确的标签来展示内容，比如`h1~h6`表示标题、`table`表示表格等等

好处有：

1. 易于代码维护，样式丢失的时候能够让页面具有清晰的结构

2. 利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重

3. 方便其他设备解析，如盲人阅读器根据语义渲染网页

4. 有利于开发和维护，语义话更具可读性，代码更好维护，与 CSS3 关系更和谐

## b/strong、i/em的区别

b（bold）是实体标签、用来给文字加粗；没什么实际含义，单纯的加粗文字

strong是逻辑标签，作用是加强字符语气

根据语义化，建议使用strong，少用b；对于i和em也是一样的，建议使用em标签

##  css、js的引入位置问题

为什么最好把`<link>`标签放在 head 之间？为什么最好把`<script>`放在`</body>`之后

1. 把 link 标签放在 head 之间是规范要求的内容，如果不放在头部，一旦浏览器阻止渲染，会发生空白页面或者没有样式的内容

2. script 脚本在下载和执行期间会阻止 html 解析，把 script 放在底部，保证 html 首先完成解析，将页面尽早呈现给用户

## href 和 src 的区别

1. href 标识超文本引用，用在 link 和 a 等元素上，href 是引用和页面关联，是在当前元素和引用资源之间建立联系；css 中的 href 是可以并行下载的并且不会停止当前对文档的处理，所以会推荐用 link 引入 css 为不是@import

2. src 标识引入资源，在 img、script、iframe 上是必不可少的一部分；src 会暂停其他的下载和处理（图片不会暂停其他下载），直到该资源加载、编译、执行完成，这就是为什么建议把 js 脚本放在底部而不是头部

## script 的 async 跟 defer 的区别

背景：HTML在执行时，如果遇到外部JS引用，需要下载执行JS文件，此时会停止页面渲染，导致页面表现为空白。defer和async用来控制JS文件的下载和执行

defer 表明脚本执行时不会影响页面构造，让脚本在页面解析完成后执行（即让浏览器下载JS文件，但等到页面解析完成后执行）

async 只适用于外部JS文件，告诉浏览器立即下载JS文件，但是不保证按照JS的先后顺序运行（注意JS文件之间的依赖关系）

## 标签层级结构

```
├─ <!DOCTYPE>
├─ <html>
│  └─ <head>
│     └─ <title>、<meta>、<link>、<style>、<script>
│  └─ <body>
│     └─ <div>、<span>、<canvas>、<video>、<audio>
```

## 参考材料

1. [HTML（超文本标记语言）](https://developer.mozilla.org/zh-CN/docs/Web/HTML)


